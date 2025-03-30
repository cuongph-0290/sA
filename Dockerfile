# docker build -t sa:latest .
# docker run -p 3000:3000 -v $PWD:/app sa:latest npm start

FROM node:22-alpine

RUN npm install -g npm@11.2.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
