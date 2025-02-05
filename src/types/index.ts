export type CategoryLinksType = {
  id: number;
  name: string;
  url: string;
};

export enum ContactType {
  Phone = "phone",
  Whatsapp = "whatsapp",
  Telegram = "telegram",
  Viber = "viber",
}

export type ContactEntityType = {
  id: number;
  phone: string;
  position: string | null;
  name: string | null;
  typeContact: ContactType;
};

// product type
// Типи продукту
export type DimensionsType = {
  length: number;
  width: number;
  thickness: number;
};

export type PriceType = {
  minimum: {
    withoutVAT: number;
    withVAT: number;
  };
  retail: {
    withoutVAT: number;
    withVAT: number;
  };
};

export type DiscountType = {
  percentage: number;
  validUntil: string | null;
};

// Єдиний enum для категорій (маршрут)
export enum Category {
  Sudinia = "sudinia",
  Kulimki = "kulimki",
}

// Об’єкт для відображення назв категорій
export const CategoryDisplayNames: { [key in Category]: string } = {
  [Category.Sudinia]: "Сидушки",
  [Category.Kulimki]: "Килимки",
};

export const CategoryTitles: { [key in Category]: string } = {
  [Category.Sudinia]: "Туристичне сидіння (піддупник, сідачка)",
  [Category.Kulimki]: "Килимки для фітнесу, йоги, пілатесу",
};

// Оновлений тип продукту: використовуємо лише Category для зберігання маршруту,
// а для відображення назви можна звертатися до CategoryDisplayNames.
export type ProductType = {
  id: number;
  category: Category;
  name: string;
  description: string;
  dimensions: DimensionsType;
  layers?: string;
  unit: string;
  price: PriceType;
  image: string[];
  bestSales: boolean;
  isAvailable: boolean;
  discount: DiscountType | null;
};
// end product type
