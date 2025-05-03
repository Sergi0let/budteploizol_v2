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
  subCategory?: string[][] | undefined;
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
  Soundproofing = "zvyko-izol",
  Mats = "mats",
  Rolls = "rolls",
  Kulumki = "kulumki",
  Sidyshki = "sidyshki",
}
// -------------------ROLLS----------------------
export enum SubCategoryRolls {
  OdnostronneFolhuvannya = "odnostronne-folhuvannya",
  DvostronneFolhuvannya = "dvostronne-folhuvannya",
  KleyovyyShar = "kleyovyy-shar",
  OdnostronneFolhuvannyaKley = "odnostronne-folhuvannya-kley",
  RozmitkaTeplaPidloha = "rozmitka-tepla-pidloha",
}

export const SubCategoryRollsDisplayNames: {
  [key in SubCategoryRolls]: string;
} = {
  [SubCategoryRolls.OdnostronneFolhuvannya]:
    "Полотно з одностороннім фольгуванням",
  [SubCategoryRolls.DvostronneFolhuvannya]:
    "Полотно з двостороннім фольгуванням",
  [SubCategoryRolls.KleyovyyShar]: "Полотно з клейовим шаром",
  [SubCategoryRolls.OdnostronneFolhuvannyaKley]:
    "Полотно з одностороннім фольгуванням та клейовим шаром",
  [SubCategoryRolls.RozmitkaTeplaPidloha]:
    "Полотно з розміткою під теплу підлогу",
};

export const RollsSubcategoriesDescriptions: Record<SubCategoryRolls, string> =
  {
    [SubCategoryRolls.OdnostronneFolhuvannya]:
      "Полотно із хімічно зшитого спіненого поліетилену з одностороннім покриттям із полірованої алюмінієвої фольги. Забезпечує високий рівень тепло-, паро- та звукоізоляції, ефективно відбиває теплову енергію. Матеріал не вбирає вологу, має тривалий термін експлуатації. Використовується для утеплення покрівель, фасадів, стін лазень і саун, опалювальних систем та трубопроводів. При монтажі під теплу підлогу рекомендується захист фольги поліетиленовою плівкою.",

    [SubCategoryRolls.DvostronneFolhuvannya]:
      "Полотно зі спіненого поліетилену з алюмінієвим покриттям з обох боків. Має високі тепло-, паро- та звукоізоляційні властивості завдяки подвійній фользі, яка ефективно відбиває тепло. Матеріал створює стабільний мікроклімат, вологостійкий, захищає від радону. Використовується для утеплення дахів, стін лазень, саун, ємностей і трубопроводів із температурою носія до 110°С. Для теплої підлоги необхідно використовувати захисну поліетиленову плівку.",

    [SubCategoryRolls.KleyovyyShar]:
      "Полотно зі спіненого поліетилену, оснащене якісним клейовим шаром із захисною лавсановою плівкою. Дозволяє швидко і зручно монтувати матеріал навіть у важкодоступних місцях без додаткових кріплень. Ідеальне рішення для тепло- та шумоізоляції систем кондиціонування, вентиляції, автомобільної шумоізоляції, трубопроводів. Перед монтажем поверхню необхідно знежирити, а для кращої адгезії рекомендується нагрів матеріалу феном.",

    [SubCategoryRolls.OdnostronneFolhuvannyaKley]:
      "Полотно зі спіненого поліетилену з одностороннім фольгованим покриттям та клейким шаром. Має високі тепло-, паро- та звукоізоляційні властивості, забезпечує ефективне відбиття тепла. Завдяки клейовому шару швидко монтується без додаткових засобів кріплення. Використовується для утеплення покрівель, фасадів, трубопроводів, систем вентиляції, кондиціювання та автомобільної шумоізоляції. Перед монтажем поверхню потрібно очистити і знежирити.",

    [SubCategoryRolls.RozmitkaTeplaPidloha]:
      "Полотно зі спіненого поліетилену зі спеціальною розміткою для простого й швидкого монтажу теплої підлоги. Розмітка полегшує точне розташування нагрівальних елементів. Матеріал володіє чудовими теплоізоляційними та вологостійкими властивостями, створюючи стабільний комфортний мікроклімат. Рекомендується додаткове використання поліетиленової плівки для захисту від вологи.",
  } as const;

