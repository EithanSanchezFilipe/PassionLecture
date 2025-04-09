FROM node:20

# Installer nodemon
RUN npm install -g nodemon

# Dossier de travail
WORKDIR /home/node/app

# Copier package.json
COPY ./ package*.json ./

# Installer les dépendances
RUN npm install && npm ci

# Copier tout le backend (y compris les certificats)
COPY app/backend/ ./backend/

# Donner les bons droits
RUN chown -R node:node /home/node/app

# Exposer le port HTTPS
EXPOSE 443

# Démarrer le serveur
CMD ["nodemon", "backend/server.mjs"]
