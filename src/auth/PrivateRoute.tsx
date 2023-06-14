import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  console.log("Private route - currently logged in user is: ", user);

  return user ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoutes;
