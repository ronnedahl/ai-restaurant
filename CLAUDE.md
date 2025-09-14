# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered restaurant menu & ordering assistant - A React/Firebase application where users can browse dishes, manage cart, and interact with an AI assistant for personalized recommendations and ordering support.

## Essential Commands

### Frontend Development
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development (Firebase Functions)
```bash
cd functions
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run serve        # Build and start Firebase emulators
npm run deploy       # Deploy to Firebase (requires auth)
firebase emulators:start  # Start local Firebase emulator
```

### Data Management
```bash
cd scripts
npm install          # Install script dependencies
npm run upload       # Upload menu data to Firestore
npm run delete       # Delete menu data from Firestore
```

### Docker Development
```bash
# Development environment with hot reload
docker-compose -f docker-compose.dev.yml up frontend-dev

# Production test environment with Nginx
docker-compose -f docker-compose.prod.yml up --build
```

## Architecture

### Technology Stack
- **Frontend**: React 19 with Vite, TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Backend**: Firebase (Cloud Functions, Firestore, Hosting)
- **Containerization**: Docker multi-stage builds with Nginx for production

### Project Structure
```
/frontend           # React application
  /src
    /components     # React components (Menu, Cart, Header, etc.)
    /contexts       # React Context providers (CartContext)
    /services       # API services (mockApi.ts)
    /config         # Firebase configuration
    /lib            # Utilities (cn helper for Tailwind)
  Dockerfile        # Multi-stage Docker build
  nginx.conf        # Nginx configuration for SPA routing

/functions          # Firebase Cloud Functions (TypeScript)
  /src              # Function source files
  /lib              # Compiled JavaScript output

/scripts            # Utility scripts
  uploadMenu.js     # Script to populate Firestore with menu data
  /data             # Menu data files
```

### Path Aliases
- `@/` → `/frontend/src/`
- Used in imports like: `import { cn } from "@/lib/utils"`

## Development Workflow

### State Management
- **CartContext**: Global cart state using React Context API
  - Manages products, quantities, total price
  - Provides add/remove/update operations

### Mock API Development
The `mockApi.ts` service simulates Firebase operations for frontend development:
- `getMenuData()`: Returns complete menu with dishes
- `getMenuItem(id)`: Returns specific dish
- `getMenuByCategory(category)`: Returns filtered dishes
- `getCategories()`: Returns unique categories

### Data Model
```typescript
interface MenuItem {
  id: string
  name: string
  category: string
  description: string
  ingredients: Ingredient[]
  allergens: string[]
  priceSek: number
  imageUrl: string
  imageAlt: string
  tags: string[]
}

interface Ingredient {
  item: string
  amount: number
  unit: string
}
```

## Docker Configuration

### Development Container
- Uses Node 18 Alpine base
- Mounts source code as volume for hot reload
- Exposes port 5173 for Vite dev server
- Target: `development` in Dockerfile

### Production Container
- Multi-stage build: Builder → Nginx
- Serves static files from `/usr/share/nginx/html`
- Custom `nginx.conf` for SPA routing (try_files directive)
- Health checks configured
- Target: `production` in Dockerfile

## Current Development Status

### Implemented Features
- Static menu display with mock data
- Cart functionality with Context API
- Responsive UI with Tailwind CSS v4
- Docker environments for dev and production

### Pending Implementation
- AI Assistant UI (Chat window)
- Firebase Cloud Functions integration
- Real-time Firestore connection
- Authentication system
- Order management
- Payment integration