# Development stage
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install all dependencies including devDependencies
RUN npm install
# Install NestJS CLI globally for building
RUN npm install -g @nestjs/cli

# Copy source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application in development
CMD ["npm", "run", "start:dev"]

# Production build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install all dependencies including devDependencies
RUN npm install
# Install NestJS CLI globally for building
RUN npm install -g @nestjs/cli

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/generated ./generated
COPY --from=builder /usr/src/app/templates ./templates
COPY --from=builder /usr/src/app/examples ./examples

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables with defaults
ENV NODE_ENV=production
ENV PORT=3000
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASS=postgres
ENV DB_NAME=template_engine

# Command to run the application
CMD ["node", "dist/main.js"]
