"use client";

import { useShopingCart } from "@/context/ShopingCartContext";
import { calculateDiscountedPrice, formatPrice } from "@/lib/utils";
import { ProductType } from "@/types";
import { CircleCheck, CircleX, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CardProps = ProductType;

export const Card = ({
  id,
  name,
  price,
  // bestSales,
  // description,
  image,
  // dimensions,
  discount,
  isAvailable,
  category,
  // unit,
  // layers,
}: CardProps) => {
  const {
    // getItemQuantity,
    increaseItemQuantity,
    // decreaseItemQuantity,
    // removeItemFromCart,
  } = useShopingCart();

  // const quantity = getItemQuantity(id);
  // -----

  const isDiscounted = discount && discount?.percentage > 0;

  const availableBlock = isAvailable ? (
    <p className="mt-2 text-xs text-gray-500">
      <CircleCheck className="float-start mr-1 size-4 text-green-500" /> В
      наявності
    </p>
  ) : (
    <p className="mt-2 text-xs text-gray-500">
      <CircleX className="float-start mr-1 size-4 text-red-500" /> Немає в
      наявності
    </p>
  );

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border bg-white p-2 shadow-sm transition-all sm:p-5">
      {isDiscounted && discount?.percentage !== 0 && (
        <span className="absolute right-0 top-0 z-10 rounded-lg rounded-ee-none rounded-ss-none bg-red-500 px-3 py-1 text-sm font-medium text-white">
          {discount?.percentage}%
        </span>
      )}
      <Link href={`/${category}/${id}`} className="group">
        <figure className="relative mb-4 max-h-[300px] overflow-hidden">
          <Image
            src={`/${image[0]}`}
            alt={name}
            width={200}
            height={200}
            className="size-full bg-contain bg-center object-contain transition-transform group-hover:scale-105"
          />
        </figure>

        <div className="flex flex-1 flex-col justify-between gap-2">
          <h3 className="text-clamp h-auto flex-grow text-balance text-base font-medium text-zinc-800 transition-colors group-hover:text-blue-600 md:text-xl">
            {name}
          </h3>
          {availableBlock}
        </div>
      </Link>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-1">
          {isDiscounted ? (
            <>
              <p className="text-sm text-gray-500 line-through">
                {/* {price.retail.withVAT}₴ */}
                {formatPrice(price.retail.withVAT)}
              </p>
              <p className="text-base font-bold text-gray-900 sm:text-2xl">
                {formatPrice(
                  calculateDiscountedPrice(
                    price.retail.withVAT,
                    discount.percentage,
                  ),
                )}
              </p>
            </>
          ) : (
            <p className="text-base font-bold text-gray-900 sm:text-2xl">
              {formatPrice(price.retail.withVAT)}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-1">
          <button
            onClick={() => increaseItemQuantity(id)}
            className="flex size-12 items-center justify-center rounded-full bg-blue-600 transition-colors hover:bg-blue-600 md:size-14"
          >
            <ShoppingCart className="size:4 text-white md:size-8" />
          </button>
        </div>
      </div>
    </div>
  );
};
