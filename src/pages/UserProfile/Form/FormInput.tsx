import { UseFormRegister } from "react-hook-form";
import { FormData } from "./FormDataType";

type FormInputProps = {
  title: string | React.ReactNode;
  id:
    | "firstName"
    | "lastName"
    | "newEmail"
    | "currentPassword"
    | "newPassword"
    | "confirmDelete";
  registerFormFields: UseFormRegister<FormData>;
  errorMessage?: string;
  autocomplete?: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  title,
  id,
  registerFormFields,
  errorMessage,
  autocomplete,
  type,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 `}
      >
        {title}
      </label>
      <input
        {...registerFormFields(id)}
        id={id}
        className={` h-9 w-full rounded-md  border-2  bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1 ${
          errorMessage
            ? "border-rose-200  focus-within:outline-rose-400"
            : "border-slate-200  focus-within:outline-slate-400"
        }`}
        autoComplete={autocomplete || "off"}
        aria-invalid={errorMessage ? "true" : "false"}
        type={type || "text"}
      />

      <p
        className={`absolute -bottom-[1rem] left-0 whitespace-nowrap p-0 text-xs text-rose-600 ${
          errorMessage ? "opacity-100" : "opacity-0"
        } transition-opacity duration-700`}
      >
        {errorMessage}
      </p>
    </>
  );
};

export default FormInput;
