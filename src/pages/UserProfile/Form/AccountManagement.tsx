import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormDataType } from "./FormDataType";
import FormInput from "./FormInput";

type AccountManagementProps = {
  registerFormFields: UseFormRegister<FormDataType>;
  formErrors: FieldErrors<FormDataType>;
};

const AccountManagement: React.FC<AccountManagementProps> = ({
  registerFormFields,
  formErrors,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2.5  md:gap-4">
      <p className="col-span-6 mb-1 mt-2 text-xs font-normal tracking-tight text-rose-900 opacity-80 lg:text-sm">
        Danger! You will lose all account data and tokens.
      </p>

      <div className="relative col-span-6 md:col-span-3">
        <FormInput
          id="confirmDelete"
          title={
            <>
              Please type{" "}
              <span className="font-bold tracking-tight">delete profile</span>{" "}
              to confirm:
            </>
          }
          registerFormFields={registerFormFields}
          errorMessage={formErrors?.confirmDelete?.message}
        />
      </div>
    </div>
  );
};

export default AccountManagement;
