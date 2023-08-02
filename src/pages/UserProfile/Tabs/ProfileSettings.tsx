import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "../Profile";

type ProfileSettingsProps = {
  registerFormFields: UseFormRegister<FormData>;
  formErrors: FieldErrors<FormData>;
};

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  registerFormFields,
  formErrors,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2.5 md:gap-4">
      <p className="col-span-6 mb-1 mt-2 text-xs font-normal tracking-tight text-slate-400 lg:text-sm">
        Update your basic profile information such as email address and name.
      </p>

      <div className="col-span-6 md:col-span-3">
        <label
          htmlFor="firstName"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 `}
        >
          First Name
        </label>
        <input
          {...registerFormFields("firstName")}
          id="firstName"
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="given-name"
          aria-invalid={formErrors.firstName ? "true" : "false"}
        />
      </div>

      <div className="col-span-6 md:col-span-3">
        <label
          htmlFor="lastName"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 `}
        >
          Last Name
        </label>
        <input
          {...registerFormFields("lastName")}
          id="lastName"
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="family-name"
          aria-invalid={formErrors.lastName ? "true" : "false"}
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="email"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 `}
        >
          New Email Address
        </label>
        <input
          {...registerFormFields("newEmail")}
          id="email"
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner shadow-transparent transition-colors duration-300 focus-within:outline-1`}
          autoComplete="email"
          aria-invalid={formErrors.newEmail ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
