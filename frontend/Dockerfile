FROM node:20-alpine

WORKDIR /the/workdir/path

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]