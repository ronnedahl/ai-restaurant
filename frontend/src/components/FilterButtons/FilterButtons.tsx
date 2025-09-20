import React from 'react';
import { Heart, Flame, Wheat, TrendingUp } from 'lucide-react';

interface FilterButtonsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  availableTags?: string[];
}

interface FilterOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  selectedFilter, 
  onFilterChange
}) => {
  
  // Definiera filter-alternativ med ikoner
  const filterOptions: FilterOption[] = [
    { 
      label: 'All', 
      value: 'all',
      icon: null 
    },
    { 
      label: 'Popular', 
      value: 'populärt',
      icon: <TrendingUp className="h-4 w-4" />
    },
    { 
      label: 'Vegetarian', 
      value: 'vegetariskt',
      icon: <Heart className="h-4 w-4" />
    },
    { 
      label: 'Spicy', 
      value: 'kryddigt',
      icon: <Flame className="h-4 w-4" />
    },
    { 
      label: 'Gluten-Free', 
      value: 'glutenfritt',
      icon: <Wheat className="h-4 w-4" />
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 py-4">
      {filterOptions.map((option) => {
        const isActive = selectedFilter.toLowerCase() === option.value;
        
        return (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`
              px-4 py-2 rounded-full font-medium text-sm transition-all duration-200
              flex items-center gap-2
              ${isActive 
                ? 'bg-green-500 text-white shadow-md transform scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
              }
            `}
          >
            {option.icon && !isActive && (
              <span className="opacity-60">{option.icon}</span>
            )}
            {option.icon && isActive && (
              <span>{option.icon}</span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtons;