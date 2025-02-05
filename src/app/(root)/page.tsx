import { Main, PreviewList } from "@/components";
import { products } from "@/data";

export default function Home() {
  const kulimki = products.filter((product) => product.category === "kulimki");
  const sudinia = products.filter((product) => product.category === "sudinia");

  return (
    <main className="flex-1 space-y-16 py-10 md:space-y-20">
      <Main />
      <PreviewList
        listItems={kulimki}
        showAllLink={"/kulimki"}
        title="Килимки для пікніка та туризму"
      />
      <PreviewList
        listItems={sudinia}
        showAllLink={"/sudinia"}
        title="Туристичне сидіння (піддупник, сідачка)"
      />
    </main>
  );
}
