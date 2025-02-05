import { ListItems } from "@/components";
import { products } from "@/data";
import { Category, CategoryTitles } from "@/types";
import Image from "next/image";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categorySlug = (await params).slug as Category;
  const dataDispay = products.filter((item) => item.category === categorySlug);

  return (
    <main className="px-4">
      <div className="container mx-auto max-w-7xl">
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
      </div>
    </main>
  );
};

export default CategoryPage;

// <>
//   {/* Hello world */}
//   <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
//     <div className="-mx-4 flex flex-col md:flex-row">
//       <div className="px-4 md:flex-1">
//         <div x-data="{ image: 1 }" x-cloak="">
//           <div className="mb-4 h-64 rounded-lg bg-gray-100 md:h-80">
//             <div
//               x-show="image === 1"
//               className="mb-4 flex h-64 items-center justify-center rounded-lg bg-gray-100 md:h-80"
//             >
//               <span className="text-5xl">1</span>
//             </div>
//             <div
//               x-show="image === 2"
//               className="mb-4 flex h-64 items-center justify-center rounded-lg bg-gray-100 md:h-80"
//             >
//               <span className="text-5xl">2</span>
//             </div>
//             <div
//               x-show="image === 3"
//               className="mb-4 flex h-64 items-center justify-center rounded-lg bg-gray-100 md:h-80"
//             >
//               <span className="text-5xl">3</span>
//             </div>
//             <div
//               x-show="image === 4"
//               className="mb-4 flex h-64 items-center justify-center rounded-lg bg-gray-100 md:h-80"
//             >
//               <span className="text-5xl">4</span>
//             </div>
//           </div>
//           <div className="-mx-2 mb-4 flex">
//             <template x-for="i in 4" />
//           </div>
//         </div>
//       </div>
//       <div className="px-4 md:flex-1">
//         <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
//           Lorem ipsum dolor, sit amet consectetur, adipisicing elit.
//         </h2>
//         <p className="text-sm text-gray-500">
//           By{" "}
//           <a href="#" className="text-indigo-600 hover:underline">
//             ABC Company
//           </a>
//         </p>
//         <div className="my-4 flex items-center space-x-4">
//           <div>
//             <div className="flex rounded-lg bg-gray-100 px-3 py-2">
//               <span className="mr-1 mt-1 text-indigo-400">$</span>
//               <span className="text-3xl font-bold text-indigo-600">
//                 25
//               </span>
//             </div>
//           </div>
//           <div className="flex-1">
//             <p className="text-xl font-semibold text-green-500">
//               Save 12%
//             </p>
//             <p className="text-sm text-gray-400">
//               Inclusive of all Taxes.
//             </p>
//           </div>
//         </div>
//         <p className="text-gray-500">
//           Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae
//           exercitationem porro saepe ea harum corrupti vero id laudantium
//           enim, libero blanditiis expedita cupiditate a est.
//         </p>
//         <div className="flex space-x-4 py-4">
//           <div className="relative">
//             <div className="absolute left-0 right-0 block pt-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
//               Qty
//             </div>
//             <select className="flex h-14 cursor-pointer appearance-none items-end rounded-xl border border-gray-200 pb-1 pl-4 pr-8">
//               <option>1</option>
//               <option>2</option>
//               <option>3</option>
//               <option>4</option>
//               <option>5</option>
//             </select>
//             <svg
//               className="absolute bottom-0 right-0 mb-2 mr-2 h-5 w-5 text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 9l4-4 4 4m0 6l-4 4-4-4"
//               />
//             </svg>
//           </div>
//           <button
//             type="button"
//             className="h-14 rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-500"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </>;
