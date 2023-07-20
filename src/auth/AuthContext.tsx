import { createContext } from "react";
import { User } from "../@types/user";

export interface AuthContext {
  getAccessToken: () => string | null;
  user: User | null;
  updateUserDetails: (user: User) => void;
  updateAccessToken: (token: string) => void;
}

/**
 * Auth Context is accessible to all React components within <AuthProvider> parent, to access it use useContext() hook.
 */
const authContextDefaults: AuthContext = {
  getAccessToken: () => null,
  user: null,
  updateUserDetails: () => null,
  updateAccessToken: () => null,
};
const authContext = createContext<AuthContext>(authContextDefaults);

export default authContext;
