# MemeMaker

## Description concise

Sur ce site les utilisateurs pourront télécharger des images, ajouter du texte personnalisé et générer des mèmes.  

*Qu’est ce qu’un mème ? Un mème est une idée, une image, une vidéo, ou un concept qui se propage rapidement sur Internet par imitation, copie, ou partage. Ils sont souvent humoristiques, modifiables, et reconnaissables par un large public.*
  
Ce projet s’inscrit dans le cadre universitaire. Il nous a permis d'explorer le traitement d'images, la gestion des formulaires, la création d'un système d'authentification pour les utilisateurs et la manipulation de données avec MongoDB. Il offre également une expérience utilisateur amusante en permettant aux utilisateurs de créer et de partager leurs propres mèmes.

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Auteurs et contributeurs

GROSJEAN Lucas

TRUNKENWALD Marie

Étudiants du M2 Informatique “Ingénierie Logicielle” de Nancy 2023 - 2024


## Fonctionnalités du site

1. Page d'accueil : La page d'accueil affiche une liste de mèmes générés récemment par les utilisateurs. Les utilisateurs peuvent voir les mèmes et même les télécharger.

2. Formulaire de génération de mèmes : Les utilisateurs peuvent accéder à un formulaire de génération de mèmes. Le formulaire comprend les éléments suivants :

- Un template préalablement choisit par l'utilisateur. L'utilisateur peut uploaded ses propres templates sur le site.

- Un champs titre.

- Un champ description.

- La possibilité de rajouter des champs de texte à superposer sur l'image template pour construire le meme.

  

3. Traitement de l'image : Une fois que l'utilisateur a soumis le formulaire, l'application utilisera une bibliothèque de traitement d'images pour superposer le texte sur l'image, créant ainsi un mème. L'image générée sera sauvegardée dans la base de données.

  

4. Liste de mèmes générés (non-terminé) : Une fois le mème généré, l'application affiche une liste de mèmes créés par l'utilisateur. Les utilisateurs peuvent cliquer sur un mème pour le visualiser en taille réelle.

  

5. Système de votes (non-implémenté)  : Les utilisateurs peuvent voter pour les mèmes qu'ils aiment. Les mèmes sont classés en fonction du nombre de votes reçus.

  

6. Gestion de compte utilisateur (non-terminé) : Les utilisateurs peuvent créer un compte, se connecter et gérer leurs mèmes générés. Ils peuvent également supprimer leurs propres mèmes.
    

## Technologies utilisées

Frontend : Angular pour la création de l'interface utilisateur et la gestion des formulaires.  
  

Backend : NestJS pour la gestion des requêtes, le traitement des images et la gestion des utilisateurs.

  

Base de données : MongoDB pour le stockage des données des utilisateurs et des mèmes.

  

Stockage des mèmes : Localement sur le serveur.

  

Bibliothèque de traitement d'images : Le traitement d’image s’effectue directement sur des objet canvas.
    

## Installation

Clonage du projet:

git clone [git@github.com](mailto:git@github.com):FXzoroark/MemeMaker.git

  

Installations :

-   Backend: cd ./MemeMaker/mememaker-backend && npm install
    
-   Frontend: cd ./MemeMaker/mememaker-frontend && npm install
    

  

Lancements :

Backend / Frontend: npm start

  

Lien frontend: [http://localhost:4200](http://localhost:4200)

Lien documentation backend: [http://localhost:3000/documentation](http://localhost:3000/documentation)

## Fonctionnalités supplémentaires possibles

- Ajout de tags pour organiser les mèmes.

- Partage des mèmes sur les réseaux sociaux.

- Commentaires sur les mèmes.

- Classement des mèmes populaires.

- Possibilité de modifier ou de supprimer un mème après sa création.
    

## Liens et ressources

[Bibliothèque de traitement d’images - Jimp](https://www.npmjs.com/package/jimp?activeTab=readme)