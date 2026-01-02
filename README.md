# Projet API RESTful — Collection de jeux vidéo

API d'exemple implémentant une architecture MVC avec Sequelize (SQLite).

Installation

```bash
npm install
```

Lancer en développement (avec `nodemon` si installé) :

```bash
npm run dev
```

Ou lancer normalement :

```bash
npm start
```

Endpoints principaux

- `GET /api/games` : lister les jeux (query params : `page`, `limit`, `title`, `platform`, `genre`)
- `POST /api/games` : créer un jeu (body JSON — `title` requis)
- `GET /api/games/:id` : obtenir un jeu
- `PUT /api/games/:id` : modifier un jeu
- `DELETE /api/games/:id` : supprimer un jeu

Sécurité / clé API

Les routes qui modifient les données (`POST`, `PUT`, `DELETE`) requièrent une clé API dans le header `x-api-key` ou via le paramètre `api_key` en query string.

Par défaut, une clé de développement est fournie: `dev-secret-key`. Pour la changer, exportez la variable d'environnement `API_KEY` avant de lancer le serveur :

```bash
export API_KEY="ma-cle-secrete"
npm start
```

Paramètres de filtrage avancés pour `GET /api/games`:
- `developer`: filtre par développeur exact
- `rating_min`: note minimale
- `rating_max`: note maximale
- `sort`: tri `champ:asc|desc` ex `sort=rating:desc`


Structure du projet

- `models/` : définition Sequelize
- `controllers/` : logique métier
- `routes/` : définition des routes
- `middlewares/` : middlewares personnalisés

Notes

- La base de données utilisée est un fichier SQLite `database.sqlite` créé automatiquement.
- Vous pouvez enrichir la validation, ajouter une authentification, tests, et migrations Sequelize selon vos besoins.
