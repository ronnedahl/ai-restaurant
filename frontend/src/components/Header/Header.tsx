import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, MessageCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Woman from '../../assets/woman.png'

interface HeaderProps {
  onOpenAI?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAI }) => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAIClick = () => {
    onOpenAI?.();
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              {/* Green diamond/square rotated 45 degrees */}
              <div className="w-8 h-8 bg-[#50D178] transform rotate-45 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white transform -rotate-45" />
              </div>
            </div>
            <span className="text-2xl font-bold text-[#333333]">Foodie</span>
          </button>

          {/* Center Section - Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button className="text-[#718096] hover:text-[#333333] transition-colors">
              Menu
            </button>
            <button className="text-[#718096] hover:text-[#333333] transition-colors">
              Deals
            </button>
            <button className="text-[#718096] hover:text-[#333333] transition-colors">
              Rewards
            </button>
          </nav>

          {/* Right Section - AI Assistant, Cart and Avatar */}
          <div className="flex items-center space-x-4">
            
            {/* AI Assistant Button */}
            <button 
              onClick={handleAIClick}
              className="flex items-center justify-center w-10 h-10 bg-[#10B981] hover:bg-[#0EA570] rounded-full transition-colors"
              aria-label="Open AI Assistant"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
            
            {/* Cart Button */}
            <button 
              onClick={handleCartClick}
              className="flex items-center space-x-2 bg-[#EDF2F7] hover:bg-[#E2E8F0] px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-[#333333] font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="text-[#333333]">({totalItems})</span>
              )}
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={Woman}
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;