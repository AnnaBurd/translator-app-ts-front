import { User } from "./user";

export interface UserCredentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthenticatedUser extends User {
  accessToken?: string;
  name?: string;
}

export interface OnRefreshCallback {
  (accessToken: string): string | void;
}

export interface AuthContext {
  user: AuthenticatedUser | null;
  signup: (user: UserCredentials) => void;
  signin: (user: UserCredentials) => void;
  signout: () => void;
  refreshAccessToken: (
    callbackAfrerRefresh?: OnRefreshCallback
  ) => Promise<void | null | string> | void;
}
