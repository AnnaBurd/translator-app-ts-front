import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import useSilentSignin from "./useSilentSignin";
import LogoLoader from "../components/animations/LogoLoader";

/**
 * Parent element for private react-router-dom routes. Checks if user has signed in, otherwise attempts a silent sign in / redirects to sign up route.
 */
const RequireAdmin = () => {
  const { user: signedInUser } = useContext(AuthContext);

  console.log("Admin dashboard user: ", signedInUser);

  // TODO: style error pages
  if (signedInUser.role !== "Admin")
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
