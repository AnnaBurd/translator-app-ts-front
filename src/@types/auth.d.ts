import User from "./user";

export interface AuthContext {
  // accessToken: string | null;
  getAccessToken: () => string | null;
  user: User | null;
  updateUserDetails: (user: User) => void;
  updateAccessToken: (token: string) => void;
}
