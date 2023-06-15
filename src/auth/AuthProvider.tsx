import { ReactNode, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../config.json";

import {
  AuthenticatedUser,
  OnRefreshCallback,
  UserCredentials,
} from "../@types/auth";
import Context from "./AuthContext";

/* AppAuthContext component uses AuthProvider, which defines authentication logic */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const signup = useCallback(
    async (userInput: UserCredentials) => {
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
    },
    [navigate]
  );

  const signin = useCallback(
    async (userInput: UserCredentials) => {
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
    },
    [navigate]
  );

  const refreshAccessToken = useCallback(
    async (callbackAfterRefresh?: OnRefreshCallback) => {
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

        const json = await response.json();

        setUser((prev) => {
          console.log(
            `Update user state (access token) from "${prev?.accessToken}" to "${json.accessToken}"`
          );
          return {
            ...prev,
            accessToken: json.accessToken,
          };
        });

        if (callbackAfterRefresh) {
          callbackAfterRefresh(json.accessToken);
        }

        return json.accessToken;
      } catch (error) {
        console.log("ERROR REFRESHING ACCESS TOKEN", error);
        // TODO: what next?
      }
    },
    []
  );

  const signout = useCallback(async function () {
    setUser(null);
    // TODO: api/users/signout
  }, []);

  return (
    <>
      <Context.Provider
        value={{ user, signup, signin, signout, refreshAccessToken }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
