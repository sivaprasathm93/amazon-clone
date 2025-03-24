import React, { createContext, useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
  handleCheckout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const stripePromise = loadStripe(
  "pk_test_51O9PqyKVdOPbKxGKOBPKNsYnNqiHDZANkXlZnC9oZPWQu1OgDGBKHaYZGfHzQwXjNTqZaOPvvVjXddYNdkiHEHYf00UpWXUzMN"
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

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
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity-1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 0 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await stripe.redirectToCheckout({
        lineItems: cart.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        successUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin + "/cart",
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error in checkout:", error);
      alert("Error in checkout:" + error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, removeFromCart, cartTotal, handleCheckout }}
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
