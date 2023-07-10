import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { motion } from "framer-motion";

type BreadcrumbsProps = {
  title: string | undefined;
  lang: string | undefined;
  translationLang: string | undefined;
  // isDocumentMenuOpen: boolean;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  title,
  lang,
  translationLang,
}) => {
  // const { width } = useWindowDimensions();

  const [isDocumentMenuOpen, setIsDocumentMenuOpen] = useState(false);

  const [isWide, setIsWide] = useState(false);

  console.log(
    "Breadcrumbs component render:",
    title,
    lang,
    translationLang,
    isWide
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");

    const onChange = () => setIsWide(!!mql.matches);
    mql.addEventListener("change", onChange);
    setIsWide(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  let docTitle = title || "Untitled";
  if (docTitle.length > 15 && !isWide) docTitle = docTitle.slice(0, 15) + "...";
  if (docTitle.length > 50) docTitle = docTitle.slice(0, 50) + "...";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-slate-200"
          >
            <span className="sr-only"> Home </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 opacity-80"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>

            <span className="hidden sm:block">All Documents</span>
          </Link>
        </li>

        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-2.5 w-2.5 opacity-80"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </li>

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
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
