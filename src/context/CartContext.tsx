import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCart: (product: Product) => void;
  setQuantity: (productId: number | string, quantity: number) => void;
  removeFromCart: (productId: number | string) => void;
  cartTotal: number;
  handleCheckout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart";

function readStoredCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupt or unavailable storage should not take the whole app down.
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // The cart used to live only in memory, so a refresh or a shared link threw
  // away everything the visitor had added.
  const [cart, setCart] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore quota / private-mode failures: losing persistence is better
      // than breaking the cart.
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (!existingItem) return currentCart;
      if (existingItem.quantity <= 1) {
        return currentCart.filter((item) => item.id !== product.id);
      }
      return currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const setQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number | string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    // Stripe removed client-only Checkout: `redirectToCheckout` with inline
    // `lineItems` no longer exists in stripe.js, and Stripe disabled the
    // underlying API server-side. A Checkout Session must now be created on
    // the server (with the secret key) and the browser sent to session.url.
    //
    // TODO: POST the cart to a backend endpoint that creates a Checkout
    // Session and returns its url, then set window.location.href to it.
    throw new Error(
      "Checkout requires a server-created Stripe session; not yet wired up."
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        setQuantity,
        removeFromCart,
        cartTotal,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
