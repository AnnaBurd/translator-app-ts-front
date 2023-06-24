import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext, useState } from "react";
import useSilentSignin from "./useSilentSignin";
import { AnimatePresence, motion } from "framer-motion";
import LogoLoader from "../components/animations/LogoLoader";

/**
 * Parent element for private react-router-dom routes. Checks if user has signed in, otherwise attempts a silent sign in / redirects to sign up route.
 */
const RequireAuth = () => {
  const { user: signedInUser } = useContext(AuthContext);
  const location = useLocation();

  // Attempt to silently sign in user on application launch/ after browser page refresh - uses refresh token cookie (http only cookie managed by browser)
  const isRunningSilentSignin = useSilentSignin();

  return (
    <>
      <LogoLoader isVisible={isRunningSilentSignin} />

      {!isRunningSilentSignin &&
        (signedInUser ? (
          <Outlet />
        ) : (
          <Navigate to="/signup" state={{ from: location }} replace />
        ))}
    </>
  );
};

export default RequireAuth;
