FROM node:18-alpine
WORKDIR /app
ENV PORT=8080
EXPOSE $PORT
COPY package*.json ./
npm ci --production
COPY . .
CMD ["npm", "start"]