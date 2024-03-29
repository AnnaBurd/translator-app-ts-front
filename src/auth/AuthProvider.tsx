import { ReactNode, useCallback, useRef, useState } from "react";
import AuthContext from "./AuthContext";
import { User } from "../@types/user";

/**
 * Auth Provider is a React component that plays role of a parent that provides common Auth Context to child components.
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const accessTokenRef = useRef<string | null>(null);

  const updateUserDetails = useCallback((user: User | null) => {
    if (!user) {
      setUser(null);
      return;
    }

    setUser((prev) => {
      return { ...prev, ...user };
    });
  }, []);

  const updateAccessToken = useCallback((token: string) => {
    accessTokenRef.current = token;
  }, []);

  const getAccessToken = useCallback(() => {
    return accessTokenRef.current;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
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
