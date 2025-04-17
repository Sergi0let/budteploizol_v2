import { Search } from "lucide-react";

export const SearchInput = () => {
  return (
    <form className="relative w-full min-w-28 lg:w-fit">
      <label htmlFor="Search" className="sr-only">
        пошук
      </label>

      <input
        type="text"
        id="Search"
        placeholder="Пошук..."
        className="shadow-xs w-full rounded-lg border py-1 pe-6 ps-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 sm:py-2 sm:pe-10 sm:text-lg md:py-[9px] md:ps-2"
      />

      <span className="absolute inset-y-0 end-0 grid h-auto w-6 place-content-center transition-colors hover:text-[var(--main-primary)] sm:w-10">
        <button type="submit" className="">
          <span className="sr-only">Пошук</span>

          <Search className="size-4 sm:size-6" />
        </button>
      </span>
    </form>
  );
};
