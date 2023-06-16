import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import useRefreshAccessToken from "./useRefreshAccessToken";
import useSilentSignin from "./useSilentSignin";

const RequireAuth = () => {
  const { user: signedInUser } = useContext(AuthContext);
  const refreshAccessToken = useRefreshAccessToken();
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
          <Navigate to="/signin" state={{ from: location }} replace />
        ))}
    </>
  );
};

export default RequireAuth;
