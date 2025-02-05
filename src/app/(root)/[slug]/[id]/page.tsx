import { ProductSlider } from "@/components";
import { products } from "@/data";
import { calculateDiscountedPrice, formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) => {
  const paramsData = (await params).id as string;
  const parts = paramsData.split("/");
  const productId = +parts[parts.length - 1];
  const dataDisplay = products?.filter((item) => item.id === productId);

  const {
    // bestSales,
    // category,
    description,
    // id,
    image,
    name,
    price,
    // dimensions,
    discount,
    // isAvailable,
    unit,
    // layers,
  } = dataDisplay[0];

  const isDiscounted = discount && discount?.percentage > 0;

  return (
    <main className="px-4 py-6 md:py-9">
      <div className="container mx-auto max-w-7xl">
        <div className="-mx-4 flex flex-col md:flex-row">
          <ProductSlider productImages={image} />
          <div className="px-4 md:flex-1">
            <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
              {name}
            </h1>
            <p className="text-sm text-gray-500">
              By{" "}
              <a href="#" className="text-blue-600 hover:underline">
                ABC Company
              </a>
            </p>
            <div className="my-4 flex flex-col gap-4">
              <div className="space-y-1">
                {isDiscounted ? (
                  <>
                    <p className="text-sm text-gray-500 line-through">
                      {formatPrice(price.retail.withVAT)}
                    </p>
                    <p className="text-base font-bold text-gray-900 sm:text-2xl">
                      {formatPrice(
                        calculateDiscountedPrice(
                          price.retail.withVAT,
                          discount.percentage,
                        ),
                      )}
                    </p>
                  </>
                ) : (
                  <p className="text-base font-bold text-gray-900 sm:text-2xl">
                    {formatPrice(price.retail.withVAT)}
                  </p>
                )}
              </div>
              <p className="text-gray-500">{description}</p>
              <div className="flex space-x-4 py-4">
                <div className="relative">
                  <div className="absolute left-0 right-0 block pt-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {unit}
                  </div>
                  <select className="flex h-14 cursor-pointer appearance-none items-end rounded-lg border border-gray-200 pb-1 pl-4 pr-8">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  <svg
                    className="absolute bottom-0 right-0 mb-2 mr-2 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  className="h-14 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-indigo-500"
                >
                  В корзину <ShoppingCart className="float-right ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
{
  /* <div className="container mx-auto max-w-7xl">
  <h1 className="mb-5 mt-6 text-2xl font-medium md:mb-6 md:mt-8 md:text-3xl">
    {CategoryTitles[categorySlug]} ({dataDispay.length})
  </h1>
  <figure className="full mb-6 max-h-[440px] overflow-hidden rounded-lg md:mb-8">
    <Image
      className="size-full object-contain"
      src={`/category/${categorySlug}.jpg`}
      alt={categorySlug}
      width="1440"
      height="440"
    />
  </figure>
  <ListItems items={dataDispay} />
</div>; */
}
