import { Card } from "@/components";
import { ProductType } from "@/types";

export const ListItems = ({ items }: { items: ProductType[] }) => {
  return (
    <div className="grid grid-cols-2 flex-wrap gap-2 md:grid-cols-3 md:gap-4 lg:gap-6 xl:grid-cols-4">
      {items.map((items) => (
        <Card key={items.id} {...items} />
      ))}
    </div>
  );
};
