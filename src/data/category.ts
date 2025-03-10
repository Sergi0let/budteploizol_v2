import { Category, CategoryDisplayNames, CategoryLinksType } from "@/types";

export const categoryListData: CategoryLinksType[] = [
  {
    id: "1",
    name: CategoryDisplayNames[Category.Sidyshki],
    image: "/cat/1.webp",
    url: `/${Category.Sidyshki}`,
  },
  {
    id: "2",
    name: CategoryDisplayNames[Category.Kulumki],
    image: "/cat/2.webp",
    url: `/${Category.Kulumki}`,
  },
  {
    id: "3",
    name: CategoryDisplayNames[Category.Rolls],
    image: "/cat/3.webp",
    url: `/${Category.Rolls}`,
  },
  {
    id: "4",
    name: CategoryDisplayNames[Category.Mats],
    image: "/cat/4.webp",
    url: `/${Category.Mats}`,
  },
  {
    id: "5",
    name: CategoryDisplayNames[Category.Soundproofing],
    image: "/cat/5.webp",
    url: `/${Category.Soundproofing}`,
  },
];
