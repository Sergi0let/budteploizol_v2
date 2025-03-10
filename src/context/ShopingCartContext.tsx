"use client";

import { useLocalStorage } from "@/hooks";
import { createContext, useContext, useState } from "react";

type ShopingCartProviderProps = {
  children: React.ReactNode;
};

type ShopingCartContextType = {
  cartItems: CartItem[];
  cartQuantity: number;
  openCart: boolean;
  setOpenCart: (isOpen: boolean) => void;
  getItemQuantity: (id: number | string) => number;
  increaseItemQuantity: (id: number | string | string) => void;
  decreaseItemQuantity: (id: number | string | string) => void;
  removeItemFromCart: (id: number | string | string) => void;
};

type CartItem = {
  id: number | string;
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
  const [openCart, setOpenCart] = useState(false);

  const cartQuantity =
    cartItems?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

  const getItemQuantity = (id: number | string) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number | string) => {
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

  const decreaseItemQuantity = (id: number | string) => {
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

  function removeItemFromCart(id: number | string) {
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
        openCart,
        setOpenCart,
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
