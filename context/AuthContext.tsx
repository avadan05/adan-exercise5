import { createContext, useContext, useState } from "react";

type User = {
  firstName: string;
  lastName: string;
  photo: string | null;
};

type AuthType = {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {

  const [user, setUser] = useState<User | null>(null);

  const login = (data: User) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;