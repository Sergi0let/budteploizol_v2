export const Search = () => {
  return (
    <form className="relative w-full">
      <label htmlFor="Search" className="sr-only">
        пошук
      </label>

      <input
        type="text"
        id="Search"
        placeholder="Пошук..."
        className="shadow-xs w-full rounded-lg border border-gray-200 py-[5px] pe-6 ps-1 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 sm:pe-10 md:py-[9px] md:ps-2"
      />

      <span className="absolute inset-y-0 end-0 grid h-auto w-6 place-content-center sm:w-10">
        <button type="button" className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Пошук</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </form>
  );
};
