import { CartItemType, ProductType } from "@/types";
import { useEffect, useState } from "react";

const useGetItemsFromCart = (
  productsCart: CartItemType[],
  products: ProductType[],
) => {
  const [cartState, setCartState] = useState<CartItemType[] | null>(null);

  useEffect(() => {
    setCartState(productsCart);
  }, [productsCart]);

  if (
    productsCart === null ||
    productsCart.length === 0 ||
    cartState === null
  ) {
    return null;
  }
  const enrichedProducts = cartState
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

  return {
    cartProducts: enrichedProducts,
    cartTotalPrice: totalPrice,
  };
};

export default useGetItemsFromCart;
