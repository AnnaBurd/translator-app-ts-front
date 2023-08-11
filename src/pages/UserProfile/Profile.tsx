import { useContext, useState } from "react";
import AuthContext from "../../auth/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SidePanel from "./SidePanel";
import Tabs, { Tab } from "./Form/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import AccountManagement from "./Form/AccountManagement";
import ProfileInfo from "./Form/ProfileInfo";
import PasswordManagement from "./Form/PasswordManagement";

import { FieldError, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchPrivate from "../../hooks/useFetchPrivate";

import { FormDataType } from "./Form/FormDataType";
import useDataPrivate from "../../hooks/useDataPrivate";
import { User } from "../../@types/user";
import Loader from "../../components/Loaders/Loader";
import {
  InputValidationField,
  inputValidationSchema,
} from "./Form/FormDataValidation";
import Spinner from "./Form/Spinner";
import ErrorNotification from "../Editor/TextEditor/Notifications/ErrorNotification";

const initialTabs: Tab[] = [
  { label: "profile-settings", title: "Profile Info" },
  { label: "password-management", title: "Change Password" },
  { label: "account-management", title: "Delete Profile" },
];

const Profile = () => {
  const {
    user: signedInUser,
    updateUserDetails,
    updateAccessToken,
  } = useContext(AuthContext);

  const [
    userProfile,
    isLoadingUserProfileDetails,
    errorLoadingUserProfileDetails,
  ] = useDataPrivate<User>(`users/profile/details`);

  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(inputValidationSchema),
  });

  const tabsWithErrors = new Set<string>();
  Object.keys(errors).forEach((key) => {
    if (key === "confirmDelete") tabsWithErrors.add("account-management");

    if (
      (key === "currentPassword" || key === "newPassword") &&
      errors[key as InputValidationField]?.message
    )
      tabsWithErrors.add("password-management");

    if (key === "firstName" || key === "lastName" || key === "email")
      tabsWithErrors.add("profile-settings");
  });

  // const [imgToUpload, setImgToUpload] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorSubmitting, setErrorSubmitting] = useState("");
  const fetchPrivate = useFetchPrivate();

  // Handle corner case when user removes text from input field and error message is still displayed
  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");
  if (errors.currentPassword && newPassword?.length === 0)
    errors.currentPassword.message = "";

  if (errors.newPassword && currentPassword?.length === 0)
    errors.newPassword.message = "";

  // Preview image before uploading
  const imgsToUpload = (watch("selectedImage") as unknown as FileList) || [];

  const onSubmit = async (data: FormDataType) => {
    setErrorSubmitting("");

    // console.log("onSubmitData: ", data);

    // Handle profile deletion
    if (data.confirmDelete?.toLowerCase() === "delete profile") {
      try {
        setIsSubmitting(true);

        await fetchPrivate("users/profile", "DELETE", {
          confirmDelete: true,
        });

        setIsSubmitting(false);
      } catch (error) {
        setErrorSubmitting((error as Error).message || "An error occurred");
        setIsSubmitting(false);
      }
      updateAccessToken("");
      updateUserDetails(null);
      return navigate("/signup");
    }

    // Handle profile update

    // Check if any data has changed
    const hasNonEmptyData = Object.values(data).some((value) => value);
    // const hasPhotoChanged = !!imgToUpload;
    if (!hasNonEmptyData) return;

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        // console.log("key: ", key);
        // console.log("value: ", value, value === undefined);
        if (value !== undefined && value !== "") formData.append(key, value);
        // formData.append(key, value);
      });

      // console.log("formData: ", formData, formData.get("firstName"));
      // console.log("formData: ", formData, formData.get("selectedImage"));

      // const dataToUpload = { ...data, img: imgToUpload };

      const responseData = await fetchPrivate(
        "users/profile",
        "POST",
        formData,
        undefined,
        undefined,
        undefined,
        true
      );

      // console.log("responseData: ", responseData);
      // Update current view with new data
      updateUserDetails(responseData.user);

      setIsSubmitting(false);
    } catch (error) {
      setErrorSubmitting((error as Error).message || "An error occurred");
      setIsSubmitting(false);
    }
  };

  // Go back to previous page
  // Note: similar effect as clicking the browser's back button, except for cases when the user has navigated to the page directly (e.g. copy-pasting the url)
  const location = useLocation();
  const navigate = useNavigate();
  const onCancel = () => {
    const doesAnyHistoryEntryExist = location.key !== "default";

    doesAnyHistoryEntryExist ? navigate(-1) : navigate("/dashboard");
  };

  if (!signedInUser)
    return (
      <Navigate
        to="/error?type=document-not-found"
        state={{ from: location }}
      />
    );

  if (isLoadingUserProfileDetails) return <Loader />;

  // Render error if could not load data
  if (errorLoadingUserProfileDetails)
    return (
      <Navigate to="/error?type=server-error" state={{ from: location }} />
    );

  return (
    <div className="flex w-screen items-center justify-center px-4 py-6 lg:h-screen">
      <motion.form
        className="w-full max-w-5xl rounded-2xl border border-b-0 border-indigo-100 bg-white shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
        initial={{
          opacity: 0,
          translateY: "-40%",
          translateX: "0%",
          scale: 0.3,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          translateX: 0,
          scale: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        exit={{
          opacity: 0,
          translateY: "-20%",
          translateX: "0%",
          scale: 0.7,
          transition: { duration: 0.15, ease: "easeIn" },
        }}
      >
        <div className="flex w-full flex-col overflow-hidden rounded-lg rounded-b-none bg-[white] lg:h-[28rem] lg:flex-row">
          <div className="w-full bg-[--color-light] px-8 pb-4 pt-10  lg:w-1/3 ">
            <SidePanel
              firstName={signedInUser.firstName || ""}
              lastName={signedInUser.lastName || ""}
              email={signedInUser.email || ""}
              photoUrl={signedInUser.photoUrl || ""}
              registerFormFields={register}
              formErrors={errors}
              uploadedPhotos={imgsToUpload}
              // onPhotoUpload={(file) => setImgToUpload(file)}
              registeredSince={
                userProfile?.registrationDate
                  ? new Date(Date.parse(userProfile.registrationDate))
                  : new Date()
              }
              // onPhotoUpload={function (photo: File): void {
              //   throw new Error("Function not implemented.");
              // }}
            />
          </div>
          <div className="relative px-4 pb-12 pt-6 md:px-8 lg:w-2/3 lg:pt-10">
            {isSubmitting && <Spinner />}
            <button
              type="button"
              className="absolute right-4 top-4 -mr-1  hidden items-center justify-center  self-start justify-self-end rounded-xl bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400 lg:inline-flex"
              onClick={onCancel}
            >
              <span className="sr-only">Close</span>

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
            </button>
            <h2 className="lg:text2xl mb-4 hidden text-xl font-bold text-slate-600 lg:block">
              Edit Profile
            </h2>
            <div className="">
              <Tabs
                initialTabs={initialTabs}
                selectedTab={selectedTab}
                onSelectTab={(tab) => setSelectedTab(tab)}
                tabsWithErrors={Array.from(tabsWithErrors)}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab ? selectedTab.label : "empty"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {!selectedTab && (
                  <span className="block w-full p-6 text-center text-sm text-slate-400">
                    No tab selected
                  </span>
                )}
                {selectedTab === initialTabs[0] && (
                  <ProfileInfo
                    registerFormFields={register}
                    formErrors={errors}
                  />
                )}
                {selectedTab === initialTabs[1] && (
                  <PasswordManagement
                    registerFormFields={register}
                    formErrors={errors}
                    username={signedInUser.email || ""}
                  />
                )}
                {selectedTab === initialTabs[2] && (
                  <AccountManagement
                    registerFormFields={register}
                    formErrors={errors}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <hr className="my-3 border-slate-100 md:my-6" />

            <ErrorNotification
              message={
                errorSubmitting
                  ? "Error submitting changes, please verify provided data before submitting again"
                  : ""
              }
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 rounded-b-xl border-t border-slate-200 bg-slate-300 px-8 py-3 sm:flex-row">
          <p className=" text-xs tracking-tight text-slate-500 lg:text-sm">
            Click on Submit to update your Profile Info
          </p>
          <div>
            <button
              type="submit"
              disabled={Object.keys(errors).some(
                (key: string) =>
                  (errors[key as InputValidationField] as FieldError)?.message
              )}
              className=" mr-2 inline-block w-fit shrink-0 overflow-hidden rounded-lg border border-indigo-400 bg-indigo-400 px-6 py-2.5 text-xs font-medium text-white transition focus:outline-none  focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200 "
            >
              Submit changes
            </button>

            <button
              type="button"
              className=" inline-block w-fit shrink-0 rounded-lg border border-slate-400 bg-slate-400 px-6 py-2.5 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.form>
      {/* <div className="fixed left-0 top-0 flex flex-col gap-3 text-xs">
        form errors
        <div>firstname: {errors.firstName?.message}</div>
        <div>lastname: {errors.lastName?.message}</div>
        <div>newEmail: {errors.newEmail?.message}</div>
        <div>currentPassword: {errors.currentPassword?.message}</div>
        <div>newPassword: {errors.newPassword?.message}</div>
        <div>confirm delete: {errors.confirmDelete?.message}</div>
        <br></br>
        SUBMISSION STATUS:
        <div>isSubmitting: {isSubmitting.toString()}</div>
        <div>errorSubmitting: {errorSubmitting}</div>
      </div> */}
    </div>
  );
};

export default Profile;
