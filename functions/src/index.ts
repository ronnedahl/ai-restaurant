import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Example function - will be replaced with real functions later
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase Cloud Functions!");
});

// Menu API endpoint (placeholder for now)
export const getMenu = functions.https.onRequest(async (request, response) => {
  response.json({
    message: "Menu API endpoint - to be implemented",
    items: []
  });
});