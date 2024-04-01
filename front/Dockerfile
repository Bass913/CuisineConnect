FROM node:18.3.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
