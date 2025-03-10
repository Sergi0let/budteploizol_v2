import { Categories, Features, Hero, PreviewList } from "@/components";
import { products } from "@/data";
import { categoryListData } from "@/data/category";
import { Category } from "@/types";

export default function Home() {
  const kulimki = products.filter(
    (product) => product.category === Category.Sidyshki,
  );
  const sudinia = products.filter(
    (product) => product.category === Category.Kulumki,
  );

  return (
    <main className="flex-1">
      <Hero />
      <Categories catData={categoryListData} />
      <Features />
      <PreviewList
        listItems={kulimki}
        showAllLink={Category.Sidyshki}
        title="Мати для спорту, туризму та ігор"
      />
      <PreviewList
        listItems={sudinia}
        showAllLink={Category.Kulumki}
        title="Туристичне сидіння (піддупник, сідачка)"
      />
    </main>
  );
}
