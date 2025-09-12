import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { MenuItem } from '../services/mockApi';

// Types för varukorgen
export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CartContextType {
  // State
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  
  // Actions
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
}

// Skapa Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook för att använda CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider Props
interface CartProviderProps {
  children: ReactNode;
}

// CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Beräkna totalt belopp
  const totalAmount = items.reduce((total, item) => {
    return total + (item.priceSek * item.quantity);
  }, 0);

  // Beräkna totalt antal artiklar
  const totalItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  // Lägg till artikel i varukorgen
  const addToCart = (item: MenuItem) => {
    setItems(currentItems => {
      // Kolla om artikeln redan finns i varukorgen
      const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Om den finns, öka kvantiteten
        return currentItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Om den inte finns, lägg till som ny artikel med quantity 1
        return [...currentItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Ta bort artikel från varukorgen
  const removeFromCart = (itemId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.id !== itemId)
    );
  };

  // Uppdatera kvantitet för en artikel
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Rensa hela varukorgen
  const clearCart = () => {
    setItems([]);
  };

  // Hämta kvantitet för en specifik artikel
  const getItemQuantity = (itemId: string): number => {
    const item = items.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  // Spara varukorgen i localStorage när den ändras
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  // Ladda varukorgen från localStorage när komponenten mountas
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  const contextValue: CartContextType = {
    items,
    totalAmount,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;