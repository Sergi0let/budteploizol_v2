import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-2 text-2xl font-medium md:text-3xl">
          Категорії товарів
        </h2>
        {/* <div className="grid grid-cols-2 gap-4">
          <div>Звукоізоляційні матеріали</div>
          <div>Мати</div>
          <div>Рулони</div>
          <div>Килимки туристичні</div>
      1  <div>Килимок сидіння</div>
        </div> */}
        <nav className="flex flex-wrap items-center justify-start gap-2 md:gap-4">
          <Link
            href={"/"}
            className="group relative h-full min-h-36 min-w-[240px] max-w-[400px] flex-1 overflow-hidden rounded-lg border"
          >
            <div className="p-2">
              <p className="text-left font-bold text-blue-600">
                Звукоізоляційні матеріали
              </p>
            </div>
            <Image
              className="absolute left-0 top-0 -z-10 size-full object-cover transition-transform group-hover:scale-125"
              src="/category/sound-wall.webp"
              alt="Звукоізоляційні матеріали"
              width={200}
              height={200}
            />
            <span className="absolute bottom-1 right-1 z-10 flex size-8 items-center justify-center rounded-full bg-yellow-300">
              <ArrowUpRight className="size-6 text-blue-600" />
            </span>
          </Link>
          <Link
            href={"/"}
            className="bg-category group relative h-full min-h-36 min-w-[240px] max-w-[400px] flex-1 overflow-hidden rounded-lg border"
          >
            <div className="p-2">
              <p className="text-left font-bold text-blue-600">Рулони</p>
            </div>
            <Image
              className="absolute left-0 top-0 -z-10 size-full object-cover transition-transform group-hover:scale-125"
              src="/category/timber-floor-gold.webp"
              alt="Звукоізоляційні матеріали"
              width={200}
              height={200}
            />
            <span className="absolute bottom-1 right-1 z-10 flex size-8 items-center justify-center rounded-full bg-yellow-300">
              <ArrowUpRight className="size-6 text-blue-600" />
            </span>
          </Link>
          <Link
            href={"/"}
            className="bg-category group relative h-full min-h-36 min-w-[240px] max-w-[400px] flex-1 overflow-hidden rounded-lg border"
          >
            <div className="p-2">
              <p className="text-left font-bold text-blue-600">Мати</p>
            </div>
            <Image
              className="absolute left-0 top-0 -z-10 size-full object-cover transition-transform group-hover:scale-125"
              src="/category/mats-commercial.jpg"
              alt="Звукоізоляційні матеріали"
              width={200}
              height={200}
            />
            <span className="absolute bottom-1 right-1 z-10 flex size-8 items-center justify-center rounded-full bg-yellow-300">
              <ArrowUpRight className="size-6 text-blue-600" />
            </span>
          </Link>
          <Link
            href={"/"}
            className="bg-category group relative h-full min-h-36 min-w-[240px] max-w-[400px] flex-1 overflow-hidden rounded-lg border"
          >
            <div className="p-2">
              <p className="text-left font-bold text-blue-600">
                Килимки туристичні
              </p>
            </div>
            <Image
              className="absolute left-0 top-0 -z-10 size-full object-cover transition-transform group-hover:scale-125"
              src="/category/kilimki-tourism-cat.webp"
              alt="Звукоізоляційні матеріали"
              width={200}
              height={200}
            />
            <span className="absolute bottom-1 right-1 z-10 flex size-8 items-center justify-center rounded-full bg-yellow-300">
              <ArrowUpRight className="size-6 text-blue-600" />
            </span>
          </Link>
          <Link
            href={"/"}
            className="bg-category group relative h-full min-h-36 min-w-[240px] max-w-[400px] flex-1 overflow-hidden rounded-lg border"
          >
            <div className="p-2">
              <p className="text-left font-bold text-blue-600">
                Килимок сидіння
              </p>
            </div>
            <Image
              className="absolute left-0 top-0 -z-10 size-full object-cover transition-transform group-hover:scale-125"
              src="/category/sidinia.webp"
              alt="Звукоізоляційні матеріали"
              width={200}
              height={200}
            />
            <span className="absolute bottom-1 right-1 z-10 flex size-8 items-center justify-center rounded-full bg-yellow-300">
              <ArrowUpRight className="size-6 text-blue-600" />
            </span>
          </Link>
        </nav>
        {/* <div className="flex h-full w-full items-center justify-center">
          <div className="grid h-full min-h-[380px] w-full grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3 lg:min-h-[440px] lg:grid-cols-4">
            <Link
              href="#"
              className="relative col-span-1 row-span-1 flex items-center justify-center overflow-hidden rounded-lg bg-blue-500 shadow-md lg:col-span-2"
            >
              <div className="absolute bottom-0 left-0 size-full object-fill">
                <Image
                  className="size-full object-cover brightness-75"
                  src="/category/soundproofing.webp"
                  alt="Звукоізоляційні матеріали"
                  width={200}
                  height={200}
                />
              </div>
              <span className="absolute bottom-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-amber-400 md:bottom-6 md:right-6 md:size-14">
                <ArrowUpRight className="size-6 text-blue-600 md:size-10" />
              </span>

              <div className="relative z-20 px-2 text-center font-bold tracking-wider text-white sm:px-6 md:text-xl lg:text-2xl">
                Звукоізоляційні матеріали
              </div>
            </Link>

            <Link
              href={"/"}
              className="relative col-span-1 row-span-1 flex items-center justify-center overflow-hidden rounded-lg bg-blue-500 shadow-md"
            >
              <div className="absolute inset-0 size-full object-fill">
                <Image
                  className="size-full object-cover"
                  src="/category/mat-cat.webp"
                  alt="Звукоізоляційні матеріали"
                  width={200}
                  height={200}
                />
              </div>
              <span className="absolute bottom-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-amber-400 md:bottom-6 md:right-6 md:size-14">
                <ArrowUpRight className="size-6 text-blue-600 md:size-10" />
              </span>

              <div className="relative z-20 px-2 text-center font-bold tracking-wider text-white sm:px-6 md:text-xl lg:text-2xl">
                Мати
              </div>
            </Link>

            <Link
              href={"/"}
              className="relative col-span-1 row-span-1 flex items-center justify-center rounded-lg bg-blue-500 shadow-md lg:row-span-2"
            >
              <div className="absolute inset-0 size-full object-fill">
                <Image
                  className="size-full object-cover"
                  src="/category/rolls-cat.webp"
                  alt="Звукоізоляційні матеріали"
                  width={200}
                  height={200}
                />
              </div>
              <span className="absolute bottom-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-amber-400 md:bottom-6 md:right-6 md:size-14">
                <ArrowUpRight className="size-6 text-blue-600 md:size-10" />
              </span>

              <div className="relative z-20 px-2 pt-2 text-center font-bold tracking-wider text-white sm:px-6 md:pt-6 md:text-xl lg:pt-12 lg:text-2xl">
                Рулони
              </div>
            </Link>

            <Link
              href={"/"}
              className="relative col-span-1 row-span-1 flex items-start justify-center rounded-lg bg-blue-500 pt-2 leading-none shadow-md md:pt-4"
            >
              <div className="absolute bottom-0 left-0 size-2/3 object-fill">
                <Image
                  className="size-full object-contain brightness-75"
                  src="/category/kilimki-tourism-cat.webp"
                  alt="Звукоізоляційні матеріали"
                  width={200}
                  height={200}
                />
              </div>
              <span className="absolute bottom-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-amber-400 md:bottom-6 md:right-6 md:size-14">
                <ArrowUpRight className="size-6 text-blue-600 md:size-10" />
              </span>

              <div className="relative z-20 px-2 text-center font-bold leading-none tracking-wider text-white sm:px-6 md:text-xl lg:text-2xl">
                Килимки туристичні
              </div>
            </Link>

            <div className="col-span-2 row-span-1 flex items-center justify-center rounded-lg bg-blue-500 shadow-md">
              <Link href="#">
                <div>Килимок сидіння</div>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export { Categories };
