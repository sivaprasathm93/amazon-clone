import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

/**
 * Gate for routes that need a signed-in user.
 *
 * The attempted location is passed along so the login form can send the
 * visitor back where they were heading instead of dumping them on /home.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
