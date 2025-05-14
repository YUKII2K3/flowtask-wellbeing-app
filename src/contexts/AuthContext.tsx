
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  provider: "email" | "google" | "guest";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("flowTaskUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Regular email/password login
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would call your authentication API
      // For demo purposes, we'll create a mock user
      const user: User = {
        id: "user-" + Date.now(),
        name: email.split("@")[0],
        email: email,
        provider: "email"
      };
      
      setUser(user);
      localStorage.setItem("flowTaskUser", JSON.stringify(user));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Google login
  const googleLogin = async () => {
    try {
      // In a real app with a Google Auth API, we would:
      // 1. Open Google auth popup
      // 2. Handle the OAuth flow
      // 3. Get user details from Google
      
      // For demo purposes, we'll create a mock Google user
      const user: User = {
        id: "google-user-" + Date.now(),
        name: "Google User",
        email: "googleuser@example.com",
        photoUrl: "https://lh3.googleusercontent.com/a/default-user",
        provider: "google"
      };
      
      setUser(user);
      localStorage.setItem("flowTaskUser", JSON.stringify(user));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("flowTaskUser");
  };

  // Continue as guest
  const continueAsGuest = () => {
    const guestUser: User = {
      id: "guest-" + Date.now(),
      name: "Guest User",
      email: "guest@flowTask.app",
      provider: "guest"
    };
    
    setUser(guestUser);
    localStorage.setItem("flowTaskUser", JSON.stringify(guestUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        googleLogin,
        logout,
        continueAsGuest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
