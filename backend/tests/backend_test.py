"""Backend API tests for anticiper.net vitrine site."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fall back to reading frontend/.env since REACT_APP_BACKEND_URL is there
    env_path = "/app/frontend/.env"
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as fh:
            for line in fh:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().strip('"').rstrip("/")
                    break

assert BASE_URL, "REACT_APP_BACKEND_URL must be set"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root/health endpoints ----------
class TestRootAndHealth:
    def test_root(self, client):
        r = client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("service") == "anticiper.net"
        assert data.get("status") == "ok"

    def test_health(self, client):
        r = client.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "healthy"
        assert data.get("db") == "connected"


# ---------- Contact submission ----------
class TestContact:
    def test_create_contact_valid(self, client):
        unique = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"{unique} Jean Dupont",
            "company": "Test Corp",
            "email": f"{unique.lower()}@example.com",
            "phone": "+33123456789",
            "subject": "Demande de renseignements",
            "message": "Bonjour, ceci est un message de test automatisé.",
            "locale": "fr",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, f"Got {r.status_code}: {r.text}"
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["status"] == "received"
        assert "created_at" in data

        # Verify persistence via list endpoint
        r2 = client.get(f"{BASE_URL}/api/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        # _id should not be leaked
        for item in items:
            assert "_id" not in item
        matched = [x for x in items if x.get("id") == data["id"]]
        assert len(matched) == 1, "Submitted record not found in list"
        stored = matched[0]
        assert stored["name"] == payload["name"]
        assert stored["email"] == payload["email"]
        assert stored["company"] == payload["company"]
        assert stored["locale"] == "fr"
        assert stored["email_sent"] is False  # RESEND_API_KEY is empty

    def test_create_contact_minimal_required(self, client):
        unique = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"{unique} Minimal",
            "email": f"{unique.lower()}@example.com",
            "message": "Minimum payload",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        assert r.json()["status"] == "received"

    def test_create_contact_invalid_email(self, client):
        payload = {
            "name": "TEST Invalid Email",
            "email": "not-an-email",
            "message": "Should fail validation",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_name(self, client):
        payload = {
            "email": "test@example.com",
            "message": "Missing name",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_empty_name(self, client):
        payload = {
            "name": "",
            "email": "test@example.com",
            "message": "Empty name",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_works_without_resend(self, client):
        """RESEND_API_KEY is empty in .env — endpoint must still succeed."""
        unique = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"{unique} NoResend",
            "email": f"{unique.lower()}@example.com",
            "message": "Should succeed without Resend configured.",
            "locale": "en",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        body = r.json()
        assert body["status"] == "received"

    def test_list_contacts_no_objectid_leak(self, client):
        r = client.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        for it in items:
            assert "_id" not in it
