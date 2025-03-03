import { SectionHeading } from "@/components";
import { CategorieType } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CategorieItemType = Omit<CategorieType, "id"> & { i: number };

const CategoriesItem = ({ link, name, image, i }: CategorieItemType) => {
  return (
    <li
      className={`group overflow-hidden rounded-lg border ${i === 0 || i === 1 ? "min-[512px]:col-span-6" : "min-[512px]:col-span-6 md:col-span-4"}`}
    >
      <Link href={link}>
        <figure>
          <div className="relative size-full h-[120px] overflow-hidden md:h-[220px]">
            <Image
              className="absolute inset-0 size-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
              src={image}
              alt={name}
              width={200}
              height={200}
            />
          </div>
          <figcaption className="flex items-center gap-2 border-t p-3 md:p-5">
            <span className="transition-color line-clamp-1 flex-1 text-xl text-zinc-800 duration-500 group-hover:text-blue-600 md:text-2xl">
              {name}
            </span>
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-600 transition-transform duration-500 group-hover:rotate-90 md:size-8">
              <ArrowUpRight className="size-4 text-white md:size-6" />
            </span>
          </figcaption>
        </figure>
      </Link>
    </li>
  );
};

type CategoriesProps = { catData: CategorieType[] };

const CategoriesList = ({ catData }: CategoriesProps) => {
  return (
    <ul className="mt-3 grid gap-2 min-[512px]:grid-cols-12 md:mt-5 md:gap-3 lg:gap-4">
      {catData?.map(({ id, link, name, image }, i) => (
        <CategoriesItem key={id} link={link} name={name} image={image} i={i} />
      ))}
    </ul>
  );
};

const Categories = ({ catData }: CategoriesProps) => {
  return (
    <section className="mb-7 px-4 md:mb-10">
      <div className="container mx-auto max-w-7xl py-7 md:py-9">
        <SectionHeading title="Категорії товарів" />
        <CategoriesList catData={catData} />
      </div>
    </section>
  );
};

export { Categories };
