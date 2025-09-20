import firebase_admin
from firebase_admin import credentials, firestore

# Initiera Firebase om inte redan gjort
if not firebase_admin._apps:
    cred = credentials.Certificate("ai-restaurant-97fbe-firebase-adminsdk-fbsvc-76f758d9d8.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

print("🔍 Checking dishes subcollection...")

try:
    # Rätt path: restaurants/main/dishes
    dishes_ref = db.collection("restaurants").document("main").collection("dishes")
    
    # Läs första 5 dishes
    docs = dishes_ref.limit(5).stream()
    
    dish_count = 0
    for doc in docs:
        dish_count += 1
        print(f"\n📄 Dish {dish_count}: {doc.id}")
        data = doc.to_dict()
        
        # Visa dish information
        if 'name' in data:
            print(f"   Name: {data['name']}")
        if 'price' in data:
            print(f"   Price: {data['price']}")
        if 'priceSek' in data:
            print(f"   Price: {data['priceSek']} SEK")
        if 'category' in data:
            print(f"   Category: {data['category']}")
    
    if dish_count == 0:
        print("❌ No dishes found in restaurants/main/dishes")
        
        # Kolla om main document finns
        main_doc = db.collection("restaurants").document("main").get()
        if main_doc.exists:
            print("✅ Main document exists")
            data = main_doc.to_dict()
            if data:
                print(f"   Keys in main: {list(data.keys())}")
        else:
            print("❌ Main document does not exist")
    else:
        print(f"\n✅ Found {dish_count} dishes in the subcollection!")
        
except Exception as e:
    print(f"❌ Error: {e}")

print("\n🔧 Update needed: Backend should use restaurants/main/dishes path")