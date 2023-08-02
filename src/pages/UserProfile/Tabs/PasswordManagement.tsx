import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "../Profile";

type PasswordManagementProps = {
  registerFormFields: UseFormRegister<FormData>;
  formErrors: FieldErrors<FormData>;
  username: string;
};

const PasswordManagement: React.FC<PasswordManagementProps> = ({
  registerFormFields,
  formErrors,
  username,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2.5 md:gap-4">
      <p className="col-span-6 mb-1 mt-2 text-xs font-normal tracking-tight text-slate-400 lg:text-sm">
        Change account password, for identity confirmation enter current
        password first.
      </p>

      <div className="col-span-6">
        <label
          htmlFor="currentPassword"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 `}
        >
          Current Password
        </label>
        <input
          {...registerFormFields("currentPassword")}
          id="currentPassword"
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="current-password"
          aria-invalid={formErrors.currentPassword ? "true" : "false"}
          type="password"
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="newPassword"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 `}
        >
          New Password
        </label>
        <input
          {...registerFormFields("newPassword")}
          id="newPassword"
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="given-name"
          aria-invalid={formErrors.newPassword ? "true" : "false"}
          type="password"
        />
      </div>
    </div>
  );
};

export default PasswordManagement;
