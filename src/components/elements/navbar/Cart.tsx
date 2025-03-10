"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useShopingCart } from "@/hooks";
import { ShoppingCart, X } from "lucide-react";
import { CartBlock } from "../cart";

export default function Cart() {
  const { cartQuantity, openCart, setOpenCart } = useShopingCart();

  return (
    <Dialog open={openCart}>
      <DialogTrigger>
        <div
          onClick={() => setOpenCart(true)}
          className="icon-wrapper relative"
        >
          {cartQuantity > 0 && (
            <span className="z-4 absolute right-0 top-0 rounded-lg rounded-ee-none rounded-ss-none bg-red-500 px-1.5 text-xs font-medium text-white">
              {cartQuantity}
            </span>
          )}
          <ShoppingCart className="size-5 sm:size-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="cart-block max-h-[95vh] overflow-y-auto">
        <button
          className="icon-wrapper absolute right-4 top-4"
          onClick={() => setOpenCart(false)}
        >
          <X />
          <p className="sr-only">Закрити кошик</p>
        </button>
        <CartBlock />
      </DialogContent>
    </Dialog>
  );
}
