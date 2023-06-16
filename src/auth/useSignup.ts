import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../@types/user";
import Config from "../../config.json";
import AuthContext from "./AuthContext";
const useSignup = () => {
  const { updateUserDetails, updateAccessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log("Signing user up - hook body");
  useEffect(() => {
    console.log("Signing user up - USEEFFECT in hook");
  }, []);

  const signup = async (user: User) => {
    console.log("Signing user in - function in hook", user);

    try {
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
        throw new Error("Could not sign in");
      }

      const json = await response.json();

      console.log("GOT RESPONSE DATA", json);

      updateAccessToken(json.accessToken);
      updateUserDetails(json.data);

      // Go to welcome page
      navigate("/dash");
    } catch (error) {
      console.log("😶‍🌫️", error);
    }
  };

  return signup;
};

export default useSignup;
