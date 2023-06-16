import { useContext, useEffect, useState } from "react";
import Config from "../../config.json";
import AuthContext from "./AuthContext";

const useSilentSignin = () => {
  const { user, updateAccessToken, updateUserDetails } =
    useContext(AuthContext);
  const [isRunningSilentSignin, setIsRunningSilentSignin] = useState(true);

  useEffect(() => {
    console.log("Attempt to sign in without credentials");

    if (user) {
      setIsRunningSilentSignin(false);
      return () => {
        console.log("Cleanup silent signin");
      };
    }

    const controller = new AbortController();

    const tryToSignin = async () => {
      try {
        const response = await fetch(`${Config.API_BASE_URL}/refresh`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not refresh token");
        }

        const json = await response.json();

        console.log("GOT RESPONSE DATA FOR SILENT SIGN IN", json);

        const newAccessToken = json.accessToken;
        updateAccessToken(newAccessToken);
        updateUserDetails(json.data);
        setIsRunningSilentSignin(false);
      } catch (error) {
        if ((error as DOMException)?.name !== "AbortError") {
          // TODO: setIsRunnigSilentSignin to false if error is not because request is canceled in the cleanup
          setIsRunningSilentSignin(false);
        }

        // TODO: just redirect to sign in form
      }
    };

    tryToSignin();

    return () => {
      console.log("Cleanup silent signin");
      controller.abort();
    };
  }, [updateAccessToken, updateUserDetails, user]);

  return isRunningSilentSignin;
};

export default useSilentSignin;
