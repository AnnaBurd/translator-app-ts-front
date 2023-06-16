import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../@types/user";
import Config from "../../config.json";
import AuthContext from "./AuthContext";
const useSignout = () => {
  const { updateUserDetails, updateAccessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log("Signing out- hook body");
  useEffect(() => {
    console.log("Signing out - USEEFFECT in hook");
  }, []);

  const signout = async (user: User) => {
    console.log("Signing user in - function in hook", user);

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
        throw new Error("Could not sign out?");
      }

      const json = await response.json();

      console.log("GOT RESPONSE DATA", json);

      updateAccessToken("");
      updateUserDetails(null);

      // Go to welcome page
      navigate("/signup");
    } catch (error) {
      console.log("😶‍🌫️", error);
    }
  };

  return signout;
};

export default useSignout;
