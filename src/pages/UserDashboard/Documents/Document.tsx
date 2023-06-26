import { Link } from "react-router-dom";
import { Doc } from "../../../@types/doc";

const Document: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <div className="group/doc rounded-2xl border-[1px] border-slate-200 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Link
        className="relative block h-full w-full rounded-xl bg-white p-6 md:px-4 lg:p-6"
        to={`/editor/${doc._id}`}
      >
        <div className="absolute right-4 top-4 flex gap-1">
          {!doc.textPreview && !doc.translationPreview && (
            <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-100">
              no content
            </span>
          )}
          {doc?.changedAt &&
            Date.parse(doc.changedAt) >
              Date.now() - 1000 * 60 * 60 * 24 * 7 && (
              <span className="rounded-xl bg-blue-100 px-3 py-1.5 text-xs text-blue-700 dark:bg-blue-700 dark:text-blue-100">
                new
              </span>
            )}
          <span className="rounded-xl bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
            {doc.lang}-{doc.translationLang}
          </span>
        </div>

        <h3
          className={`mt-6 text-lg font-semibold text-slate-700 ${
            !doc.title ? "h-[1.75rem]" : ""
          }`}
        >
          {doc.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 ">
          {doc.textPreview?.trim()}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 ">
          {doc.translationPreview?.trim()}
        </p>
        <button className="group invisible absolute bottom-3  right-3 z-30 inline-flex items-center justify-center  rounded-xl bg-white p-2 text-slate-500 opacity-0 transition-opacity delay-0  duration-300 hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400 group-hover/doc:visible group-hover/doc:opacity-100 group-hover/doc:delay-150 group-hover/doc:duration-1000">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          <span className="invisible absolute  left-1/2 top-1/2 z-30 -translate-x-1/2 translate-y-[1.5rem] whitespace-pre rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity delay-300 duration-500 group-hover:visible group-hover:opacity-100">
            {`Delete ${
              doc.title
                ? `"${
                    doc.title.length > 25
                      ? doc.title.slice(0, 25) + "..."
                      : doc.title
                  }"`
                : "document"
            }`}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Document;
