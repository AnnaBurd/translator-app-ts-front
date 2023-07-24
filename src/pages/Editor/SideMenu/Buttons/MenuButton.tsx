type MenuButtonProps = {
  iconPath: string;
  iconSize?: number;
  onClick: () => Promise<void>;
  isActive?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  iconPath,
  iconSize = 6,
  onClick,
  isActive = false,
  isDisabled = false,
}) => {
  let style = "text-slate-500 hover:bg-slate-50 hover:text-slate-700";

  if (isActive) style = "bg-indigo-50 text-indigo-700";
  if (isDisabled) style = "text-slate-300 cursor-default";

  return (
    <button
      className={`group relative flex w-full justify-center rounded px-2 py-1.5  ${style}`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={iconSize === 6 ? 1.6 : 2}
        stroke="currentColor"
        className={`h-${iconSize} w-${iconSize} opacity-75`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>

      <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-900 px-2 py-1.5 text-left text-xs font-medium text-white opacity-0 group-hover:opacity-100">
        {children}
      </span>
    </button>
  );
};

export default MenuButton;
