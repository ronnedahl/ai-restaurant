import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

def test_firebase():
    try:
        print("🔥 Testing Firebase connection...")
        
        # Testa service account fil
        service_account_path = "ai-restaurant-97fbe-firebase-adminsdk-fbsvc-76f758d9d8.json"
        if not os.path.exists(service_account_path):
            print(f"❌ Service account file not found: {service_account_path}")
            return False
        
        print(f"✅ Service account file exists: {service_account_path}")
        
        # Initiera Firebase (om inte redan gjort)
        if not firebase_admin._apps:
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
            print("✅ Firebase initialized successfully")
        else:
            print("✅ Firebase already initialized")
        
        # Testa Firestore-anslutning
        db = firestore.client()
        print("✅ Firestore client created")
        
        # Testa läsa från menu collection
        menu_collection = os.getenv("MENU_COLLECTION", "menu")
        print(f"📋 Testing collection: {menu_collection}")
        
        # Läs första 3 dokument
        docs = db.collection(menu_collection).limit(3).stream()
        doc_count = 0
        
        for doc in docs:
            doc_count += 1
            print(f"📄 Document {doc_count}: {doc.id}")
            data = doc.to_dict()
            if 'name' in data:
                print(f"   Name: {data['name']}")
        
        if doc_count == 0:
            print(f"⚠️  No documents found in '{menu_collection}' collection")
            
            # Lista alla collections
            print("📂 Available collections:")
            collections = db.collections()
            for collection in collections:
                print(f"   - {collection.id}")
        else:
            print(f"✅ Successfully read {doc_count} documents from Firebase")
        
        return True
        
    except Exception as e:
        print(f"❌ Firebase Error: {e}")
        print(f"Error type: {type(e).__name__}")
        return False

if __name__ == "__main__":
    test_firebase()