# Rendu docker 
Ce projet est la création d'une une application complète
comprenant plusieurs services. Elle configure et
déploye ces services à l'aide de Docker et Docker Compose tout en
respectant les bonnes pratiques de sécurité, de gestion des logs et de
monitoring.

### Pré-requis

Ce qu'il est requis d'avoir pour commencer avec votre projet :

- Avoir installé et ouvert docker desktop sur votre machine,
- Avoir installé et lancé une base de données PostgreSql.

## Pour commencer

Clonez le projet sur votre machine.
Clonez le .env.example dans le dossier principal et renommez le en .env.
Clonez le .env.example et renommez le en .env dans le dossier backend.
Clonez le .env.example et renommez le en .env dans le dossier frontend.
<br/>
**Nous avons choisi ici de mettre les vraies valeurs du .env dans le .env.example. Cela est évidemment une pratique à ne surtout pas reproduire, puisque les données dedans sont privées. Nous avons fait ce choix ici car il s'agit d'un exercice dans le cadre de nos études et préférons faciliter le processus de correction.**

### Installation

Une fois les pré-requis complétés et le projet cloné, allez dans le dossier du projet et tapez dans votre terminal la commande : `docker compose up -d`
<br/>

## Démarrage

- ##### Initialisez la base de données
Ouvrez <http://localhost:3000/>. Cela correspond au backend de votre application -> Vous aurez l'affichage d'un message "Hello!"
<br/>
Allez maintenant à <http://localhost:3000/create-table> pour créer une table animal dans votre base de données postgres. <br />
Vous pouvez ensuite fermer cet onglet, et utiliser uniquement <http://localhost:5173/>.

- ##### Accédez à votre site : 
<http://localhost:5173/> pour le frontend de votre application.<br/>
Une fois la base de données initialisée, vous pouvez utiliser cette URL pour faire toutes vos actions.

## Développé avec

* [React](https://fr.react.dev/) - Bibliothèque javascript (front-end)
* [Node](https://nodejs.org/fr) - API (back-end)
* [Postgres](https://www.postgresql.org/) - Base de données (back-end)


## Auteurs

* **Aurore Dimech** 
* **Brunic Feyou**
* **Allia Jarjir**

## Informations additionnelles

Vous trouverez dans le dossier "**screenshoots**" de ce projet des captures d'écran du terminale montrant quelques tests effectués lors de la constructions de ce dernier. 

Voici les explications descritives de ce qu'acccomplissent les commandes utilisées : 

##### Gestion des logs  
- La commande `docker inspect <container_id> --format='{{json.HostConfig.LogConfig}}'`
![ vérifie la configuration et rotation des logs](/screenshoot/docker_log_redirections_rotatio.png "Inspection des logs") nous permet de vérifier la configuration et la rotation des logs de chaque service.
Les loggings driver son mise en place directement dans le fichier `docker-compose.yml`
<br/>
- La commande `docker composer logs -f` ![ vérifie la configuration et rotation des logs](/screenshoot/docker_log_redirections_STR.png "Inspection des logs") nous permet de suivre les logs en temps en réel. 

##### Monitoring 
-  La commande `docker stats`![ vérifie la configuration et rotation des logs](/screenshoot/monitoring_stats.png "Inspection des logs") nous permet de surveiller l’utilisation des ressources (CPU, mémoire, réseau).




