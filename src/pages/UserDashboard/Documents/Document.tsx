import { Link } from "react-router-dom";
import { DocumentPreviewData } from "../../../@types/doc";

const Document: React.FC<{ docdata: DocumentPreviewData }> = ({ docdata }) => {
  return (
    <div className="h-44 w-64 rounded-2xl border-[1px] border-slate-200 shadow-md hover:shadow-xl ">
      <Link
        className="relative block h-full w-full rounded-xl bg-white p-6"
        to={`/editor/${docdata._id}`}
      >
        <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
          {docdata.lang}-{docdata.translationLang}
        </span>
        <h3 className="mt-4 text-lg font-semibold text-slate-700">
          {docdata.title}
        </h3>
        <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
          {docdata.text}
        </p>
        <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
          {docdata.translation ? docdata.translation + "..." : ""}
        </p>
      </Link>
    </div>
  );
};

export default Document;
