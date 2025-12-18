import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "tala_cart_v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadCart());

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    // avoid duplicates by accessoryID
    setCartItems((prev) => {
      if (prev.some((x) => x.accessoryID === item.accessoryID)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (accessoryID) => {
    setCartItems((prev) => prev.filter((x) => x.accessoryID !== accessoryID));
  };

  const clearCart = () => setCartItems([]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, it) => sum + Number(it.price || 0), 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, clearCart, total }),
    [cartItems, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
