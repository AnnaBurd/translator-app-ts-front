const DocTitle = () => {
  return (
    <li className="relative">
      <Link
        onClick={() => {
          setIsDocumentMenuOpen(!isDocumentMenuOpen);
        }}
        to="#"
        className="flex cursor-pointer items-center transition hover:text-gray-700 dark:hover:text-gray-200 "
      >
        {docTitle}
        <span className="self-start pl-1 pr-1 text-xs font-medium text-slate-400">
          ({lang}-{translationLang})
        </span>

        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-2.5 w-2.5"
          initial={{ rotate: 90 }}
          animate={{ rotate: isDocumentMenuOpen ? 270 : 90 }}
          transition={{ duration: 0.3, ease: "backInOut" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </motion.svg>
      </Link>
      <Menu
        isOpen={isDocumentMenuOpen}
        onClose={() => {
          setIsDocumentMenuOpen(false);
        }}
      />
    </li>
  );
};

export default DocTitle;
