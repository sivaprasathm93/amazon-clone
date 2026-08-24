import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AuthContext,
  AuthUser,
  TOKEN_KEY,
  USER_KEY,
  isTokenValid,
  getTokenExpiry,
} from "./auth-context";

function readStoredSession(): { token: string | null; user: AuthUser | null } {
  try {
    const token = localStorage.getItem(TOKEN_KEY);

    // A token that has already lapsed is dropped on load, so the app never
    // renders a signed-in shell that the API will immediately reject.
    if (!isTokenValid(token)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return { token: null, user: null };
    }

    const rawUser = localStorage.getItem(USER_KEY);
    return { token, user: rawUser ? (JSON.parse(rawUser) as AuthUser) : null };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState(readStoredSession);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setSession({ token: null, user: null });
  }, []);

  const login = useCallback((token: string, user: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setSession({ token, user });
  }, []);

  // The backend signs tokens with a one hour expiry. Without this the UI would
  // keep showing a signed-in user long after the token stopped working.
  useEffect(() => {
    if (!session.token) return;

    const expiry = getTokenExpiry(session.token);
    if (expiry === null) return;

    const timer = setTimeout(logout, Math.max(0, expiry - Date.now()));
    return () => clearTimeout(timer);
  }, [session.token, logout]);

  // Signing out in one tab should not leave another tab looking signed in.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === TOKEN_KEY) {
        setSession(readStoredSession());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isAuthenticated: Boolean(session.token),
      login,
      logout,
    }),
    [session, login, logout]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
