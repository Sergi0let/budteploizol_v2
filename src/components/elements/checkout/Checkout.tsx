"use client";

import type React from "react";

import { products } from "@/data";
import { useGetItemsFromCart, useShopingCart } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";

const Checkout = () => {
  const { cartItems } = useShopingCart();
  const { cartProducts = [], cartTotalPrice = 0 } =
    useGetItemsFromCart(cartItems, products) || {};

  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const updateFormValidity = () => {
    if (formRef.current) {
      // Check both the native validity and our custom data-valid attribute
      const nativeValidity = formRef.current.checkValidity();
      const customValidity =
        formRef.current.getAttribute("data-valid") === "true";
      setIsFormValid(nativeValidity && customValidity);
    }
  };

  // Check form validity when cart items change
  useEffect(() => {
    updateFormValidity();
  }, [cartItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      // Convert form data to object
      const data = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [
          key,
          value instanceof File ? "" : value,
        ]),
      ) as Record<string, string>;

      const isContactInfoValid =
        data.lastname && data.name && data.phone && data.mail;
      const isDeliveryInfoValid = data.deliveryType && data.deliveryAddress;

      if (!isContactInfoValid || !isDeliveryInfoValid) {
        alert("Будь ласка, заповніть всі обов'язкові поля!");
        return;
      }

      try {
        setIsSubmitting(true);
        const response = await fetch("/api/send-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            items: cartProducts.map((product) => ({
              id: product?.id,
              name: product?.name,
              price: product?.price.retail.withVAT,
              quantity: product?.quantity,
            })),
            totalPrice: cartTotalPrice,
          }),
        });

        if (response.ok) {
          router.replace("/order-success");
        } else {
          router.replace("/order-fail");
        }
      } catch (error) {
        console.warn("Error: ", error);
        router.replace("/order-fail");
      } finally {
        setIsSubmitting(true);
      }
    }
  };

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
                className="flex items-center justify-between gap-4 border-t border-sky-50 p-5 first:border-t-0"
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
        <CheckoutForm
          ref={formRef}
          onInputChange={updateFormValidity}
          isSubmitting={isSubmitting}
        />
      </div>
      <div className="w-full max-w-[360px]">
        <div className="sticky top-4 mt-4 rounded-lg bg-white p-4">
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
            <button
              onClick={handleSubmit}
              type="submit"
              form="checkout-form"
              disabled={!isFormValid || isSubmitting}
              className={`mt-4 h-14 w-full rounded-lg uppercase text-white transition-colors duration-300 ${
                isFormValid && !isSubmitting
                  ? "bg-[var(--main-primary)] hover:bg-[var(--main-dark)]"
                  : "cursor-not-allowed bg-[var(--secondary-light)] !text-[var(--main-primary)]"
              }`}
            >
              {isSubmitting ? "ОБРОБКА..." : "ЗАМОВЛЕННЯ ПІДТВЕРДЖУЮ"}
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

// "use client";

// import { products } from "@/data";
// import { useGetItemsFromCart, useShopingCart } from "@/hooks";
// import { formatPrice } from "@/lib/utils";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { CheckoutForm } from "./CheckoutForm";

// const Checkout = () => {
//   const { cartItems } = useShopingCart();
//   const { cartProducts = [], cartTotalPrice = 0 } =
//     useGetItemsFromCart(cartItems, products) || {};

//   const formRef = useRef<HTMLFormElement>(null);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const updateFormValidity = () => {
//     if (formRef.current) {
//       setIsFormValid(formRef.current.checkValidity());
//     }
//   };

