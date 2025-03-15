import { ProductType } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "../elements";
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
    <section className="mb-7 md:mb-14">
      <div>
        <div className="container mx-auto flex max-w-7xl items-center justify-between">
          <SectionHeading
            title={title}
            className="pl-4 text-2xl md:text-3xl xl:text-4xl"
          />
          <Link
            href={showAllLink}
            className="mr-4 flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-50 text-blue-600 transition-colors duration-500 hover:bg-blue-600 hover:text-white md:text-lg"
          >
            <ChevronRight className="float-right translate-x-[1px]" />
          </Link>
        </div>
      </div>
      <div className="mt-3 md:mt-7">
        <CouroselList
          listItems={listItems}
          className="container mx-auto max-w-7xl"
        />
      </div>
    </section>
  );
};
