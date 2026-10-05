# Nantes Actu

Journal en ligne de Nantes et de sa métropole, dans l'esprit des grands quotidiens nationaux, aux couleurs orange de Nantes.

- **Next.js 15** (App Router, React 19) avec typographie Newsreader / Inter
- **Connexion Google obligatoire** sur tout le site (Auth.js v5), puis **formulaire d'inscription** (prénom, nom, téléphone facultatif)
- **Articles partageables** : chaque article a un lien avec son identifiant en fin d'URL (`/article/<slug>_<id>`). Un visiteur non connecté qui ouvre ce lien voit le début de l'article et une fenêtre bloquante l'invite à s'inscrire avec Google ; il revient ensuite sur l'article
- **Photos** libres de droits issues de Wikimedia Commons (crédits affichés sous chaque photo)
- **Base SQLite** qui enregistre chaque membre et chaque connexion
- **Espace `/admin`** protégé par mot de passe : fiches des membres (prénom, nom, e-mail vérifié ou non, téléphone, langue, inscription complète ou non, dernière IP, appareil, dates) et historique des connexions

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

## Parcours d'un visiteur

1. Il arrive sur une page (ou sur un lien d'article partagé). Sans compte, une fenêtre l'invite à s'inscrire avec Google.
2. Après Google, s'il n'a jamais rempli sa fiche, il est envoyé sur `/inscription` (prénom et nom obligatoires, téléphone facultatif).
3. Il est ensuite ramené sur la page demandée. Les visites suivantes sont directes.

## Structure

```
app/
  page.tsx                 La une
  article/[slug]/          Page article
  rubrique/[slug]/         Page rubrique
  login/                   Connexion Google
  inscription/             Formulaire prénom / nom / téléphone après Google
  admin/                   Tableau de bord protégé par mot de passe
  api/auth/[...nextauth]/  Routes Auth.js
auth.ts / auth.config.ts   Configuration Auth.js (Google + enregistrement des connexions)
middleware.ts              Protection de toutes les pages
lib/db.ts                  SQLite (membres, connexions)
lib/articles.ts            Contenu éditorial
components/                Logo, en-tête, pied de page, cartes
```

La base est créée automatiquement dans `data/nantes-actu.db` au premier lancement.

## Déploiement sur Railway

Le dépôt contient un `railway.json` (build Nixpacks, démarrage `npm start`, healthcheck sur `/login`).

1. Sur [railway.app](https://railway.app) : **New Project → Deploy from GitHub repo** → `lumis-droid/nantes-actu`.
2. Dans le service, onglet **Variables**, ajouter :

   | Variable | Valeur |
   | --- | --- |
   | `AUTH_SECRET` | une clé longue (`openssl rand -base64 32`) |
   | `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | identifiants OAuth Google |
   | `ADMIN_PASSWORD` | mot de passe de `/admin` |
   | `AUTH_TRUST_HOST` | `true` |
   | `DATA_DIR` | `/data` |

3. Onglet **Settings → Volumes** : ajouter un volume monté sur `/data` (sinon la base des membres est effacée à chaque déploiement).
4. **Settings → Networking → Generate Domain** pour obtenir l'URL publique (`https://xxx.up.railway.app`).
5. Dans la Google Cloud Console, ajouter cette URL :
   - Origine JavaScript : `https://xxx.up.railway.app`
   - URI de redirection : `https://xxx.up.railway.app/api/auth/callback/google`
6. Redéployer si besoin. Le site est en ligne, l'admin sur `https://xxx.up.railway.app/admin`.

## Production (autre hébergeur)

```bash
npm run build && npm start
```

Pensez à ajouter l'URL publique (`https://votre-domaine/api/auth/callback/google`) dans les URI de redirection Google et à définir des secrets solides.
