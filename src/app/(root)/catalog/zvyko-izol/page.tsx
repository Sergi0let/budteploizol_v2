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
  SubCategorySoundproofing,
  SubCategorySoundproofingDescriptions,
  SubCategorySoundproofingDisplayNames,
} from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const dynamicTitle =
    CategoryTitles[Category.Soundproofing] ?? "Назва за замовчуванням";
  const dynamicDescription = `Опис для категорії «${descriptionMetadata[Category.Soundproofing]}».`;
  const dynamicImage = `/cat/${Category.Soundproofing}.webp`;
  const dynamicKeywords = keywordsMetadata[Category.Soundproofing];

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
    (item) => item.category === Category.Soundproofing,
  );

  return (
    <main>
      <div className="px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: CategoryDisplayNames[Category.Soundproofing] },
            ]}
          />
          <h1 className="pb-6 pt-4 text-2xl font-medium text-zinc-800 md:text-3xl">
            {CategoryTitles[Category.Soundproofing]} ({dataDispay.length})
          </h1>

          <ListItems items={dataDispay} />
          {Object.values(SubCategorySoundproofing).map((subCategory, i) => (
            <div
              key={subCategory}
              className={`${Object.values(SubCategorySoundproofing).length - 1 === i ? "mb-0" : "mb-4"}`}
            >
              <Link
                className="block text-lg font-medium text-blue-600 after:content-['_↗'] hover:text-sky-700"
                href={`/catalog/${Category.Soundproofing}/${subCategory}`}
              >
                {SubCategorySoundproofingDisplayNames[subCategory]}
              </Link>

              <p className="mt-3 line-clamp-3 text-zinc-600">
                {SubCategorySoundproofingDescriptions[subCategory]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RollsPage;
