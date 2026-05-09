# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime stage: lightweight static server ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g serve@14
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
