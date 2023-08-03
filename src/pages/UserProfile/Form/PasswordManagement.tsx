import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "./FormDataType";
import FormInput from "./FormInput";

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

      {/* Hidden input field with username for accessibility */}
      <input
        hidden
        type="text"
        autoComplete="username"
        defaultValue={username}
      />

      <div className="relative col-span-6 ">
        <FormInput
          id="currentPassword"
          title="Current Password"
          registerFormFields={registerFormFields}
          errorMessage={formErrors?.currentPassword?.message}
          autocomplete="current-password"
          type="password"
        />
      </div>

      <div className="relative col-span-6 ">
        <FormInput
          id="newPassword"
          title="New Password"
          registerFormFields={registerFormFields}
          errorMessage={formErrors?.newPassword?.message}
          autocomplete="new-password"
          type="password"
        />
      </div>
    </div>
  );
};

export default PasswordManagement;
