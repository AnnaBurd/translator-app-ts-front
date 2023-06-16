import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import useRefreshAccessToken from "./useRefreshAccessToken";

const RequireAuth = () => {
  const { user: signedInUser } = useContext(AuthContext);
  const refreshAccessToken = useRefreshAccessToken();
  const location = useLocation();

  // Attempt to silently sign in user on application launch/ after browser page refresh - uses refresh token cookie (http only cookie managed by browser)
  const [isRunningSilentSignin, setIsRunningSilentSignin] = useState(true);

  // useEffect(() => {
  //   console.log("Attempting silent sign in");

  //   const controller = new AbortController();

  //   refreshAccessToken().then(() => {
  //     setIsRunningSilentSignin(false);
  //   });

  //   return () => {
  //     console.log("USE Silent Sign in - Cleanup after useeffect");

  //     controller.abort();
  //   };
  // }, [refreshAccessToken]);

  return (
    <>
      {/* {signedInUser ? (
        <div>
          AUTHENTICATED ROUTE: <Outlet />
        </div>
      ) : (
        <Navigate to="/signin" state={{ from: location }} replace></Navigate>
      )} */}
      {isRunningSilentSignin && (
        <div>TODO: Wait a little bit, page is loading (render circle) </div>
      )}
      {!isRunningSilentSignin &&
        (signedInUser ? <Outlet /> : <Navigate to="/signin" />)}
    </>
  );
};

export default RequireAuth;
