# Utilisation de l'image officielle Node.js
FROM node:20

# Installer nodemon globalement pour le développement
RUN npm install -g nodemon

# Créer un répertoire de travail dans le conteneur
WORKDIR /home/node/app

# Copier les fichiers package.json et package-lock.json du backend dans le conteneur
COPY package.json ./
COPY package-lock.json ./


RUN chown -R node:node /home/node/app

# Installer les dépendances du backend
WORKDIR /home/node/app/app
RUN npm install
RUN npm ci
# Copier tout le code du backend dans le conteneur
COPY app/backend/ ./backend/
# Exposer le port sur lequel le backend va écouter (exemple: 8080)
EXPOSE 443

# Démarrer le backend avec nodemon en utilisant server.mjs comme fichier principal
CMD ["nodemon", "server.mjs"]
