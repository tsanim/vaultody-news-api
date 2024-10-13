FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

# Build the app
RUN tsc

EXPOSE 5252

CMD ["npm", "start"]