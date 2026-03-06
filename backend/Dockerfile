# Stage 1: Build
FROM node:24.13.0-alpine AS builder

WORKDIR /app

# Install ALL dependencies (including devDependencies for the build)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# IMPORTANT: You must trigger the build process (usually creates the /dist folder)
RUN npm run build

# Stage 2: Production
FROM node:24.13.0-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the compiled code and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install ONLY production dependencies to keep the image small
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/main"]