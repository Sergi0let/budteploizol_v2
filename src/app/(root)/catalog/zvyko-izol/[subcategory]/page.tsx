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

export async function generateStaticParams() {
  return Object.values(SubCategorySoundproofing).map((subcategory) => ({
    subcategory,
  }));
}

const CategoryPage = async ({
  params,
}: {
  params: { category: string; subcategory: SubCategorySoundproofing };
}) => {
  const categorySlug = params.subcategory as SubCategorySoundproofing;

  const dataDispay = products.filter(
    (item) =>
      item.groupName === categorySlug &&
      item.category === Category.Soundproofing,
  );

  return (
    <main>
      <div className="px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              {
                label: CategoryDisplayNames[Category.Soundproofing],
                href: `/catalog/${Category.Soundproofing}`,
              },
            ]}
          />
          <h1 className="pb-6 pt-4 text-2xl font-medium text-zinc-800 md:text-3xl">
            {SubCategorySoundproofingDisplayNames[categorySlug]} (
            {dataDispay.length})
          </h1>

          <ListItems items={dataDispay} />
          <p className="mt-2 rounded-lg bg-white p-3 text-zinc-600 md:p-6 md:text-xl">
            {SubCategorySoundproofingDescriptions[categorySlug]}
          </p>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
