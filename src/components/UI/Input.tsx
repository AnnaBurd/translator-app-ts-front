import { ChangeEvent } from "react";

type InputProps = {
  label: string;
  id: string;
  type?: string;
  autoComplete?:
    | "given-name"
    | "family-name"
    | "email"
    | "new-password"
    | "off";
  onChange: (inputValue: string) => void;
};

const Input: React.FC<InputProps> = ({ id, label, onChange, ...options }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        {...options}
        onChange={handleInputChange}
        className="mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-sm"
      />
    </>
  );
};

export default Input;
