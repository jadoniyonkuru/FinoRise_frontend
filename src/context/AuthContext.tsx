import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "@/api";
import type { User } from "@/api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { full_name: string; email: string; password: string; phone?: string }) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      authService
        .getProfile()
        .then(setUser)
        .catch(() => {
          authService.logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string): Promise<User> {
    const { user } = await authService.login({ email, password });
    setUser(user);
    return user;
  }

  async function register(data: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<User> {
    const { user } = await authService.register(data);
    return user;
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  async function refreshUser() {
    const updated = await authService.getProfile();
    setUser(updated);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
