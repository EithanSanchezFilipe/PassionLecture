FROM node:20

# Installer nodemon globalement
RUN npm install -g nodemon

# Dossier de travail dans le conteneur
WORKDIR /home/node/backend

# Copier les fichiers package.json et package-lock.json
COPY ./package*.json ./
COPY ./backend/certificates/ ./certificates/

# Installer les dépendances
RUN npm install && npm ci

# Copier tout le code backend y compris le dossier certificates/
COPY ./backend/ ./

# Exposer le port HTTPS
EXPOSE 443

# Lancer le serveur avec nodemon
CMD ["nodemon", "server.mjs"]
