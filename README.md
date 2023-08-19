# Projet : FOODLOVE

Le projet consiste à construire un application de recettes de cuisine qui définis la quantité d'ingrédients pour une portion désirée. <br />
Le but de cet outil est d'éviter les erreurs de dosages dans les recettes , l'oubli d'une recette ou encore d'entasser des livres de recettes dans un coin de la cuisine. <br />
Vous n'avez plus d'excuse pour demander la fameuse recette de hachis parmentier de canard à Mamie !
 
# Backend

Le backend a été crée avec **Node.js**, **Express.js** et **MongoDB** comme base de données.
<br />

### Installation

-   Dans le terminal de VSCODE, situez-vous dans le dossier `/backend`.
    <br />
-   Démarrer `npm install` pour installer toutes les dependences du backend.
    <br />
-   Dans le dossier `/backend/config`, créer un fichier `.env`.
    <br />
-   Dans le fichier `.env, veuillez renseigner les informations suivantes :
```
  PORT=5000
  CLIENT_URL=http://localhost:4200
  DB_USER_PASS={lien url de connexion obtenu après étape de connexion de base de donnée}
  TOKEN_SECRET={random_string_to_encode_tokens}
```
- Démarrer `npm start` pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier source.

# Base de donnée

-   Se rendre sur `https://www.mongodb.com/atlas`.
    <br />
-   Se créer un compte et retenir les informations d'authentification.
    <br />
-   Créer la database  `foodlover` et un cluster en cliquant sur `create` et en suivant les indications.
    <br />
-   Se rendre dans `Database Access` sur la gauche de l'écran et cliquer sur `Add new database user`.
    <br />
-   Indiquer les informations d'authentification et le type de droits autorisés (`readWriteAnyDatabase@admin`).
    <br />
-   Se rendre dans `Network Access` sur la gauche de l'écran et cliquer sur `Add IP adress`.
    <br />
-   Selectionner `0.0.0.0/0 (includes your current IP address)`.
    <br />
-   Se rendre dans `Database` sur la gauche de l'écran et cliquer sur `Connect`.
    <br />
-   Choisir `Connect your application` puis le driver (`Node.js`) et sa version (`4.1 or later`).
    <br />
-   Copier l'url de connexion de la base de donnée et l'indiquer comme `DB_USER_PASS` dans le fichier `/backend/config/.env`.
    <br />

# Frontend

Le frontend a été crée avec **Angular**.

### Installation

- Dans le dossier `/FoodLove` démarrez `npm install` pour installer toutes les dépendances du frontend.

- Démarrer `ng serve -o` pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier source.

## Droits Admin

Pour tester les droits d'ADMIN, l'utilisateur doit se connecter avec sa base de donnée et choisir la table des utilisateurs.
<br />
Puis il devra choisir ou créer un nouvel utilisateur qui prendra le role d'Administrateur.
<br />
Il faudra alors modifier l'utilisateur en lui ajoutant un role ADMIN.
<br />
```
  role : "ADMIN" 
```

# Requêtes de l'application FoodLove

## Requêtes concernant les utilisateurs
Ci-dessous, la liste des requêtes concernant les utilisateurs. <br />
● Inscription d'un utilisateur <br />
● Connexion d'un utilisateur <br />
● Déconnexion d'un utilisateur <br />
● Suppression d'un utilisateur <br />
● Modification d'un utilisateur <br />
● Voir les infos d'un utilisateur <br />

### Inscription d'un utilisateur
    POST  : api/user/register
### Connexion d'un utilisateur
    POST  : api/user/login
### Déconnexion d'un utilisateur
    GET  : api/user/logout
### Suppression d'un utilisateur
    DELETE  : api/user/{id de l'utilisateur voulu}
### Modification d'un utilisateur
    PUT  : api/user/{id de l'utilisateur voulu}
### Voir les infos d'un utilisateur
    GET  : api/user/{id de l'utilisateur voulu}
    
## Requêtes concernant les recettes
Ci-dessous, la liste des requêtes concernant les recettes de cuisine. <br />
● Ajouter une recette <br />
● Modifier une recette <br />
● Supprimer une recette <br />
● Ajouter un ingrédient <br />
● Modifier un ingrédient <br />
● Supprimer un ingrédient <br />
● Ajouter une étape <br />
● Modifier une étape <br />
● Supprimer une étape <br />
● Voir les infos d'une recette précise <br />
● Voir toutes les recettes <br />

### Ajouter une recette
    POST  : api/recette
### Modifier une recette
    PUT  : api/recette/{id de la recette voulu}
### Supprimer une recette
    DELETE  : api/recette/{id de la recette voulu}
### Ajouter un ingrédient
    PATCH  : api/recette/ajout-ingredient/{id de la recette voulu}
### Modifier un ingrédient
    PATCH  : api/recette/modification-ingredient/{id de la recette voulu}
### Supprimer un ingrédient
    PATCH  : api/recette/suppression-ingredient/{id de la recette voulu}
### Ajouter une étape
    PATCH  : api/recette/ajout-etape/{id de la recette voulu}
### Modifier une étape
    PATCH  : api/recette/modification-etape/{id de la recette voulu}
### Supprimer une étape
    PATCH  : api/recette/suppression-etape/{id de la recette voulu}
### Voir les infos d'une recette précise
    GET  : api/recette/{id de la recette voulu}
### Voir toutes les recettes
    GET  : api/recette

# Chartes graphiques de l'application

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primaire | `#008b8b` |
| Secondaire | `#FFFFFF` |
| Tertiaire | `#000000` |


# Spécifications fonctionnelles

## Page de connexion
Une page de connexion permettant à l’utilisateur de se connecter, ou bien
de créer un compte s’il n’en possède pas.Ici la connexion doit se faire à partir 
de quatres éléments : le nom et prénom de l'utilisateur ainsi que son adresse mail
et un mot de passe. Rien de plus à prévoir pour le moment.

## Détails de la fonctionnalité de connexion
● Un utilisateur a la possibilité de se déconnecter. <br />
● La session de l’utilisateur persiste pendant qu’il est connecté. <br />
● Les données de connexion sont sécurisées. <br />

## Page d’accueil
● La page d’accueil liste les recettes créés par l'utilisateur.
● Les recettes sont listés de façon antéchronologique (du plus récent au plus ancien).
● L'utilisateur peut rechercher une recette précise à l'aide de la barre de recherche ou des filtres proposés.

## Création d’une recette
● Un utilisateur peut créer une recette. <br />
● Une recette peut contenir du texte et une image. <br />

## Page de profil
● Un utilisateur peut voir ou modifier ses informations.
● Il est possible sur cette page de supprimer son compte après confirmation.

## Header
● Le header ,après connexion, permet d'accéder à la liste, à notre profil ou encore à une page de création de recette.
● La déconnexion de l'utilisateur se fait en cliquant sur le lien dans le header.

## Détails d’une recette
● Cette page permet de détailler une recette précise, sélectionnée dans la liste.
● Un utilisateur peut aussi modifier et supprimer ses recettes. <br />
● Un utilisateur peut se rendre sur une page détaillant les ingrédients ou sur une autre détaillant les étapes.

## Détails des ingrédients / étapes
● Ces pages permettent de détailler chacune les ingrédients ou étapes de la recette sélectionnée dans la liste.
● Un utilisateur peut aussi ajouter, modifier et supprimer ses ingrédients ou étapes. <br />

## Rôle administrateur
Dans le but de pouvoir faire de la modération si nécessaire, il faudra créer un utilisateur“administrateur” ; celui-ci aura les droits de modification / suppression sur toutes les recettes de l'application.
