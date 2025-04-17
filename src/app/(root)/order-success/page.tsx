import { BreadcrumbNavigation } from "@/components";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="bg-[var(--secondary-light)] px-4 py-6 md:py-9">
      <div className="container mx-auto max-w-7xl">
        <BreadcrumbNavigation
          items={[
            { label: "Головна", href: "/" },
            { label: "Дякуємо за замовлення" },
          ]}
        />
        <div className="mt-10 rounded-lg bg-white p-6 md:flex">
          <div className="flex-1">
            <h1 className="text-2xl font-medium text-zinc-800 md:text-3xl">
              ДЯКУЄМО ЗА ЗАМОВЛЕННЯ
            </h1>
            <p className="mt-4 text-zinc-500">
              Ми отримали ваше замовлення та працюємо над його виконанням.
            </p>
          </div>
          <div>
            <Link
              className="mt-10 flex h-14 w-full items-center justify-center rounded-lg bg-[var(--main-primary)] px-4 uppercase text-white hover:bg-sky-800 disabled:bg-sky-700 md:mt-0"
              href={"/"}
            >
              Перейти на головну
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
