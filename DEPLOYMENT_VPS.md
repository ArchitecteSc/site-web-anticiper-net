# Déploiement VPS — anticiper.net

Procédure complète pour déployer ce site sur votre VPS OVH **à côté** d'anticiper.app, sans interférer avec l'installation existante.

---

## 1. Pré-requis VPS

- Ubuntu + Nginx + Certbot déjà installés (votre cas)
- Node.js 18+ et Yarn installés
- Python 3.10+ et pip (si vous déployez aussi le backend FastAPI)
- DNS : `anticiper.net` et `www.anticiper.net` → IP du VPS

---

## 2. Structure des dossiers (isolation stricte)

```
/var/www/anticiper.net/                # build React (statique)
/opt/anticiper-net-backend/            # backend FastAPI (si utilisé)
/opt/anticiper-net-repo/               # clone du repo GitHub
/etc/nginx/sites-available/anticiper.net
/etc/nginx/sites-enabled/anticiper.net  (symlink)
```

Le site anticiper.app reste intouché.

---

## 3. Clone du repo

```bash
sudo mkdir -p /opt/anticiper-net-repo
sudo chown $USER:$USER /opt/anticiper-net-repo
cd /opt/anticiper-net-repo
git clone https://github.com/<votre-user>/<votre-repo>.git .
```

---

## 4. Backend FastAPI (contact form) — optionnel

Si vous voulez utiliser le formulaire de contact avec email + MongoDB :

