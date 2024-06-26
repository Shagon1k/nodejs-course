# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Build app dependencies - collects all dependencies (including dev) as all they are needed to build the app
FROM base as bdependencies
# Copy package.json and package-lock.json files and install build dependencies
COPY package*.json ./
RUN npm install

# Build image
FROM bdependencies AS build
WORKDIR /app
COPY src ./src
COPY tsconfig.json ./
RUN npm run build:prod

# Run app dependencies: collects only production-needed dependencies which Node requires to run the app
# Note: Moved to separate stage to avoid installing "npm" in Final image to reduce its size
FROM alpine AS rdependencies
WORKDIR /app
# Copy package.json and package-lock.json files and install prod run dependencies
RUN apk add --no-cache npm
COPY package*.json ./
# Install dependencies based on set environment
RUN npm install --omit=dev

FROM alpine as db-migrate
WORKDIR /app
RUN apk add --no-cache nodejs npm
# Collect ORM configs
COPY src/config ./src/config
# Collect ORM entities
COPY src/api/repositories/entities ./src/api/repositories/entities
COPY .env.prod ./
# "mikro-orm" field from package.json is in use
COPY package*.json ./
# tsconfig required for TS-based ORM configs
COPY tsconfig.json ./
COPY --from=bdependencies /app/node_modules ./node_modules

# Final image
FROM alpine AS release
WORKDIR /app
RUN apk add --no-cache nodejs npm
COPY --from=rdependencies /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY .env.prod ./

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:8000/health || exit 1

ENTRYPOINT ["node", "build/index.js"]
