# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered restaurant menu & ordering assistant - A live widget (web/PWA) where users can:
- Ask questions about dishes, allergens, and daily specials
- Get personalized recommendations ("gluten-free under 120 SEK, preferably fish")
- Add items to cart via AI calls (tool-calls)
- Check order status
- Escalate to human support when needed

## Development Workflow

**Core Principle**: Build this application branch by branch in small, manageable steps. Work as a guide for a junior developer, breaking down problems into minimal parts.

**Step-by-step workflow**:
1. Developer defines the goal (creates new Git branch and states the objective)
2. Suggest the first small, logical step
3. Wait for approval ("Yes" or "Okay")
4. Write code for ONLY that single step
5. Immediately suggest the next small step
6. Repeat until branch goal is achieved

**Main Rule**: Never write all code at once. Guide one step at a time.

## Essential Commands

```bash
# Frontend Development (in /frontend folder)
npm install      # Install frontend dependencies
npm run dev      # Start development server on http://localhost:5173
npm run build    # Build for production
npm run lint     # Run linting

# Mock Server (in /frontend folder)
npm run mock:server # Start local mock API server to simulate backend

# Backend Development (in /functions folder)
npm install      # Install backend dependencies
npm run serve    # Build and start Firebase emulators
firebase emulators:start # Start local Firebase emulator

# Deployment
firebase deploy
```

## Architecture

**Technology Stack**:
- Frontend: React with Vite & TypeScript
- Backend: Node.js Firebase Cloud Functions
- Database: Firestore (NoSQL)
- Hosting: Firebase Hosting
- Styling: Tailwind CSS v4
- UI Components: shadcn/ui (Radix UI + Tailwind)
- AI Integration: Google Gemini API (or similar)

**Project Structure**:
```
/frontend        # React application
  /src
    /config      # Firebase configuration
    /lib         # Utilities (shadcn utils)
    /assets      # Static assets
/functions       # Firebase Cloud Functions
```

**Path Aliases**:
- `@/` → `/frontend/src/`
- `@/components` → UI components
- `@/lib` → Utilities
- `@/ui` → shadcn/ui components

## Development Slice Plan

**Slice 0**: Project Foundation - Git, Firebase (Firestore, Functions, Hosting), minimal React app, shadcn/ui setup

**Slice 1**: Static Menu Display - Menu page fetching data from Mock API Server, UI with shadcn/ui

**Slice 2**: Basic Cart Functionality - CartContext implementation, connect "Add" buttons

**Slice 3**: Cart View - Display CartContext content with shadcn/ui components

**Slice 4**: AI Assistant UI - Chat window with shadcn/ui components

**Slice 5**: AI Integration - Replace Mock API calls with real Firebase Cloud Functions

## Key Implementation Patterns

**State Management**: React Context API for global state
- `CartContext`: Manages cart products, quantities, total price

**Development Approach**:
- Mock Server for frontend development (Slice 1-4) - simulate API responses independently of backend
- UI First with shadcn/ui - prioritize building with ready-made, customizable components
- Environment variables in `.env` for Firebase configuration
- Firebase Emulator Suite for local backend testing (later slices)

**Code Standards**:
- Modular, maintainable code
- Use shadcn/ui components wherever possible
- TypeScript for type safety