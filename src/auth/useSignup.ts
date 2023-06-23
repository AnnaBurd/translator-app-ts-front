import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../@types/user";
import Config from "../../config.json";
import AuthContext from "./AuthContext";

/**
 * Sign up new user with email address and password
 *
 * Note: signin and signup hooks have potential for refactoring
 */
const useSignup = () => {
  const { updateUserDetails, updateAccessToken } = useContext(AuthContext);

  const navigate = useNavigate();
  // Get address of previous route before signup
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const signup = async (user: User) => {
    const response = await fetch(`${Config.API_BASE_URL}/users/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Could not sign up");
    }

    const json = await response.json();

    updateAccessToken(json.accessToken);
    updateUserDetails(json.data);

    // Go to previous location from location state, or to user dash by default
    navigate(from, { replace: true });
  };

  return signup;
};

export default useSignup;
