FROM node:16-alpine3.14

WORKDIR /usr/app/reworth

COPY ./package*.json ./

RUN npm install

COPY ./src .
