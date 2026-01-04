# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered restaurant application with a **React frontend** and **FastAPI + LangChain backend** using Firebase Firestore for data storage. Features an AI assistant for menu inquiries, recommendations, and order assistance.

**Stack:**
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui
- Backend: Python 3.11+ + FastAPI + LangChain + Firebase Admin SDK

## Development Commands

### Frontend

```bash
cd frontend
npm install && npm run dev    # Start dev server on http://localhost:5173
npm run build                 # TypeScript check + Vite production build
npm run lint                  # ESLint
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate     # Linux/Mac
pip install -r requirements.txt
python -m uvicorn src.main:app --host 0.0.0.0 --port 8001 --reload
```

### Data Management

```bash
cd scripts && npm install
npm run upload    # Upload menu data to Firestore
npm run delete    # Delete menu data from Firestore
```

## Architecture

### Backend Architecture

**Request Flow** (`/chat` endpoint):
```
Request → Quick Response Check → Cache Check → RestaurantAgent → Response
```

**Core Components:**

1. **RestaurantAgent** (`src/core/restaurant_agent.py`):
   - Main AI agent using LangChain's `ChatOpenAI`
   - Intent detection for menu, allergens, pricing, ordering, human support
   - Fetches live menu data from Firebase as context

2. **Services Layer** (`src/services/`):
   - `menu_service.py`: Fetches menu items from Firestore
   - `firebase_vector_store.py`: Vector storage with cosine similarity search
   - `embeddings.py`: OpenAI embeddings

3. **Optimization Layer**:
   - `utils/quick_responses.py`: Pattern-matched instant responses
   - `utils/cache.py`: Response caching with TTL (300s default)

### API Routes (`backend/src/api/routes/`)

| Route | Method | Description |
|-------|--------|-------------|
| `/chat/` | POST | Main chat endpoint with caching |
| `/health` | GET | Health check |

### Frontend Architecture

- **State**: React Context API (`CartContext` for cart state)
- **API**: `chatApi.ts` singleton service calls backend at `VITE_API_BASE_URL`
- **UI**: shadcn/ui components with Tailwind CSS v4

## Environment Variables

**Backend** (`backend/.env`):
```env
OPENAI_API_KEY=sk-...
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@project.iam.gserviceaccount.com
API_KEY=your-api-key
API_PORT=8001
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
```

## Production Deployment

**Server setup (VPS with Nginx + PM2):**

```bash
# Backend runs via PM2
pm2 start .venv/bin/python --name ai-restaurant-backend -- -m uvicorn src.main:app --host 0.0.0.0 --port 8001

# Nginx proxies /api/ to backend
location /api/ {
    proxy_pass http://localhost:8001/;
}
```

## Common Pitfalls

1. **Firebase Private Key**: Must have literal `\n` characters, not `\\n` escape sequences
2. **CORS**: Add new frontend origins to `allow_origins` list in `src/main.py`
3. **Ports**: Backend=8001, Frontend dev=5173
4. **Python**: Requires 3.11+ for typing support
