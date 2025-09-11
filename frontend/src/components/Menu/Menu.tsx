import React, { useState, useEffect } from 'react';
import { mockApi, MenuData } from '../../services/mockApi';

const Menu: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

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

  // Gruppera rätter per kategori
  const dishesByCategory = menuData.dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {} as Record<string, typeof menuData.dishes>);

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

        {/* Filter Buttons - kommer snart */}
        <div className="mb-8">
          {/* FilterButtons component kommer här */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dishes.map((dish) => (
                  <div key={dish.id} className="bg-white rounded-lg shadow-sm p-4">
                    {/* MenuItem component kommer här */}
                    <div className="flex">
                      <img 
                        src={dish.imageUrl} 
                        alt={dish.imageAlt}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-lg">{dish.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{dish.description}</p>
                        <div className="mt-2 flex justify-between items-end">
                          <span className="text-xl font-bold">{dish.priceSek} SEK</span>
                          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-200">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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