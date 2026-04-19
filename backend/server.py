from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev').strip()
CONTACT_RECIPIENT_EMAIL = os.environ.get('CONTACT_RECIPIENT_EMAIL', '').strip()
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Anticiper.net API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    company: Optional[str] = Field(default=None, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=50)
    subject: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=5000)
    locale: Optional[str] = Field(default="fr", max_length=5)


class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    status: str
    created_at: datetime


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "anticiper.net", "status": "ok"}


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        return {"status": "healthy", "db": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))


def _build_contact_email_html(payload: ContactCreate) -> str:
    return f"""
    <table style="font-family:Arial,sans-serif;max-width:600px;border-collapse:collapse">
      <tr><td style="padding:12px 0;border-bottom:1px solid #e2e8f0">
        <h2 style="color:#0f172a;margin:0">Nouveau message — anticiper.net</h2>
      </td></tr>
      <tr><td style="padding:16px 0">
        <p style="color:#334155;margin:6px 0"><strong>Nom :</strong> {payload.name}</p>
        <p style="color:#334155;margin:6px 0"><strong>Entreprise :</strong> {payload.company or '—'}</p>
        <p style="color:#334155;margin:6px 0"><strong>Email :</strong> {payload.email}</p>
        <p style="color:#334155;margin:6px 0"><strong>Téléphone :</strong> {payload.phone or '—'}</p>
        <p style="color:#334155;margin:6px 0"><strong>Sujet :</strong> {payload.subject or '—'}</p>
        <p style="color:#334155;margin:16px 0 6px 0"><strong>Message :</strong></p>
        <div style="background:#f8fafc;border-left:3px solid #34B2C8;padding:14px 16px;color:#0f172a;white-space:pre-wrap">{payload.message}</div>
      </td></tr>
      <tr><td style="padding-top:16px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px">
        Envoyé automatiquement depuis le formulaire de contact anticiper.net.
      </td></tr>
    </table>
    """


@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(payload: ContactCreate):
    submission_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc)

    doc = {
        "id": submission_id,
        "name": payload.name,
        "company": payload.company,
        "email": payload.email,
        "phone": payload.phone,
        "subject": payload.subject,
        "message": payload.message,
        "locale": payload.locale,
        "created_at": created_at.isoformat(),
        "email_sent": False,
    }

    # Store in Mongo first (non-blocking for user even if email fails)
    await db.contact_submissions.insert_one(doc)

    # Attempt email send (only if Resend configured)
    if RESEND_API_KEY and CONTACT_RECIPIENT_EMAIL:
        try:
            params = {
                "from": SENDER_EMAIL,
                "to": [CONTACT_RECIPIENT_EMAIL],
                "reply_to": payload.email,
                "subject": f"[anticiper.net] {payload.subject or 'Nouveau message'} — {payload.name}",
                "html": _build_contact_email_html(payload),
            }
            await asyncio.to_thread(resend.Emails.send, params)
            await db.contact_submissions.update_one(
                {"id": submission_id}, {"$set": {"email_sent": True}}
            )
        except Exception as e:
            logger.error(f"Resend email failed for {submission_id}: {e}")

    return ContactResponse(id=submission_id, status="received", created_at=created_at)


@api_router.get("/contact", response_model=List[dict])
async def list_contacts(limit: int = 50):
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
