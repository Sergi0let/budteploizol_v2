"use client";

import { EmptyBag } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ShopingCartProvider,
  useShopingCart,
} from "@/context/ShopingCartContext";
import { products } from "@/data";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, X } from "lucide-react";

export default function Cart() {
  const {
    cartQuantity,
    cartItems,
    decreaseItemQuantity,
    increaseItemQuantity,
    removeItemFromCart,
  } = useShopingCart();
  // Якщо вам потрібно зберегти порядок елементів, як у cartItems:
  const enrichedProducts = cartItems
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      // Перевірка: якщо продукт не знайдено, можна повернути null або обробити іншим чином
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean); // фільтруємо null, якщо такі є

  const totalPrice = enrichedProducts.reduce(
    (sum, product) =>
      sum + (product?.price.retail.withVAT ?? 0) * (product?.quantity ?? 0),
    0,
  );

  return (
    <ShopingCartProvider>
      <Dialog>
        <DialogTrigger>
          <div className="icon-wrapper relative">
            {cartQuantity > 0 && (
              <span className="z-4 absolute right-0 top-0 rounded-lg rounded-ee-none rounded-ss-none bg-red-500 px-1.5 text-xs font-medium text-white">
                {cartQuantity}
              </span>
            )}
            <ShoppingCart className="size-5 sm:size-6" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogDescription>
              <div className="mx-auto">
                <div className="flex items-center justify-center">
                  {cartQuantity > 0 && (
                    <DialogTitle className="text-zinc-800 md:text-2xl">
                      Корзина
                    </DialogTitle>
                  )}
                </div>
                {cartQuantity > 0 ? (
                  <div className="mx-auto mt-8 md:mt-12">
                    <div className="bg-white shadow">
                      <div className="rounded-lg px-4 py-6 sm:px-8 sm:py-10">
                        <div className="flow-root">
                          <ul className="-my-8">
                            {enrichedProducts.map((item) => (
                              <li
                                key={item?.id}
                                className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                              >
                                <div className="shrink-0">
                                  <img
                                    className="h-24 w-24 max-w-full rounded-lg object-contain"
                                    src={item?.image[0]}
                                    alt=""
                                  />
                                </div>
                                <div className="relative flex flex-1 flex-col justify-between">
                                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                    <div className="pr-8 sm:pr-5">
                                      <p className="text-base font-semibold text-gray-900">
                                        {item?.name}
                                      </p>
                                      <p className="mx-0 mb-0 mt-1 text-sm text-gray-400">
                                        {item?.category}
                                      </p>
                                    </div>
                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                      <p className="w-20 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                        {formatPrice(
                                          (item?.quantity ?? 0) *
                                            (item?.price?.retail?.withVAT ?? 0),
                                        )}
                                      </p>
                                      <div className="sm:order-1">
                                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                          <button
                                            onClick={() =>
                                              decreaseItemQuantity(
                                                item?.id ?? 0,
                                              )
                                            }
                                            className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-blue-600 hover:text-white"
                                          >
                                            -
                                          </button>
                                          <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                            {item?.quantity}
                                          </div>
                                          <button
                                            onClick={() =>
                                              increaseItemQuantity(
                                                item?.id ?? 0,
                                              )
                                            }
                                            className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-blue-600 hover:text-white"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="absolute right-0 top-0 flex sm:bottom-0 sm:top-auto">
                                    <button
                                      type="button"
                                      className="icon-wrapper"
                                      onClick={() =>
                                        removeItemFromCart(item?.id ?? 0)
                                      }
                                    >
                                      <X />
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 md:text-2xl">
                            Всього: ({cartQuantity})
                          </p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {formatPrice(totalPrice)}
                          </p>
                        </div>
                        <div className="mt-6 text-center">
                          <button
                            type="button"
                            className="group inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-indigo-600 focus:shadow"
                          >
                            Оформити замовлення
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-4 h-6 w-6 transition-all group-hover:ml-8"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <EmptyBag />
                    <p className="mt-10 text-center text-4xl font-bold text-zinc-800">
                      Корзина порожня
                    </p>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </ShopingCartProvider>
  );
}
