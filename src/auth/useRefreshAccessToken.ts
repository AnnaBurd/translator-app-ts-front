import { useContext, useCallback } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Config from "../../config.json";

const useRefreshAccessToken = () => {
  const { updateAccessToken, updateUserDetails } = useContext(AuthContext);

  console.log("Refresh access token - hook body");

  const refreshAccessToken = useCallback(async () => {
    console.log("Refresh access token - function in hook");

    try {
      const response = await fetch(`${Config.API_BASE_URL}/refresh2`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not refresh token");
      }

      const json = await response.json();

      console.log("GOT RESPONSE DATA FOR REFRESHING TOKEN", json);

      const newAccessToken = json.accessToken;
      updateAccessToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.log("😶🫣", error);

      if ((error as DOMException)?.name !== "AbortError") {
        // TODO: setIsRunnigSilentSignin to false if error is not because request is canceled in the cleanup
        updateAccessToken("");
        updateUserDetails(null);

        console.log("COULD NOT REFRESH TOKEN_> SHOULD NAVIGATE TO RE_SIGNIN");

        throw new Error(
          "COULD NOT REFRESH TOKEN_> SHOULD NAVIGATE TO RE_SIGNIN"
        );
      }

      // TODO: require signin in again?
    }
  }, [updateAccessToken, updateUserDetails]);

  return refreshAccessToken;
};

export default useRefreshAccessToken;
