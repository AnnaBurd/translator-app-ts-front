import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center md:h-screen">
      <form
        // action="{{ route('profile.save') }}"
        // method="POST"
        // encType="multipart/form-data"
        className="relative m-4 mb-20 w-full max-w-5xl rounded-2xl border border-b-0 border-indigo-100 bg-white shadow-lg sm:m-8 lg:w-4/5"
      >
        {/* <button
          type="button"
          className="hover:bg[--color-secondary] absolute right-0 top-0 z-50 items-center justify-center rounded-xl bg-[--color-light] p-2 text-slate-500 hover:text-slate-800  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400 lg:bg-white lg:hover:bg-slate-50"
          // onClick={closeFormHandler}
        >
          <span className="sr-only">Close delete document form</span>

          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}
        <div className="mx-auto flex w-full flex-col overflow-hidden rounded-lg rounded-b-none bg-[white] lg:flex-row">
          <div className="w-full bg-[--color-light] px-8 py-4  lg:w-1/3">
            <h2 className="mb-1.5 text-lg font-medium tracking-wide text-slate-700 lg:mb-4">
              Profile Settings
            </h2>
            <p className="text-sm text-slate-500">
              Update your basic profile information such as Email Address, Name,
              and Photo.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6 px-8 py-8 lg:w-2/3">
            <div className="col-span-6">
              <div className="flex items-center justify-center text-sm min-[500px]:justify-start">
                <div className="h-20 w-20 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full"
                    src={
                      user.photo ||
                      `https://ui-avatars.com/api/?size=64&font-size=0.4&bold=true&background=deeeff&color=718398&name=${
                        (user.firstName && user.firstName[0]) || ""
                      }`
                    }
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap -mb-1 text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <span className="text-sm font-normal text-[--color-primary]">
                    {user.email}
                  </span>
                  <div className="relative mt-1 w-fit cursor-pointer overflow-hidden rounded-lg bg-slate-200 px-4 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-300 hover:text-slate-600">
                    <input
                      type="file"
                      name="photo"
                      onChange={() => {
                        1;
                      }}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />{" "}
                    Change picture
                  </div>
                </div>
              </div>
            </div>

            <hr className="col-span-6 border-gray-200" />

            <div className="relative col-span-6">
              <label
                htmlFor="firstName"
                className={`block pb-1.5 text-sm text-slate-700 transition-colors duration-300`}
              >
                First Name
              </label>
              <input
                // {...register("firstName")}
                id="firstName"
                className={` mt-0 h-10 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
                autoComplete="given-name"
                // aria-invalid={errors.firstName ? "true" : "false"}
              />
              <p className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600">
                {/* {errors.firstName?.message} */}
              </p>
            </div>

            <div className="relative col-span-6">
              <label
                htmlFor="firstName"
                className={`block pb-1.5 text-sm text-slate-700 transition-colors duration-300`}
              >
                Last Name
              </label>
              <input
                // {...register("firstName")}
                id="firstName"
                className={` mt-0 h-10 w-full rounded-md border-2 border-slate-200 bg-white p-2  text-sm text-slate-700 shadow-inner transition-colors duration-300 focus-within:outline-1`}
                autoComplete="given-name"
                // aria-invalid={errors.firstName ? "true" : "false"}
              />
              <p className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600">
                {/* {errors.firstName?.message} */}
              </p>
            </div>
            {/* <hr className="border-slate-200" /> */}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between rounded-b-xl border-t border-slate-200 bg-slate-300 px-8 min-[500px]:h-16 min-[500px]:flex-row">
          <p className="mb-2 mt-4 text-sm tracking-tight text-slate-500 min-[500px]:mb-0 min-[500px]:mt-0">
            Click on Save to update your Profile Info
          </p>
          <div>
            <button
              type="submit"
              // disabled={watch("lang") === watch("translationLang")}
              className=" mb-4 mr-4 inline-block w-fit shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-10 py-2.5 text-xs font-medium text-white  transition focus:outline-none focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200 min-[500px]:mb-0"
            >
              Save
            </button>

            <button
              type="submit"
              // disabled={watch("lang") === watch("translationLang")}
              className=" mb-4 inline-block w-fit shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-10 py-2.5 text-xs font-medium text-white transition  focus:outline-none focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200 min-[500px]:mb-0"
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
