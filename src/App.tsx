import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

const Signin = lazy(() => import("./pages/Signin/Signin"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Restore = lazy(() => import("./pages/Restore/Restore"));
const AdminDashboard = lazy(
  () => import("./pages/AdminDashboard/AdminDashboard")
);
const UserDashboard = lazy(() => import("./pages/UserDashboard/UserDashboard"));
const Editor = lazy(() => import("./pages/Editor/Editor"));
const NewDocument = lazy(() => import("./pages/Editor/Modals/NewDocument"));
const Profile = lazy(() => import("./pages/UserProfile/Profile"));
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));

import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import RequireAdmin from "./auth/RequireAdmin";

import ContextProvider from "./context/ContextProvider";
import ThemeContextProvider from "./context/ThemeContextProvider";

export default function App() {
  const location = useLocation();
  // TODO: style scrollbar
  return (
    <AuthProvider>
      <ContextProvider>
        <ThemeContextProvider>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* TODO:? add landing page? */}
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/restore" element={<Restore />} />
              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/editor/" element={<NewDocument />} />
                <Route path="/editor/:docId" element={<Editor />} />
                <Route path="/profile" element={<Profile />} />
                <Route element={<RequireAdmin />}>
                  <Route path="/users" element={<AdminDashboard />} />
                </Route>
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AnimatePresence>
        </ThemeContextProvider>
      </ContextProvider>
    </AuthProvider>
  );
}
