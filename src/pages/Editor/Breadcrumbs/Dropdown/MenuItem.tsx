type MenuItemProps = {
  svgIconPath: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  svgIconPath,
  children,
}) => {
  return (
    <button
      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
      onClick={onClick}
      role="menuitem"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-3.5 w-3.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={svgIconPath} />
      </svg>
      {children}
    </button>
  );
};

export default MenuItem;
