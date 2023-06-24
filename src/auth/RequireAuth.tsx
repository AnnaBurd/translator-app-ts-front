import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import useSilentSignin from "./useSilentSignin";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence>
        {isRunningSilentSignin && (
          <motion.div
            className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[--color-secondary] text-2xl font-bold text-red-500"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              // y: -500,
              transition: { ease: "easeIn", duration: 0.3 },
            }}
            transition={{ duration: 10 }}
          >
            <motion.div>Silent Sign in is RUNNING ...</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
