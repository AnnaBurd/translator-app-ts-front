import User from "./user";

export interface AuthContext {
  accessToken: string | null;
  user: User | null;
  updateUserDetails: (user: User) => void;
  updateAccessToken: (token: string) => void;
}
