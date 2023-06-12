import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  disabled,
  children,
}) => {
  return (
    <button
      className="inline-block shrink-0 rounded-md border border-indigo-400 bg-indigo-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
