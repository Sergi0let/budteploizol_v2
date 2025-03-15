import {
  BreadcrumbNavigation,
  KulumkiDescription,
  ListItems,
  MattsDescription,
  SudiniaDescription,
} from "@/components";
import { products } from "@/data";
import {
  baseUrl,
  descriptionMetadata,
  keywordsMetadata,
  Thumbnail,
} from "@/data/metadata";
import { Category, CategoryTitles } from "@/types";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categorySlug = params.slug as Category;

  const dynamicTitle = CategoryTitles[categorySlug] ?? "Назва за замовчуванням";
  const dynamicDescription = `Опис для категорії «${descriptionMetadata[categorySlug]}».`;
  const dynamicImage = `/cat/${categorySlug}.webp`;
  const dynamicKeywords = keywordsMetadata[categorySlug] ?? "";

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
  return Object.values(Category).map((category) => ({
    slug: category,
  }));
}

const CategoryPage = async ({ params }: Props) => {
  const categorySlug = params.slug as Category;
  const dataDispay = products.filter((item) => item.category === categorySlug);

  return (
    <main>
      <div className="px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
            ]}
          />
          <h1 className="pb-6 pt-4 text-2xl font-medium text-zinc-800 md:text-3xl">
            {CategoryTitles[categorySlug]} ({dataDispay.length})
          </h1>

          <ListItems items={dataDispay} />

          <div>
            {categorySlug === Category.Mats && <MattsDescription />}
            {categorySlug === Category.Kulumki && <KulumkiDescription />}
            {categorySlug === Category.Sidyshki && <SudiniaDescription />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
