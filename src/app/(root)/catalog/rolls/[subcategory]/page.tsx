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
      <div className="px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              {
                label: CategoryDisplayNames[Category.Rolls],
                href: `/catalog/${Category.Rolls}`,
              },
            ]}
          />
          <h1 className="pb-6 pt-4 text-2xl font-medium text-zinc-800 md:text-3xl">
            {SubCategoryRollsDisplayNames[categorySlug]} ({dataDispay.length})
          </h1>

          <ListItems items={dataDispay} />

          <p className="mt-2 text-zinc-600 md:pt-6 md:text-xl">
            {RollsSubcategoriesDescriptions[categorySlug]}
          </p>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
