import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../@types/user";
import Config from "../../config.json";
import AuthContext from "./AuthContext";

/**
 * Sign in user with email address and password
 */
const useSignin = () => {
  const { updateUserDetails, updateAccessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  // Get address of previous route before signin
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const signin = async (user: User) => {
    try {
      const response = await fetch(`${Config.API_BASE_URL}/users/signin`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not sign in");
      }

      const json = await response.json();

      updateAccessToken(json.accessToken);
      updateUserDetails(json.data);

      // Go to previous location from location state, or to user dash by default
      navigate(from, { replace: true });
    } catch (error) {
      console.log("😶‍🌫️", error);
    }
  };

  return signin;
};

export default useSignin;
