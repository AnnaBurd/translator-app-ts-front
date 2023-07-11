const TokensUsageBtn = () => {
  return (
    <button className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
      <span className="absolute left-5 top-11 z-[150] w-fit scale-0 rounded-lg bg-slate-600  p-2 text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
        Set&nbsp;Tokens Usage&nbsp;Limits&nbsp;📈
      </span>
    </button>
  );
};

export default TokensUsageBtn;