// -----------------------SOUDPROOFING---
export enum SubCategorySoundproofing {
  OdnostronneFolhuvannya = "odnostronne-folhuvannya",
  DvostronneFolhuvannya = "dvostronne-folhuvannya",
  KleyovyyShar = "kleyovyy-shar",
  OdnostronneFolhuvannyaKley = "odnostronne-folhuvannya-kley",
  RozmitkaTeplaPidloha = "rozmitka-tepla-pidloha",
}
export const SubCategorySoundproofingDisplayNames: Record<
  SubCategorySoundproofing,
  string
> = {
  [SubCategorySoundproofing.OdnostronneFolhuvannya]:
    "Полотно з одностороннім фольгуванням",
  [SubCategorySoundproofing.DvostronneFolhuvannya]:
    "Полотно з двостороннім фольгуванням",
  [SubCategorySoundproofing.KleyovyyShar]: "Полотно з клейовим шаром",
  [SubCategorySoundproofing.OdnostronneFolhuvannyaKley]:
    "Полотно з одностороннім фольгуванням та клейовим шаром",
  [SubCategorySoundproofing.RozmitkaTeplaPidloha]:
    "Полотно з розміткою під теплу підлогу",
};
export const SubCategorySoundproofingDescriptions: Record<
  SubCategorySoundproofing,
  string
> = {
  [SubCategorySoundproofing.OdnostronneFolhuvannya]:
    "Полотно із хімічно зшитого спіненого поліетилену з одностороннім покриттям із полірованої алюмінієвої фольги. Забезпечує високий рівень тепло-, паро- та звукоізоляції, ефективно відбиває теплову енергію. Матеріал не вбирає вологу, має тривалий термін експлуатації. Використовується для утеплення покрівель, фасадів, стін лазень і саун, опалювальних систем та трубопроводів. При монтажі під теплу підлогу рекомендується захист фольги поліетиленовою плівкою.",

  [SubCategorySoundproofing.DvostronneFolhuvannya]:
    "Полотно зі спіненого поліетилену з алюмінієвим покриттям з обох боків. Має високі тепло-, паро- та звукоізоляційні властивості завдяки подвійній фользі, яка ефективно відбиває тепло. Матеріал створює стабільний мікроклімат, вологостійкий, захищає від радону. Використовується для утеплення дахів, стін лазень, саун, ємностей і трубопроводів із температурою носія до 110°С. Для теплої підлоги необхідно використовувати захисну поліетиленову плівку.",

  [SubCategorySoundproofing.KleyovyyShar]:
    "Полотно зі спіненого поліетилену, оснащене якісним клейовим шаром із захисною лавсановою плівкою. Дозволяє швидко і зручно монтувати матеріал навіть у важкодоступних місцях без додаткових кріплень. Ідеальне рішення для тепло- та шумоізоляції систем кондиціонування, вентиляції, автомобільної шумоізоляції, трубопроводів. Перед монтажем поверхню необхідно знежирити, а для кращої адгезії рекомендується нагрів матеріалу феном.",

  [SubCategorySoundproofing.OdnostronneFolhuvannyaKley]:
    "Полотно зі спіненого поліетилену з одностороннім фольгованим покриттям та клейким шаром. Має високі тепло-, паро- та звукоізоляційні властивості, забезпечує ефективне відбиття тепла. Завдяки клейовому шару швидко монтується без додаткових засобів кріплення. Використовується для утеплення покрівель, фасадів, трубопроводів, систем вентиляції, кондиціювання та автомобільної шумоізоляції. Перед монтажем поверхню потрібно очистити і знежирити.",

  [SubCategorySoundproofing.RozmitkaTeplaPidloha]:
    "Полотно зі спіненого поліетилену зі спеціальною розміткою для простого й швидкого монтажу теплої підлоги. Розмітка полегшує точне розташування нагрівальних елементів. Матеріал володіє чудовими теплоізоляційними та вологостійкими властивостями, створюючи стабільний комфортний мікроклімат. Рекомендується додаткове використання поліетиленової плівки для захисту від вологи.",
} as const;

export const CategoryDisplayNames: { [key in Category]: string } = {
  [Category.Soundproofing]: "Полотно для виготовлення устілок та взуття",
  [Category.Mats]: "Спортивні мати",
  [Category.Rolls]: "Ізоляційні рулони",
  [Category.Kulumki]: "Килимки",
  [Category.Sidyshki]: "Сидушки",
};

export const CategoryTitles: { [key in Category]: string } = {
  [Category.Soundproofing]: "Матеріали для виготовлення устілок і взуття",
  [Category.Mats]: "Спортивні мати для фітнесу, йоги, пілатесу",
  [Category.Rolls]: "Ізоляційні рулони",
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
