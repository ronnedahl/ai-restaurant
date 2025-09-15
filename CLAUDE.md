CLAUDE.md

Denna fil ger vägledning till Claude Code (claude.ai/code) när du arbetar med kod i detta repository.
Project Overview

Projektidé: AI-meny & beställningsassistent för en restaurangwebbplats.


Ett live-widget (webb/PWA) där användaren kan:

    Ställa frågor om rätter, allergener och dagens rätt.

    Få personliga rekommendationer (“glutenfritt under 120 kr, gärna fisk”).

    Lägga varor i varukorg via AI-anrop (tool-calls).

    Kolla beställningsstatus (“var är min order?”).

    Eskalera till en människa vid behov.

Grundprincip: Vi bygger denna applikation gren för gren, i en serie av små, hanterbara steg. Jag är en junior utvecklare och behöver att du agerar som min guide och bryter ner problem i minsta möjliga delar.

## Our Workflow:

    Jag definierar målet: Jag börjar med att skapa en ny Git-gren och berättar för dig det övergripande målet för den specifika grenen.

    Du föreslår det första steget: Du föreslår sedan det allra första, lilla och logiska steget för att uppnå målet.

    Jag godkänner: Jag säger "Ja" eller "Okej" för att godkänna ditt förslag.

    Du skriver koden: När jag har godkänt, ger du mig koden för endast det enskilda steget.

    Du föreslår nästa steg: Efter att ha skrivit koden, föreslår du omedelbart nästa lilla steg.

    Vi upprepar: Vi fortsätter denna loop tills målet för grenen är uppfyllt.

## Huvudregel: 

Skriv inte all kod på en gång. Din roll är att guida mig ett steg i taget. Jag meddelar dig när målet för grenen är uppnått.
The Slice Plan (Our Project Roadmap)

Här är den övergripande planen vi kommer att följa, slice för slice. Varje slice kommer att ha sin egen Git-gren.

    Slice 0: Projektets Grundstomme. Sätta upp Git, Firebase (Firestore, Functions, Hosting) och en minimal React-app. Installera och konfigurera shadcn/ui.

    Slice 1: Visa en Statisk Meny. Skapa menysidan som hämtar och visar data från vår Mock API Server. Bygg UI med shadcn/ui-komponenter.

    Slice 2: Grundläggande Varukorgsfunktion. Implementera CartContext och koppla "Add"-knapparna.

    Slice 3: Bygg Varukorgsvyn. Skapa sidan som visar innehållet från CartContext med shadcn/ui-komponenter.

    Slice 4: AI-assistentens Gränssnitt (UI). Bygga ett chattfönster med shadcn/ui-komponenter.

    Slice 5: Koppla på AI för Frågor & Svar. Byt ut anropen från Mock API Server till den riktiga Firebase Cloud Function.

Essential Commands
code Bash
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END

    
# Frontend Development (i /frontend mappen)
npm install      # Installera frontend-beroenden
npm run dev      # Starta utvecklingsserver för frontend på http://localhost:5173

## NYTT/UPPDATERAT ##
# Mock Server (i /frontend mappen)
npm run mock:server # Starta den lokala mock-API-servern för att simulera backend

# Backend Development (i /functions mappen)
npm install      # Installera backend-beroenden
firebase emulators:start # Starta lokal Firebase-emulator

# Deployment
firebase deploy
=======
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
 

  

Architecture Overview
Technology Stack

    Frontend: React (med Vite) & TypeScript

    Backend: Node.js i Firebase Cloud Functions

    Databas: Firestore (NoSQL-databas)

    Hosting: Firebase Hosting

    Styling: Tailwind CSS

## NYTT/UPPDATERAT ##

    UI Components: shadcn/ui (byggt på Radix UI & Tailwind CSS). Vi kommer att använda detta för alla UI-element som knappar, dialogrutor och kort.

    AI Integration: Google Gemini API (eller liknande)

Core Architecture Patterns

    Backend as an API: Firebase Cloud Functions fungerar som våra serverlösa API-endpoints.


