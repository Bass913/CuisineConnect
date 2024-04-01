FROM node:16

WORKDIR /usr/src/app

# Copier les fichiers de définition de paquets
COPY package*.json ./

# Définir le registre npm personnalisé
RUN npm config set registry https://registry.npmjs.org/

# Installer les dépendances

RUN npm ci 

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port sur lequel votre application s'exécute
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
