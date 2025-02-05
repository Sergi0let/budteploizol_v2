"use client";

import { useLocalStorage } from "@/hooks";
import { createContext, useContext } from "react";

type ShopingCartProviderProps = {
  children: React.ReactNode;
};

type ShopingCartContextType = {
  cartItems: CartItem[];
  cartQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

export const ShopingCartContext = createContext({} as ShopingCartContextType);

export function useShopingCart() {
  return useContext(ShopingCartContext);
}

export function ShopingCartProvider({ children }: ShopingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    [],
  );

  const cartQuantity =
    cartItems?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  function removeItemFromCart(id: number) {
    return setCartItems((currItems) => {
      const item = currItems.find((item) => item.id === id);
      return item == null
        ? currItems
        : currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShopingCartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
}
