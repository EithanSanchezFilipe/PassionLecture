## Liste des routes

### Routes pour les Auteurs

#### POST /author

Crée un nouvel auteur.

**Requête :**

```json
{
  "firstname": "Gaston",
  "lastname": "Leroux"
}
```

**Réponse (201) :**

```json
{
  "id": 1,
  "firstname": "Gaston",
  "lastname": "Leroux"
}
```

#### DELETE /author/{id}

Supprime un auteur par son ID.

**Paramètres :**

* `id` (entier, requis) : L'ID de l'auteur à supprimer.

**Réponse (200) :**

```json
{
  "message": "L'auteur Gaston a bien été supprimé !",
  "deletedauthor": {
  "id": 1,
  "firstname": "Gaston",
  "lastname": "Leroux"
  }
}
```

#### PUT /author/{id}

Met à jour les informations d'un auteur.

**Paramètres :**

* `id` (entier, requis) : L'ID de l'auteur à mettre à jour.

**Requête :**

```json
{
  "firstname": "Gaston",
  "lastname": "Leroux"
}
```

**Réponse (200) :**

```json
{
  "id": 1,
  "firstname": "Gaston",
  "lastname": "Leroux"
}
```

#### GET /author/{id}/books

Trouve les livres d'un auteur par son prénom.

**Paramètres :**

* `firstname` (chaîne, requis) : Le prénom de l'auteur.

**Réponse (200) :**

```json
[
  {
  "id": 1,
  "title": "Le Mystère de la Chambre Jaune",
  "author_firstname": "Gaston",
  "author_lastname": "Leroux"
  }
]
```

### Routes pour les Livres

#### POST /book/add

Crée un nouveau livre.

**Requête :**

```json
{
  "name": "Le Mystère de la Chambre Jaune",
  "author": 1,
  "summary": "Un résumé du livre",
  "editionYear": 1907,
  "pages": 384,
  "category_fk": 1
}
```

**Réponse (201) :**

```json
{
  "message": "Livre créé avec succès"
}
```

#### POST /book/{id}/comments

Ajoute un commentaire à un livre.

**Paramètres :**

* `id` (entier, requis) : L'ID du livre.

**Requête :**

```json
{
  "note": 4,
  "message": "Un commentaire sur le livre"
}
```

**Réponse (200) :**

```json
{
  "message": "Note ajoutée avec succès"
}
```

#### GET /book/{id}/comments

Récupère les commentaires d'un livre.

**Paramètres :**

* `id` (entier, requis) : L'ID du livre.

**Réponse (200) :**

```json
[
  {
  "note": 4,
  "message": "Un commentaire sur le livre"
  }
]
```

#### GET /book

Recherche des livres.

**Paramètres :**

* `name` (chaîne) : Le nom du livre à rechercher.

**Réponse (200) :**

```json
[
  {
  "id": 1,
  "name": "Le Mystère de la Chambre Jaune",
  "author": 1,
  "summary": "Un résumé du livre",
  "editionYear": 1907,
  "pages": 384,
  "category_fk": 1
  }
]
```

#### GET /book/{id}

Récupère les détails d'un livre.

**Paramètres :**

* `id` (entier, requis) : L'ID du livre.

**Réponse (200) :**

```json
{
  "id": 1,
  "name": "Le Mystère de la Chambre Jaune",
  "author": 1,
  "summary": "Un résumé du livre",
  "editionYear": 1907,
  "pages": 384,
  "category_fk": 1
}
```

#### DELETE /book/{id}

Supprime un livre.

**Paramètres :**

* `id` (entier, requis) : L'ID du livre.

**Réponse (200) :**

```json
{
  "message": "Livre supprimé avec succès"
}
```

#### DELETE /book/comments/{id}

Supprime un commentaire d'un livre.

**Paramètres :**

* `id` (entier, requis) : L'ID du commentaire.

**Réponse (200) :**

```json
{
  "message": "Commentaire supprimé avec succès"
}
```

#### PUT /book/{id}

Met à jour un livre.

**Paramètres :**

* `id` (entier, requis) : L'ID du livre.

**Requête :**

```json
{
  "name": "Le Nouveau Mystère de la Chambre Jaune",
  "author": 1,
  "summary": "Un résumé mis à jour",
  "editionYear": 2023,
  "pages": 400,
  "category_fk": 1
}
```

**Réponse (200) :**

```json
{
  "message": "Livre mis à jour avec succès"
}
```

### Routes pour les Catégories

#### POST /category

Crée une nouvelle catégorie.

**Requête :**

```json
{
  "name": "Policier"
}
```

**Réponse (201) :**

```json
{
  "message": "Catégorie créée avec succès"
}
```

#### GET /category/{id}/books

Trouve les livres d'une catégorie.

**Paramètres :**

* `id` (entier, requis) : L'ID de la catégorie.

**Réponse (200) :**

```json
[
  {
  "id": 1,
  "name": "Le Mystère de la Chambre Jaune",
  "author": 1,
  "summary": "Un résumé du livre",
  "editionYear": 1907,
  "pages": 384,
  "category_fk": 1
  }
]
```

#### DELETE /category/{id}

Supprime une catégorie.

**Paramètres :**

* `id` (entier, requis) : L'ID de la catégorie.

**Réponse (200) :**

```json
{
  "message": "Catégorie supprimée avec succès"
}
```

### Routes pour les Éditeurs

#### POST /editor

Crée un nouvel éditeur.

**Requête :**

```json
{
  "name": "Gallimard"
}
```

**Réponse (201) :**

```json
{
  "id": 1,
  "name": "Gallimard"
}
```

#### DELETE /editor/{id}

Supprime un éditeur.

**Paramètres :**

* `id` (entier, requis) : L'ID de l'éditeur.

**Réponse (200) :**

```json
{
  "message": "L'éditeur Gallimard a bien été supprimé !",
  "deletededitor": {
  "id": 1,
  "name": "Gallimard"
  }
}
```

#### PUT /editor/{id}

Met à jour un éditeur.

**Paramètres :**

* `id` (entier, requis) : L'ID de l'éditeur.

**Requête :**

```json
{
  "name": "Éditions Gallimard"
}
```

**Réponse (200) :**

```json
{
  "id": 1,
  "name": "Éditions Gallimard"
}
```

### Routes pour la Recherche

#### GET /search

Effectue une recherche.

**Requête :**

```json
{
  "name": "Gaston"
}
```

**Réponse (200)**

```json
[
  {
  "id": 1,
  "name": "Le Mystère de la Chambre Jaune",
  "author": 1,
  "summary": "Un résumé du livre",
  "editionYear": 1907,
  "pages": 384,
  "category_fk": 1
  },
    {
  "id": 2,
  "name": "Le parfum",
  "author": 2,
  "summary": "Un résumé du livre",
  "editionYear": 1985,
  "pages": 250,
  "category_fk": 1
  }
]
