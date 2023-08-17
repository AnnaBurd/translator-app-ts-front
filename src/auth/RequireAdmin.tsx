import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";

/**
 * Parent element for private react-router-dom routes. Checks if user has signed in, otherwise attempts a silent sign in / redirects to sign up route.
 */
const RequireAdmin = () => {
  const { user: signedInUser } = useContext(AuthContext);

  // TODO: style error pages
  if (!signedInUser || signedInUser.role !== "Admin")
    return (
      <Navigate to="/error?type=not-authorized" state={{ from: location }} />
    );

  return <Outlet />;
};

export default RequireAdmin;
