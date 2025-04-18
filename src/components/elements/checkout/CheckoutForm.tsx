"use client";

import { deliveryData } from "@/data";
import { useNovaPoshta } from "@/hooks";
import { Pencil } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";

export type FormDataType = {
  lastname: string;
  name: string;
  phone: string;
  mail: string;
  deliveryType: string;
  deliveryAddress: string;
  deliveryCity?: string;
  paymentType: string;
  comment: string;
};

export const initialFormData: FormDataType = {
  lastname: "",
  name: "",
  phone: "",
  mail: "",
  deliveryType: "",
  deliveryAddress: "",
  deliveryCity: "",
  paymentType: "payAfterGetting",
  comment: "",
};

const CheckoutForm = forwardRef<
  HTMLFormElement,
  { onInputChange: () => void; isSubmitting: boolean }
>(({ onInputChange, isSubmitting }, ref) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const {
    city,
    setCity,
    selectedCity,
    setSelectedCity,
    warehouseNumber,
    setWarehouseNumber,
    cities,
    warehouses,
    showDropdown,
    setShowDropdown,
  } = useNovaPoshta();

  // Функція оновлення formData
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Функція для обробки змін у полях форми
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "deliveryType") {
      updateFormData("deliveryAddress", "");
      updateFormData("deliveryСity", "");
    }

    updateFormData(name, value);
  };

  useEffect(() => {
    if (isSubmitting === true) setFormData(initialFormData);
  }, [isSubmitting]);

  const isContactInfoValid =
    formData.lastname && formData.name && formData.phone && formData.mail;

  const isDeliveryInfoValid =
    formData.deliveryType && formData.deliveryAddress && formData.deliveryCity;

  useEffect(() => {
    if (cities.length === 1) {
      const city = cities[0] as { Ref: string; Description: string };
      setCity(city.Description);
      setSelectedCity(city.Ref);
      updateFormData("deliveryCity", city.Description);
      setShowDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  const handleOpenSpoller = (
    currentId: string,
    nextId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const currentDetails = document.querySelector(
      `details[name="${currentId}"]`,
    );
    const nextDetails = document.querySelector(`details[name="${nextId}"]`);

    if (currentDetails) {
      currentDetails.removeAttribute("open");
    }
    if (nextDetails) {
      nextDetails.setAttribute("open", "true");
    }
  };
  return (
    <form
      ref={ref}
      id="checkout-form"
      className="relative mt-4 rounded-lg bg-white px-8 py-2"
      onInput={onInputChange}
    >
      <details
        open={true}
        className="accordion-details border-b"
        name="contact-info"
      >
        <summary
          role="term"
          aria-details="contact-info border-b border-zinc-200"
          className="accordion-summary"
        >
          <div className="flex items-center justify-between pt-4">
            <p className="text-xl uppercase text-zinc-800 md:text-2xl">
              1. Контактна інформація
            </p>
            {isContactInfoValid && (
              <div className="flex cursor-pointer items-center gap-0.5 text-xs text-[var(--main-primary)]">
                <Pencil className="size-4" />
                <span>Редагувати</span>
              </div>
            )}
          </div>
          <div
            className={`my-1 flex h-4 items-center text-xs text-zinc-800 opacity-0 transition-opacity duration-500 lg:text-base ${isContactInfoValid && "h-9 opacity-100"}`}
          >
            {`${formData.lastname} / ${formData.name} / ${formData.phone} / ${formData.mail}`}
          </div>
        </summary>
      </details>
      <div role="definition" id="contact-info" className="accordion-content">
        <div className="accordion-content-body mt-4 lg:grid lg:grid-cols-2 lg:gap-x-4">
          <div className="input-group mb-1">
            <label htmlFor="lastname">
              Прізвище <sup className="text-red-500">&lowast;</sup>
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Ваше прізвище"
              required
              minLength={3}
              value={formData.lastname}
              onChange={handleChange}
              autoComplete="family-name"
            />
            <span />
            <span className="input-group__error">
              Прізвище обов&apos;язкове
            </span>
          </div>
          <div className="input-group mb-1">
            <label htmlFor="name">
              Ім&apos;я <sup className="text-red-500">&lowast;</sup>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ваше ім'я"
              required
              minLength={3}
              value={formData.name}
              onChange={handleChange}
              autoComplete="given-name"
            />
            <span />
            <span className="input-group__error">
              Ім&apos;я обов&apos;язкове
            </span>
          </div>
          <div className="input-group mb-1">
            <label htmlFor="name">
              Телефон <sup className="text-red-500">&lowast;</sup>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              inputMode="numeric"
              placeholder="+38 (___)__ __ __"
              required
              minLength={10}
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            <span />
            <span className="input-group__error">
              Некоректний номер телефону
            </span>
          </div>
          <div className="input-group mb-1">
            <label htmlFor="name">
              E-mail <sup className="text-red-500">&lowast;</sup>
            </label>
            <input
              type="mail"
              name="mail"
              id="mail"
              placeholder="email@gmail.com"
              required
              minLength={3}
              value={formData.mail}
              onChange={handleChange}
              autoComplete="home email webauthn"
              pattern=".+@*\.com"
            />
            <span />
            <span className="input-group__error">Некоректний email</span>
          </div>
          <p className="text-gray-500 lg:col-span-2">
            <sup className="text-red-500">&lowast;</sup> - поля, обов’язкові для
            заповнення
          </p>
          <button
            onClick={(e) =>
              handleOpenSpoller("contact-info", "delivery-info", e)
            }
            className="col-span-2 my-3 mb-6 flex h-14 w-full max-w-72 items-center justify-center rounded-lg bg-[var(--main-primary)] px-2 uppercase text-white transition-colors duration-500 hover:bg-[var(--main-dark)] hover:text-white md:mt-4"
          >
            <span>ПРОДОВЖИТИ ОФОРМЛЕННЯ</span>
          </button>
        </div>
      </div>

      {/* Спосіб доставки */}
      <details
        className="accordion-details border-b outline-none"
        name="delivery-info"
      >
        <summary
          role="term"
          aria-details="delivery-info"
          className="accordion-summary"
        >
          <div className="flex items-center justify-between pt-4">
            <p className="cursor-default text-xl uppercase text-zinc-800 md:text-2xl">
              2. Спосіб доставки
            </p>
            {isDeliveryInfoValid && (
              <div className="flex cursor-pointer items-center gap-0.5 text-xs text-[var(--main-primary)]">
                <Pencil className="size-4" />
                <span>Редагувати</span>
              </div>
            )}
          </div>
          <div
            className={`my-1 flex h-4 items-center text-xs text-zinc-800 opacity-0 transition-opacity duration-500 lg:text-base ${isDeliveryInfoValid && "h-9 opacity-100"}`}
          >
            {`${formData.deliveryType} / ${formData.deliveryCity} / ${formData.deliveryAddress}`}{" "}
          </div>
        </summary>
      </details>
      <div
        role="definition"
        id="delivery-info"
        className="accordion-content outline-none"
      >
        <div className="accordion-content-body mt-4">
          <div className="input-group mb-1">
            <label htmlFor="deliveryType">
              Спосіб доставки <sup className="text-red-500">&lowast;</sup>
            </label>
            <select
              name="deliveryType"
              id="deliveryType"
              required
              value={formData.deliveryType}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Оберіть спосіб доставки</option>
              {deliveryData.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <span className="input-group__error">
              Cпосіб доставки обов&apos;язкове
            </span>
          </div>
          {formData.deliveryType === "Nova Poshta" && (
            <div className="input-group relative mb-1">
              <label htmlFor="deliveryCity">
                Місто <sup className="text-red-500">&lowast;</sup>
              </label>
              <input
                type="text"
                name="deliveryCity"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  updateFormData("deliveryCity", e.target.value);
                }}
                placeholder="Введіть місто"
                className="delivery-city w-full border p-2"
                required
              />
              <span className="input-group__error">Micто обов&apos;язкове</span>

              {showDropdown && cities.length > 0 && (
                <div className="z-10 max-h-40 w-full touch-auto overflow-y-scroll rounded-lg border-2 border-gray-600 bg-white shadow-sm">
                  {cities.map((city: { [key: string]: string }) => (
                    <button
                      key={city.Ref}
                      className="block cursor-pointer px-4 py-2.5 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        setCity(city.Description);
                        setSelectedCity(city.Ref);
                        updateFormData("deliveryCity", city.Description);
                        setShowDropdown(false);
                      }}
                    >
                      {city.Description}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Список міст */}
          {/* Вибір відділення */}
          {selectedCity && formData.deliveryType === "Nova Poshta" && (
            <div className="input-group warhouse-select mb-1">
              <label>Відділення:</label>
              <input
                type="text"
                name="deliveryAddress"
                value={warehouseNumber}
                onChange={(e) => {
                  setWarehouseNumber(e.target.value);
                  updateFormData("deliveryAddress", e.target.value);
                }}
                placeholder="Введіть номер відділення"
                className="delivery-address w-full border p-2"
              />
            </div>
          )}
          {/* Список відділень */}
          {warehouses.length > 0 && formData.deliveryType === "Nova Poshta" && (
            <ul className="mt-1 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-sm">
              {warehouses.map((wh: { [key: string]: string }) => (
                <li
                  key={wh.Ref}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => {
                    setWarehouseNumber(wh.Description);
                    updateFormData("deliveryAddress", wh.Description);
                  }}
                >
                  {wh.Description}
                </li>
              ))}
            </ul>
          )}
          {/* Самовивіз */}
          {formData.deliveryType === "Самовивіз" && (
            <div className="input-group mb-2">
              <select onChange={handleChange} name="deliveryAddress" id="">
                <option value="">Адреса складу</option>
                <option value="Київ вул Новозабарська 21 (склад), Київ, Україна">
                  Київ вул. Новозабарська, 21 (склад), Київ, Україна
                </option>
              </select>
            </div>
          )}
          <p className="text-gray-500 lg:col-span-2">
            <sup className="text-red-500">&lowast;</sup> - поля, обов’язкові для
            заповнення
          </p>
          <button
            onClick={(e) =>
              handleOpenSpoller("delivery-info", "payment-info", e)
            }
            className="col-span-2 my-3 mb-6 flex h-14 w-full max-w-72 items-center justify-center rounded-lg bg-[var(--main-primary)] px-2 uppercase text-white transition-colors duration-500 hover:bg-[var(--main-dark)] hover:text-white md:mt-4"
          >
            <span>ПРОДОВЖИТИ ОФОРМЛЕННЯ</span>
          </button>
        </div>
      </div>

      {/* Спосіб оплати */}
      <details
        className="accordion-details border-b outline-none"
        name="payment-info"
      >
        <summary
          role="term"
          aria-details="payment-info"
          className="accordion-summary outline-none"
        >
          <div className="flex items-center justify-between pt-4">
            <p className="cursor-default text-xl uppercase text-zinc-800 md:text-2xl">
              3. Спосіб оплати
            </p>
          </div>
          <div
            className={`my-1 flex h-4 items-center text-xs text-zinc-800 opacity-0 transition-opacity duration-500 lg:text-base ${isContactInfoValid && "h-9 opacity-100"}`}
          >
            {`${formData.lastname} / ${formData.name} / ${formData.phone} / ${formData.mail}`}
          </div>
        </summary>
      </details>
      <div role="definition" id="payment-info" className="accordion-content">
        <div className="accordion-content-body mt-4 space-y-4">
          <div>
            <input
              className="mr-2"
              type="radio"
              id="payOne"
              name="paymentType"
              value="payAfterGetting"
              checked={formData.paymentType === "payAfterGetting"}
              onChange={handleChange}
            />
            <label
              htmlFor="payOne"
              className="cursor-pointer text-lg text-zinc-800"
            >
              Оплата при отриманні товару
            </label>
          </div>

          <div>
            <input
              className="mr-2"
              type="radio"
              id="payTwo"
              name="paymentType"
              value="payNoCash"
              checked={formData.paymentType === "payNoCash"}
              onChange={handleChange}
            />
            <label
              htmlFor="payTwo"
              className="cursor-pointer text-lg text-zinc-800"
            >
              Безготівковий розрахунок
            </label>
          </div>
        </div>
      </div>

      <div className="input-group mb-2 mt-4">
        <label htmlFor="comment-field">Коментарь до замовлення</label>
        <textarea
          name="comment"
          id="comment-field"
          value={formData.comment}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <span className="input-group__error">
          Коментарь обобов&apos;язковий
        </span>
      </div>
    </form>
  );
});

CheckoutForm.displayName = "CheckoutForm";
export { CheckoutForm };
