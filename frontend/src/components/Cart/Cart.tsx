import React from 'react';

const Cart: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#333333] mb-2">Your Order</h1>
          <p className="text-[#A0AEC0]">Review your items and proceed to checkout.</p>
        </div>
        
        {/* TODO: Order items will go here */}
        <div className="space-y-4 mb-6">
          <p className="text-[#718096]">Cart items will be displayed here</p>
        </div>
        
        {/* TODO: Price summary will go here */}
        <div className="border-t pt-4 mb-6">
          <p className="text-[#718096]">Price summary will go here</p>
        </div>
        
        {/* Checkout button */}
        <button className="w-full bg-[#50D178] hover:bg-[#4CAF50] text-white font-medium py-3 px-4 rounded-lg transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;