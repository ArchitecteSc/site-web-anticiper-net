# PRD - Site Vitrine anticiper.net

## Original Problem Statement
Site vitrine pour le cabinet de conseil Anticiper, hébergé sur OVH VPS aux côtés de l'app existante `anticiper.app`, en projet totalement indépendant (codebase, repo, routing). React frontend + FastAPI backend (formulaire de contact). Doit hériter de l'identité visuelle d'`anticiper.app` (cyan/slate, fonts Manrope/Outfit/JetBrains) avec un layout propre. Bilingue FR/EN. Déploiement VPS sans casser l'app existante ni la messagerie mailo.com.

## Status: ✅ PRODUCTION DEPLOYED (27/05/2026)

## Architecture
- **Frontend**: React 18 + Tailwind + Framer Motion + Lucide-react + custom i18n.js
- **Backend**: FastAPI + Motor (async MongoDB) + Pydantic + Resend API
- **DB**: MongoDB (locale sur VPS) - collection `contact_messages`
- **Hosting**: OVH VPS Ubuntu 25.04 (IP: 51.38.38.206)
- **Reverse proxy**: Nginx + Certbot Let's Encrypt SSL
- **Email**: Resend (eu-west-1) - domaine vérifié `anticiper.net`

## Stack technique
- `fastapi==0.115.6`, `pydantic[email]==2.10.4`, `motor==3.6.0` (compat Python 3.13)
- Frontend buildé statique servi par Nginx, backend FastAPI sur 127.0.0.1:8101 (proxy /api/)

## Pages livrées
- Accueil (Hero "Anticiper les signaux, sécuriser vos décisions" + citation fondateur)
- Qui sommes-nous (équipe de 6 - photos B&W filter)
- Appui opérationnel
- Formation
- Contact (formulaire fonctionnel → Resend → thibaut.milewski@anticiper.net)
- Mentions légales / Politique de confidentialité

## DNS finaux (chez Mailo)
- `@` MX mx-domain.mailo.com (10) — messagerie Mailo
- `@` TXT v=spf1 a include:mailo.com -all
- `_dmarc` TXT v=DMARC1; p=quarantine
- `mailo._domainkey` TXT (DKIM Mailo)
- `@` A 51.38.38.206 (site)
- `www` A 51.38.38.206 (site)
- `resend._domainkey` TXT (DKIM Resend) — Verified ✅
- `send` MX feedback-smtp.eu-west-1.amazonses.com. (10) — bounces Resend
- `send` TXT v=spf1 include:amazonses.com ~all — SPF Resend

## Variables environnement VPS (`/opt/anticiper-net-backend/.env`)
- MONGO_URL=mongodb://localhost:27017
- DB_NAME=anticiper_net
- CORS_ORIGINS=https://anticiper.net,https://www.anticiper.net
- RESEND_API_KEY=re_CjfmSc8X... (clé "Full access" sur Resend nommée `anticiper.net`)
- SENDER_EMAIL=Anticiper <noreply@anticiper.net>
- CONTACT_RECIPIENT_EMAIL=thibaut.milewski@anticiper.net

## Endpoints API
- POST /api/contact (saves to Mongo + sends via Resend)

## Infrastructure VPS
- Backend systemd: `anticiper-net-backend.service` (port 8101)
- Nginx vhost: `/etc/nginx/sites-enabled/anticiper.net`
  - HTTP → 301 HTTPS
  - HTTPS SSL Let's Encrypt (renouvellement auto)
  - HSTS: max-age=31536000; includeSubDomains
- SSL valid until 24/08/2026 (auto-renew configured)
- Frontend build dans `/var/www/anticiper.net`

## ✅ Implemented (27/05/2026)
- Site React SPA complet avec i18n FR/EN
- Backend FastAPI + MongoDB + Resend
- Déploiement VPS OVH avec Nginx + SSL Let's Encrypt + HSTS
- Domaine Resend vérifié (DKIM + SPF)
- Formulaire contact opérationnel
- Push GitHub (repo public)
- Documentation déploiement `/app/DEPLOYMENT_VPS.md`

## P1 - Optionnel / À faire si demandé
- Backup automatique MongoDB (cron mongodump)
- Sitemap.xml + robots.txt pour SEO
- Page 404 personnalisée
- Lazy-loading images équipe (6-8MB par photo, lourd pour le mobile)
- Webhooks Resend (tracking bounces/spam)
- Analytics Plausible (RGPD-friendly)

## P2 - Backlog
- Blog/Actualités
- Newsletter
- Page Études de cas
- Notifications Slack/SMS sur nouveau message

## Notes critiques
- VPS héberge AUSSI `anticiper.app` (business critical) → ne jamais toucher `/var/www/anticiper.app`
- Messagerie Mailo critique → ne jamais toucher MX `@` / TXT SPF `@` / DMARC / DKIM Mailo
- Repo GitHub public (push effectué)
