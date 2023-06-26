import { Link } from "react-router-dom";
import { Doc } from "../../../@types/doc";

const Document: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <div className="rounded-2xl border-[1px] border-slate-200 shadow-md hover:shadow-xl ">
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
      </Link>
    </div>
  );
};

export default Document;
