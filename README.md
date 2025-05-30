## 📚 PassionLecture

**PassionLecture** est une application web fullstack dédiée aux amateurs de lecture. Elle permet aux utilisateurs de consulter, ajouter, commenter, modifier et supprimer des ouvrages selon leurs droits d'accès. Le site propose une interface intuitive pour explorer les livres par catégorie et suivre les dernières publications. Un espace administrateur permet également une gestion complète de la plateforme.

L'application est construite avec **Node.js** pour le backend, un **frontend web moderne**, et utilise **Docker** pour la gestion des services. Elle est conçue pour être facilement déployée et documentée.

## Authors

- [@EithanSanchezFilipe](https://www.github.com/EithanSanchezFilipe)
- [@RyanDPC](https://www.github.com/RyanDPC)


## Installation et déploiement en local

**Cloner le repo**  
Ouvrez un terminal et exécutez :

```sh
git clone https://github.com/EithanSanchezFilipe/PassionLecture.git
cd PassionLecture
```
### Backend

**Installer les dépendances**  
   Exécutez les commandes :
   ```sh
   cd backend
   npm install
```
   **Lancer le conteneur docker**  
   Ouvrez le terminal dans le dossier docker puis exécutez :
   ```sh
   docker-compose up -d
   ```
   **Variables d'environnement**  
   Copiez le fichier .env.exemple et renommer le en .env et inserer la variables suivantes :
   ```
   privateKey=CLE_SECRETE
   ```

   **Démarrer le backend**  
   Lancez le backend en mode développement :
   ```sh
   npm run start
   ```

   ### Frontend
   Ouvrez un nouveau terminal dans le dossier frontend
   
   **Installer les dépendances**  
   Exécutez les commandes :
   ```sh
   npm install
```
   **Démarrer le frontend**  
   Lancez le frontend en mode développement :
   ```sh
   npm run dev
   ```
## Documentation
**Journaux de travail**  
Eithan: [backend](https://eduvaud-my.sharepoint.com/:x:/g/personal/pa78gum_eduvaud_ch/EXyTaG0eWktAltjx45jCM6sBtY5Tc4lE-WQMA7lrDXvYRw?e=YTKTRd)
        [frontend](https://eduvaud-my.sharepoint.com/:x:/g/personal/pa78gum_eduvaud_ch/ERL2Wfx928lEkkA_G_QemzoBPRPbZrMUtmDVgyzXTfVFwA?e=mBbCxf)
Ryan: [backend](https://eduvaud-my.sharepoint.com/:x:/g/personal/pa70iyc_eduvaud_ch/EatkGd8gbgJEvDbWn2eamcIBSZ9HPzXZIbhsjyqWFnkxqw?e=EX442t)
      [frontend](https://eduvaud-my.sharepoint.com/:x:/g/personal/pa70iyc_eduvaud_ch/EU7B2LwpNp9Ej0IDH7o7xTkB3yu-vN163RtLW6-LEcyBow?e=eM97Bk)

**Rapport**
[Rapport](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/rapport.md)
