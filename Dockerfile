# docker build -t sa:latest .
# docker run -p 3000:3000 -v $PWD:/app sa:latest

FROM node:16.14.0-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
