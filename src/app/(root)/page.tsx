import { Categories, Features, Hero, PreviewList } from "@/components";
import { products } from "@/data";
import { categoryListData } from "@/data/category";
import { Category } from "@/types";

export default function Home() {
  const kulimki = products
    .filter((product) => product.category === Category.Sidyshki)
    .slice(0, 6);
  const sudinia = products
    .filter((product) => product.category === Category.Kulumki)
    .slice(0, 6);
  const mats = products
    .filter((product) => product.category === Category.Mats)
    .slice(0, 6);

  const rols = products
    .filter((product) => product.category === Category.Rolls)
    .slice(0, 6);

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
      <PreviewList
        listItems={mats}
        showAllLink={Category.Mats}
        title="Покриття для спортзалу, татамі"
      />
      <PreviewList
        listItems={rols}
        showAllLink={Category.Rolls}
        title="Утеплювач"
      />
    </main>
  );
}
