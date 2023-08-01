import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import { Navigate } from "react-router-dom";
import SidePanel from "./SidePanel";

const Profile = () => {
  const { user: signedInUser } = useContext(AuthContext);

  if (!signedInUser)
    return (
      <Navigate
        to="/error?type=document-not-found"
        state={{ from: location }}
      />
    );

  return (
    <div
      className="flex w-screen items-center justify-center px-4 py-6 lg:h-screen"
      // layout
    >
      <form className="w-full max-w-5xl rounded-2xl border border-b-0 border-indigo-100 bg-white shadow-lg">
        <div className="flex w-full flex-col overflow-hidden rounded-lg rounded-b-none bg-[white] lg:flex-row">
          <div className="w-full bg-[--color-light] px-8 pb-4 pt-10  lg:w-1/3 ">
            <SidePanel
              firstName={signedInUser.firstName || ""}
              lastName={signedInUser.lastName || ""}
              email={signedInUser.email || ""}
              photo={
                signedInUser.photo ||
                `https://ui-avatars.com/api/?size=64&font-size=0.4&bold=true&background=ffffff&color=718398&name=${
                  (signedInUser.firstName && signedInUser.firstName[0]) || ""
                }`
              }
              registeredSince={
                signedInUser.registrationDate
                  ? new Date(Date.parse(signedInUser.registrationDate))
                  : new Date()
              }
            />
          </div>
          <div className="grid grid-cols-6 gap-2.5 px-4 pb-4 pt-6  md:gap-4 md:px-8 md:pt-11 lg:w-2/3">
            <h2 className="col-span-6 text-base font-medium tracking-wide text-slate-700 lg:text-lg">
              Profile Settings
            </h2>
            <p className="col-span-6 -mt-2 mb-1 text-xs font-normal tracking-tight text-slate-400 lg:text-sm">
              Update your basic profile information such as email address, name,
              and password.
            </p>

            <div className="col-span-3">
              <label
                htmlFor="firstName"
                className={`block pb-1 pt-0.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
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
                className={`block pb-1 pt-0.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
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
                className={`block pb-1 pt-0.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
              >
                New Email
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
                className={`block pb-1 pt-0.5 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
              >
                New Password
              </label>
              <input
                className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
                autoComplete="given-name"
                // aria-invalid={errors.firstName ? "true" : "false"}
              />
            </div>

            <hr className="col-span-6 my-3 border-slate-200 md:my-6" />
            <h2 className="col-span-6 text-base font-medium tracking-wide text-slate-700 lg:text-lg">
              Delete Profile
            </h2>
            <p className="col-span-6 -mt-2 mb-1 text-xs font-normal tracking-tight text-rose-900 opacity-80 lg:text-sm">
              Danger! You will lose all account data and tokens.
            </p>
            <div className="col-span-6 md:col-span-3">
              <label
                htmlFor="firstName"
                className={`block pb-1 text-xs text-slate-700 transition-colors duration-300 lg:pb-1.5 lg:text-sm`}
              >
                Please type{" "}
                <span className="font-bold tracking-tight">delete</span> to
                delete your profile:
              </label>
              <input
                className={` h-9 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
                autoComplete="given-name"
                // aria-invalid={errors.firstName ? "true" : "false"}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 rounded-b-xl border-t border-slate-200 bg-slate-300 px-8 py-3 sm:flex-row">
          <p className=" text-sm tracking-tight text-slate-500">
            Click on Submit to update your Profile Info
          </p>
          <div>
            {/* <button
              type="submit"
              className=" mr-2 inline-block w-fit shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-10 py-2.5 text-xs font-medium text-white  transition focus:outline-none focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200 "
            > */}
            <button
              type="submit"
              className=" mr-2 inline-block w-fit shrink-0 overflow-hidden rounded-lg border border-indigo-400 bg-indigo-400 px-6 py-2.5 text-xs font-medium text-white transition focus:outline-none  focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200 "
            >
              Submit changes
            </button>

            {/* <button
              type="submit"
              className=" inline-block w-fit shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-10 py-2.5 text-xs font-medium text-white transition  focus:outline-none focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200 "
            > */}
            <button
              type="button"
              className=" inline-block w-fit shrink-0 rounded-lg border border-slate-400 bg-slate-400 px-6 py-2.5 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
