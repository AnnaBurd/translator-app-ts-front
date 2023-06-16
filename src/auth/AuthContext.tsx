import { AuthContext } from "../@types/auth";
import { createContext } from "react";

/**
 * Auth Context is accessible to all React components within <AuthProvider> parent, to access it use useContext() hook.
 */
const authContextDefaults: AuthContext = {
  accessToken: null,
  user: null,
  updateUserDetails: () => null,
  updateAccessToken: () => null,
};
const authContext = createContext<AuthContext>(authContextDefaults);

export default authContext;
