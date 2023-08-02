const ProfileSettings = () => {
  return (
    <div className="grid grid-cols-6 gap-2.5 md:gap-4">
      <p className="col-span-6 mb-1 mt-2 text-xs font-normal tracking-tight text-slate-400 lg:text-sm">
        Update your basic profile information such as email address, name, and
        password.
      </p>

      <div className="col-span-3">
        <label
          htmlFor="firstName"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
        >
          First Name
        </label>
        <input
          id="firstName"
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="given-name"
          // aria-invalid={errors.firstName ? "true" : "false"}
        />
      </div>

      <div className="col-span-3">
        <label
          htmlFor="firstName"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
        >
          Last Name
        </label>
        <input
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="given-name"
          // aria-invalid={errors.firstName ? "true" : "false"}
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="firstName"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
        >
          New Email Address
        </label>
        <input
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="given-name"
          // aria-invalid={errors.firstName ? "true" : "false"}
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="firstName"
          className={`block pb-1 pt-1.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
        >
          New Password
        </label>
        <input
          className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
          autoComplete="given-name"
          // aria-invalid={errors.firstName ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
