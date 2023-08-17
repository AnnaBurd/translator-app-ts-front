import { Link } from "react-router-dom";

type NavigationItemProps = {
  path: string;
  children: React.ReactNode;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ path, children }) => {
  return (
    <li>
      <Link
        to={`/${path}`}
        className="flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-slate-200"
      >
        <span className="sr-only">
          {path[0].toLocaleUpperCase() + path.slice(1)}
        </span>

        {children}
      </Link>
    </li>
  );
};

export default NavigationItem;
