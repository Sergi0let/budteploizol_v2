import { useDebounce } from "@/hooks";
import { useEffect, useState } from "react";

const useNovaPoshta = () => {
  const [city, setCity] = useState("");
  const debouncedCity = useDebounce(city, 500);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [warehouses, setWarehouses] = useState([]);
  const [warehouseNumber, setWarehouseNumber] = useState("");
  const debouncedWarehouseNumber = useDebounce(warehouseNumber, 300);

  const [showDropdown, setShowDropdown] = useState(false);
  const [, setLoading] = useState(false);

  // Запит на список міст
  const fetchCities = async (cityName: string) => {
    if (!cityName) return;
    setLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/novaposhta/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityName }),
        },
      );

      const data = await response.json();
      setCities(data || []);
      setShowDropdown(true);
      setWarehouseNumber("");
    } catch (error) {
      console.error("Помилка при отриманні міст:", error);
    } finally {
      setLoading(false);
    }
  };

  // Запит на список відділень
  const fetchWarehouses = async (cityRef: string, searchNumber = "") => {
    if (!cityRef) return;
    setLoading(true);
    setWarehouses([]);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/novaposhta/warehouses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityRef, searchNumber }),
        },
      );

      const data = await response.json();
      setWarehouses(data || []);
    } catch (error) {
      console.error("Помилка при отриманні відділень:", error);
    } finally {
      setLoading(false);
    }
  };

  // Виклик API при введенні міста
  useEffect(() => {
    if (debouncedCity) fetchCities(debouncedCity);
  }, [debouncedCity]);

  // Виклик API при зміні міста або введенні номеру відділення
  useEffect(() => {
    if (selectedCity) fetchWarehouses(selectedCity, debouncedWarehouseNumber);
  }, [selectedCity, debouncedWarehouseNumber]);

  return {
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
  };
};

export { useNovaPoshta };
