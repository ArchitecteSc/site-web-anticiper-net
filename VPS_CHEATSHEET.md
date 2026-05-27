# 🚀 Cheat Sheet — anticiper.net VPS

Ce document est votre **aide-mémoire de référence** pour gérer le site en production. Gardez-le toujours sous la main.

---

## 📍 Chemins sur le VPS (51.38.38.206)

| Quoi | Où |
|---|---|
| **Clone Git** (source) | `/opt/anticiper-net-repo/` |
| **Backend FastAPI** (déployé) | `/opt/anticiper-net-backend/` |
| **Frontend build** (servi par Nginx) | `/var/www/anticiper.net/` |
| **Config Nginx** | `/etc/nginx/sites-enabled/anticiper.net` |
| **Logs Nginx** | `/var/log/nginx/anticiper.net.{access,error}.log` |
| **Service backend (systemd)** | `anticiper-net-backend` |
| **Base MongoDB** | locale, db = `anticiper_net` |

---

## 🔄 Mettre à jour le site (depuis une modif Emergent)

**Étape 1** : Sur Emergent, cliquez **"Save to Github"** pour pusher les modifs.

**Étape 2** : Sur le VPS, lancez :

```bash
sudo /opt/anticiper-net-repo/update.sh
```

Le script `update.sh` gère tout automatiquement :
- Pull GitHub
- Détecte si frontend/backend a changé
- Rebuild + déploie ce qui doit l'être
- Redémarre le backend si nécessaire

---

## 🛠️ Commandes manuelles utiles

### Pull manuel + rebuild frontend
```bash
cd /opt/anticiper-net-repo
git pull
cd frontend
yarn install --frozen-lockfile
yarn build
sudo rsync -av --delete build/ /var/www/anticiper.net/
```

### Redémarrer le backend
```bash
sudo systemctl restart anticiper-net-backend
sudo systemctl status anticiper-net-backend --no-pager
```

### Voir les logs backend en direct
```bash
sudo journalctl -u anticiper-net-backend -f
```

### Voir les erreurs Nginx
```bash
sudo tail -f /var/log/nginx/anticiper.net.error.log
```

### Tester un renouvellement SSL (dry run)
```bash
sudo certbot renew --dry-run
```

### Vérifier les contacts reçus dans MongoDB
```bash
mongosh anticiper_net --eval "db.contact_messages.find().sort({created_at:-1}).limit(5).pretty()"
```

---

## 🌐 DNS (chez Mailo)

| Type | Nom | Valeur | Rôle |
|---|---|---|---|
| MX | `@` | mx-domain.mailo.com. (10) | Messagerie Mailo |
| TXT | `@` | v=spf1 a include:mailo.com -all | SPF Mailo |
| TXT | `_dmarc` | v=DMARC1; p=quarantine | DMARC |
| TXT | `mailo._domainkey` | DKIM Mailo | Auth Mailo |
| A | `@` | 51.38.38.206 | Site web |
| A | `www` | 51.38.38.206 | Site web |
| TXT | `resend._domainkey` | DKIM Resend | Emails formulaire |
| MX | `send` | feedback-smtp.eu-west-1.amazonses.com. (10) | Bounces Resend |
| TXT | `send` | v=spf1 include:amazonses.com ~all | SPF Resend |

⚠️ **NE JAMAIS toucher** aux 4 premiers (Mailo) — risque de casser la messagerie.

---

## 🔑 Variables d'environnement backend

Fichier : `/opt/anticiper-net-backend/.env`

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=anticiper_net
CORS_ORIGINS=https://anticiper.net,https://www.anticiper.net
RESEND_API_KEY=re_CjfmSc8X...        # Resend "anticiper.net" key
SENDER_EMAIL=Anticiper <noreply@anticiper.net>
CONTACT_RECIPIENT_EMAIL=thibaut.milewski@anticiper.net
```

---

## 🆘 Si quelque chose ne marche plus

1. **Vérifier le statut des services**
   ```bash
   sudo systemctl status anticiper-net-backend nginx
   ```

2. **Tester le site en local**
   ```bash
   curl -I https://anticiper.net
   curl -I https://anticiper.net/api/health   # si endpoint dispo
   ```

3. **Vérifier les DNS**
   ```bash
   dig @8.8.8.8 +short anticiper.net
   # → doit retourner 51.38.38.206
   ```

4. **Vérifier le certificat SSL**
   ```bash
   sudo certbot certificates
   ```

5. **Rollback en cas de mauvais déploiement**
   ```bash
   cd /opt/anticiper-net-repo
   git log --oneline -5         # voir les derniers commits
   git checkout <commit-id>     # revenir à un commit précis
   cd frontend && yarn build
   sudo rsync -av --delete build/ /var/www/anticiper.net/
   ```

---

## 📦 Repos GitHub liés

- **Repo source** : https://github.com/ArchitecteSc/site-web-anticiper-net
- **Branche prod** : `main`

---

## 🎯 Mémo : workflow standard de mise à jour

```
┌────────────────────┐                  ┌────────────────────┐
│  Emergent (build)  │  ─── push ──────►│   GitHub           │
└────────────────────┘                  │  site-web-...      │
                                        └────────┬───────────┘
                                                 │
                                          sudo update.sh
                                                 │
                                                 ▼
                                        ┌────────────────────┐
                                        │   VPS OVH          │
                                        │ anticiper.net LIVE │
                                        └────────────────────┘
```

**1 commande sur le VPS pour tout faire** : `sudo /opt/anticiper-net-repo/update.sh`
