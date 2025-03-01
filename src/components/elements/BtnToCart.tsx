"use client";

import { useLocalStorage } from "@/hooks";
import { ShoppingCart } from "lucide-react";

type CartItem = {
  id: number;
  quantity: number;
};

export const BtnToCart = ({ id }: { id: number }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  console.log(cart);

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        // Якщо товар уже є – збільшуємо його кількість
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        // Якщо товар відсутній – додаємо новий елемент до кошика
        return [...prevCart, { id, quantity: 1 }];
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex size-12 items-center justify-center rounded-full bg-blue-600 transition-colors hover:bg-blue-600 md:size-14"
    >
      <ShoppingCart className="size:4 text-white md:size-8" />
    </button>
  );
};
