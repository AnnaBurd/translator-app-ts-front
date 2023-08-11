import { useContext, useCallback } from "react";
import AuthContext from "./AuthContext";
import Config from "../../config.json";

/**
 * Update value of expired access jwt token (requires refresh jwt token to be stored as http-only browser cookie).
 */

// TODO: test and handle scenario when refresh token expired -> should require user to re-sign in and return back to the current page
const useRefreshAccessToken = () => {
  const { updateAccessToken, updateUserDetails } = useContext(AuthContext);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch(`${Config.API_BASE_URL}/refresh`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "useRefreshAccessToken: refreshAccessToken() - Failed refresh"
        );
      }

      const json = await response.json();
      const newAccessToken = json.accessToken;
      updateAccessToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      // Skip errors caused by controller.abort() fetch signal api, because either component was dismounted, or a new request is already fired
      if ((error as DOMException)?.name !== "AbortError") {
        // Clear in-memory signed in user state
        updateAccessToken("");
        updateUserDetails(null);

        // Inform refreshToken caller about error
        throw new Error(
          "refreshAccessToken: Fail to refresh expired access token"
        );
      }
    }
  }, [updateAccessToken, updateUserDetails]);

  return refreshAccessToken;
};

export default useRefreshAccessToken;
