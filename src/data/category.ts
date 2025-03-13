import {
  Category,
  CategoryDisplayNames,
  CategoryLinksType,
  SubCategoryRolls,
  SubCategorySoundproofing,
} from "@/types";

export const categoryListData: CategoryLinksType[] = [
  {
    id: "1",
    name: CategoryDisplayNames[Category.Sidyshki],
    image: "/cat/sidyshki.webp",
    url: `/${Category.Sidyshki}`,
  },
  {
    id: "2",
    name: CategoryDisplayNames[Category.Kulumki],
    image: "/cat/kulumki.webp",
    url: `/${Category.Kulumki}`,
  },
  {
    id: "3",
    name: CategoryDisplayNames[Category.Rolls],
    image: "/cat/rolls.webp",
    url: `/${Category.Rolls}`,
    subCategory: Object.entries(SubCategoryRolls),
  },
  {
    id: "4",
    name: CategoryDisplayNames[Category.Mats],
    image: "/cat/mats.webp",
    url: `/${Category.Mats}`,
  },
  {
    id: "5",
    name: CategoryDisplayNames[Category.Soundproofing],
    image: "/cat/zvyko-izol.webp",
    url: `/${Category.Soundproofing}`,
    subCategory: Object.entries(SubCategorySoundproofing),
  },
];
