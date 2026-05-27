#!/bin/bash
#
# install.sh — Installation du micro-service "contact" pour anticiper.app
#
# Usage : sudo bash install.sh
#
# Pré-requis :
#   - Avoir poussé ces fichiers via git pull dans /opt/anticiper-net-repo
#   - Avoir une clé Resend prête à coller
#
# Ce script crée tout (venv, .env, systemd, mais PAS la config Nginx — manuel).

set -e

BACKEND_DIR="/opt/anticiper-app-backend"
SRC_DIR="/opt/anticiper-net-repo/_anticiper_app_contact_microservice"
SERVICE_NAME="anticiper-app-backend"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Ce script doit être lancé en sudo / root.${NC}"
  exit 1
fi

echo -e "${GREEN}=== [1/6] Création du dossier $BACKEND_DIR ===${NC}"
mkdir -p "$BACKEND_DIR"
cp "$SRC_DIR/server.py" "$BACKEND_DIR/server.py"
cp "$SRC_DIR/requirements.txt" "$BACKEND_DIR/requirements.txt"

if [ ! -f "$BACKEND_DIR/.env" ]; then
  cat > "$BACKEND_DIR/.env" << 'EOF'
MONGO_URL=mongodb://localhost:27017
DB_NAME=anticiper_app
CORS_ORIGINS=https://anticiper.app,https://www.anticiper.app
RESEND_API_KEY=re_REMPLACER_PAR_VRAIE_CLE
SENDER_EMAIL=Anticiper App <noreply@anticiper.net>
CONTACT_RECIPIENT_EMAIL=thibaut.milewski@anticiper.net
EOF
  echo -e "${YELLOW}⚠️  .env créé — il faut coller la vraie clé Resend avant le démarrage !${NC}"
else
  echo "  .env déjà présent, conservé."
fi

chown -R www-data:www-data "$BACKEND_DIR"
chmod 600 "$BACKEND_DIR/.env"

echo -e "${GREEN}=== [2/6] Vérification de Python3 + venv ===${NC}"
apt-get install -y python3-venv python3-pip > /dev/null 2>&1 || true

echo -e "${GREEN}=== [3/6] Création du virtualenv ===${NC}"
if [ ! -d "$BACKEND_DIR/venv" ]; then
  python3 -m venv "$BACKEND_DIR/venv"
fi

echo -e "${GREEN}=== [4/6] Installation des dépendances Python ===${NC}"
"$BACKEND_DIR/venv/bin/pip" install --upgrade pip > /dev/null
"$BACKEND_DIR/venv/bin/pip" install -r "$BACKEND_DIR/requirements.txt"

chown -R www-data:www-data "$BACKEND_DIR"

echo -e "${GREEN}=== [5/6] Installation du service systemd ===${NC}"
cp "$SRC_DIR/anticiper-app-backend.service" "/etc/systemd/system/${SERVICE_NAME}.service"
systemctl daemon-reload
systemctl enable "${SERVICE_NAME}.service" > /dev/null

echo -e "${GREEN}=== [6/6] Démarrage du service ===${NC}"
if grep -q "REMPLACER_PAR_VRAIE_CLE" "$BACKEND_DIR/.env"; then
  echo -e "${YELLOW}⚠️  .env contient encore la clé placeholder.${NC}"
  echo -e "${YELLOW}    Éditez $BACKEND_DIR/.env avec votre vraie clé Resend, puis lancez :${NC}"
  echo -e "${YELLOW}    sudo systemctl start ${SERVICE_NAME}${NC}"
else
  systemctl restart "${SERVICE_NAME}.service"
  sleep 2
  if systemctl is-active --quiet "${SERVICE_NAME}.service"; then
    echo -e "${GREEN}✅ Service démarré.${NC}"
  else
    echo -e "${RED}❌ Service en erreur. Logs : sudo journalctl -u ${SERVICE_NAME} -n 30${NC}"
  fi
fi

echo ""
echo -e "${GREEN}=== Test ===${NC}"
curl -s http://127.0.0.1:8201/api/health || echo -e "${YELLOW}Pas de réponse (peut être normal si .env pas configuré).${NC}"

echo ""
echo ""
echo -e "${GREEN}✅ Installation terminée.${NC}"
echo ""
echo "Étapes suivantes :"
echo "  1. Éditer /opt/anticiper-app-backend/.env (clé Resend)"
echo "  2. sudo systemctl restart $SERVICE_NAME"
echo "  3. Ajouter un bloc location /api/ dans /etc/nginx/sites-enabled/anticiper.app"
echo "     (proxy_pass http://127.0.0.1:8201;)"
echo "  4. sudo nginx -t && sudo systemctl reload nginx"
echo "  5. Modifier REACT_APP_BACKEND_URL côté frontend anticiper.app -> https://anticiper.app"
