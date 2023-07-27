type ButtonProps = {
  color?: string;
  isActive: boolean;
  onClick: () => void;
  value?: number;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  isActive,
  onClick,
  value,
  children,
  color,
}) => {
  let btnStyles =
    "group inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium focus:outline-none focus:ring ";
  let spanStyles = "mr-1.5 rounded-sm  px-[.25rem] py-[.1rem] text-[.6rem] ";

  switch (color) {
    case "green":
      btnStyles += ` hover:bg-emerald-50 hover:text-emerald-500 active:bg-emerald-50 ${
        isActive ? "bg-emerald-50 text-emerald-500" : "text-slate-600"
      }`;
      spanStyles += ` group-hover:bg-emerald-300 group-hover:text-white ${
        isActive ? "bg-emerald-300 text-white" : "bg-slate-300"
      }`;
      break;
    case "red":
      btnStyles += ` hover:bg-rose-50 hover:text-rose-500 active:bg-rose-50 ${
        isActive ? "bg-rose-50 text-rose-500" : "text-slate-600"
      }`;
      spanStyles += ` group-hover:bg-rose-300 group-hover:text-white ${
        isActive ? "bg-rose-300 text-white" : "bg-slate-300"
      }`;
      break;
    default:
      btnStyles += ` hover:bg-slate-200 hover:text-slate-500 active:bg-slate-50 ${
        isActive ? "bg-slate-200 text-slate-500" : "text-slate-600"
      }`;
      spanStyles += ` group-hover:bg-slate-400 group-hover:text-white ${
        isActive ? "bg-slate-400 text-white" : "bg-slate-300"
      }`;
  }

  return (
    <button className={btnStyles} onClick={onClick}>
      <span className={spanStyles}>{value || 0}</span>
      {children}
    </button>
  );
};

export default Button;
