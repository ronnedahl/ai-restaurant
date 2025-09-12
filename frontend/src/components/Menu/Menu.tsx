import React, { useState, useEffect } from 'react';
import { mockApi } from '../../services/mockApi';
import type { MenuData, MenuItem } from '../../services/mockApi';
import FilterButtons from '../FilterButtons/FilterButtons';
import MenuItemComponent from '../MenuItem/MenuItem';

const Menu: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Hämta menydata när komponenten laddas
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const data = await mockApi.getMenuData();
        setMenuData(data);
      } catch (err) {
        setError('Failed to load menu data');
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Hantera filter ändringar
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  // Hantera lägg till i kundvagn (placeholder för nu)
  const handleAddToCart = (dish: MenuItem) => {
    console.log('Adding to cart:', dish.name);
    // TODO: Implementera kundvagn i Sprint 2
  };

  // Filtrera rätter baserat på valt filter
  const getFilteredDishes = () => {
    if (!menuData) return [];

    if (selectedFilter === 'all') {
      return menuData.dishes;
    }

    return menuData.dishes.filter(dish => {
      switch (selectedFilter) {
        case 'populärt':
          return dish.tags.includes('populärt');
        case 'vegetariskt':
          return dish.category === 'Vegetariskt' || dish.category === 'Veganskt' || dish.tags.includes('vegetariskt');
        case 'glutenfritt':
          return dish.tags.includes('glutenfritt') || dish.allergens.includes('glutenfri');
        case 'kryddigt':
          return dish.tags.includes('kryddigt') || dish.tags.includes('mustigt');
        default:
          return true;
      }
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading menu...</div>
      </div>
    );
  }

  // Error state
  if (error || !menuData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">{error || 'No menu data available'}</div>
      </div>
    );
  }

  // Hämta filtrerade rätter
  const filteredDishes = getFilteredDishes();
  
  // Gruppera filtrerade rätter per kategori
  const dishesByCategory = filteredDishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Header */}
        <div className="py-8">
          <h1 className="text-4xl font-bold text-gray-900">Our Menu</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our selection of delicious, freshly prepared dishes.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          <FilterButtons 
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Menu Categories and Items */}
        <div className="space-y-12 pb-12">
          {Object.entries(dishesByCategory).map(([category, dishes]) => (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-green-500 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dishes.map((dish) => (
                  <MenuItemComponent 
                    key={dish.id}
                    dish={dish}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;