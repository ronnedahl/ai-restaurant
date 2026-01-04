# AI Restaurant - Menu & Ordering Assistant

AI-powered restaurant application with intelligent menu browsing, personalized recommendations, and order management.

## Project Overview

A modern web application built with React and FastAPI that provides:
- Interactive menu browsing with detailed dish information
- Shopping cart functionality
- AI-powered recommendations based on dietary preferences
- Real-time order management

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui
- **Backend**: Python 3.11+, FastAPI, LangChain, Firebase Firestore
- **AI**: OpenAI GPT-4

## Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Git

## Getting Started

### Clone the Repository

```bash
git clone [repository-url]
cd ai-restaurant
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Access the application at http://localhost:5173

### Backend Development

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows
pip install -r requirements.txt
python -m uvicorn src.main:app --host 0.0.0.0 --port 8001 --reload
```

Access the API at http://localhost:8001

### Data Management

To upload menu data to Firestore:

```bash
cd scripts
npm install
npm run upload
```

## Project Structure

```
ai-restaurant/
├── frontend/               # React application
│   └── src/
│       ├── components/     # React components
│       ├── contexts/       # React Context providers
│       ├── services/       # API services
│       └── config/         # Configuration
├── backend/                # FastAPI application
│   └── src/
│       ├── api/            # API routes
│       ├── core/           # AI agent logic
│       ├── services/       # Business logic
│       └── middleware/     # Security, logging
└── scripts/                # Utility scripts
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend

- `python -m uvicorn src.main:app --reload` - Start dev server
- `python scripts/test_api.py` - Test API endpoints

## Environment Variables

### Frontend (`.env`)

```env
VITE_API_BASE_URL=/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Backend (`.env`)

```env
OPENAI_API_KEY=your-openai-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
API_PORT=8001
```

## Production Deployment

The application is deployed on a VPS with:
- **Frontend**: Static files served by Nginx
- **Backend**: PM2 process manager running uvicorn
- **SSL**: Let's Encrypt certificates via Certbot

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

[License Type] - See LICENSE file for details
