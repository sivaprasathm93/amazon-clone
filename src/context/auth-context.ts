import { createContext, useContext } from "react";

export interface AuthUser {
  email: string;
  name: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const TOKEN_KEY = "token";
export const USER_KEY = "user";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Reads the `exp` claim from a JWT without verifying it.
 *
 * This is only used to decide what the UI should show — the server still
 * verifies the signature on every request. Returns the expiry in epoch
 * milliseconds, or null if the token is unreadable or carries no expiry.
 */
export function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return typeof json.exp === "number" ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string | null): token is string {
  if (!token) return false;

  const expiry = getTokenExpiry(token);
  // A token we cannot read an expiry from is treated as unusable rather than
  // as valid forever.
  return expiry !== null && expiry > Date.now();
}
