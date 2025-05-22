# Use the official Node.js 20 LTS image as base
FROM node:20-alpine AS base

# Install production dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Install all dependencies (including dev dependencies for building)
FROM base AS builder-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=builder-deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 analog

# Copy the built application
COPY --from=builder --chown=analog:nodejs /app/dist ./dist
COPY --from=builder --chown=analog:nodejs /app/package.json ./package.json
COPY --from=builder --chown=analog:nodejs /app/node_modules ./node_modules

# Copy static assets (images)
COPY --from=builder --chown=analog:nodejs /app/public ./public

USER analog

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the server
CMD ["npm", "start"]
