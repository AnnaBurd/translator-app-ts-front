import { ReactNode, createContext, useState } from "react";
import Config from "../../config.json";

import { AuthContext, UserCredentials } from "../@types/auth";
import { User } from "../@types/user";

/* Notes: 
Auth Context is accessible to all React Components with hook "useContext(AppAuthContext)".
Thus, the styles and displayed data can be adjusted depending on the currently logged in user, and there is no need to pass user as prop to each component */
const authContextDefaults: AuthContext = {
  user: null,
  signin: async () => false,
  signout: async () => null,
};
export const AppAuthContext = createContext<AuthContext>(authContextDefaults);

/* AppAuthContext component uses AuthProvider, which defines authentication logic */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // React forgets current state on page reloads/refreshes, so by default it will require re-login on each page reload.
  // To avoid annoying relogins, user data is saved to client local storage
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    console.log("gotUserFromLocalStorage:", userData);
    if (userData) {
      return JSON.parse(userData) as User;
    }
    return null;
  };
  const [user, setUser] = useState(getUserFromLocalStorage);

  const signin = async (userInput: UserCredentials) => {
    console.log("Logging in user with credentials", userInput, Config.API_URL);

    const res = await fetch(`${Config.API_URL}users/signin`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: userInput.email,
        password: userInput.password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(res, data);

    // Login successful - confirmed by backend
    // Now user token is stored by the browser (in http only cookie -> inaccessible programmatically from frontend js)
    // Browser will automatically attach this cookie to next requests.

    // Try to fetch user profile
    const res2 = await fetch(`${Config.API_URL}users/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data2 = await res2.json();
    console.log(res2, data2);

    if (data.token) {
      setUser({ name: data.token, email: userInput.email });

      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.token, email: userInput.email })
      );

      return true;
    }

    return false;
  };

  // TODO:
  const logout = async function () {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <AppAuthContext.Provider
        value={{ user, signin: signin, signout: logout }}
      >
        {children}
      </AppAuthContext.Provider>
    </>
  );
};
