import { BreadcrumbNavigation, ListItems } from "@/components";
import { products } from "@/data";
import {
  Category,
  CategoryDisplayNames,
  SubCategorySoundproofing,
  SubCategorySoundproofingDescriptions,
  SubCategorySoundproofingDisplayNames,
} from "@/types";
import Image from "next/image";

export async function generateStaticParams() {
  return Object.values(SubCategorySoundproofing).map((subcategory) => ({
    category: Category.Soundproofing,
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
      <div className="bg-sky-50 px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[
              { label: "Головна", href: "/" },
              { label: "Каталог", href: "/catalog" },
              {
                label: CategoryDisplayNames[Category.Soundproofing],
                href: `/catalog/${Category.Soundproofing}`,
              },
              { label: SubCategorySoundproofingDisplayNames[categorySlug] },
            ]}
          />
          <div className="flex flex-col gap-2 py-5 md:flex-row">
            <div className="overflow-hidden md:sticky md:top-36 md:h-full md:w-1/2">
              <figure className="rounded-lg bg-white">
                <Image
                  className="size-full object-cover p-3"
                  src={`/cat/${Category.Soundproofing}.webp`}
                  alt={`${CategoryDisplayNames[Category.Soundproofing]}`}
                  width={500}
                  height={400}
                />
                <figcaption className="sr-only">
                  {CategoryDisplayNames[Category.Soundproofing]}
                </figcaption>
              </figure>
            </div>
            <div className="md:w-1/2">
              <h1 className="rounded-lg bg-white p-3 text-2xl font-medium text-zinc-800 md:p-6 md:text-3xl">
                {SubCategorySoundproofingDisplayNames[categorySlug]} (
                {dataDispay.length})
              </h1>
              <p className="mt-2 rounded-lg bg-white p-3 text-lg text-zinc-800 md:p-6 md:text-xl">
                {SubCategorySoundproofingDescriptions[categorySlug]}
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
