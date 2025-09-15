import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  imageAlt: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  imageAlt,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleRemove = () => {
    onRemoveItem(id);
  };

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-16 h-16 object-cover rounded-lg bg-[#F7F9FC]"
        />
      </div>

      {/* Product Info and Controls */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-[#333333]">{name}</h3>
            <p className="text-sm text-[#A0AEC0]">${price.toFixed(2)}</p>
          </div>
          
          {/* Delete Button */}
          <button
            onClick={handleRemove}
            className="p-2 text-[#718096] hover:text-[#333333] transition-colors"
            aria-label={`Remove ${name} from cart`}
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="flex items-center justify-center w-8 h-8 bg-[#EDF2F7] hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} className="text-[#333333]" />
          </button>
          
          <span className="w-8 text-center font-medium text-[#333333]">
            {quantity}
          </span>
          
          <button
            onClick={handleIncrease}
            className="flex items-center justify-center w-8 h-8 bg-[#EDF2F7] hover:bg-[#E2E8F0] rounded-md transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} className="text-[#333333]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;