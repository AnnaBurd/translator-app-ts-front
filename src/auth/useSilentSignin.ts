import { useContext, useEffect, useState } from "react";
import Config from "../../config.json";
import AuthContext from "./AuthContext";

/**
 * Signed in user state is not stored in local storage or as cookie for better security (can not be messed with client-side js code).
 * Instead, for better user experience - not to require re-signins on application start/page refreshes, application silently tries to fetch access token from the backend. So, if there is an valid refresh token, the browser will attach it to the request.
 */
const useSilentSignin = () => {
  const { user, updateAccessToken, updateUserDetails } =
    useContext(AuthContext);
  const [isRunningSilentSignin, setIsRunningSilentSignin] = useState(true);

  useEffect(() => {
    // User has already signed in - do nothing
    if (user) {
      setIsRunningSilentSignin(false);
      return;
    }

    // Try to fetch access token
    const controller = new AbortController();
    const tryToSignin = async () => {
      try {
        const response = await fetch(`${Config.API_BASE_URL}/refresh/signin`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("useSilentSignin: Fail fetching refresh token");
        }

        const json = await response.json();

        const newAccessToken = json.accessToken;
        updateAccessToken(newAccessToken);
        updateUserDetails(json.data);
        setIsRunningSilentSignin(false);
      } catch (error) {
        // Skip errors caused by controller.abort() fetch signal api, because either component was dismounted, or a new request is already fired
        if ((error as DOMException)?.name !== "AbortError") {
          setIsRunningSilentSignin(false);
        }
      }
    };

    tryToSignin();

    return () => {
      // Cancel ongoing fetch requests
      controller.abort();
    };
  }, [updateAccessToken, updateUserDetails, user]);

  return isRunningSilentSignin;
};

export default useSilentSignin;
