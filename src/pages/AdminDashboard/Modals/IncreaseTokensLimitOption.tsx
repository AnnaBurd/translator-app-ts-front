import { UseFormRegister } from "react-hook-form";
import { FormData } from "./IncreaseTokensLimit";

type IncreaseTokensLimitModalProps = {
  option: string;
  textNote: string;
  register: UseFormRegister<FormData>;
  size: string;
};

const IncreaseTokensLimitOption: React.FC<IncreaseTokensLimitModalProps> = ({
  option,
  textNote,
  register,
  size,
}) => {
  const iconSize =
    size === "xs" ? "h-4 w-4" : size === "sm" ? "h-5 w-5" : "h-6 w-6";

  return (
    <div className="mb-1.5">
      <input
        type="radio"
        value={option}
        id={option}
        {...register("planOption")}
        className="peer hidden [&:checked_+_label_svg]:block"
      />

      <label
        htmlFor={option}
        className={`flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-3 text-${size} font-medium shadow-sm hover:border-slate-200 peer-checked:border-indigo-400 peer-checked:ring-1 peer-checked:ring-indigo-400`}
      >
        <div className="flex items-center gap-2">
          <svg
            className={"hidden text-indigo-500 " + iconSize}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>

          <p className="text-slate-700">{option}</p>
        </div>

        <p className="text-slate-900">{textNote}</p>
      </label>
    </div>
  );
};

export default IncreaseTokensLimitOption;
