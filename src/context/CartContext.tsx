import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  calculateCartTotal,
  getCartItemKey,
  normalizeStoredCart,
  removeCartItem as removeCartItemFromList,
} from '../domain/cart';

// Tipo do produto no carrinho
type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  size: string;
  color: string;
  quantity: number;
};

// Tipo do contexto
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalQuantity: number;
  totalPrice: number;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
};

// Criar o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado pra usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve estar dentro de um CartProvider");
  return context;
};

// Componente que envolve a aplicação
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return normalizeStoredCart(storedCart ?? '[]') as CartItem[];
  });

  // Salvar o carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) => getCartItemKey(item) === getCartItemKey(newItem)
      );

      if (index >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity + newItem.quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart((prevCart) => removeCartItemFromList(prevCart, id, size, color));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        getCartItemKey(item) === getCartItemKey(id, size, color)
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const totalItems = cart.length;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = calculateCartTotal(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
