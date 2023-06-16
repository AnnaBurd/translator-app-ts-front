import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../@types/user";
import Config from "../../config.json";
import AuthContext from "./AuthContext";
const useSignin = () => {
  const { updateUserDetails, updateAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("Signing user in - hook body");
  useEffect(() => {
    console.log("Signing user in - USEEFFECT in hook");
  }, []);

  const signin = async (user: User) => {
    console.log("Signing user in - function in hook", user);

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

      console.log("GOT RESPONSE DATA", json);

      updateAccessToken(json.accessToken);
      updateUserDetails(json.data);

      // TODO: check previous location from state, or navigate to dash by default
      navigate("/dash");
    } catch (error) {
      console.log("😶‍🌫️", error);
    }
  };

  return signin;
};

export default useSignin;
