# Anticiper.app — Contact micro-service

Service FastAPI minimal dédié au **formulaire de contact** de `anticiper.app`.

## Pourquoi ce service existe

Le backend principal de `anticiper.app` est hébergé sur `game.anticiper.app` (autre serveur OVH, suspendu la plupart du temps pour économiser). Sans ce micro-service, le formulaire de contact tombe avec le gros serveur.

Ce micro-service tourne en permanence sur le **VPS principal** (51.38.38.206) qui héberge aussi `anticiper.net`.

## Architecture

```
anticiper.app/contact (page React)
        │
        ▼ POST /api/contact
anticiper.app (Nginx, vhost /etc/nginx/sites-enabled/anticiper.app)
        │
        ▼ proxy_pass 127.0.0.1:8201
anticiper-app-backend.service (systemd)
        │
        ├──► MongoDB (db: anticiper_app, collection: contact_requests)
        └──► Resend API ──► thibaut.milewski@anticiper.net
                            (from: Anticiper App <noreply@anticiper.net>
                             reply-to: email du visiteur)
```

## Fichiers sur le VPS

| Chemin | Contenu |
|---|---|
| `/opt/anticiper-app-backend/server.py` | Code FastAPI |
| `/opt/anticiper-app-backend/requirements.txt` | Dépendances Python |
| `/opt/anticiper-app-backend/venv/` | Virtualenv |
| `/opt/anticiper-app-backend/.env` | Variables (clé Resend, etc.) |
| `/etc/systemd/system/anticiper-app-backend.service` | Service systemd |

## Variables d'environnement

```
MONGO_URL=mongodb://localhost:27017
DB_NAME=anticiper_app
CORS_ORIGINS=https://anticiper.app,https://www.anticiper.app
RESEND_API_KEY=re_***
SENDER_EMAIL=Anticiper App <noreply@anticiper.net>
CONTACT_RECIPIENT_EMAIL=thibaut.milewski@anticiper.net
```

## Endpoints

- `GET /api/health` → `{"status":"ok"}`
- `POST /api/contact` → enregistre + envoie email via Resend

## Maintenance

```bash
# Statut
sudo systemctl status anticiper-app-backend

# Redémarrer
sudo systemctl restart anticiper-app-backend

# Logs en direct
sudo journalctl -u anticiper-app-backend -f

# Voir les messages reçus
mongosh anticiper_app --eval "db.contact_requests.find().sort({created_at:-1}).limit(5).pretty()"
```
