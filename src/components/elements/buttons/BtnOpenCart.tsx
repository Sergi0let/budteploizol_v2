"use client";

import { useShopingCart } from "@/hooks";
import { ShoppingCart } from "lucide-react";

const BtnOpenCart = () => {
  const { setOpenCart } = useShopingCart();
  return (
    <button
      onClick={() => setOpenCart(true)}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-2 text-white transition-colors duration-500 hover:bg-sky-800 hover:text-white md:col-auto md:mt-0"
    >
      <ShoppingCart className="mr-1" />
      <span>В кошик</span>
    </button>
  );
};

export { BtnOpenCart };
