import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import AIAssistant from './components/AIAssistant/AIAssistant';

function App() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const handleOpenAI = () => {
    setIsAIAssistantOpen(true);
  };

  const handleCloseAI = () => {
    setIsAIAssistantOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F7F9FC]">
        <Header onOpenAI={handleOpenAI} />
        {/* Add top padding to account for fixed header */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        
        {/* AI Assistant Modal */}
        <AIAssistant 
          isOpen={isAIAssistantOpen}
          onClose={handleCloseAI}
        />
      </div>
    </Router>
  )
}

export default App