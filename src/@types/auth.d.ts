export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthContext {
  user: User;
  signin: (user: UserCredentials) => Promise<boolean>;
  signout: () => void;
}
