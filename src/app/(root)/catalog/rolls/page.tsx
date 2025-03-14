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
import Image from "next/image";
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
      <div className="bg-sky-50 px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: CategoryDisplayNames[Category.Rolls] },
            ]}
          />
          <div className="flex flex-col gap-2 py-5 md:flex-row">
            <div className="overflow-hidden md:sticky md:top-36 md:h-full md:w-1/2">
              <figure className="rounded-lg bg-white">
                <Image
                  className="size-full object-cover p-3"
                  src={`/cat/${Category.Rolls}.webp`}
                  alt={`${CategoryDisplayNames[Category.Rolls]}`}
                  width={500}
                  height={400}
                />
                <figcaption className="sr-only">
                  {CategoryDisplayNames[Category.Rolls]}
                </figcaption>
              </figure>
            </div>
            <div className="md:w-1/2">
              <h1 className="rounded-lg bg-white p-3 text-2xl font-medium text-zinc-800 md:p-6 md:text-3xl">
                {CategoryTitles[Category.Rolls]} ({dataDispay.length})
              </h1>

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
        </div>
      </div>
      <div className="px-4">
        <div className="container mx-auto mt-6 max-w-7xl md:mt-10">
          <ListItems items={dataDispay} />
        </div>
      </div>
    </main>
  );
};

export default RollsPage;
