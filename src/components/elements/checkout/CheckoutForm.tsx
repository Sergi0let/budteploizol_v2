"use client";

import type React from "react";

import { deliveryData } from "@/data";
import { useNovaPoshta } from "@/hooks";
import { AlertCircle, Loader2, Pencil } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

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

type ValidationErrorsType = {
  [key in keyof FormDataType]?: string;
};

const CheckoutForm = forwardRef<
  HTMLFormElement,
  { onInputChange: () => void; isSubmitting: boolean }
>(({ onInputChange, isSubmitting }, ref) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {},
  );
  const [activeSection, setActiveSection] = useState<string>("contact-info");

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

  // New state variables and refs
  const [phoneValue, setPhoneValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const PREFIX = "+38 (0";

  // Add these new functions for phone input handling
  // Format phone number to ensure it has the correct format with parentheses
  const formatPhoneNumber = (value: string): string => {
    // If empty, return empty string (for placeholder to show)
    if (!value || value === "") {
      return "";
    }

    // If just the prefix, return the prefix
    if (value === PREFIX) {
      return PREFIX;
    }

    // Extract all digits from the input
    const allDigits = value.replace(/[^0-9]/g, "");

    // Handle potential duplication of "380"
    let digits = allDigits;
    if (allDigits.startsWith("380")) {
      digits = allDigits.substring(3);
    }

    // Format the phone number with the new pattern
    if (digits.length <= 2) {
      // Just the operator code (partial)
      return `+38 (0${digits}`;
    } else if (digits.length <= 5) {
      // Operator code complete, starting area code
      return `+38 (0${digits.substring(0, 2)}) ${digits.substring(2)}`;
    } else if (digits.length <= 7) {
      // Area code complete, starting subscriber number
      return `+38 (0${digits.substring(0, 2)}) ${digits.substring(2, 5)} ${digits.substring(5)}`;
    } else {
      // Full number with proper spacing
      return `+38 (0${digits.substring(0, 2)}) ${digits.substring(2, 5)} ${digits.substring(5, 7)} ${digits.substring(7, 9)}`;
    }
  };

  // Handle phone input changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // If we're deleting and at the prefix, don't format
    if (
      isDeleting &&
      (rawValue === PREFIX || rawValue.length <= PREFIX.length)
    ) {
      setPhoneValue(PREFIX);
      updateFormData("phone", PREFIX);
      return;
    }

    const formattedValue = formatPhoneNumber(rawValue);
    setPhoneValue(formattedValue);
    updateFormData("phone", formattedValue);
  };

  // Handle key down events to detect deletion
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Track if we're deleting
    setIsDeleting(e.key === "Backspace" || e.key === "Delete");

    // If field is empty and user presses a digit, add the prefix
    if (/^\d$/.test(e.key) && (!phoneValue || phoneValue === "")) {
      setPhoneValue(PREFIX);
      setTimeout(() => {
        if (phoneInputRef.current) {
          phoneInputRef.current.value = PREFIX + e.key;
          const event = new Event("input", { bubbles: true });
          phoneInputRef.current.dispatchEvent(event);
        }
      }, 0);
    }

    // Prevent deleting the prefix when it's present
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      phoneValue.startsWith(PREFIX) &&
      phoneInputRef.current &&
      (phoneInputRef.current.selectionStart || 0) <= PREFIX.length
    ) {
      e.preventDefault();
    }

    // Allow only digits, arrows, tab, backspace, delete
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    if (
      !allowedKeys.includes(e.key) &&
      !/^\d$/.test(e.key) &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
    }
  };

  // Handle focus to ensure prefix and cursor position
  const handlePhoneFocus = () => {
    if (phoneInputRef.current) {
      // If empty, set to prefix
      if (!phoneValue || phoneValue === "") {
        setPhoneValue(PREFIX);
        updateFormData("phone", PREFIX);
      }

      // Position cursor after prefix if at the beginning
      const cursorPos = phoneInputRef.current.selectionStart || 0;
      if (cursorPos < PREFIX.length && phoneValue.startsWith(PREFIX)) {
        setTimeout(() => {
          phoneInputRef.current?.setSelectionRange(
            PREFIX.length,
            PREFIX.length,
          );
        }, 10);
      }
    }
  };

  // Handle blur event
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // If only prefix is entered, clear the field to show placeholder
    if (phoneValue === PREFIX) {
      setPhoneValue("");
      updateFormData("phone", "");
    }

    // Validate the field
    handleBlur(e);
  };

  // Handle click to prevent cursor before prefix
  const handlePhoneClick = () => {
    if (phoneInputRef.current && phoneValue.startsWith(PREFIX)) {
      const cursorPos = phoneInputRef.current.selectionStart || 0;
      if (cursorPos < PREFIX.length) {
        phoneInputRef.current.setSelectionRange(PREFIX.length, PREFIX.length);
      }
    }
  };

  // Initialize phone value from formData
  useEffect(() => {
    if (formData.phone) {
      const formattedValue = formatPhoneNumber(formData.phone);
      setPhoneValue(formattedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update formData
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "deliveryType") {
      updateFormData("deliveryAddress", "");
      updateFormData("deliveryCity", "");
      setCity("");
      setSelectedCity("");
      setWarehouseNumber("");
    }

    updateFormData(name, value);
  };

  // Reset form on submission
  useEffect(() => {
    if (isSubmitting === true) {
      setFormData(initialFormData);
      setTouchedFields({});
      setActiveSection("contact-info");
    }
  }, [isSubmitting]);

  // Validate form fields
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "lastname":
      case "name":
        return value.length < 3 ? "Поле має містити щонайменше 3 символи" : "";
      case "phone":
        // Check if the phone number has the correct format and length
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
          return "Номер телефону має містити 10 цифр";
        }
        // Check if it starts with the correct prefix
        if (!value.startsWith("+38")) {
          return "Номер телефону має починатися з +38";
        }
        return "";
      case "mail":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Некоректний email"
          : "";
      case "deliveryType":
        return !value ? "Оберіть спосіб доставки" : "";
      case "deliveryCity":
        return formData.deliveryType === "Nova Poshta" && !value
          ? "Оберіть місто"
          : "";
      case "deliveryAddress":
        return formData.deliveryType && !value ? "Оберіть адресу доставки" : "";
      default:
        return "";
    }
  };

  // Validate all fields in a section
  const validateSection = (section: string): boolean => {
    let isValid = true;
    const newErrors: ValidationErrorsType = {};

    if (section === "contact-info") {
      ["lastname", "name", "phone", "mail"].forEach((field) => {
        const error = validateField(
          field,
          formData[field as keyof FormDataType] as string,
        );
        if (error) {
          newErrors[field as keyof FormDataType] = error;
          isValid = false;
        }
      });
    } else if (section === "delivery-info") {
      ["deliveryType"].forEach((field) => {
        const error = validateField(
          field,
          formData[field as keyof FormDataType] as string,
        );
        if (error) {
          newErrors[field as keyof FormDataType] = error;
          isValid = false;
        }
      });

      if (formData.deliveryType === "Nova Poshta") {
        ["deliveryCity", "deliveryAddress"].forEach((field) => {
          const error = validateField(
            field,
            formData[field as keyof FormDataType] as string,
          );
          if (error) {
            newErrors[field as keyof FormDataType] = error;
            isValid = false;
          }
        });
      } else if (formData.deliveryType === "Самовивіз") {
        const error = validateField(
          "deliveryAddress",
          formData.deliveryAddress,
        );
        if (error) {
          newErrors.deliveryAddress = error;
          isValid = false;
        }
      }
    }

    setValidationErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  // Check if contact info section is valid
  const isContactInfoValid =
    formData.lastname &&
    formData.name &&
    formData.phone &&
    formData.mail &&
    !validationErrors.lastname &&
    !validationErrors.name &&
    !validationErrors.phone &&
    !validationErrors.mail;

  // Check if delivery info section is valid
  const isDeliveryInfoValid = (() => {
    if (!formData.deliveryType) return false;

    if (formData.deliveryType === "Nova Poshta") {
      return (
        formData.deliveryCity &&
        formData.deliveryAddress &&
        !validationErrors.deliveryCity &&
        !validationErrors.deliveryAddress
      );
    }

    if (formData.deliveryType === "Самовивіз") {
      return formData.deliveryAddress && !validationErrors.deliveryAddress;
    }

    return false;
  })();

  // Handle field blur for validation
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle opening next section
  const handleOpenSection = (
    currentId: string,
    nextId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (!validateSection(currentId)) {
      // Mark all fields in the section as touched to show validation errors
      const sectionFields: Record<string, boolean> = {};

      if (currentId === "contact-info") {
        ["lastname", "name", "phone", "mail"].forEach((field) => {
          sectionFields[field] = true;
        });
      } else if (currentId === "delivery-info") {
        ["deliveryType", "deliveryCity", "deliveryAddress"].forEach((field) => {
          sectionFields[field] = true;
        });
      }

      setTouchedFields((prev) => ({
        ...prev,
        ...sectionFields,
      }));

      return;
    }

    const currentDetails = document.querySelector(
      `details[name="${currentId}"]`,
    );
    const nextDetails = document.querySelector(`details[name="${nextId}"]`);

    if (currentDetails) {
      currentDetails.removeAttribute("open");
    }
    if (nextDetails) {
      nextDetails.setAttribute("open", "true");
      setActiveSection(nextId);
    }
  };

  const formatDeliveryInfoSummary = () => {
    if (formData.deliveryType === "Самовивіз") {
      return `${formData.deliveryType} / ${formData.deliveryAddress}`;
    } else if (formData.deliveryType === "Nova Poshta") {
      return `${formData.deliveryType} / ${formData.deliveryCity || ""} / ${formData.deliveryAddress}`;
    }
    return "";
  };

  // Update form validity for the parent component
  useEffect(() => {
    if (isContactInfoValid && isDeliveryInfoValid) {
      // Set form validity to true only when all required sections are valid

      if (ref && typeof ref === "object" && ref.current) {
        // This will make the form appear valid to the parent component
        ref.current.setAttribute("data-valid", "true");
        onInputChange();
      }
    }
  }, [isContactInfoValid, isDeliveryInfoValid, onInputChange, ref]);

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-16 w-16 animate-spin text-[var(--main-primary)]" />
        <p className="mt-4 text-lg font-medium text-zinc-800">
          Обробка замовлення...
        </p>
      </div>
    );
  }

  return (
    <form
      ref={ref}
      id="checkout-form"
      className="relative mt-4 rounded-lg bg-white px-8 py-2"
      onInput={onInputChange}
    >
      {/* Contact Information Section */}
      <details
        open={activeSection === "contact-info"}
        className="accordion-details border-b"
        name="contact-info"
      >
        <summary
          role="term"
          aria-details="contact-info border-b border-zinc-200"
          className="accordion-summary"
          onClick={(e) => {
            if (activeSection !== "contact-info") {
              e.preventDefault();
              setActiveSection("contact-info");
            }
          }}
        >
          <div className="flex items-center justify-between pt-4">
            <p className="text-xl uppercase text-zinc-800 md:text-2xl">
              1. Контактна інформація
            </p>
            {isContactInfoValid && activeSection !== "contact-info" && (
              <div className="flex cursor-pointer items-center gap-0.5 text-xs text-[var(--main-primary)]">
                <Pencil className="size-4" />
                <span>Редагувати</span>
              </div>
            )}
          </div>
          <div
            className={`my-1 flex h-4 items-center text-xs text-zinc-800 opacity-0 transition-opacity duration-500 lg:text-base ${isContactInfoValid && "h-9 opacity-100"}`}
          >
            {isContactInfoValid &&
              activeSection !== "contact-info" &&
              `${formData.lastname} / ${formData.name} / ${formData.phone} / ${formData.mail}`}
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
              onBlur={handleBlur}
              autoComplete="family-name"
              className={`w-full border p-2 ${touchedFields.lastname && validationErrors.lastname ? "border-red-500" : ""}`}
            />
            {touchedFields.lastname && validationErrors.lastname && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 size-3" />
                {validationErrors.lastname}
              </div>
            )}
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
              onBlur={handleBlur}
              autoComplete="given-name"
              className={`w-full border p-2 ${touchedFields.name && validationErrors.name ? "border-red-500" : ""}`}
            />
            {touchedFields.name && validationErrors.name && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 size-3" />
                {validationErrors.name}
              </div>
            )}
          </div>
          <div className="input-group mb-1">
            <label htmlFor="phone">
              Телефон <sup className="text-red-500">&lowast;</sup>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              ref={phoneInputRef}
              inputMode="numeric"
              placeholder="+38 (0__) ___ __ __"
              required
              value={phoneValue}
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              onFocus={handlePhoneFocus}
              onClick={handlePhoneClick}
              onBlur={handlePhoneBlur}
              autoComplete="tel"
              maxLength={19}
              className={`w-full border p-2 ${touchedFields.phone && validationErrors.phone ? "border-red-500" : ""}`}
            />
            {touchedFields.phone && validationErrors.phone && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 size-3" />
                {validationErrors.phone}
              </div>
            )}
          </div>
          <div className="input-group mb-1">
            <label htmlFor="mail">
              E-mail <sup className="text-red-500">&lowast;</sup>
            </label>
            <input
              type="email"
              name="mail"
              id="mail"
              placeholder="email@gmail.com"
              required
              value={formData.mail}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              className={`w-full border p-2 ${touchedFields.mail && validationErrors.mail ? "border-red-500" : ""}`}
            />
            {touchedFields.mail && validationErrors.mail && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 size-3" />
                {validationErrors.mail}
              </div>
            )}
          </div>
          <p className="text-gray-500 lg:col-span-2">
            <sup className="text-red-500">&lowast;</sup> - поля,
            обов&apos;язкові для заповнення
          </p>
          <button
            onClick={(e) =>
              handleOpenSection("contact-info", "delivery-info", e)
            }
            disabled={!isContactInfoValid}
            className={`my-3 mb-6 flex h-10 w-full max-w-[240px] items-center justify-center rounded-lg px-1 text-sm text-white transition-colors duration-500 md:mt-4 ${
              isContactInfoValid
                ? "bg-[var(--main-primary)] hover:bg-[var(--main-dark)]"
                : "cursor-not-allowed bg-[var(--secondary-light)] !text-[var(--main-primary)]"
            }`}
          >
            <span>ПРОДОВЖИТИ ОФОРМЛЕННЯ</span>
          </button>
        </div>
      </div>

      {/* Delivery Information Section */}
      <details
        className="accordion-details border-b outline-none"
        name="delivery-info"
        open={activeSection === "delivery-info"}
      >
        <summary
          role="term"
          aria-details="delivery-info"
          className="accordion-summary"
          onClick={(e) => {
            if (activeSection !== "delivery-info" && isContactInfoValid) {
              e.preventDefault();
              setActiveSection("delivery-info");
            } else if (!isContactInfoValid) {
              e.preventDefault();
            }
          }}
        >
          <div className="flex items-center justify-between pt-4">
            <p
              className={`text-xl uppercase md:text-2xl ${isContactInfoValid ? "cursor-pointer text-zinc-800" : "cursor-not-allowed text-zinc-400"}`}
            >
              2. Спосіб доставки
            </p>
            {isDeliveryInfoValid && activeSection !== "delivery-info" && (
              <div className="flex cursor-pointer items-center gap-0.5 text-xs text-[var(--main-primary)]">
                <Pencil className="size-4" />
                <span>Редагувати</span>
              </div>
            )}
          </div>
          <div
            className={`my-1 flex h-4 items-center text-xs text-zinc-800 opacity-0 transition-opacity duration-500 lg:text-base ${isDeliveryInfoValid && "h-9 opacity-100"}`}
          >
            {isDeliveryInfoValid &&
              activeSection !== "delivery-info" &&
              formatDeliveryInfoSummary()}
            {/* {`${formData.deliveryType} / ${formData.deliveryCity || ""} / ${formData.deliveryAddress}`} */}
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
              onBlur={handleBlur}
              className={`w-full border p-2 ${touchedFields.deliveryType && validationErrors.deliveryType ? "border-red-500" : ""}`}
            >
              <option value="">Оберіть спосіб доставки</option>
              {deliveryData.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {touchedFields.deliveryType && validationErrors.deliveryType && (
              <div className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 size-3" />
                {validationErrors.deliveryType}
              </div>
            )}
          </div>

          {/* Nova Poshta delivery option */}
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
                onBlur={handleBlur}
                placeholder="Введіть місто"
                className={`delivery-city w-full border p-2 ${touchedFields.deliveryCity && validationErrors.deliveryCity ? "border-red-500" : ""}`}
                required
              />
              {touchedFields.deliveryCity && validationErrors.deliveryCity && (
                <div className="mt-1 flex items-center text-xs text-red-500">
                  <AlertCircle className="mr-1 size-3" />
                  {validationErrors.deliveryCity}
                </div>
              )}

              {showDropdown && cities.length > 0 && (
                <div className="z-10 max-h-40 w-full touch-auto overflow-y-scroll rounded-lg border-2 border-gray-600 bg-white shadow-sm">
                  {cities.map((city: { [key: string]: string }) => (
                    <button
                      key={city.Ref}
                      className="block w-full cursor-pointer px-4 py-2.5 text-left hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        setCity(city.Description);
                        setSelectedCity(city.Ref);
                        updateFormData("deliveryCity", city.Description);
                        setShowDropdown(false);

                        // Clear any validation errors
                        setValidationErrors((prev) => ({
                          ...prev,
                          deliveryCity: "",
                        }));
                      }}
                    >
                      {city.Description}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Nova Poshta warehouse selection */}
          {selectedCity && formData.deliveryType === "Nova Poshta" && (
            <div className="input-group warhouse-select mb-1">
              <label htmlFor="deliveryAddress">
                Відділення <sup className="text-red-500">&lowast;</sup>
              </label>
              <input
                type="text"
                name="deliveryAddress"
                id="deliveryAddress"
                value={warehouseNumber}
                onChange={(e) => {
                  setWarehouseNumber(e.target.value);
                  updateFormData("deliveryAddress", e.target.value);
                }}
                onBlur={handleBlur}
                placeholder="Введіть номер відділення"
                className={`delivery-address w-full border p-2 ${touchedFields.deliveryAddress && validationErrors.deliveryAddress ? "border-red-500" : ""}`}
                required
              />
              {touchedFields.deliveryAddress &&
                validationErrors.deliveryAddress && (
                  <div className="mt-1 flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 size-3" />
                    {validationErrors.deliveryAddress}
                  </div>
                )}
            </div>
          )}

          {/* Warehouse list */}
          {warehouses.length > 0 && formData.deliveryType === "Nova Poshta" && (
            <ul className="mt-1 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-sm">
              {warehouses.map((wh: { [key: string]: string }) => (
                <li
                  key={wh.Ref}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => {
                    setWarehouseNumber(wh.Description);
                    updateFormData("deliveryAddress", wh.Description);

                    // Clear any validation errors
                    setValidationErrors((prev) => ({
                      ...prev,
                      deliveryAddress: "",
                    }));
                  }}
                >
                  {wh.Description}
                </li>
              ))}
            </ul>
          )}

          {/* Self-pickup option */}
          {formData.deliveryType === "Самовивіз" && (
            <div className="input-group mb-2">
              <label htmlFor="deliveryAddress">
                Адреса складу <sup className="text-red-500">&lowast;</sup>
              </label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                name="deliveryAddress"
                id="deliveryAddress"
                value={formData.deliveryAddress}
                className={`w-full border p-2 ${touchedFields.deliveryAddress && validationErrors.deliveryAddress ? "border-red-500" : ""}`}
                required
              >
                <option value="">Оберіть адресу складу</option>
                <option value="Київ вул Новозабарська 21 (склад), Київ, Україна">
                  Київ вул. Новозабарська, 21 (склад), Київ, Україна
                </option>
              </select>
              {touchedFields.deliveryAddress &&
                validationErrors.deliveryAddress && (
                  <div className="mt-1 flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 size-3" />
                    {validationErrors.deliveryAddress}
                  </div>
                )}
            </div>
          )}

          <p className="text-gray-500 lg:col-span-2">
            <sup className="text-red-500">&lowast;</sup> - поля,
            обов&apos;язкові для заповнення
          </p>
          <button
            onClick={(e) =>
              handleOpenSection("delivery-info", "payment-info", e)
            }
            disabled={!isDeliveryInfoValid}
            className={`my-3 mb-6 flex h-10 w-full max-w-[240px] items-center justify-center rounded-lg px-1 text-sm text-white transition-colors duration-500 md:mt-4 ${
              isDeliveryInfoValid
                ? "bg-[var(--main-primary)] hover:bg-[var(--main-dark)]"
                : "cursor-not-allowed bg-[var(--secondary-light)] !text-[var(--main-primary)]"
            }`}
          >
            <span>ПРОДОВЖИТИ ОФОРМЛЕННЯ</span>
          </button>
        </div>
      </div>

      {/* Payment Information Section */}
      <details
        className="accordion-details border-b outline-none"
        name="payment-info"
        open={activeSection === "payment-info"}
      >
        <summary
          role="term"
          aria-details="payment-info"
          className="accordion-summary outline-none"
          onClick={(e) => {
            if (activeSection !== "payment-info" && isDeliveryInfoValid) {
              e.preventDefault();
              setActiveSection("payment-info");
            } else if (!isDeliveryInfoValid) {
              e.preventDefault();
            }
          }}
        >
          <div className="flex items-center justify-between pt-4">
            <p
              className={`text-xl uppercase md:text-2xl ${isDeliveryInfoValid ? "cursor-pointer text-zinc-800" : "cursor-not-allowed text-zinc-400"}`}
            >
              3. Спосіб оплати
            </p>
          </div>
          <div className="my-1 flex h-4 items-center text-xs text-zinc-800 opacity-0 transition-opacity duration-500 lg:text-base">
            {formData.paymentType === "payAfterGetting"
              ? "Оплата при отриманні товару"
              : "Безготівковий розрахунок"}
          </div>
        </summary>
      </details>
      <div role="definition" id="payment-info" className="accordion-content">
        <div className="accordion-content-body mt-4 space-y-4">
          <div className="flex items-center">
            <input
              className="mr-2 h-5 w-5 cursor-pointer"
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

          <div className="flex items-center">
            <input
              className="mr-2 h-5 w-5 cursor-pointer"
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

      {/* Comment Section */}
      <div className="input-group mb-2 mt-4">
        <label htmlFor="comment-field">Коментар до замовлення</label>
        <textarea
          name="comment"
          id="comment-field"
          value={formData.comment}
          onChange={handleChange}
          className="w-full border p-2"
          rows={4}
          placeholder="Додаткова інформація до замовлення"
        />
      </div>
    </form>
  );
});

CheckoutForm.displayName = "CheckoutForm";
export { CheckoutForm };
