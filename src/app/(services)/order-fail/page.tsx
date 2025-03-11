import { BreadcrumbNavigation } from "@/components";
import Link from "next/link";

export default function OrderFailPage() {
  return (
    <main className="bg-sky-50 px-4 py-6 md:py-9">
      <div className="container mx-auto max-w-7xl">
        <BreadcrumbNavigation
          items={[
            { label: "Головна", href: "/" },
            { label: "Дякуємо за замовлення" },
          ]}
        />
        <div className="mt-10 rounded-lg bg-white p-6 md:flex">
          <div className="flex-1">
            <h1 className="text-2xl font-medium text-red-600 md:text-3xl">
              Щось пішло не так...
            </h1>
            <p className="mt-4 text-zinc-500">
              Спробуйте ще раз, перевірте правильність введених даних, або
              зверніться до нашої служби підтримки.
            </p>
          </div>
          <div>
            <Link
              className="mt-10 flex h-14 w-full items-center justify-center rounded-lg bg-blue-600 px-4 uppercase text-white hover:bg-sky-800 disabled:bg-sky-700 md:mt-0"
              href={"/"}
            >
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
