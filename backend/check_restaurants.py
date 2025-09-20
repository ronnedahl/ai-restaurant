import firebase_admin
from firebase_admin import credentials, firestore

# Initiera Firebase om inte redan gjort
if not firebase_admin._apps:
    cred = credentials.Certificate("ai-restaurant-97fbe-firebase-adminsdk-fbsvc-76f758d9d8.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

print("🔍 Checking 'restaurants' collection...")

try:
    # Läs första 5 dokument från restaurants
    docs = db.collection("restaurants").limit(5).stream()
    
    for i, doc in enumerate(docs, 1):
        print(f"\n📄 Document {i}: {doc.id}")
        data = doc.to_dict()
        
        # Visa några nycklar för att förstå strukturen
        keys = list(data.keys())[:5]  # Första 5 nycklar
        print(f"   Keys: {keys}")
        
        # Om det finns name eller title
        if 'name' in data:
            print(f"   Name: {data['name']}")
        if 'title' in data:
            print(f"   Title: {data['title']}")
        if 'menu' in data:
            print(f"   Menu items: {len(data['menu'])} items" if isinstance(data['menu'], list) else "Menu field exists")

except Exception as e:
    print(f"❌ Error reading restaurants: {e}")

print("\n🔧 Quick fix: Update your .env file to use 'restaurants' collection")