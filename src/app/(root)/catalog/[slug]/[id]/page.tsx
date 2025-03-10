import {
  BreadcrumbNavigation,
  BtnOpenCart,
  CharacteristicsInfo,
  DeliveryInfo,
  ProductCartActions,
  ProductSlider,
  SectionHeading,
} from "@/components";
import { deliveryData, products } from "@/data";
import { formatPrice } from "@/lib/utils";
import { CategoryDisplayNames, ProductType } from "@/types";
import { BriefcaseBusiness, CircleCheck, CircleX, Wallet } from "lucide-react";

const ProductPage = async ({
  params,
}: {
  params: { slug: string; id: string };
}) => {
  const { id: idSlug, slug } = params;
  const dataDisplay: ProductType | undefined = products.find(
    (item) => item.id === idSlug,
  );

  if (!dataDisplay) return <div>Product not found</div>;

  const {
    // bestSales,
    // category,
    description,
    id,
    image,
    name,
    price,
    dimensions,
    // discount,
    isAvailable,
    // unit,
    // layers,
  } = dataDisplay;

  // const isDiscounted = discount && discount?.percentage > 0;

  return (
    <main className="bg-sky-50 px-4 py-6 md:py-9">
      <div className="container mx-auto max-w-7xl">
        <BreadcrumbNavigation
          items={[
            { label: "Головна", href: "/" },
            { label: "Каталог", href: "/catalog" },
            {
              label:
                CategoryDisplayNames[
                  slug as keyof typeof CategoryDisplayNames
                ] || "Невідома категорія",
              href: `/catalog/${slug}`,
            },
            { label: "Товар" },
          ]}
        />
        <div className="mt-4 flex flex-col gap-2 lg:flex-row">
          <div className="lg:sticky lg:top-20 lg:h-full lg:w-1/2">
            <ProductSlider productImages={image} />
          </div>
          <div className="space-y-2 md:flex-1 lg:w-1/2">
            <h1 className="rounded-lg bg-white p-6 text-2xl font-medium text-zinc-800 md:text-3xl">
              {name}
            </h1>

            <div className="rounded-lg bg-white p-6">
              <div className="flex items-center justify-between gap-2">
                {isAvailable ? (
                  <div className="font-medium text-green-500">
                    <CircleCheck className="float-left mr-1" /> В наявності
                  </div>
                ) : (
                  <div className="font-medium text-red-500">
                    <CircleX className="float-left mr-1" /> Не в наявності
                  </div>
                )}
                <div className="text-zinc-400">
                  Артикул: <b className="font-medium text-zinc-800">RGGG3510</b>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                <div className="flex items-center">
                  {/* {isDiscounted ? (
                    <>
                      <p className="text-sm text-gray-300 line-through">
                        {formatPrice(price.retail.withVAT)}
                      </p>
                      <p className="text-base font-bold text-zinc-800 sm:text-2xl">
                        {formatPrice(
                          calculateDiscountedPrice(
                            price.retail.withVAT,
                            discount.percentage,
                          ),
                        )}
                      </p>
                    </>
                  ) : (
                    <p className="text-base font-bold text-zinc-800 sm:text-2xl">
                      {formatPrice(price.retail.withVAT)}
                    </p>
                  )} */}
                  <p className="text-3xl font-bold text-zinc-800">
                    {formatPrice(price.retail.withVAT)}
                  </p>
                </div>
                <div className="self-center">
                  <ProductCartActions
                    className="w-fit justify-self-end md:justify-self-center"
                    id={id}
                  />
                </div>
                <div className="col-span-full mt-6 w-full md:col-auto md:mt-0">
                  <BtnOpenCart />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6">
              <SectionHeading
                title="Доставка"
                className="text-2xl font-medium uppercase text-zinc-800"
              />
              <DeliveryInfo data={deliveryData} className="mt-4" />
            </div>

            <div className="rounded-lg bg-white p-6">
              <SectionHeading
                title="Оплата"
                className="text-2xl font-medium uppercase text-zinc-800"
              />

              <ul className="mt-4 flex flex-wrap gap-3">
                <li className="flex items-center justify-center gap-1 rounded-lg border px-4 py-2">
                  <Wallet className="mr-1 text-blue-600" />
                  <span className="font-medium text-zinc-800">
                    Оплата при отриманні
                  </span>
                </li>
                <li className="flex items-center justify-center gap-1 rounded-lg border px-4 py-2">
                  <BriefcaseBusiness className="mr-1 text-blue-600" />
                  <span className="font-medium text-zinc-800">
                    Безготівковий розрахунок
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6">
              <SectionHeading
                title="Опис"
                className="text-2xl font-medium uppercase text-zinc-800"
              />
              <p className="mt-4 text-zinc-700">{description}</p>
            </div>
            <div className="rounded-lg bg-white p-6">
              <SectionHeading
                title="Характеристики"
                className="text-2xl font-medium uppercase text-zinc-800"
              />
              <CharacteristicsInfo data={dimensions} className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
