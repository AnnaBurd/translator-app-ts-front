const Search = () => {
  return (
    <div className="relative mb-0 w-full [grid-column:1/-1] sm:w-fit">
      <label className="sr-only" htmlFor="search">
        Search
      </label>

      <input
        className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-72"
        id="search"
        type="search"
        placeholder="Search for document..."
      />

      <button
        type="button"
        className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-slate-50 p-2 text-slate-600 transition hover:text-slate-700"
      >
        {/* TODO: style that cross - pseudo="-webkit-search-cancel-button"
should appear on place of magnifier icon */}
        <span className="sr-only">Search</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
