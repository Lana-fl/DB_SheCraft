import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import useAuth from "./AuthContext"; // ✅ uses your existing AuthContext

const CartContext = createContext(null);

// ✅ build a per-user storage key
function getCartKey(user) {
  // handle both shapes: user.customerID or user.user.customerID
  const id =
    user?.customerID ||
    user?.customerId ||
    user?.id ||
    user?.user?.customerID ||
    user?.user?.customerId ||
    user?.user?.id ||
    "guest";

  const role = user?.role || user?.user?.role || "guest";
  return `shecraft_cart_v1_${role}_${id}`;
}

function loadCart(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();

  const cartKey = useMemo(() => getCartKey(user), [user]);

  const [cartItems, setCartItems] = useState(() => loadCart(cartKey));

  // ✅ when user changes, load that user's cart
  useEffect(() => {
    setCartItems(loadCart(cartKey));
  }, [cartKey]);

  // ✅ persist per user
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      // avoid duplicates by accessoryID when present
      if (item?.accessoryID && prev.some((x) => x.accessoryID === item.accessoryID)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (accessoryID) => {
    setCartItems((prev) => prev.filter((x) => x.accessoryID !== accessoryID));
  };

  const clearCart = () => setCartItems([]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, x) => sum + Number(x?.price || 0) * Number(x?.qty || 1), 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, clearCart, total }),
    [cartItems, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
