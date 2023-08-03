import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "./FormDataType";
import FormInput from "./FormInput";

type ProfileInfoProps = {
  registerFormFields: UseFormRegister<FormData>;
  formErrors: FieldErrors<FormData>;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  registerFormFields,
  formErrors,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2.5 md:gap-4">
      <p className="col-span-6 mb-1 mt-2 text-xs font-normal tracking-tight text-slate-400 lg:text-sm">
        Update your basic profile information such as email address and name.
      </p>

      <div className="relative col-span-6 md:col-span-3">
        <FormInput
          id="firstName"
          title="First Name"
          registerFormFields={registerFormFields}
          errorMessage={formErrors?.firstName?.message}
          autocomplete="given-name"
        />
      </div>

      <div className="relative col-span-6 md:col-span-3">
        <FormInput
          id="lastName"
          title="Last Name"
          registerFormFields={registerFormFields}
          errorMessage={formErrors?.lastName?.message}
          autocomplete="family-name"
        />
      </div>

      <div className="relative col-span-6">
        <FormInput
          id="newEmail"
          title="New Email Address"
          registerFormFields={registerFormFields}
          errorMessage={formErrors?.newEmail?.message}
          autocomplete="email"
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
