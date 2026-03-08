# Stage 1: Build
FROM node:24.13.0-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci

RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:24.13.0-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Install ONLY production dependencies (this will now include dotenv)
RUN npm ci --omit=dev

# RE-GENERATE Prisma Client in the final production stage
# This ensures the binary engine matches the Alpine environment perfectly.
RUN npx prisma generate

EXPOSE 3000

# Verify your build output path (dist/main or dist/src/main)
CMD ["node", "dist/main"]