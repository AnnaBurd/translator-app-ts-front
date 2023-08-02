import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "../Profile";

type AccountManagementProps = {
  registerFormFields: UseFormRegister<FormData>;
  formErrors: FieldErrors<FormData>;
};

const AccountManagement: React.FC<AccountManagementProps> = ({
  registerFormFields,
  formErrors,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2.5  md:gap-4">
      {/* <h2 className="col-span-6 text-base font-medium tracking-wide text-slate-700 lg:text-lg">
        Delete Profile
      </h2> */}
      <p className="col-span-6 mb-1 mt-2 text-xs font-normal tracking-tight text-rose-900 opacity-80 lg:text-sm">
        Danger! You will lose all account data and tokens.
      </p>
      <div className="col-span-6 md:col-span-3">
        <label
          htmlFor="confirmDelete"
          className={`block pb-1 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 `}
        >
          Please type{" "}
          <span className="font-bold tracking-tight">delete profile</span> to
          confirm:
        </label>
        <input
          {...registerFormFields("confirmDelete")}
          id="confirmDelete"
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="given-name"
          aria-invalid={formErrors.confirmDelete ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default AccountManagement;
