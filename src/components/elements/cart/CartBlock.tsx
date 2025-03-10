"use client";

import { useShopingCart } from "@/context/ShopingCartContext";
import { products } from "@/data";
import { useWindowScreenSize } from "@/hooks";
import useGetItemsFromCart from "@/hooks/useGetItemsFromCart";
import { formatPrice } from "@/lib/utils";
import { Gift, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderBtn = () => {
  return (
    <Link
      href="/checkout"
      className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-2 text-white transition-colors duration-500 hover:bg-sky-800 hover:text-white"
    >
      <Gift />
      <span className="text-xl font-medium">Оформити</span>
    </Link>
  );
};

const CartBlock = () => {
  const {
    cartQuantity,
    cartItems,
    decreaseItemQuantity,
    increaseItemQuantity,
    removeItemFromCart,
  } = useShopingCart();

  const { cartProducts = [], cartTotalPrice = 0 } =
    useGetItemsFromCart(cartItems, products) || {};

  const { width } = useWindowScreenSize();

  if (cartProducts.length === 0) {
    return <div>Кошик пустий</div>;
  }

  const descktopCart = (
    <table className="w-full text-left text-sm">
      <thead>
        <tr>
          <th className="py-2 text-lg font-normal text-zinc-500">Продукція</th>
          <th className="py-2 text-lg font-normal text-zinc-500">Ціна</th>
          <th className="py-2 text-lg font-normal text-zinc-500">Кількість</th>
          <th className="py-2 text-lg font-normal text-zinc-500">Всього</th>
        </tr>
      </thead>
      <tbody>
        {cartProducts.map((product, i) => (
          <tr key={i} className="border-t">
            <td className="w-1/2 py-5 md:py-8">
              <div>
                <figure className="flex">
                  <div className="size-24 flex-shrink-0 overflow-hidden">
                    <Image
                      src={`/products/${product?.image[0]}`}
                      alt={product?.name || ""}
                      width={100}
                      height={100}
                      className="w-full object-contain"
                    />
                  </div>
                  <figcaption className="ml-2 text-lg font-medium text-zinc-800">
                    {product?.name}
                  </figcaption>
                </figure>
              </div>
            </td>
            <td className="py-5 align-text-top md:py-8">
              <span className="inline-block pt-5 text-xl font-medium text-zinc-800">
                {formatPrice(product?.price.retail.withVAT ?? 0)}
              </span>
            </td>
            <td className="w-fit py-5 md:py-8">
              <div className="w-fit text-center">
                <div className="flex h-12 items-center overflow-hidden rounded-lg border">
                  <button
                    className={`flex h-full min-w-10 items-center justify-center px-2 transition-colors duration-500 hover:bg-sky-50 hover:text-blue-600 ${product?.quantity === 0 && "text-gray-400"}`}
                    onClick={() => decreaseItemQuantity(product?.id ?? 0)}
                    disabled={product?.quantity === 0 ? true : undefined}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-10 border-l border-r py-2 text-center text-lg font-medium">
                    {product?.quantity}
                  </span>
                  <button
                    className="flex h-full min-w-10 items-center justify-center px-2 text-center transition-colors duration-500 hover:bg-sky-50 hover:text-blue-600"
                    onClick={() => increaseItemQuantity(product?.id ?? 0)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  className="mt-2 text-zinc-500 underline decoration-dashed underline-offset-4 hover:text-blue-600"
                  onClick={() => removeItemFromCart(product?.id ?? 0)}
                >
                  видалити
                </button>
              </div>
            </td>
            <td className="py-5 align-text-top md:py-8">
              <span className="inline-block pt-5 text-xl font-medium text-zinc-800">
                {formatPrice(
                  (product?.price.retail.withVAT ?? 0) *
                    (product?.quantity ?? 0),
                )}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const mobCart = (
    <ul>
      {cartProducts.map((product, i) => (
        <li key={i} className="flex gap-3 border-t py-5">
          <figure className="w-20 flex-shrink-0 overflow-hidden sm:w-40 md:w-48">
            <Image
              src={`/products/${product?.image[0]}`}
              alt={product?.name || ""}
              width={100}
              height={100}
              className="w-full object-contain"
            />
            <figcaption className="sr-only">{product?.name}</figcaption>
          </figure>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex gap-2">
              <h3 className="flex-1 text-xs font-medium text-zinc-800 sm:text-lg">
                {product?.name} Lorem ipsum dolor
              </h3>
              <button
                className="flex flex-shrink-0 pl-4"
                onClick={() => removeItemFromCart(product?.id ?? 0)}
              >
                <Trash2 className="size-4 text-gray-400 sm:size-6" />
                <p className="sr-only">видалити</p>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="w-fit text-center">
                <div className="flex h-9 items-center overflow-hidden rounded-lg border sm:h-10">
                  <button
                    className="flex h-full min-w-8 items-center justify-center sm:min-w-12"
                    onClick={() => decreaseItemQuantity(product?.id ?? 0)}
                    disabled={product?.quantity === 0 ? true : undefined}
                  >
                    <Minus className="size-3 sm:size-4" />
                  </button>
                  <span className="min-w-8 border-l border-r py-2 text-center font-medium sm:min-w-12 md:text-lg">
                    {product?.quantity}
                  </span>
                  <button
                    className="flex h-full min-w-8 items-center justify-center sm:min-w-12"
                    onClick={() => increaseItemQuantity(product?.id ?? 0)}
                  >
                    <Plus className="size-3 sm:size-4" />
                  </button>
                </div>
              </div>
              <span className="text-lg font-bold text-zinc-800 md:text-xl">
                {formatPrice(
                  (product?.price.retail.withVAT ?? 0) *
                    (product?.quantity ?? 0),
                )}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relavite">
      <div className="p-4 md:p-6">
        <h1 className="text-3xl font-medium text-zinc-800 md:text-4xl">
          Кошик ({cartQuantity})
        </h1>

        <div className="relative mt-6 overflow-x-auto md:mt-6">
          {width > 1024 ? descktopCart : mobCart}
        </div>
      </div>
      <div className="sticky bottom-0 right-0 w-full bg-white p-4 pt-0 md:p-6 md:pt-0">
        <div className="flex items-end justify-end gap-4 border-t py-4 md:py-6">
          <span className="mr-4 text-xl font-medium text-zinc-800 md:text-3xl">
            Всього: <b>{formatPrice(cartTotalPrice)}</b>
          </span>
          <div className="max-w-[160px]">
            <OrderBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CartBlock };