```bash
sudo mkdir -p /opt/anticiper-net-backend
sudo cp -r /opt/anticiper-net-repo/backend/* /opt/anticiper-net-backend/
cd /opt/anticiper-net-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Créer `/opt/anticiper-net-backend/.env` :

```
MONGO_URL=mongodb://localhost:27017
DB_NAME=anticiper_net
CORS_ORIGINS=https://anticiper.net,https://www.anticiper.net
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
SENDER_EMAIL=contact@anticiper.net
CONTACT_RECIPIENT_EMAIL=thierry@anticiper.net
```

Créer un service systemd `/etc/systemd/system/anticiper-net-backend.service` :

```ini
[Unit]
Description=Anticiper.net FastAPI backend
After=network.target mongod.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/anticiper-net-backend
Environment="PATH=/opt/anticiper-net-backend/venv/bin"
ExecStart=/opt/anticiper-net-backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8101
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Activer :

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now anticiper-net-backend
sudo systemctl status anticiper-net-backend
```

> **Note** : port `8101` choisi pour ne pas entrer en conflit avec un éventuel backend d'anticiper.app.

---

## 5. Build du frontend

Avant le premier build, éditer `/opt/anticiper-net-repo/frontend/.env.production` :

```
REACT_APP_BACKEND_URL=https://anticiper.net
WDS_SOCKET_PORT=443
```

Puis :

```bash
cd /opt/anticiper-net-repo/frontend
yarn install --frozen-lockfile
yarn build
sudo rm -rf /var/www/anticiper.net
sudo mkdir -p /var/www/anticiper.net
sudo cp -r build/* /var/www/anticiper.net/
sudo chown -R www-data:www-data /var/www/anticiper.net
```

---

## 6. Configuration Nginx

Créer `/etc/nginx/sites-available/anticiper.net` :

```nginx
# Redirection www → apex
server {
    listen 80;
    listen [::]:80;
    server_name www.anticiper.net;
    return 301 https://anticiper.net$request_uri;
}

# HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name anticiper.net;

    # Let's Encrypt challenge
    location /.well-known/acme-challenge/ { root /var/www/certbot; }

    location / { return 301 https://$host$request_uri; }
}

# HTTPS principal
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name anticiper.net;

    ssl_certificate     /etc/letsencrypt/live/anticiper.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/anticiper.net/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/anticiper.net;
    index index.html;

    # --- Sécurité & perf ---
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript application/xml+rss text/xml application/xml image/svg+xml;

    # --- /api → backend FastAPI (si utilisé) ---
    location /api/ {
        proxy_pass http://127.0.0.1:8101;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }

    # --- Assets immutables (hash CRA dans /static/) ---
    location ~* ^/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable, max-age=31536000";
        try_files $uri =404;
    }

    # --- Fichiers binaires divers ---
    location ~* \.(?:png|jpg|jpeg|gif|ico|webp|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        try_files $uri =404;
    }

    # --- index.html : aucun cache pour que les nouveaux builds prennent effet ---
    location = /index.html {
        add_header Cache-Control "no-store, no-cache, must-revalidate" always;
        add_header Pragma "no-cache" always;
        expires 0;
    }

    # --- SPA fallback ---
    location / {
        try_files $uri $uri/ /index.html;
    }

    access_log /var/log/nginx/anticiper.net.access.log;
    error_log  /var/log/nginx/anticiper.net.error.log;
}
```

Activer :

```bash
sudo ln -s /etc/nginx/sites-available/anticiper.net /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. Certificat SSL Let's Encrypt

```bash
sudo certbot --nginx -d anticiper.net -d www.anticiper.net --redirect --agree-tos -m admin@anticiper.net
```

Certbot ajoutera automatiquement les blocs SSL et la redirection HTTP → HTTPS.

---

## 8. Script de déploiement `deploy-anticiper-net.sh`

Créer `/opt/anticiper-net-repo/deploy-anticiper-net.sh` :

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/opt/anticiper-net-repo"
BUILD_DIR="$REPO_DIR/frontend/build"
WEB_DIR="/var/www/anticiper.net"
BACKEND_DIR="/opt/anticiper-net-backend"

echo ">>> [1/6] Pull latest commits"
cd "$REPO_DIR"
git fetch origin
git reset --hard origin/main

echo ">>> [2/6] Sync backend (optional)"
if [ -d "$BACKEND_DIR" ]; then
  sudo rsync -a --delete \
    --exclude 'venv' --exclude '.env' --exclude '__pycache__' \
    "$REPO_DIR/backend/" "$BACKEND_DIR/"
  sudo -u www-data "$BACKEND_DIR/venv/bin/pip" install -q -r "$BACKEND_DIR/requirements.txt"
fi

echo ">>> [3/6] Build frontend"
cd "$REPO_DIR/frontend"
yarn install --frozen-lockfile
yarn build

echo ">>> [4/6] Publish build → $WEB_DIR"
sudo rm -rf "${WEB_DIR:?}/"*
sudo cp -r "$BUILD_DIR"/* "$WEB_DIR/"
sudo chown -R www-data:www-data "$WEB_DIR"

echo ">>> [5/6] Restart backend (if exists)"
if systemctl list-unit-files | grep -q anticiper-net-backend.service; then
  sudo systemctl restart anticiper-net-backend
fi

echo ">>> [6/6] Reload Nginx (graceful)"
sudo nginx -t && sudo systemctl reload nginx

echo ">>> Done ✔  https://anticiper.net"
```

Rendre exécutable :

```bash
chmod +x /opt/anticiper-net-repo/deploy-anticiper-net.sh
```

Ce script **ne touche jamais** à `/var/www/anticiper.app/` ni au service backend d'anticiper.app.

---

## 9. Meta Open Graph — image 1200×630

Créer votre visuel (logo + baseline) au format **PNG, 1200×630, <300 Ko**, et placer le fichier dans `frontend/public/og-image.jpg`.

`public/index.html` pointe déjà vers `https://anticiper.net/og-image.jpg`.

Test de partage : <https://www.linkedin.com/post-inspector/> et <https://developers.facebook.com/tools/debug/>.

---

## 10. Vérifications post-déploiement

```bash
# HTML pas caché
curl -I https://anticiper.net/ | grep -i cache
# → Cache-Control: no-store, no-cache, must-revalidate

# Assets JS avec long cache
curl -I https://anticiper.net/static/js/main.<hash>.js | grep -i cache
# → Cache-Control: public, immutable, max-age=31536000

# SPA fallback
curl -I https://anticiper.net/qui-sommes-nous
# → 200 OK (pas de 404)

# API
curl https://anticiper.net/api/
# → {"service":"anticiper.net","status":"ok"}
```

---

## 11. Clés d'API à fournir (si backend utilisé)

| Clé | Où l'obtenir | Notes |
|---|---|---|
| `RESEND_API_KEY` | https://resend.com → API Keys | Starts with `re_…` |
| `SENDER_EMAIL` | Domaine vérifié dans Resend | ex: `contact@anticiper.net` après vérif DNS |
| `CONTACT_RECIPIENT_EMAIL` | Votre boîte pro | Les demandes tombent là |

> Tant que `RESEND_API_KEY` est vide, le formulaire stocke quand même les messages en base MongoDB (consultables via `/api/contact`).

---

## 12. Rollback rapide

```bash
cd /opt/anticiper-net-repo
git log --oneline | head -10
git reset --hard <commit-sha>
./deploy-anticiper-net.sh
```
