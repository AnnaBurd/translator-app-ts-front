import { Link } from "react-router-dom";

type NavigationItemProps = {
  path: string;
  children: React.ReactNode;
  isActive?: boolean;
  activePath?: string;
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  path,
  children,
  isActive = false,
  activePath,
}) => {
  isActive = isActive || activePath === path;

  return (
    <Link
      to={path}
      className={`block rounded-lg px-4 py-2 text-sm  dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
        isActive
          ? "text-indigo-400 hover:bg-inherit hover:text-indigo-500"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 "
      }`}
      role="menuitem"
    >
      {children}
    </Link>
  );
};

export default NavigationItem;
