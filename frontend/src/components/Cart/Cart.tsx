import React from 'react';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import PriceSummary from './PriceSummary';

const Cart: React.FC = () => {
  const { items, totalAmount, updateQuantity, removeFromCart } = useCart();

  // Calculate price breakdown
  const subtotal = totalAmount;
  const deliveryFee = 2.99;
  const taxRate = 0.08; // 8% tax
  const taxes = subtotal * taxRate;

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#333333] mb-2">Your Order</h1>
          <p className="text-[#A0AEC0]">Review your items and proceed to checkout.</p>
        </div>
        
        {/* Order items */}
        <div className="space-y-4 mb-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#A0AEC0] text-lg">Your cart is empty</p>
              <p className="text-[#718096] text-sm mt-2">Add some delicious items to get started!</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id}>
                <CartItem
                  id={item.id}
                  name={item.name}
                  price={item.priceSek}
                  quantity={item.quantity}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
                {index < items.length - 1 && (
                  <hr className="border-[#EDF2F7] my-4" />
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Price summary */}
        {items.length > 0 && (
          <>
            <div className="border-t border-[#EDF2F7] pt-4 mb-6">
              <PriceSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                taxes={taxes}
              />
            </div>
            
            {/* Checkout button */}
            <button className="w-full bg-[#50D178] hover:bg-[#4CAF50] text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;