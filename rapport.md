# Introduction

# Analyse
## Rappel de la base de données

### MCD
 [MCD](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/backend/db/MCD.png)
### MLD
[MLD](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/backend/db/MLD.png)

## **Analyse de la Structure du Code**

Le projet est organisé selon une architecture **full-stack** avec une séparation entre le **frontend** et le **backend**

### **1. Organisation Générale**

À la racine du projet, on retrouve :

* **backend/** : Contient la logique serveur (API, base de données, etc.)
* **frontend/** : Contient l’interface utilisateur (Vue.js)
* Fichiers de configuration communs :

  * `.env.exemple`, `.gitignore`, `docker-compose.yml`, `Dockerfile`
  * Utilisation de Docker pour l’environnement de développement/production.

### **2. Backend (Node.js/Express.js probablement)**

Le dossier `backend` est structuré de manière modulaire :

* **controller/** : Logique métier des routes
* **routes/** : Définit les endpoints de l’API
* **models/** : Modèles de données (probablement Mongoose ou Sequelize)
* **middleware/** : Fonctions intermédiaires (authentification, validation…)
* **db/** : Connexion ou scripts liés à la base de données
* **certificates/** : Contient les clés et certificats SSL pour HTTPS
* **swagger.mjs** : Documentation API avec Swagger
* Fichiers clés :

  * `server.mjs`, `package.json`, `.env`
  * Présence de `node_modules`, `package-lock.json` confirme une gestion des dépendances avec npm

✅ **Points forts :**

* Structure MVC respectée
* Sécurité : utilisation de certificats SSL

### **3. Frontend (Vue.js avec Vite)**

Le dossier `frontend` suit une bonne pratique standard Vue/Vite :

* **src/** : Code source Vue.js (composants, vues, logique)
* **public/** : Fichiers statiques
* **.editorconfig, .prettierrc.json, eslint.config.js** : Maintient une bonne qualité du code
* **vite.config.js** et **vue.config.js** : Configuration du projet Vue
* **package.json** : Gestion des dépendances frontend
* **index.html** : Point d’entrée de l’application Vue

✅ **Points forts :**

* Utilisation de Vite (rapide, moderne)

### **4. Outils DevOps et Collaboration**

* **Docker / Docker Compose** : Pour déployer des services pour le développement
* **.gitignore**, **README.md** : Bonnes pratiques de collaboration
* **.env.exemple** : Indication des variables d’environnement

  ## Schéma d'interactions
  [Schéma](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/backend/doc/Schema-interaction.png)


  # Réalisation
  ## Mesures de sécurité

  ## Explication sur chaque fonctionnalité demandée

  ## Organisation du GitHub (Norme de nommage des commits, etc...)
  # Test

  ## Stratégie de tests
# Conclusion

## Conclusion générale

## Conclusion personnelles
