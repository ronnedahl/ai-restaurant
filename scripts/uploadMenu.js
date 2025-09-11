require('dotenv').config();
const path = require('path');
const firestoreService = require('./services/firestoreService');
const menuData = require('./data/menuData');

/**
 * Main function to upload menu data to Firestore
 */
async function uploadMenuToFirestore() {
    console.log('🚀 Starting menu upload process...\n');
    
    try {
        // Step 1: Initialize Firebase
        const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
                                  path.join(__dirname, 'serviceAccount.json');
        
        console.log(`📁 Looking for service account at: ${serviceAccountPath}`);
        firestoreService.initializeFirebase(serviceAccountPath);
        
        // Step 2: Upload menu data
        console.log('\n📤 Uploading menu data...');
        await firestoreService.uploadMenuData(menuData);
        
        // Step 3: Verify the upload
        console.log('\n🔍 Verifying uploaded data...');
        const verifiedData = await firestoreService.verifyUploadedData();
        
        // Step 4: Display summary
        console.log('\n📊 Upload Summary:');
        console.log(`   Restaurant: ${verifiedData.restaurant.name}`);
        console.log(`   Currency: ${verifiedData.restaurant.currency}`);
        console.log(`   Total dishes: ${verifiedData.dishes.length}`);
        
        // Display categories count
        const categories = [...new Set(verifiedData.dishes.map(d => d.category))];
        console.log(`   Categories: ${categories.join(', ')}`);
        
        console.log('\n✨ Menu upload completed successfully!');
        
    } catch (error) {
        console.error('\n❌ Upload failed:', error.message);
        console.error('\n💡 Tips:');
        console.error('   1. Make sure you have a serviceAccount.json file in the scripts folder');
        console.error('   2. Or set FIREBASE_SERVICE_ACCOUNT_PATH in your .env file');
        console.error('   3. Download the service account key from Firebase Console:');
        console.error('      Project Settings → Service Accounts → Generate New Private Key');
        process.exit(1);
    }
}

// Add command line arguments support
const args = process.argv.slice(2);

if (args.includes('--delete')) {
    // Delete mode
    console.log('🗑️  Delete mode activated...\n');
    
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
                              path.join(__dirname, 'serviceAccount.json');
    
    firestoreService.initializeFirebase(serviceAccountPath);
    
    firestoreService.deleteAllMenuData()
        .then(() => {
            console.log('\n✨ Cleanup completed!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Delete failed:', error.message);
            process.exit(1);
        });
} else if (args.includes('--help')) {
    // Help mode
    console.log('📖 Menu Upload Script - Help\n');
    console.log('Usage: node uploadMenu.js [options]\n');
    console.log('Options:');
    console.log('  --help    Show this help message');
    console.log('  --delete  Delete all menu data from Firestore');
    console.log('  (no args) Upload menu data to Firestore\n');
    console.log('Requirements:');
    console.log('  - serviceAccount.json file in scripts folder');
    console.log('  - Or FIREBASE_SERVICE_ACCOUNT_PATH in .env file\n');
} else {
    // Default: upload mode
    uploadMenuToFirestore();
}