type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onNextPage,
  onPreviousPage,
}) => {
  const nextPageHandler = () => {
    if (currentPage >= totalPages) return;
    onNextPage();
  };

  const prevPageHandler = () => {
    if (currentPage <= 1) return;
    onPreviousPage();
  };

  return (
    <div
      className={`inline-flex items-center justify-center gap-3 ${
        totalPages <= 0 ? "invisible " : ""
      }`}
    >
      <button
        className={`inline-flex h-8 w-8 items-center justify-center rounded border border-slate-100 bg-white text-slate-900 rtl:rotate-180 dark:border-slate-800 dark:bg-slate-900 dark:text-white ${
          totalPages <= 1 ? "invisible " : ""
        }}`}
        onClick={prevPageHandler}
      >
        <span className="sr-only">Previous Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <p className="text-xs text-slate-900 dark:text-white">
        {currentPage}
        <span className="mx-0.25">/</span>
        {totalPages}
      </p>

      <button
        className={`inline-flex h-8 w-8 items-center justify-center rounded border border-slate-100 bg-white text-slate-900 rtl:rotate-180 dark:border-slate-800 dark:bg-slate-900 dark:text-white ${
          totalPages <= 1 ? "invisible " : ""
        }}`}
        onClick={nextPageHandler}
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
