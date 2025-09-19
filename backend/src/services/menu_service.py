"""Menu service for fetching and managing restaurant menu data."""

import json
import os
from typing import Dict, List, Any, Optional
import structlog
import firebase_admin
from firebase_admin import credentials, firestore
from src.config import settings

logger = structlog.get_logger()

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    # Try to use the service account file
    service_account_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        "ai-restaurant-97fbe-firebase-adminsdk-fbsvc-76f758d9d8.json"
    )
    
    if os.path.exists(service_account_path):
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred)
        logger.info("Firebase initialized with service account file")
    else:
        # Fallback to environment variables
        firebase_admin.initialize_app()
        logger.info("Firebase initialized with default credentials")


class MenuService:
    """Service for managing menu data from Firestore."""
    
    def __init__(self):
        """Initialize the menu service."""
        self.db = firestore.client()
        
    async def get_all_menu_items(self) -> Dict[str, List[Dict[str, Any]]]:
        """
        Fetch all menu items organized by category.
        
        Returns:
            Dict with categories as keys and list of items as values
        """
        try:
            # Get all dishes from Firebase
            dishes_ref = self.db.collection('restaurants').document('main').collection('dishes')
            docs = dishes_ref.stream()
            
            # Organize by category
            menu_by_category = {}
            for doc in docs:
                item = doc.to_dict()
                item['id'] = doc.id
                
                category = item.get('category', 'Other')
                if category not in menu_by_category:
                    menu_by_category[category] = []
                    
                menu_by_category[category].append(item)
            
            logger.info("menu_items_fetched", categories=list(menu_by_category.keys()))
            return menu_by_category
            
        except Exception as e:
            logger.error("failed_to_fetch_menu", error=str(e))
            return {}
    
    async def get_item_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        """
        Get a specific menu item by ID.
        
        Args:
            item_id: The document ID of the menu item
            
        Returns:
            Menu item data or None if not found
        """
        try:
            doc_ref = self.db.collection(self.collection).document(item_id)
            doc = doc_ref.get()
            
            if doc.exists:
                item = doc.to_dict()
                item['id'] = doc.id
                return item
            
            return None
            
        except Exception as e:
            logger.error("failed_to_fetch_item", item_id=item_id, error=str(e))
            return None
    
    async def search_items(
        self, 
        query: str = None,
        category: str = None,
        max_price: float = None,
        allergens_exclude: List[str] = None,
        tags: List[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Search menu items with filters.
        
        Args:
            query: Text search query
            category: Filter by category
            max_price: Maximum price in SEK
            allergens_exclude: List of allergens to exclude
            tags: List of tags to include (e.g., "vegetarian", "gluten-free")
            
        Returns:
            List of matching menu items
        """
        try:
            # Start with base query
            query_ref = self.db.collection(self.collection)
            
            # Apply category filter
            if category:
                query_ref = query_ref.where('category', '==', category)
            
            # Apply price filter
            if max_price:
                query_ref = query_ref.where('priceSek', '<=', max_price)
            
            # Get results
            docs = query_ref.stream()
            results = []
            
            for doc in docs:
                item = doc.to_dict()
                item['id'] = doc.id
                
                # Filter by allergens
                if allergens_exclude:
                    item_allergens = item.get('allergens', [])
                    if any(allergen in item_allergens for allergen in allergens_exclude):
                        continue
                
                # Filter by tags
                if tags:
                    item_tags = item.get('tags', [])
                    if not any(tag in item_tags for tag in tags):
                        continue
                
                # Text search in name and description
                if query:
                    query_lower = query.lower()
                    name_match = query_lower in item.get('name', '').lower()
                    desc_match = query_lower in item.get('description', '').lower()
                    if not (name_match or desc_match):
                        continue
                
                results.append(item)
            
            logger.info(
                "menu_search_completed",
                query=query,
                results_count=len(results)
            )
            return results
            
        except Exception as e:
            logger.error("menu_search_failed", error=str(e))
            return []
    
    async def get_daily_specials(self) -> List[Dict[str, Any]]:
        """
        Get today's special menu items.
        
        Returns:
            List of special menu items
        """
        try:
            # Query items marked as daily specials
            query_ref = self.db.collection(self.collection).where('isDailySpecial', '==', True)
            docs = query_ref.stream()
            
            specials = []
            for doc in docs:
                item = doc.to_dict()
                item['id'] = doc.id
                specials.append(item)
            
            logger.info("daily_specials_fetched", count=len(specials))
            return specials
            
        except Exception as e:
            logger.error("failed_to_fetch_specials", error=str(e))
            return []