export type CategoryLinksType = {
  id: number;
  name: string;
  url: string;
};

export enum ContactType {
  Phone = "phone",
  Kyivstar = "kyivstar",
  Vodafone = "vodafone",
  Whatsapp = "whatsapp",
  Telegram = "telegram",
  Viber = "viber",
}
export type ContactEntityType = {
  id: number;
  phone: string;

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
  Soundproofing = "soundproofing",
  Mats = "mats",
  Rolls = "rolls",
  Tourism = "tourism",
}

export const CategoryDisplayNames: { [key in Category]: string } = {
  [Category.Soundproofing]: "Звукоізоляційні матеріали",
  [Category.Mats]: "Спортивні мати",
  [Category.Rolls]: "Рулони",
  [Category.Tourism]: "Товари для відпочинку, спорту і туризму",
};

export const CategoryTitles: { [key in Category]: string } = {
  [Category.Soundproofing]: "Матеріали для звукоізоляції",
  [Category.Mats]: "Спортивні мати для фітнесу, йоги, пілатесу",
  [Category.Rolls]: "Рулонні матеріали",
  [Category.Tourism]: "Туристичні товари: килимки, сидушки, аксесуари",
};

// Оновлений тип продукту: використовуємо лише Category для зберігання маршруту,
// а для відображення назви можна звертатися до CategoryDisplayNames.
export type ProductType = {
  id: number;
  category: Category;
  name: string;
  description: string;
  dimensions?: DimensionsType;
  layers?: string;
  unit: string;
  price: PriceType;
  image: string[];
  bestSales: boolean;
  isAvailable: boolean;
  discount: DiscountType | null;
};
// end product type

export type SvgProps = {
  className: string;
};
