"use client";

import { products } from "@/data";
import { useGetItemsFromCart, useShopingCart } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { CheckoutForm } from "./CheckoutForm";

const Checkout = () => {
  const { cartItems } = useShopingCart();
  const { cartProducts = [], cartTotalPrice = 0 } =
    useGetItemsFromCart(cartItems, products) || {};

  return (
    <div className="container mx-auto flex max-w-7xl flex-1 flex-col gap-4 px-4 pb-4 md:flex-row">
      <div className="flex-1">
        <h1 className="py-4 text-2xl font-medium text-zinc-800 md:text-3xl">
          Оформлення замовлення
        </h1>
        <ul className="rounded-lg bg-white">
          {cartProducts &&
            cartProducts.map((product) => (
              <li
                key={product?.id}
                className="flex items-center justify-between gap-4 border-t border-sky-50 p-5"
              >
                <div className="flex flex-1 items-center">
                  <Image
                    src={`/products/${product?.image[0]}`}
                    alt={product?.name || "Image"}
                    width={100}
                    height={100}
                    className="mr-4 h-16 w-16 object-cover"
                  />
                  <div className="overflow-hidden">
                    <p className="line-clamp-2 text-base font-medium text-zinc-800">
                      {product?.name}
                    </p>
                  </div>
                </div>
                <div className="text-zinc-500">
                  {formatPrice(product?.price.retail.withVAT ?? 0)} x{" "}
                  {product?.quantity}
                </div>

                <div className="flex items-center font-bold text-zinc-800">
                  {formatPrice(
                    (product?.price.retail.withVAT ?? 0) *
                      (product?.quantity ?? 0),
                  )}
                </div>
              </li>
            ))}
        </ul>
        <CheckoutForm />
      </div>
      <div className="w-full max-w-[360px]">
        <div className="mt-4 rounded-lg bg-white p-4">
          <p className="text-lg font-medium text-zinc-800">Разом:</p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <span className="text-zinc-500">
              {cartProducts.length} товарів на суму
            </span>
            <span className="font-bold text-zinc-800">
              {formatPrice(cartTotalPrice)}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <span className="text-zinc-500">Вартість доставки</span>
            <span className="text-right font-bold text-zinc-800">
              за тарифами перевізника
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-sky-50 pt-4">
            <span className="text-zinc-500">До сплати</span>
            <span className="text-xl font-bold text-zinc-800">
              {formatPrice(cartTotalPrice)}
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-sky-50 pt-4">
            <button className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-2 uppercase text-white transition-colors duration-500 hover:bg-sky-800 hover:text-white md:col-auto md:mt-0">
              Замовлення підтверджую
            </button>
          </div>
          <div className="mt-4 text-sm text-zinc-500">
            <p className="">
              Підтверджуючи замовлення ви даєте згоду на обробку персональних
              даних та погоджуєтесь з положеннями користувача
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Checkout };
