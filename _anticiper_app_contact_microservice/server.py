"""
Anticiper App — Contact form micro-service.
Standalone FastAPI service that handles ONLY the contact form of anticiper.app.
Independent from the main game backend on game.anticiper.app (which is suspended most of the time).
"""
import os
import asyncio
from datetime import datetime, timezone
from typing import Optional, Any, Dict
from contextlib import asynccontextmanager

import resend
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient


# ---------- Env ----------
RESEND_API_KEY = os.environ["RESEND_API_KEY"]
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "Anticiper App <noreply@anticiper.net>")
CONTACT_RECIPIENT_EMAIL = os.environ["CONTACT_RECIPIENT_EMAIL"]
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ.get("DB_NAME", "anticiper_app")
CORS_ORIGINS = os.environ.get(
    "CORS_ORIGINS",
    "https://anticiper.app,https://www.anticiper.app",
).split(",")

resend.api_key = RESEND_API_KEY

mongo_client: AsyncIOMotorClient | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global mongo_client
    mongo_client = AsyncIOMotorClient(MONGO_URL)
    try:
        yield
    finally:
        mongo_client.close()


app = FastAPI(
    title="Anticiper App — Contact micro-service",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


# ---------- Schema ----------
class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    company: Optional[str] = ""
    phone: Optional[str] = ""
    message: str = Field(min_length=1, max_length=10000)
    quiz_data: Optional[Dict[str, Any]] = None


# ---------- Helpers ----------
def _escape(s: Optional[str]) -> str:
    if not s:
        return ""
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _format_quiz(quiz: Dict[str, Any]) -> str:
    """Render quiz_data as a readable HTML block."""
    try:
        import json
        pretty = json.dumps(quiz, indent=2, ensure_ascii=False)
    except Exception:
        pretty = str(quiz)
    return (
        '<h3 style="margin-top:24px;color:#0A0D11;font-size:15px">Données du quiz</h3>'
        f'<pre style="background:#f5f7f9;padding:12px;border-radius:8px;'
        f'font-size:12px;overflow:auto;white-space:pre-wrap;word-break:break-word">'
        f"{_escape(pretty)}</pre>"
    )


def build_email_html(data: ContactRequest) -> str:
    company_row = (
        f'<tr><td style="padding:6px 0;color:#5b6470">Entreprise</td>'
        f'<td style="padding:6px 0"><strong>{_escape(data.company)}</strong></td></tr>'
        if data.company else ""
    )
    phone_row = (
        f'<tr><td style="padding:6px 0;color:#5b6470">Téléphone</td>'
        f'<td style="padding:6px 0"><strong>{_escape(data.phone)}</strong></td></tr>'
        if data.phone else ""
    )
    quiz_html = _format_quiz(data.quiz_data) if data.quiz_data else ""

    return f"""
    <html>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fafafa;padding:24px;color:#0A0D11;margin:0">
        <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:28px;border:1px solid #e6e8eb">
          <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#34B2C8;margin:0 0 6px">anticiper.app — nouveau contact</p>
          <h2 style="margin:0 0 18px;color:#0A0D11;font-size:22px;font-weight:600">Nouvelle demande</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#5b6470;width:120px">Nom</td><td style="padding:6px 0"><strong>{_escape(data.name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#5b6470">Email</td><td style="padding:6px 0"><strong><a href="mailto:{_escape(data.email)}" style="color:#34B2C8;text-decoration:none">{_escape(data.email)}</a></strong></td></tr>
            {company_row}
            {phone_row}
          </table>
          <h3 style="margin-top:24px;color:#0A0D11;font-size:15px">Message</h3>
          <div style="background:#f5f7f9;padding:14px;border-radius:8px;white-space:pre-wrap;font-size:14px;line-height:1.55">{_escape(data.message)}</div>
          {quiz_html}
          <p style="margin-top:24px;font-size:11px;color:#9aa3ad">Cliquez "Répondre" pour écrire directement à {_escape(data.email)}.</p>
        </div>
      </body>
    </html>
    """


# ---------- Routes ----------
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "anticiper-app-contact", "version": "1.0.0"}


@app.post("/api/contact")
async def submit_contact(payload: ContactRequest):
    db = mongo_client[DB_NAME]
    doc = {
        **payload.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "email_sent": False,
        "source": "anticiper.app",
    }
    inserted = await db.contact_requests.insert_one(doc)

    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [CONTACT_RECIPIENT_EMAIL],
            "reply_to": payload.email,
            "subject": f"[anticiper.app] Nouvelle demande — {payload.name}",
            "html": build_email_html(payload),
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        await db.contact_requests.update_one(
            {"_id": inserted.inserted_id},
            {"$set": {
                "email_sent": True,
                "resend_id": (result or {}).get("id"),
            }},
        )
        return {"ok": True, "stored": True, "email_sent": True}
    except Exception as e:
        await db.contact_requests.update_one(
            {"_id": inserted.inserted_id},
            {"$set": {"email_error": str(e)[:500]}},
        )
        # Message bien stocké, on retourne 200 pour ne pas pénaliser l'utilisateur
        return {"ok": True, "stored": True, "email_sent": False}
