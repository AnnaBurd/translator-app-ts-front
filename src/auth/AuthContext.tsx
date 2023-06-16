import { AuthContext } from "../@types/auth";
import { createContext } from "react";
import { User } from "../@types/user";

/* Notes: 
Context Providet makes Auth Context accessible to all React Components with hook "useContext(AppAuthContext)".
Thus, the styles and displayed data can be adjusted depending on the currently logged in user, and there is no need to pass logged in user or signup/signout functionality as props */
const authContextDefaults: AuthContext = {
  accessToken: null,
  user: null,
  updateUserDetails: (user: User) => null,
  updateAccessToken: (token: string) => null,
};
const authContext = createContext<AuthContext>(authContextDefaults);

export default authContext;
