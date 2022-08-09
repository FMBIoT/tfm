FROM node:12

RUN npm install -g @angular/cli
# RUN npm install pm2 -g

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN npm install --unsafe-perm

COPY . .

RUN npm run build
CMD [ "npm", "run", "start" ]
