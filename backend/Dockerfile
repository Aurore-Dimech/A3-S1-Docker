FROM node:20-alpine

RUN adduser -D -h /home/myuser -s /bin/sh myuser

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R myuser:myuser /app

USER myuser

EXPOSE 3000

CMD [ "npm", "run", "dev" ]