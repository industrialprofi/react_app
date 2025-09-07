# syntax=docker/dockerfile:1.7

# --- Base arguments ---
ARG NODE_VERSION=20.15.1

# --- Builder stage ---
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
# Install OS deps if needed (e.g., for sharp). Uncomment when required.
# RUN apk add --no-cache libc6-compat

# Copy lockfile and package.json for reproducible installs
COPY package.json package-lock.json ./

# Prefer clean, reproducible install
RUN npm ci --include=dev

# --- Build stage ---
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js (standalone output is enabled in next.config.ts)
RUN npm run build

# --- Runner stage ---
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user for security
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Install wget for HEALTHCHECK (Alpine minimal image doesn't include it)
RUN apk add --no-cache wget

# Copy the standalone server and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port Next.js listens on
EXPOSE 3000

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000 || exit 1

USER nextjs

# Start the server
CMD ["node", "server.js"]
