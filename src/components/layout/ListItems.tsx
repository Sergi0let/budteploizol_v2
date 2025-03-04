import { Card } from "@/components";
import { ProductType } from "@/types";

export const ListItems = ({ items }: { items: ProductType[] }) => {
  return (
    <div>
      <div className="flex h-12 items-center rounded-t-lg border-l border-r border-t px-5"></div>
      <ul className="list-items">
        {items.map((items) => (
          <li className="list-item" key={items.id}>
            <Card {...items} />
          </li>
        ))}
      </ul>
    </div>
  );
};
