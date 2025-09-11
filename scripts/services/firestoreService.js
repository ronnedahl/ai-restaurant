const admin = require('firebase-admin');
const path = require('path');

class FirestoreService {
    constructor() {
        this.db = null;
    }

    /**
     * Initialize Firebase Admin SDK with service account
     * @param {string} serviceAccountPath - Path to service account JSON file
     */
    initializeFirebase(serviceAccountPath) {
        try {
            // Resolve the path relative to the scripts directory
            const resolvedPath = path.resolve(serviceAccountPath);
            const serviceAccount = require(resolvedPath);
            
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });

            this.db = admin.firestore();
            console.log('✅ Firebase Admin initialized successfully');
            return this.db;
        } catch (error) {
            console.error('❌ Error initializing Firebase:', error.message);
            throw error;
        }
    }

    /**
     * Upload menu data to Firestore
     * @param {Object} menuData - The menu data to upload
     */
    async uploadMenuData(menuData) {
        if (!this.db) {
            throw new Error('Firestore not initialized. Call initializeFirebase first.');
        }

        try {
            // Upload restaurant metadata
            const restaurantRef = this.db.collection('restaurants').doc('main');
            await restaurantRef.set({
                name: menuData.restaurant,
                currency: menuData.currency,
                lastUpdated: menuData.last_updated,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ Restaurant metadata uploaded');

            // Upload dishes to a subcollection
            const dishesRef = restaurantRef.collection('dishes');
            
            // Use batch for better performance
            const batch = this.db.batch();
            
            menuData.dishes.forEach((dish) => {
                const dishDoc = dishesRef.doc(dish.id);
                batch.set(dishDoc, {
                    ...dish,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
            });

            await batch.commit();
            console.log(`✅ Successfully uploaded ${menuData.dishes.length} dishes`);
            
            return true;
        } catch (error) {
            console.error('❌ Error uploading menu data:', error);
            throw error;
        }
    }

    /**
     * Verify uploaded data by reading it back
     * @returns {Object} The uploaded menu data
     */
    async verifyUploadedData() {
        if (!this.db) {
            throw new Error('Firestore not initialized. Call initializeFirebase first.');
        }

        try {
            // Get restaurant metadata
            const restaurantDoc = await this.db.collection('restaurants').doc('main').get();
            
            if (!restaurantDoc.exists) {
                throw new Error('Restaurant document not found');
            }

            // Get all dishes
            const dishesSnapshot = await this.db
                .collection('restaurants')
                .doc('main')
                .collection('dishes')
                .get();

            const dishes = [];
            dishesSnapshot.forEach(doc => {
                dishes.push({ id: doc.id, ...doc.data() });
            });

            console.log(`✅ Verification complete: Found ${dishes.length} dishes`);
            
            return {
                restaurant: restaurantDoc.data(),
                dishes: dishes
            };
        } catch (error) {
            console.error('❌ Error verifying data:', error);
            throw error;
        }
    }

    /**
     * Delete all menu data (useful for cleanup)
     */
    async deleteAllMenuData() {
        if (!this.db) {
            throw new Error('Firestore not initialized. Call initializeFirebase first.');
        }

        try {
            // Delete all dishes
            const dishesSnapshot = await this.db
                .collection('restaurants')
                .doc('main')
                .collection('dishes')
                .get();

            const batch = this.db.batch();
            dishesSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            
            // Delete restaurant document
            await this.db.collection('restaurants').doc('main').delete();
            
            console.log('✅ All menu data deleted successfully');
            return true;
        } catch (error) {
            console.error('❌ Error deleting data:', error);
            throw error;
        }
    }
}

module.exports = new FirestoreService();