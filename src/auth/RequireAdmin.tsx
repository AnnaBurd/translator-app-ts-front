import { Link, Outlet } from "react-router-dom";
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
      <div>
        {" "}
        // TODO: You are not authorized (this page is only for admins){" "}
        <Link to={"/dashboard"}>Go back to dashboard</Link>
        If there is some mistake, please contact us at{" "}
      </div>
    );

  return <Outlet />;
};

export default RequireAdmin;
