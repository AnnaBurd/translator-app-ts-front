import { Link } from "react-router-dom";

type BreadcrumbsProps = {
  title: string | undefined;
  lang: string | undefined;
  translationLang: string | undefined;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  title,
  lang,
  translationLang,
}) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
        <li>
          <Link
            to="/dash"
            className="flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-slate-200"
          >
            <span className="sr-only"> Home </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
            </svg>

            <span>All Documents</span>
          </Link>
        </li>

        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </li>

        <li>
          <Link
            to="#"
            className="flex items-center transition hover:text-gray-700 dark:hover:text-gray-200"
          >
            {title ? title : "Untitled"}
            <span className="self-start pl-1 pr-1 text-xs font-medium text-slate-600">
              ({lang}-{translationLang})
            </span>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-slate-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
