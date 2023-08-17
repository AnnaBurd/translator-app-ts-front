type NavigationBtnProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const NavigationBtn: React.FC<NavigationBtnProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="-ml-2 mr-1 inline-flex items-center justify-center gap-1.5  rounded-lg border border-slate-300 px-5 py-3 text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring"
      type="button"
    >
      <span className="text-xs font-medium">{children}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[0.85rem] w-[0.85rem]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </button>
  );
};

export default NavigationBtn;
