import { Navigate, Outlet } from "react-router-dom";
import { AppAuthContext } from "./AuthProvider";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { user } = useContext(AppAuthContext);
  console.log("Private route - currently logged in user is: ", user);

  return user ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoutes;
