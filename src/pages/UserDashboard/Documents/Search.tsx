import { ChangeEvent, useRef } from "react";
import "./Search.css";
import { AnimatePresence, motion } from "framer-motion";

type SearchProps = {
  searchQuery?: string;
  onSearch: (searchQuery: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch, searchQuery }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    // console.log("clicked on magnifying glass / cross");

    if (!searchQuery) ref.current?.focus();

    if (searchQuery) onSearch("");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("searching", e.target.value);

    onSearch(e.target.value);
  };

  return (
    <div className="relative mb-0 w-full [grid-column:1/-1] sm:w-fit">
      <label className="sr-only" htmlFor="search">
        Search
      </label>

      <input
        className="[::-webkit-search-cancel-button_display:none] h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-72"
        id="search"
        type="search"
        placeholder="Search for document..."
        value={searchQuery}
        onChange={handleSearch}
        ref={ref}
      />

      <button
        type="button"
        className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-slate-50 p-2 text-slate-600 transition hover:text-slate-700"
        onClick={handleSearchClick}
      >
        {/* TODO: style that cross - pseudo="-webkit-search-cancel-button"
should appear on place of magnifier icon */}
        <span className="sr-only">Search</span>
        <AnimatePresence>
          {searchQuery && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 0.4 }}
              exit={{ rotate: -90 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          )}
          {!searchQuery && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default Search;
