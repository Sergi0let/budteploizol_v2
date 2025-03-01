import { Categories, Features, Main, PreviewList } from "@/components";
import { products } from "@/data";
import { Category } from "@/types";

export default function Home() {
  const kulimki = products.filter(
    (product) => product.category === Category.Rolls,
  );
  const sudinia = products.filter(
    (product) => product.category === Category.Tourism,
  );

  return (
    <main className="flex-1 space-y-16 py-10 md:space-y-20">
      <Main />
      <Features />
      <Categories />
      <PreviewList
        listItems={kulimki}
        showAllLink={Category.Rolls}
        title="Килимки для пікніка та туризму"
      />
      <PreviewList
        listItems={sudinia}
        showAllLink={Category.Tourism}
        title="Туристичне сидіння (піддупник, сідачка)"
      />
    </main>
  );
}
