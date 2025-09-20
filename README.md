# AI Restaurant - Menu & Ordering Assistant

AI-powered restaurant application with intelligent menu browsing, personalized recommendations, and order management.

## Project Overview

A modern web application built with React and Firebase that provides:
- Interactive menu browsing with detailed dish information
- Shopping cart functionality
- AI-powered recommendations based on dietary preferences
- Real-time order management
- Multi-language support

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Backend**: Firebase (Cloud Functions, Firestore, Hosting)
- **UI Components**: shadcn/ui
- **Containerization**: Docker with multi-stage builds
- **Web Server**: Nginx (production)

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Firebase CLI (for backend development)
- Git

## Getting Started

### Clone the Repository

```bash
git clone [repository-url]
cd ai-restaurant
```

### Docker Development (Recommended)

The project includes Docker configurations for both development and production environments.

#### Development Environment

Run the development server with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up frontend-dev
```

The application will be available at http://localhost:5173

To stop the development server:

```bash
docker-compose -f docker-compose.dev.yml down
```

#### Production Test Environment

Build and run the production-optimized version with Nginx:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

The application will be available at http://localhost

To stop the production server:

```bash
docker-compose -f docker-compose.prod.yml down
```

### Local Development (Without Docker)

#### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Access the application at http://localhost:5173

#### Backend Development

```bash
cd backend
npm install
npm run serve  # Starts Firebase emulators
```

#### Data Management

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
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React Context providers
│   │   ├── services/      # API services
│   │   ├── config/        # Firebase configuration
│   │   └── lib/          # Utilities
│   ├── Dockerfile        # Multi-stage Docker build
│   └── nginx.conf        # Nginx configuration
├── backend/              # Firebase Cloud Functions
│   ├── src/             # TypeScript source files
│   └── lib/             # Compiled JavaScript
├── scripts/             # Utility scripts
│   ├── uploadMenu.js    # Firestore data upload
│   └── data/           # Menu data files
├── docker-compose.dev.yml    # Development environment
└── docker-compose.prod.yml   # Production environment
```

## Docker Configuration Details

### Development Container

- **Base Image**: Node 18 Alpine
- **Port**: 5173
- **Features**: Hot reload, source code volume mount
- **Network**: ai-restaurant-network

### Production Container

- **Build**: Multi-stage (Builder -> Nginx)
- **Base Image**: Nginx Alpine
- **Port**: 80
- **Features**: Optimized static file serving, SPA routing support
- **Health Check**: Configured with curl

### Container Management

View running containers:

```bash
docker ps
```

View container logs:

```bash
# Development logs
docker logs ai-restaurant-frontend-dev

# Production logs
docker logs ai-restaurant-frontend-prod
docker logs ai-restaurant-nginx
```

Clean up Docker resources:

```bash
# Remove stopped containers
docker-compose -f docker-compose.dev.yml down

# Remove all project volumes (warning: deletes data)
docker-compose -f docker-compose.dev.yml down -v

# Remove built images
docker rmi ai-restaurant-frontend-dev ai-restaurant-frontend-prod
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend

- `npm run build` - Compile TypeScript
- `npm run serve` - Start Firebase emulators
- `npm run deploy` - Deploy to Firebase
- `npm run logs` - View function logs

### Scripts

- `npm run upload` - Upload menu data to Firestore
- `npm run delete` - Delete menu data from Firestore

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Development Workflow

1. Create a new branch for your feature
2. Make changes in the appropriate directory
3. Test using Docker development environment
4. Build and test production version
5. Commit changes and create pull request

## Testing

### Development Testing

```bash
# Run development environment
docker-compose -f docker-compose.dev.yml up frontend-dev

# In another terminal, run tests
cd frontend
npm test
```

### Production Build Testing

```bash
# Build and run production environment
docker-compose -f docker-compose.prod.yml up --build

# Test the production build at http://localhost
```

## Troubleshooting

### Port Already in Use

If port 5173 or 80 is already in use:

```bash
# Find process using the port
lsof -i :5173  # or :80

# Kill the process
kill -9 [PID]
```

### Docker Build Issues

```bash
# Clean rebuild
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Node Modules Issues

```bash
# Remove node_modules and reinstall
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

[License Type] - See LICENSE file for details