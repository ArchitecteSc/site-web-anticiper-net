#!/bin/bash
#
# update.sh — Met à jour le site anticiper.net en production
#
# Usage: sudo /opt/anticiper-net-repo/update.sh
#
# Cette commande :
#   1. Pull les dernières modifications depuis GitHub
#   2. Rebuild le frontend React (si modifié)
#   3. Déploie le build vers Nginx (/var/www/anticiper.net/)
#   4. Redémarre le backend FastAPI (si modifié)
#
# Pré-requis : être dans le clone /opt/anticiper-net-repo
#

set -e  # arrête immédiatement si une commande échoue

REPO_DIR="/opt/anticiper-net-repo"
FRONTEND_DIR="$REPO_DIR/frontend"
BACKEND_DIR="/opt/anticiper-net-backend"
NGINX_ROOT="/var/www/anticiper.net"
BACKEND_SERVICE="anticiper-net-backend"

# Couleurs pour la lisibilité
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== [1/5] Pull des modifications depuis GitHub ===${NC}"
cd "$REPO_DIR"
BEFORE=$(git rev-parse HEAD)
git pull --rebase
AFTER=$(git rev-parse HEAD)

if [ "$BEFORE" == "$AFTER" ]; then
  echo -e "${YELLOW}Rien à mettre à jour, déjà à jour.${NC}"
  exit 0
fi

# Détecter quels dossiers ont changé
CHANGED=$(git diff --name-only "$BEFORE" "$AFTER")
FRONTEND_CHANGED=$(echo "$CHANGED" | grep -c '^frontend/' || true)
BACKEND_CHANGED=$(echo "$CHANGED" | grep -c '^backend/' || true)

# --- Frontend ---
if [ "$FRONTEND_CHANGED" -gt 0 ]; then
  echo -e "${GREEN}=== [2/5] Modifications frontend détectées ($FRONTEND_CHANGED fichiers) ===${NC}"

  echo -e "${GREEN}=== [3/5] yarn install + build ===${NC}"
  cd "$FRONTEND_DIR"
  yarn install --frozen-lockfile
  yarn build

  echo -e "${GREEN}=== [4/5] Déploiement du build vers Nginx ===${NC}"
  rsync -av --delete "$FRONTEND_DIR/build/" "$NGINX_ROOT/"
else
  echo -e "${YELLOW}=== [2-4/5] Aucune modification frontend. Build skip. ===${NC}"
fi

# --- Backend ---
if [ "$BACKEND_CHANGED" -gt 0 ]; then
  echo -e "${GREEN}=== [5/5] Modifications backend détectées. Sync + redémarrage ===${NC}"
  rsync -av --delete --exclude='.env' --exclude='__pycache__' --exclude='venv' \
        "$REPO_DIR/backend/" "$BACKEND_DIR/"
  systemctl restart "$BACKEND_SERVICE"
  echo -e "${GREEN}Backend redémarré.${NC}"
else
  echo -e "${YELLOW}=== [5/5] Aucune modification backend. Restart skip. ===${NC}"
fi

echo ""
echo -e "${GREEN}✅ Mise à jour terminée avec succès !${NC}"
echo "   Site : https://anticiper.net"
echo ""
