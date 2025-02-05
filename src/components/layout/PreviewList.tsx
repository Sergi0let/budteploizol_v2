import { ProductType } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CouroselList } from "./CouroselList";

type PreviewListProps = {
  listItems: ProductType[];
  title: string;
  showAllLink: string;
};

export const PreviewList = ({
  listItems,
  title,
  showAllLink,
}: PreviewListProps) => {
  return (
    <section>
      <div className="px-4">
        <div className="container mx-auto flex max-w-7xl items-center justify-between">
          <h2 className="text-2xl font-medium md:text-3xl">{title}</h2>
          <Link
            href={showAllLink}
            className="transition-colors duration-200 hover:text-blue-600 md:text-lg"
          >
            <ChevronRight className="float-right" />
          </Link>
        </div>
      </div>
      <div className="ps-4">
        <CouroselList
          listItems={listItems}
          className="container mx-auto max-w-7xl"
        />
      </div>
    </section>
  );
};
