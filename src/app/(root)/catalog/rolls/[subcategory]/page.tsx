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

type Props = {
  params: { category: string; subcategory: SubCategoryRolls };
};

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

export async function generateStaticParams() {
  return Object.values(SubCategoryRolls).map((subcategory) => ({
    subcategory,
  }));
}

const CategoryPage = async ({ params }: Props) => {
  const categorySlug = params.subcategory as SubCategoryRolls;
  const dataDispay = products.filter((item) => item.groupName === categorySlug);

  return (
    <main>
      <div className="bg-sky-50 px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              {
                label: CategoryDisplayNames[Category.Rolls],
                href: `/catalog/${Category.Rolls}`,
              },
              { label: SubCategoryRollsDisplayNames[categorySlug] },
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
                {SubCategoryRollsDisplayNames[categorySlug]} (
                {dataDispay.length})
              </h1>
              <p className="mt-2 rounded-lg bg-white p-3 text-lg text-zinc-800 md:p-6 md:text-xl">
                {RollsSubcategoriesDescriptions[categorySlug]}
              </p>
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

export default CategoryPage;
