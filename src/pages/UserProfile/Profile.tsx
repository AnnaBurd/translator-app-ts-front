import { useContext, useState } from "react";
import AuthContext from "../../auth/AuthContext";
import { Navigate } from "react-router-dom";
import SidePanel from "./SidePanel";
import Tabs, { Tab } from "./Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import AccountManagement from "./Tabs/AccountManagement";
import ProfileSettings from "./Tabs/ProfileSettings";

const initialTabs: Tab[] = [
  { label: "profile-settings", title: "Profile Settings" },
  { label: "account-management", title: "Delete Profile" },
];

const Profile = () => {
  const { user: signedInUser } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

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
        <div className="flex w-full flex-col overflow-hidden rounded-lg rounded-b-none bg-[white] lg:h-[28rem] lg:flex-row">
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
          <div className="px-4 pb-12 pt-6 md:px-8 lg:w-2/3 lg:pt-10">
            <h2 className="lg:text2xl mb-4 hidden text-xl font-bold text-slate-600 lg:block">
              Edit Profile
            </h2>
            <div className="">
              <Tabs
                initialTabs={initialTabs}
                selectedTab={selectedTab}
                onSelectTab={(tab) => setSelectedTab(tab)}
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
                {selectedTab === initialTabs[0] && <ProfileSettings />}
                {selectedTab === initialTabs[1] && <AccountManagement />}
              </motion.div>
            </AnimatePresence>

            {/* <h2 className="col-span-6 text-base font-medium tracking-wide text-slate-700 lg:text-lg">
              Profile Settings
            </h2> */}

            <hr className="my-3 border-slate-100 md:my-6" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 rounded-b-xl border-t border-slate-200 bg-slate-300 px-8 py-3 sm:flex-row">
          <p className=" text-xs tracking-tight text-slate-500 lg:text-sm">
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
