import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { MenuItem as MenuItemType } from '../../services/mockApi';

interface MenuItemProps {
  dish: MenuItemType;
  onAddToCart: (dish: MenuItemType) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ dish, onAddToCart }) => {
  // Mappa tags till etiketter och färger
  const getTagStyle = (tag: string): string => {
    const tagStyles: Record<string, string> = {
      'vegetariskt': 'bg-green-100 text-green-700',
      'veganskt': 'bg-green-100 text-green-700',
      'glutenfritt': 'bg-blue-100 text-blue-700',
      'laktosfritt': 'bg-purple-100 text-purple-700',
      'populärt': 'bg-yellow-100 text-yellow-700',
      'klassiker': 'bg-orange-100 text-orange-700',
      'barnvänligt': 'bg-pink-100 text-pink-700'
    };
    return tagStyles[tag.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  // Välj vilka tags som ska visas (prioritera vegetariskt/veganskt och allergener)
  const displayTags = () => {
    const priorityTags = [];
    
    // Kolla om rätten är vegetarisk eller vegansk
    if (dish.category === 'Vegetariskt') {
      priorityTags.push('Vegetariskt');
    }
    if (dish.category === 'Veganskt') {
      priorityTags.push('Veganskt');
    }
    
    // Lägg till glutenfritt om det finns i tags eller om det är glutenfri
    if (dish.tags.includes('glutenfritt') || dish.allergens.includes('glutenfri')) {
      priorityTags.push('Glutenfritt');
    }
    
    // Lägg till laktosfritt om det finns
    if (dish.tags.includes('laktosfritt')) {
      priorityTags.push('Laktosfritt');
    }
    
    return priorityTags.slice(0, 2); // Visa max 2 tags
  };

  const tagsToShow = displayTags();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row p-4">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            src={dish.imageUrl}
            alt={dish.imageAlt}
            className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
            onError={(e) => {
              // Fallback om bilden inte laddas
              e.currentTarget.src = 'https://via.placeholder.com/128x128?text=No+Image';
            }}
          />
        </div>

        {/* Content Section */}
        <div className="mt-4 sm:mt-0 sm:ml-4 flex-1 flex flex-col">
          {/* Name and Price Row */}
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
              {dish.name}
            </h3>
            <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
              {dish.priceSek} kr
            </span>
          </div>

          {/* Description */}
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {dish.description}
          </p>

          {/* Tags */}
          {tagsToShow.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tagsToShow.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagStyle(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="mt-auto pt-3 flex justify-end">
            <button
              onClick={() => onAddToCart(dish)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;