import { ShopingCartContext } from "@/context/ShopingCartContext";
import { useContext } from "react";

export function useShopingCart() {
  return useContext(ShopingCartContext);
}
