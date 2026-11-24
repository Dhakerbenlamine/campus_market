Read 
Completed with input: {
  "path": "C:\\Users\\USER\\Desktop\\Atelier5\\campusmarket-frontend\\README.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\USER\\Desktop\\Atelier5\\campusmarket-frontend\\package.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\USER\\Desktop\\Atelier5\\backend\\package.json"
}

Voici un texte complet, prêt à coller dans le fichier `README.md` :

```markdown
# CampusMarket

CampusMarket est une application web permettant aux étudiants d'une université de publier, rechercher et consulter des annonces de vente. Les utilisateurs peuvent vendre des livres, du matériel informatique, des vêtements et divers accessoires.

## Technologies utilisées

### Frontend
- Angular 21
- TypeScript
- RxJS
- HTML
- CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS

## Fonctionnalités

- Afficher la liste des annonces
- Rechercher une annonce par titre
- Filtrer les annonces par catégorie
- Ajouter une nouvelle annonce
- Modifier une annonce existante
- Supprimer une annonce
- Consulter les détails d'une annonce
- Valider les informations saisies dans les formulaires

## Structure du projet

```text
Atelier5/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
└── campusmarket-frontend/
    ├── src/
    ├── angular.json
    └── package.json
```

## Prérequis

Avant de lancer le projet, vérifiez que les logiciels suivants sont installés :

- Node.js
- npm
- MongoDB
- Angular CLI

Angular CLI peut être installé avec la commande suivante :

```bash
npm install -g @angular/cli
```

## Installation du backend

Ouvrez un terminal dans le dossier `backend` :

```bash
cd backend
npm install
```

Créez un fichier `.env` dans le dossier `backend` avec les informations suivantes :

```env
PORT=3000
MONGODB_URI=votre_adresse_de_connexion_mongodb
```

Démarrez ensuite le serveur :

```bash
npm start
```

Le backend fonctionne normalement à l'adresse :

```text
http://localhost:3000
```

## Installation du frontend

Ouvrez un autre terminal dans le dossier `campusmarket-frontend` :

```bash
cd campusmarket-frontend
npm install
```

Démarrez l'application Angular :

```bash
npm start
```

Ouvrez ensuite l'application dans le navigateur :

```text
http://localhost:4200
```

## API utilisée

Le frontend communique avec le backend via l'URL suivante :

```text
http://localhost:3000/api/annonces
```

### Opérations disponibles

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/annonces` | Récupère toutes les annonces |
| GET | `/api/annonces/:id` | Récupère une annonce |
| POST | `/api/annonces` | Ajoute une annonce |
| PUT | `/api/annonces/:id` | Modifie une annonce |
| DELETE | `/api/annonces/:id` | Supprime une annonce |

## Compilation du frontend

Pour créer une version optimisée de l'application :

```bash
npm run build
```

Les fichiers générés sont placés dans le dossier `dist`.

## Exécution des tests

Pour exécuter les tests unitaires du frontend :

```bash
npm test
```

## Auteur

Dhaker ben Lamine

## Description du fonctionnement

La page d'accueil charge les annonces depuis l'API. Les annonces peuvent être filtrées selon leur titre ou leur catégorie. Lorsqu'une annonce est ajoutée, modifiée ou supprimée, le frontend contacte automatiquement le backend afin de mettre à jour les données enregistrées dans MongoDB.
```
