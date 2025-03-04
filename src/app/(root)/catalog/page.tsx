import { BreadcrumbNavigation, Categories } from "@/components";
import { categoryListData } from "@/data/category";

const CatalogPage = () => {
  return (
    <main>
      <div className="px-4">
        <div className="container mx-auto max-w-7xl pt-6">
          <BreadcrumbNavigation
            items={[{ label: "Головна", href: "/" }, { label: "Каталог" }]}
          />
        </div>
      </div>
      <Categories catData={categoryListData} />
    </main>
  );
};

export default CatalogPage;
