import React from 'react';

interface PriceSummaryProps {
  subtotal: number;
  deliveryFee: number;
  taxes: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  subtotal,
  deliveryFee,
  taxes,
}) => {
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="space-y-2">
      {/* Subtotal */}
      <div className="flex justify-between items-center">
        <span className="text-[#333333]">Subtotal</span>
        <span className="text-[#333333]">${subtotal.toFixed(2)}</span>
      </div>

      {/* Delivery Fee */}
      <div className="flex justify-between items-center">
        <span className="text-[#333333]">Delivery Fee</span>
        <span className="text-[#333333]">${deliveryFee.toFixed(2)}</span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between items-center">
        <span className="text-[#333333]">Taxes</span>
        <span className="text-[#333333]">${taxes.toFixed(2)}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-[#EDF2F7] my-3"></div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-[#333333] text-lg">Total</span>
        <span className="font-bold text-[#333333] text-lg">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceSummary;