FROM node:20-alpine
# on définit ici l'image de base utilisée pour ce conteneur
# la version alpine est plus légère et est donc plus optimisée pour les environnements de conteneurs

RUN adduser -D -h /home/myuser -s /bin/sh myuser
# cette ligne ajoute un nouvel utilisateur nommé "myuser" avec des paramètres par défaut
# cela permet d'avoir un utilisateur non-root, ce qui est nécessaire pour des raisons de sécurité

WORKDIR /app
# définit /app comme le répertoire de travail, ce qui signifie que toutes les commandes suivantes seront exécutées dans celui-ci

COPY package*.json ./
# copie les fichiers package.json et package-lock.json du répertoire de l'hôte vers le conteneur

RUN npm install
# exécute la commande npm install, ce qui installe toutes les dépendances définies dans le package.json

COPY . .
# copie tous les fichier de l'hôte dans le conteneur

RUN chown -R myuser:myuser /app
# définit l'utilisateur "myuser" comme le propriétaire de /app et tout ce qui existe dedans
# "myuser" est alors capable d'accéder et de modifier les fichiers dedans

USER myuser
# l'utilisateur par défaut et exécutant les commandes suivantes deviens "myuser"
# l'utilisateur n'est de ce fait plus root, ce qui permet de sécuriser les processus

EXPOSE 3000
# indique que le conteneur écoute sur le port 3000

CMD [ "npm", "run", "dev" ]
# lance npm run dev lorsque le conteneur démarre