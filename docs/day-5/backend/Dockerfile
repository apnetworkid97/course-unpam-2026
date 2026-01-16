# Build
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
USER node
RUN npm run build

# Production
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3001

CMD ["node", "dist/src/main.js"]
