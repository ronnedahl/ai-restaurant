Project Overview

Projektidé: AI-meny & beställningsassistent för en restaurangwebbplats.

Ett live-widget (webb/PWA) där användaren kan:

    Ställa frågor om rätter, allergener och dagens rätt.

    Få personliga rekommendationer (“glutenfritt under 120 kr, gärna fisk”).

    Lägga varor i varukorg via AI-anrop (tool-calls).

    Kolla beställningsstatus (“var är min order?”).

    Eskalera till en människa vid behov.

Grundprincip: Vi bygger denna applikation gren för gren, i en serie av små, hanterbara steg. Jag är en junior utvecklare och behöver att du agerar som min guide och bryter ner problem i minsta möjliga delar.
Our Workflow:

    Jag definierar målet: Jag börjar med att skapa en ny Git-gren och berättar för dig det övergripande målet för den specifika grenen.

    Du föreslår det första steget: Du föreslår sedan det allra första, lilla och logiska steget för att uppnå målet.

    Jag godkänner: Jag säger "Ja" eller "Okej" för att godkänna ditt förslag.

    Du skriver koden: När jag har godkänt, ger du mig koden för endast det enskilda steget.

    Du föreslår nästa steg: Efter att ha skrivit koden, föreslår du omedelbart nästa lilla steg.

    Vi upprepar: Vi fortsätter denna loop tills målet för grenen är uppfyllt.

Huvudregel: Skriv inte all kod på en gång. Din roll är att guida mig ett steg i taget. Jag meddelar dig när målet för grenen är uppnått.
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

    UI First with Shadcn: Vi kommer att prioritera att bygga gränssnittet med färdiga, anpassningsbara komponenter från shadcn/ui för att säkerställa ett konsekvent, tillgängligt och professionellt utseende från grunden.

## NYTT/UPPDATERAT ##

    State Management & Application Contexts:

        Vi använder React Context API för att hantera global state. Varje "domän" får sin egen context.

        CartContext.jsx: Hanterar alla aspekter av varukorgen: produkter, antal, totalpris och funktioner för att ändra den.

        (När appen växer kan vi lägga till fler contexts, t.ex. AuthContext eller UserPreferencesContext).

Key Implementation Details

    Projektstruktur: En monorepo-liknande struktur med separata mappar för frontend och functions.

Development Considerations

## NYTT/UPPDATERAT ##

    Mock Server for Frontend Development: För att kunna utveckla frontenden snabbt och oberoende av den riktiga backenden (Firebase Functions) ska vi använda en lokal mock-server (t.ex. med json-server eller msw). Denna server kommer att simulera API-svaren från getMenu och andra endpoints. Detta är vår primära datakälla under Slice 1-4.

    Environment Variables: En .env-fil i /frontend kommer att användas för Firebase-konfiguration. Känsliga nycklar hanteras säkert i Cloud Functions.

    Firebase Emulator Suite: Används senare i projektet för att testa den riktiga backend-integrationen lokalt.

    Kodning: Koden ska vara modulär, lätt att underhålla och felsöka. Använd shadcn/ui-komponenter där det är möjligt.