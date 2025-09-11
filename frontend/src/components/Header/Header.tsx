import React, { useState } from 'react';
import { Search, ShoppingCart, User, Utensils } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Menu');

  const navItems = ['Menu', 'Order History', 'Favorites'];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Foodie</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex ml-10 space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`${
                    activeNav === item
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-500 hover:text-gray-700'
                  } transition-colors duration-200`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Section: Search, Cart, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Cart Icon */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button className="p-1 hover:ring-2 hover:ring-gray-300 rounded-full transition-all">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Hidden by default */}
        <nav className="md:hidden pb-4">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`${
                  activeNav === item
                    ? 'text-gray-900 font-semibold border-b-2 border-green-500'
                    : 'text-gray-500'
                } pb-2 text-sm`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;