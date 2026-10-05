# Nantes Actu

Journal en ligne de Nantes et de sa métropole, dans l'esprit des grands quotidiens nationaux, aux couleurs orange de Nantes.

- **Next.js 15** (App Router, React 19) avec typographie Newsreader / Inter
- **Connexion Google obligatoire** sur tout le site (Auth.js v5)
- **Base SQLite** locale qui enregistre chaque membre et chaque connexion
- **Espace `/admin`** protégé par mot de passe : liste des membres (prénom, nom, e-mail, avatar, dates) et historique des connexions (IP, appareil)

> Les articles sont des contenus fictifs de démonstration.

## Installation

```bash
npm install
cp .env.example .env
```

### 1. Créer les identifiants Google

1. Ouvrir la [Google Cloud Console](https://console.cloud.google.com/apis/credentials) et créer un projet.
2. Configurer l'écran de consentement OAuth (type « Externe », ajouter vos adresses en testeurs).
3. Créer des identifiants **ID client OAuth** de type **Application Web** :
   - Origine JavaScript autorisée : `http://localhost:3000`
   - URI de redirection autorisée : `http://localhost:3000/api/auth/callback/google`
4. Copier l'ID client et le secret dans `.env` (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`).

### 2. Remplir le fichier `.env`

| Variable | Rôle |
| --- | --- |
| `AUTH_SECRET` | Clé de signature des sessions (`npx auth secret` ou `openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Identifiants OAuth Google |
| `ADMIN_PASSWORD` | Mot de passe de la page `/admin` |
| `AUTH_TRUST_HOST` | Laisser à `true` hors Vercel |

### 3. Lancer

```bash
npm run dev
```

Le site est disponible sur <http://localhost:3000>. Toute page redirige vers `/login` tant que l'on n'est pas connecté avec Google. L'espace d'administration est sur <http://localhost:3000/admin>.

## Structure

```
app/
  page.tsx                 La une
  article/[slug]/          Page article
  rubrique/[slug]/         Page rubrique
  login/                   Connexion Google
  admin/                   Tableau de bord protégé par mot de passe
  api/auth/[...nextauth]/  Routes Auth.js
auth.ts / auth.config.ts   Configuration Auth.js (Google + enregistrement des connexions)
middleware.ts              Protection de toutes les pages
lib/db.ts                  SQLite (membres, connexions)
lib/articles.ts            Contenu éditorial
components/                Logo, en-tête, pied de page, cartes
```

La base est créée automatiquement dans `data/nantes-actu.db` au premier lancement.

## Production

```bash
npm run build && npm start
```

Pensez à ajouter l'URL publique (`https://votre-domaine/api/auth/callback/google`) dans les URI de redirection Google et à définir des secrets solides dans `.env`.
