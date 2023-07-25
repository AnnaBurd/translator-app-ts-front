import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Dropdown/Menu";
import Separator from "./Separator";
import Home from "./NavigationItems/Home";
import DropdownBtn from "../../UserDashboard/UserProfile/DropdownBtn";
import themeContext from "../../../context/ThemeContext";

// TODO: uncomment dropdown btn menu and add functionality

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
  const [isDocumentMenuOpen, setIsDocumentMenuOpen] = useState(false);

  const { screenSize } = useContext(themeContext);

  let docTitle = title || "Untitled";
  if (docTitle.length > 15 && screenSize === "small")
    docTitle = docTitle.slice(0, 15) + "...";
  if (docTitle.length > 50) docTitle = docTitle.slice(0, 50) + "...";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <Home />

        <Separator />

        <li className="relative">
          <Link
            onClick={() => {
              setIsDocumentMenuOpen(!isDocumentMenuOpen);
            }}
            to="#"
            className="group flex cursor-pointer items-center transition hover:text-gray-700  dark:hover:text-gray-200"
          >
            {docTitle}
            <span className="self-start pl-1 pr-1 text-xs font-medium text-slate-400">
              ({lang}-{translationLang})
            </span>

            {/* <DropdownBtn
              isOpen={isDocumentMenuOpen}
              props={{ strokeWidth: 2.5, size: 2.5 }}
            /> */}
          </Link>
          {/* <Menu
            isOpen={isDocumentMenuOpen}
            onClose={() => {
              setIsDocumentMenuOpen(false);
            }}
          /> */}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
