# Multi-stage Dockerfile för AI Restaurant Frontend

# =============================================================================
# STAGE 1: Builder - Bygger applikationen
# =============================================================================
FROM node:20-alpine AS builder

# Sätt arbetskatalog
WORKDIR /app

# Kopiera package.json och package-lock.json först (för bättre cache)
COPY package*.json ./

# Installera beroenden
RUN npm ci --only=production=false

# Kopiera källkod
COPY . .

# Bygg applikationen för produktion
RUN npm run build

# =============================================================================
# STAGE 2: Production - Nginx server för att serva den byggda appen
# =============================================================================
FROM nginx:alpine AS production

# Installera grundläggande verktyg
RUN apk add --no-cache curl

# Ta bort default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Kopiera custom nginx konfiguration
COPY nginx.conf /etc/nginx/nginx.conf

# Kopiera byggda filer från builder-steget
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponera port 80
EXPOSE 80

# Hälsokontroll
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Starta nginx
CMD ["nginx", "-g", "daemon off;"]

# =============================================================================
# STAGE 3: Development - För utvecklingsmiljö med hot reload
# =============================================================================
FROM node:20-alpine AS development

# Sätt arbetskatalog
WORKDIR /app

# Installera grundläggande verktyg
RUN apk add --no-cache git

# Kopiera package.json och package-lock.json
COPY package*.json ./

# Installera alla beroenden (inklusive dev-dependencies)
RUN npm ci

# Kopiera källkod
COPY . .

# Exponera port för Vite dev server
EXPOSE 5173

# Starta utvecklingsserver
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]