import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F7F9FC]">
        <Header />
        {/* Add top padding to account for fixed header */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App