import { ReactNode, createContext, useState } from "react";

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

  const login = async (userInput: UserCredentials) => {
    console.log("Logging in user with credentials", userInput);

    // TODO: replace fake request and error handling
    const fakeEmail = "eve.holt@reqres.in";
    const fakePassword = "cityslicka";

    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify({ email: fakeEmail, password: fakePassword }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(res, data.token);

    // Login successful - confirmed by backend
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

  const logout = async function () {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <AppAuthContext.Provider value={{ user, signin: login, signout: logout }}>
        {children}
      </AppAuthContext.Provider>
    </>
  );
};
