export interface UserCredentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthContext {
  user: User;
  signup: (user: UserCredentials) => void;
  signin: (user: UserCredentials) => void;
  signout: () => void;
}
