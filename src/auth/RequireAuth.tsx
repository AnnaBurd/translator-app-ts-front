import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import useSilentSignin from "./useSilentSignin";

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
      {isRunningSilentSignin && (
        <div>TODO: Wait a little bit, page is loading (render circle) </div>
      )}
      {!isRunningSilentSignin &&
        (signedInUser ? (
          <div>
            AUTHENTICATED ROUTE: <Outlet />
          </div>
        ) : (
          <Navigate to="/signup" state={{ from: location }} replace />
        ))}
    </>
  );
};

export default RequireAuth;
