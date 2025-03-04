import { CategorieType, Category, CategoryDisplayNames } from "@/types";

export const categoryListData: CategorieType[] = [
  {
    id: "1",
    name: CategoryDisplayNames[Category.Sidyshki],
    image: "/cat/1.webp",
    link: `/${Category.Sidyshki}`,
  },
  {
    id: "2",
    name: CategoryDisplayNames[Category.Kulumki],
    image: "/cat/2.webp",
    link: `/${Category.Kulumki}`,
  },
  {
    id: "3",
    name: CategoryDisplayNames[Category.Rolls],
    image: "/cat/3.webp",
    link: `/${Category.Rolls}`,
  },
  {
    id: "4",
    name: CategoryDisplayNames[Category.Mats],
    image: "/cat/4.webp",
    link: `/${Category.Mats}`,
  },
  {
    id: "5",
    name: CategoryDisplayNames[Category.Soundproofing],
    image: "/cat/5.webp",
    link: `/${Category.Soundproofing}`,
  },
];
