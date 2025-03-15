import { BreadcrumbNavigation, ListItems } from "@/components";
import { products } from "@/data";
import {
  baseUrl,
  descriptionMetadata,
  keywordsMetadata,
  Thumbnail,
} from "@/data/metadata";
import {
  Category,
  CategoryDisplayNames,
  CategoryTitles,
  RollsSubcategoriesDescriptions,
  SubCategoryRolls,
  SubCategoryRollsDisplayNames,
} from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const dynamicTitle =
    CategoryTitles[Category.Soundproofing] ?? "Назва за замовчуванням";
  const dynamicDescription = `Опис для категорії «${descriptionMetadata[Category.Rolls]}».`;
  const dynamicImage = `/cat/${Category.Rolls}.webp`;
  const dynamicKeywords = keywordsMetadata[Category.Rolls];

  return {
    metadataBase: new URL(baseUrl),
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: dynamicKeywords,
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      url: baseUrl,
      images: [
        {
          url: dynamicImage,
          secureUrl: Thumbnail,
          width: 1200,
          height: 630,
          alt: `Зображення для ${dynamicTitle}`,
        },
      ],
      type: "website",
      siteName: "БУДТЕПЛОІЗОЛ",
    },
  };
}

const RollsPage = () => {
  const dataDispay = products.filter(
    (item) => item.category === Category.Rolls,
  );

  return (
    <main>
      <div className="px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: CategoryDisplayNames[Category.Rolls] },
            ]}
          />

          <h1 className="pb-6 pt-4 text-2xl font-medium text-zinc-800 md:text-3xl">
            {CategoryTitles[Category.Rolls]} ({dataDispay.length})
          </h1>

          <ListItems items={dataDispay} />

          <div className="mt-2 rounded-lg bg-white p-3 md:p-6">
            {Object.values(SubCategoryRolls).map((subCategory, i) => (
              <div
                key={subCategory}
                className={`${Object.values(SubCategoryRolls).length - 1 === i ? "mb-0" : "mb-4"}`}
              >
                <Link
                  className="block text-lg font-medium text-blue-600 after:content-['_↗'] hover:text-sky-700"
                  href={`/catalog/${Category.Rolls}/${subCategory}`}
                >
                  {SubCategoryRollsDisplayNames[subCategory]}
                </Link>

                <p className="mt-3 line-clamp-3 text-zinc-600">
                  {RollsSubcategoriesDescriptions[subCategory]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RollsPage;
