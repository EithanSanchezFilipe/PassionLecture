# PassionLecture
### Authors
- Eithan Sanchez Filipe
- Ryan De Pina Correia

# 🚀 Lancer le projet

## Prérequis
Avant de commencer, assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) (version recommandée : LTS)
- [Git](https://git-scm.com/)

## Installation et lancement
1. **Cloner le dépôt**  
   Ouvrez un terminal et exécutez :
   ```sh
   git clone https://github.com/EithanSanchezFilipe/PassionLecture.git
   cd PassionLecture

2. **Installer les dépendances**  
   Exécutez la commande :
   ```sh
   npm install

3. **Lancer le conteneur docker**  
   Ouvrez le terminal dans le dossier docker puis exécutez :
   ```cmd
   docker-compose up -d

5. **Démarrer le projet**  
   Lancez l'application en mode développement :
   ```sh
   npm run start
   Le projet sera accessible à l'adresse indiquée dans le terminal

## Documentation

1. **Journal de travail**  
   Eithan Sanchez Filipe: [Journal de travail](https://eduvaud-my.sharepoint.com/:x:/g/personal/pa78gum_eduvaud_ch/EXyTaG0eWktAltjx45jCM6sBtY5Tc4lE-WQMA7lrDXvYRw?e=YTKTRd)  
   Ryan De Pina Correia: [Journal de travail](https://eduvaud-my.sharepoint.com/:x:/g/personal/pa70iyc_eduvaud_ch/EatkGd8gbgJEvDbWn2eamcIBSZ9HPzXZIbhsjyqWFnkxqw?e=EX442t)

2. **MCD/MLD**  
   [MCD](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/app/backend/db/MCD.png)  
   [MLD](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/app/backend/db/MLD.png)

3. **Schéma d'interactions**  
   [Schéma](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/app/backend/doc/Schema-interaction.png)


5. **Checklist des routes**
   [Checklist](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/app/backend/doc/CheckListRoutes.png)

6. **Liste des routes**
   [Liste](https://github.com/EithanSanchezFilipe/PassionLecture/blob/main/app/backend/doc/routes.md)

## Bilan de fonctionnalitées 80% 264

1. **Une page d’accueil comprenant une explication de l’utilité du site ainsi
que les cinq derniers ouvrages ajoutés (accès tout public)** OK(intervale de 2 minutes pour evite trops de requetes)
2. **Une page comprenant la liste des ouvrages par catégorie (accès tout
public avec restrictions sur les liens).** OK
3. **Une page d’ajout d’un ouvrage (accès utilisateur)** OK
4. **Une page de modification d’un ouvrage (accès utilisateur pour ses
ouvrages)** KO
5. **Une page de suppression d’un ouvrage (accès utilisateur pour ses
ouvrages)** KO
6. **Une page (vue détail d’un livre) permettant d’ajouter une appréciation
et un commentaire à un ouvrage (accès utilisateur)** OK(appréciation et note ensemble)
7. **L’utilisateur admin peut réaliser toutes les actions** KO
