"""Order service for managing customer orders and cart operations."""

import json
from typing import Dict, List, Any, Optional
from datetime import datetime
import structlog
from firebase_admin import firestore
from src.config import settings

logger = structlog.get_logger()


class OrderService:
    """Service for managing customer orders and cart operations."""
    
    def __init__(self):
        """Initialize the order service."""
        # Use the already initialized Firebase Admin SDK from menu_service
        self.db = firestore.client()
        self.collection = settings.orders_collection
        
    async def create_order(
        self,
        user_id: str,
        items: List[Dict[str, Any]],
        customer_info: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Create a new order.
        
        Args:
            user_id: Customer identifier
            items: List of order items with id, name, price, quantity
            customer_info: Optional customer contact information
            
        Returns:
            Created order data with order_id
        """
        try:
            # Calculate totals
            subtotal = sum(item['price'] * item['quantity'] for item in items)
            delivery_fee = 2.99 if subtotal < 50 else 0  # Free delivery over 50 SEK
            tax_rate = 0.08
            taxes = subtotal * tax_rate
            total = subtotal + delivery_fee + taxes
            
            # Create order document
            order_data = {
                'user_id': user_id,
                'items': items,
                'pricing': {
                    'subtotal': round(subtotal, 2),
                    'delivery_fee': delivery_fee,
                    'taxes': round(taxes, 2),
                    'total': round(total, 2)
                },
                'customer_info': customer_info or {},
                'status': 'pending',
                'created_at': datetime.now(),
                'updated_at': datetime.now(),
                'estimated_delivery': self._calculate_delivery_time()
            }
            
            # Save to Firestore
            doc_ref = self.db.collection(self.collection).add(order_data)
            order_id = doc_ref[1].id
            
            order_data['order_id'] = order_id
            
            logger.info(
                "order_created",
                order_id=order_id,
                user_id=user_id,
                total=total,
                items_count=len(items)
            )
            
            return order_data
            
        except Exception as e:
            logger.error("failed_to_create_order", error=str(e))
            raise Exception(f"Failed to create order: {str(e)}")
    
    async def get_order(self, order_id: str) -> Optional[Dict[str, Any]]:
        """
        Get order by ID.
        
        Args:
            order_id: The order document ID
            
        Returns:
            Order data or None if not found
        """
        try:
            doc_ref = self.db.collection(self.collection).document(order_id)
            doc = doc_ref.get()
            
            if doc.exists:
                order = doc.to_dict()
                order['order_id'] = doc.id
                return order
            
            return None
            
        except Exception as e:
            logger.error("failed_to_get_order", order_id=order_id, error=str(e))
            return None
    
    async def update_order_status(
        self, 
        order_id: str, 
        status: str,
        notes: str = None
    ) -> bool:
        """
        Update order status.
        
        Args:
            order_id: The order document ID
            status: New status (pending, confirmed, preparing, ready, delivered, cancelled)
            notes: Optional status notes
            
        Returns:
            True if updated successfully, False otherwise
        """
        try:
            doc_ref = self.db.collection(self.collection).document(order_id)
            
            update_data = {
                'status': status,
                'updated_at': datetime.now()
            }
            
            if notes:
                update_data['status_notes'] = notes
            
            doc_ref.update(update_data)
            
            logger.info(
                "order_status_updated",
                order_id=order_id,
                status=status
            )
            
            return True
            
        except Exception as e:
            logger.error(
                "failed_to_update_order_status",
                order_id=order_id,
                error=str(e)
            )
            return False
    
    async def get_user_orders(
        self, 
        user_id: str, 
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Get recent orders for a user.
        
        Args:
            user_id: Customer identifier
            limit: Maximum number of orders to return
            
        Returns:
            List of user orders sorted by creation date (newest first)
        """
        try:
            query_ref = (
                self.db.collection(self.collection)
                .where('user_id', '==', user_id)
                .order_by('created_at', direction=firestore.Query.DESCENDING)
                .limit(limit)
            )
            
            docs = query_ref.stream()
            orders = []
            
            for doc in docs:
                order = doc.to_dict()
                order['order_id'] = doc.id
                orders.append(order)
            
            logger.info(
                "user_orders_fetched",
                user_id=user_id,
                orders_count=len(orders)
            )
            
            return orders
            
        except Exception as e:
            logger.error(
                "failed_to_get_user_orders",
                user_id=user_id,
                error=str(e)
            )
            return []
    
    async def add_to_cart(
        self,
        user_id: str,
        item_id: str,
        quantity: int = 1
    ) -> Dict[str, Any]:
        """
        Add item to user's cart (temporary order).
        
        Args:
            user_id: Customer identifier
            item_id: Menu item ID
            quantity: Number of items to add
            
        Returns:
            Updated cart information
        """
        try:
            # This would typically be stored in a separate cart collection
            # or as a temporary order with status 'cart'
            # For now, we'll return a success response
            
            logger.info(
                "item_added_to_cart",
                user_id=user_id,
                item_id=item_id,
                quantity=quantity
            )
            
            return {
                'success': True,
                'message': f'Added {quantity} item(s) to cart',
                'user_id': user_id,
                'item_id': item_id,
                'quantity': quantity
            }
            
        except Exception as e:
            logger.error(
                "failed_to_add_to_cart",
                user_id=user_id,
                item_id=item_id,
                error=str(e)
            )
            raise Exception(f"Failed to add item to cart: {str(e)}")
    
    def _calculate_delivery_time(self) -> datetime:
        """
        Calculate estimated delivery time.
        
        Returns:
            Estimated delivery datetime (45 minutes from now)
        """
        from datetime import timedelta
        return datetime.now() + timedelta(minutes=45)
    
    async def get_order_status_info(self, order_id: str) -> Dict[str, Any]:
        """
        Get detailed status information for an order.
        
        Args:
            order_id: The order document ID
            
        Returns:
            Order status information with timeline
        """
        try:
            order = await self.get_order(order_id)
            if not order:
                return {'error': 'Order not found'}
            
            # Calculate progress based on status
            status_map = {
                'pending': {'progress': 10, 'message': 'Order received'},
                'confirmed': {'progress': 25, 'message': 'Order confirmed'},
                'preparing': {'progress': 60, 'message': 'Being prepared'},
                'ready': {'progress': 85, 'message': 'Ready for pickup/delivery'},
                'delivered': {'progress': 100, 'message': 'Delivered'},
                'cancelled': {'progress': 0, 'message': 'Order cancelled'}
            }
            
            current_status = order.get('status', 'pending')
            status_info = status_map.get(current_status, status_map['pending'])
            
            return {
                'order_id': order_id,
                'status': current_status,
                'progress': status_info['progress'],
                'message': status_info['message'],
                'estimated_delivery': order.get('estimated_delivery'),
                'created_at': order.get('created_at'),
                'updated_at': order.get('updated_at')
            }
            
        except Exception as e:
            logger.error(
                "failed_to_get_order_status_info",
                order_id=order_id,
                error=str(e)
            )
            return {'error': f'Failed to get order status: {str(e)}'}