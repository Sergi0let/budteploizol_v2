"use client";

import { useShopingCart } from "@/hooks";
import { calculateDiscountedPrice, formatPrice } from "@/lib/utils";
import { ProductType } from "@/types";
import { CircleCheck, CircleX, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CardProps = ProductType & { className?: string };

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
  unit,
  // layers,
  className,
  groupName,
}: CardProps) => {
  const {
    // getItemQuantity,
    increaseItemQuantity,
    // decreaseItemQuantity,
    // removeItemFromCart,
  } = useShopingCart();

  // const quantity = getItemQuantity(id);
  // -----
  const productHref = groupName
    ? `/catalog/${category}/${groupName}/${id}`
    : `/catalog/${category}/${id}`;

  const isDiscounted = discount && discount?.percentage > 0;

  const availableBlock = isAvailable ? (
    <>
      <CircleCheck className="float-start mr-1 size-4 text-green-500" /> В
      наявності
    </>
  ) : (
    <>
      <CircleX className="float-start mr-1 size-4 text-red-500" /> Hе в
      наявності
    </>
  );

  console.log(unit);

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-white p-2 shadow-sm transition-all sm:p-5 ${className}`}
    >
      {isDiscounted && discount?.percentage !== 0 && (
        <span className="absolute right-1 top-1 z-10 rounded-lg rounded-ee-none rounded-ss-none bg-red-500 px-3 py-1 text-sm font-medium text-white">
          -{discount?.percentage}%
        </span>
      )}
      <Link href={productHref} className="group">
        <figure className="relative mb-4 h-[164px] overflow-hidden sm:h-[180px] md:h-[200px] lg:h-[227px]">
          <Image
            src={`/products/${image[0]}`}
            alt={name}
            width={200}
            height={200}
            className="size-full bg-contain bg-center object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </figure>

        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="mt-2 flex items-center justify-between gap-1 text-xs text-zinc-700">
            <p className="truncate text-nowrap">{availableBlock}</p>
            <p className="truncate text-nowrap">Артикул: 50105</p>
          </div>
          <h3 className="text-clamp h-auto flex-grow text-balance text-base font-medium text-zinc-800 transition-colors group-hover:text-blue-600 md:text-xl">
            {name}
          </h3>
        </div>
      </Link>
      <div className="mt-2 flex items-end justify-between">
        <div className="space-y-1">
          {isDiscounted ? (
            <>
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(price.retail.withVAT)}
                <sub className="ml-2">{unit}</sub>
              </p>
              <p className="text-base font-bold text-red-500 sm:text-2xl">
                {formatPrice(
                  calculateDiscountedPrice(
                    price.retail.withVAT,
                    discount.percentage,
                  ),
                )}
                <sub className="ml-2">{unit}</sub>
              </p>
            </>
          ) : (
            <p className="text-base font-bold text-zinc-800 sm:text-2xl">
              {formatPrice(price.retail.withVAT)}
              <sub className="ml-2">{unit}</sub>
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-1">
          <button
            onClick={() => increaseItemQuantity(id)}
            className="flex size-12 items-center justify-center rounded-full bg-sky-50 text-blue-600 transition-colors duration-500 hover:bg-blue-600 hover:text-white md:size-14"
          >
            <ShoppingCart className="size:4 md:size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
