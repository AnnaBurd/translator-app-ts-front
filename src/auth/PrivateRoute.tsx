import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext, useEffect, useState } from "react";

const PrivateRoutes = () => {
  const { user, refreshAccessToken } = useContext(AuthContext);

  const [isRunningSilentSignin, setIsRunningSilentSignin] = useState(true);

  // Attempt to silently sign in user using refresh token cookie (http only cookie managed by browser)
  useEffect(() => {
    refreshAccessToken(() => {
      setIsRunningSilentSignin(false);
    });
  }, [refreshAccessToken]);

  return (
    <>
      {isRunningSilentSignin && (
        <div>TODO: Wait a little bit, page is loading (render circle) </div>
      )}
      {!isRunningSilentSignin &&
        (user ? <Outlet /> : <Navigate to="/signin" />)}
    </>
  );
};

export default PrivateRoutes;
