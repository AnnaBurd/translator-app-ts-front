import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../config.json";

import { AuthenticatedUser, UserCredentials } from "../@types/auth";
import Context from "./AuthContext";

/* AppAuthContext component uses AuthProvider, which defines authentication logic */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log("auth/AuthProvider");

  const navigate = useNavigate();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const signup = async (userInput: UserCredentials) => {
    console.log("Signing up user", userInput);

    try {
      const response = await fetch(`${Config.API_URL}users/signup`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        // TODO: what next?
        throw new Error("Could Not Sign Up");
      }

      const data = await response.json();
      console.log(data);

      setUser({
        accessToken: data.accessToken,
        name: data.data.firstName,
        email: data.data.email,
      });

      // Signup successful - confirmed by backend ->
      // Redirect to the dashboard with welcome new user text
      navigate("/dash");
    } catch (error) {
      console.log(error);
      // TODO: what next?
    }
  };

  const signin = async (userInput: UserCredentials) => {
    console.log("Signing in user with credentials", userInput);

    // TODO: api/users/signin

    try {
      const response = await fetch(`${Config.API_URL}users/signin`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        // TODO: what next?
        throw new Error("Could Not Sign In");
      }

      const data = await response.json();
      console.log(data);

      setUser({
        accessToken: data.accessToken,
        name: data.data.firstName,
        email: data.data.email,
      });

      // Signup successful - confirmed by backend ->
      // Redirect to the dashboard with welcome new user text
      navigate("/dash");
    } catch (error) {
      console.log(error);
      // TODO: what next?
    }
  };

  const refresh = async () => {
    try {
      const response = await fetch(`${Config.API_URL}refresh`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        // TODO: what next?
        throw new Error("Could Not Update Access - Please log in again");
      }

      const data = await response.json();
      console.log(data);

      setUser((prev) => {
        console.log("PREV-DATA", prev, data);
        return {
          ...prev,
          accessToken: data.accessToken,
        };
      });
    } catch (error) {
      console.log(error);
      // TODO: what next?
    }
  };

  const signout = async function () {
    setUser(null);
    // TODO: api/users/signout
  };

  return (
    <>
      <Context.Provider value={{ user, signup, signin, signout, refresh }}>
        {children}
      </Context.Provider>
    </>
  );
};
