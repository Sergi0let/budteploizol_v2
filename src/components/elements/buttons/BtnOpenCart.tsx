"use client";

import { useShopingCart } from "@/hooks";
import { ShoppingCart } from "lucide-react";

const BtnOpenCart = ({ id }: { id: string | number }) => {
  const { increaseItemQuantity } = useShopingCart();
  return (
    <button
      onClick={() => increaseItemQuantity(id)}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[var(--main-primary)] px-2 text-white transition-colors duration-500 hover:bg-[var(--main-secondary)] hover:text-white md:col-auto md:mt-0"
    >
      <ShoppingCart className="mr-1" />
      <span>В кошик</span>
    </button>
  );
};

export { BtnOpenCart };
