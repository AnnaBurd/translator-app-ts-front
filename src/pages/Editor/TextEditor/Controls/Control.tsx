type ControlProps = {
  onClick: () => void;
  iconPath: string;
  children: React.ReactNode;
};

const Control: React.FC<ControlProps> = ({ iconPath, onClick, children }) => {
  return (
    <button
      className="group relative inline-block border-e p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 focus:relative"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4 opacity-80 hover:opacity-100"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>

      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity delay-300 duration-500 group-hover:opacity-100">
        {children}
      </span>
    </button>
  );
};

export default Control;
