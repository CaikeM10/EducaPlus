import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export type UserRole = "ADMIN" | "TEACHER" | "COORDINATOR" | "SPECIAL_ED";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setAuthenticatedUser: (userData: AuthUser, token?: string) => void;
  refreshUser: () => Promise<AuthUser | null>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return null;
    }

    try {
      const response = await api.get<AuthUser>("/users/me");
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Sessão inválida", error);
      localStorage.removeItem("token");
      setUser(null);
      return null;
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  function setAuthenticatedUser(userData: AuthUser, token?: string) {
    if (token) {
      localStorage.setItem("token", token);
    }

    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        setAuthenticatedUser,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
