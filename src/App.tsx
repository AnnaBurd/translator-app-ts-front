import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Editor from "./pages/Editor/Editor";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import { ErrorPage } from "./pages/Error/ErrorPage";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";

import { AnimatePresence } from "framer-motion";
import NewDocument from "./pages/Editor/Modals/NewDocument";
import RequireAdmin from "./auth/RequireAdmin";
import Profile from "./pages/UserProfile/Profile";
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
