import { AuthContext } from "../@types/auth";
import { createContext } from "react";

/* Notes: 
Context Providet makes Auth Context accessible to all React Components with hook "useContext(AppAuthContext)".
Thus, the styles and displayed data can be adjusted depending on the currently logged in user, and there is no need to pass logged in user or signup/signout functionality as props */
const authContextDefaults: AuthContext = {
  user: null,
  signup: async () => null,
  signin: async () => null,
  signout: async () => null,
  refreshAccessToken: async () => null,
};
const authContext = createContext<AuthContext>(authContextDefaults);

export default authContext;
