# Anticiper.net — Site vitrine B2B

## Problème original
Créer un nouveau site vitrine `https://anticiper.net` (cabinet de conseil en intelligence économique, formation et recherche), indépendant du projet existant `anticiper.app`, hébergé sur le même VPS OVH mais codebase et déploiement séparés. Design cohérent avec anticiper.app (famille visuelle) mais avec sa propre personnalité. Multilingue FR/EN. Contenu exact de l'actuel anticiper.net. Formulaire de contact.

## Architecture
- **Frontend** : React 19 + CRA, Tailwind, Shadcn, Framer Motion, react-router-dom v7
- **Backend** : FastAPI + Motor (MongoDB async) + Resend (emails transactionnels optionnels)
- **i18n** : provider maison léger (FR/EN) avec persistence localStorage
- **Charte** : Manrope/Outfit/JetBrains Mono, cyan #34B2C8, photos B&W traitées

## Personas
- Entreprises françaises (PME, ETI, grands groupes) cherchant une capacité de veille/IE
- Institutions publiques (recherche, enseignement supérieur) cherchant des formations
- Commanditaires défense/renseignement cherchant simulation & recherche appliquée

## Fait (09/02/2026)
- Setup Tailwind (polices + couleurs charte), reset CSS custom
- Public index.html avec Google Fonts, OG meta, no-store cache
- Backend : POST /api/contact (DB+Resend optionnel), GET /api/contact, /api/, /api/health
- i18n FR/EN complet (800+ lignes de traductions fidèles au contenu de anticiper.net)
- Navbar glass-morphism + burger mobile + toggle FR/EN
- Footer 3 colonnes + lien anticiper.app
- 7 pages : Home (hero asymétrique + 3 piliers + CTA final), Qui sommes-nous (6 membres équipe), Appuis opérationnels, Formation (4 scénarios Puno/Strategis/Secure Trail/Geo-Crisis), Recherche & Technologie, Contact (formulaire complet), Mentions légales
- Photos B&W + accents cyan pour différencier d'anticiper.app
- `/app/DEPLOYMENT_VPS.md` : procédure complète VPS (Nginx vhost, Let's Encrypt, script deploy, systemd backend)
- Tests : 9/9 backend pytest + frontend E2E OK (testing_agent iteration 1)

## Backlog P0/P1/P2
- **P1** : Image og-image.jpg 1200×630 à uploader dans `public/`
- **P1** : Adresse postale & téléphone exacts dans Contact
- **P1** : Adresse email de destination du formulaire (CONTACT_RECIPIENT_EMAIL)
- **P2** : Clé Resend + domaine vérifié pour envoi réel des emails
- **P2** : sitemap.xml + robots.txt
- **P2** : Traduction EN des bios équipe à faire relire
- **P2** : Google Analytics 4 (si souhaité)
- **P3** : Convention LICENSE / README pour le repo GitHub dédié
