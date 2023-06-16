import { ReactNode, useCallback, useRef, useState } from "react";
import AuthContext from "./AuthContext";
import { User } from "../@types/user";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const accessTokenRef = useRef<string | null>(null);

  const updateUserDetails = useCallback((user: User) => {
    setUser((prev) => {
      return { ...prev, ...user };
    });
  }, []);

  const updateAccessToken = useCallback((token: string) => {
    accessTokenRef.current = token;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: accessTokenRef.current,
        user,
        updateUserDetails,
        updateAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
