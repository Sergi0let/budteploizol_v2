import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return (price / 100).toLocaleString("uk-UA", {
    style: "currency",
    currency: "UAH",
    currencyDisplay: "narrowSymbol",
  });
}

export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number,
): number {
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  return Math.round(discountedPrice * 100) / 100;
}
