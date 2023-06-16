import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../config.json";
import AuthContext from "./AuthContext";

/**
 * Sign out user from the application:
 * - Hit backend api to delete refresh token from database
 * - Response from backend informs web browser to delete refresh cookie
 * - Remove signed in user state and access token from memory
 */
const useSignout = () => {
  const { updateUserDetails, updateAccessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const signout = async () => {
    try {
      const response = await fetch(`${Config.API_BASE_URL}/users/signout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not sign out from the database");
      }
    } catch (error) {
      console.log("😶‍🌫️", error);
    } finally {
      updateAccessToken("");
      updateUserDetails(null);
      navigate("/signup");
    }
  };

  return signout;
};

export default useSignout;
