import { BreadcrumbNavigation, ListItems } from "@/components";
import { products } from "@/data";
import { Category, CategoryDisplayNames, CategoryTitles } from "@/types";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categorySlug = (await params).slug as Category;
  const dataDispay = products.filter((item) => item.category === categorySlug);

  return (
    <main className="px-4">
      <div className="container mx-auto max-w-7xl pt-6">
        <BreadcrumbNavigation
          items={[
            { label: "Головна", href: "/" },
            { label: "Каталог", href: "/catalog" },
            { label: CategoryDisplayNames[categorySlug] },
          ]}
        />
        <h1 className="mt-4 text-2xl font-medium text-zinc-800 md:text-4xl xl:text-5xl">
          {CategoryTitles[categorySlug]} ({dataDispay.length})
        </h1>

        <div className="mt-6 md:mt-10">
          <ListItems items={dataDispay} />
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
