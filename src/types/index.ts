export type DeliveryInfoType = {
  id: string;
  imgUrl: string;
  name: string;
  type: string;
  time: string;
  cost: string;
};

export type CategoryLinksType = {
  id?: number | string;
  name: string;
  url: string;
  image?: string;
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
  Kulumki = "kulumki",
  Sidyshki = "sidyshki",
}

export const CategoryDisplayNames: { [key in Category]: string } = {
  [Category.Soundproofing]: "Звукоізоляційні матеріали",
  [Category.Mats]: "Спортивні мати",
  [Category.Rolls]: "Рулони",
  [Category.Kulumki]: "Килимки",
  [Category.Sidyshki]: "Сидушки",
};

export const CategoryTitles: { [key in Category]: string } = {
  [Category.Soundproofing]: "Матеріали для звукоізоляції",
  [Category.Mats]: "Спортивні мати для фітнесу, йоги, пілатесу",
  [Category.Rolls]: "Рулонні матеріали",
  [Category.Kulumki]: "Килимки для туризму, спорту, фітнесу",
  [Category.Sidyshki]: "Сидушки для туризму, спорту, фітнесу",
};

export enum ProductCategory {
  MILITARY = "military",
  CHILDREN = "children",
  SPORTS = "sports",
  BUILDING = "building",
}

// Оновлений тип продукту: використовуємо лише Category для зберігання маршруту,
// а для відображення назви можна звертатися до CategoryDisplayNames.
export type ProductType = {
  id: number | string;
  category: Category;
  groupName?: string;
  name: string;
  description: string;
  dimensions?: DimensionsType;
  layers?: string | null;
  unit: string;
  price: PriceType;
  image: string[];
  bestSales: boolean;
  isAvailable: boolean;
  discount: DiscountType | null;
  productType?: ProductCategory;
};
// end product type

export type SvgProps = {
  className: string;
};

export type CartItemType = {
  id: string | number;
  quantity: number;
};
