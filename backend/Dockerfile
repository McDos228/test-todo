# Stage 1: Build
FROM node:24.13.0-alpine AS builder

WORKDIR /app

# Install ALL dependencies (including devDependencies for the build)
COPY package.json package-lock.json ./
COPY prisma ./prisma/ 

RUN npm ci

# Generate the Prisma Client
RUN npx prisma generate

COPY . .

# IMPORTANT: You must trigger the build process (usually creates the /dist folder)
RUN npm run build

# Stage 2: Production
FROM node:24.13.0-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the compiled code and production dependencies
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/prisma ./prisma

# Install ONLY production dependencies to keep the image small
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/src/main"]