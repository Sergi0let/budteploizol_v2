"use client";

import { useShopingCart } from "@/context/ShopingCartContext";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type ProductCartActionsProps = {
  id: number | string;
  className?: string;
};

const ProductCartActions = ({ id, className }: ProductCartActionsProps) => {
  const { cartItems, increaseItemQuantity, decreaseItemQuantity } =
    useShopingCart();

  const [currentAmount, setCurrentAmount] = useState<number | null>(null);

  useEffect(() => {
    const currentItem = cartItems?.find((item) => item.id === id);
    setCurrentAmount(currentItem?.quantity ?? 0);
  }, [cartItems, id]);

  return (
    <div
      className={`flex h-12 items-center overflow-hidden rounded-lg border ${className}`}
    >
      <button
        className={`flex h-full min-w-10 items-center justify-center px-2 transition-colors duration-500 hover:bg-sky-50 hover:text-blue-600 ${currentAmount === 0 && "text-gray-400"}`}
        onClick={() => decreaseItemQuantity(id)}
        disabled={currentAmount === 0 ? true : undefined}
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-10 border-l border-r py-2 text-center text-lg font-medium">
        {currentAmount}
      </span>
      <button
        className="flex h-full min-w-10 items-center justify-center px-2 text-center transition-colors duration-500 hover:bg-sky-50 hover:text-blue-600"
        onClick={() => increaseItemQuantity(id)}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
};

export { ProductCartActions };
