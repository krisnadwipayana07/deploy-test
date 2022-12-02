FROM node:16-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
