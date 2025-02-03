FROM node:18-alpine

RUN npm install pnpm -g

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]