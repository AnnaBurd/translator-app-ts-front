export interface UserCredentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthContext {
  user: User;
  signup: (user: UserCredentials) => Promise<boolean>;
  signin: (user: UserCredentials) => Promise<boolean>;
  signout: () => void;
}