//   // Викликаємо перевірку валідності при зміні полів
//   useEffect(() => {
//     updateFormValidity();
//   }, [cartItems]); // Можеш додати залежності, якщо потрібно

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formRef.current) {
//       const formData = new FormData(formRef.current);

//       // Явно приводимо значення до `string`
//       const data = Object.fromEntries(
//         Array.from(formData.entries()).map(([key, value]) => [
//           key,
//           value instanceof File ? "" : value,
//         ]),
//       ) as Record<string, string>;

//       const isContactInfoValid =
//         data.lastname && data.name && data.phone && data.mail;
//       const isDeliveryInfoValid = data.deliveryType && data.deliveryAddress;

//       if (!isContactInfoValid || !isDeliveryInfoValid) {
//         alert("Please fill in all required fields!");
//         return;
//       }

//       try {
//         const response = await fetch("/api/send-order", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });

//         if (response.ok) {
//           router.replace("/order-success");
//         } else {
//           router.replace("/order-fail");
//         }
//       } catch (error) {
//         console.warn("Error: ", error);
//         router.replace("/order-fail");
//       } finally {
//         setIsSubmitting(true);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto flex max-w-7xl flex-1 flex-col gap-4 px-4 pb-4 md:flex-row">
//       <div className="flex-1">
//         <h1 className="py-4 text-2xl font-medium text-zinc-800 md:text-3xl">
//           Оформлення замовлення
//         </h1>
//         <ul className="rounded-lg bg-white">
//           {cartProducts &&
//             cartProducts.map((product) => (
//               <li
//                 key={product?.id}
//                 className="flex items-center justify-between gap-4 border-t border-sky-50 p-5"
//               >
//                 <div className="flex flex-1 items-center">
//                   <Image
//                     src={`/products/${product?.image[0]}`}
//                     alt={product?.name || "Image"}
//                     width={100}
//                     height={100}
//                     className="mr-4 h-16 w-16 object-cover"
//                   />
//                   <div className="overflow-hidden">
//                     <p className="line-clamp-2 text-base font-medium text-zinc-800">
//                       {product?.name}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-zinc-500">
//                   {formatPrice(product?.price.retail.withVAT ?? 0)} x{" "}
//                   {product?.quantity}
//                 </div>

//                 <div className="flex items-center font-bold text-zinc-800">
//                   {formatPrice(
//                     (product?.price.retail.withVAT ?? 0) *
//                       (product?.quantity ?? 0),
//                   )}
//                 </div>
//               </li>
//             ))}
//         </ul>
//         <CheckoutForm
//           ref={formRef}
//           onInputChange={updateFormValidity}
//           isSubmitting={isSubmitting}
//         />
//       </div>
//       <div className="w-full max-w-[360px]">
//         <div className="mt-4 rounded-lg bg-white p-4">
//           <p className="text-lg font-medium text-zinc-800">Разом:</p>
//           <div className="mt-4 flex items-end justify-between gap-4">
//             <span className="text-zinc-500">
//               {cartProducts.length} товарів на суму
//             </span>
//             <span className="font-bold text-zinc-800">
//               {formatPrice(cartTotalPrice)}
//             </span>
//           </div>
//           <div className="mt-4 grid grid-cols-2 gap-2">
//             <span className="text-zinc-500">Вартість доставки</span>
//             <span className="text-right font-bold text-zinc-800">
//               за тарифами перевізника
//             </span>
//           </div>
//           <div className="mt-4 flex items-end justify-between gap-4 border-t border-sky-50 pt-4">
//             <span className="text-zinc-500">До сплати</span>
//             <span className="text-xl font-bold text-zinc-800">
//               {formatPrice(cartTotalPrice)}
//             </span>
//           </div>
//           <div className="mt-4 flex items-end justify-between gap-4 border-t border-sky-50 pt-4">
//             {/* <button className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[var(--main-primary)] px-2 uppercase text-white transition-colors duration-500 hover:bg-sky-800 hover:text-white md:col-auto md:mt-0">
//               Замовлення підтверджую
//             </button> */}
//             <button
//               onClick={handleSubmit}
//               type="submit"
//               form="checkout-form"
//               disabled={!isFormValid}
//               className="mt-4 h-14 w-full rounded-lg bg-[var(--main-primary)] uppercase text-white hover:bg-[var(--main-primary)] disabled:bg-[var(--main-dark)]"
//             >
//               ЗАМОВЛЕННЯ ПІДТВЕДЖУЮ
//             </button>
//           </div>
//           <div className="mt-4 text-sm text-zinc-500">
//             <p className="">
//               Підтверджуючи замовлення ви даєте згоду на обробку персональних
//               даних та погоджуєтесь з положеннями користувача
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Checkout };
