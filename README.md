# Description

### Contexte de l'application

Pour une application de messageries interne à l'entreprise, nous souhaitons développer une API REST, permettant de lire, écrire, modifier et supprimer des messages.

Les messages seront de 2 types : SMS et email.

Un utilisateur sera en mesure de lire les messages qui lui ont été envoyés, d'y répondre et/ou de les supprimer.
L'utilisateur pourra aussi envoyer un message à un autre utilisateur de l'application et aussi modifier celui-ci.

Il n'est pas possible pour un utilisateur de lire/modifier/supprimer les messages destinés à un autre utilisateur.

Les messages comporteront au moins les informations suivantes :
- le message
- l'expéditeur
- la date d'envoi.

## Fonctionnalités souhaitées
- ~~envoi de message~~
- ~~lecture de message~~
- ~~suppression de message~~
- ~~lister tous les messages~~
- ~~marquer un message comme lu~~

### BONUS :
- ~~création d'utilisateur~~
- login d'utilisateur
- déconnexion
- accès à la corbeille
- répondre à un message spécifique
- ~~modification et historisation d'un message~~

**WIP** Docker (test-docker branch) : mysql is dockerize, running and creating DB with data but the connection to the host by the app is still refused.

# Installation

* You need to have **node** and **npm** installed https://nodejs.org/en/

* You need to have MySQL installed. If you are using macOS run:
  - `brew install mysql`
  - `brew services start mysql`
  - To avoid security failures you can run `mysql_secure_installation` and follow instructions
  - Run `mysql -u <username> -p` in your terminal, enter your password and copy the **create_db.sql**.
  It will create the DB and two users.

* Problem known 

 To avoid database connection failures while running the app locally run `ALTER USER '<your_user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your-password>';` and then `flush privileges;`

* Configure the ORM by changing **username** (if not root) and **password** with your information in the **ormconfig.json**.

* Run `npm install`

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
