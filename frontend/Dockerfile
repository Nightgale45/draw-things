# ── base: shared dependency install ──────────────────────────────────────────
FROM node:24-alpine AS base
WORKDIR /app
RUN npm install -g npm@11.6.2 && chown node:node /app
USER node
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ── development: vite dev server with HMR ────────────────────────────────────
FROM base AS development
COPY --chown=node:node . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ── builder: compile static assets ───────────────────────────────────────────
FROM base AS builder
COPY --chown=node:node . .
RUN npm run build

# ── production: serve built assets with nginx ────────────────────────────────
FROM nginx:1.27-alpine AS production
RUN chown -R nginx:nginx \
        /var/cache/nginx  \
        /var/log/nginx    \
        /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
