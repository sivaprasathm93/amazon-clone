/**
 * Base URL for the backend API.
 *
 * Set VITE_API_URL at build time to point the deployed frontend at a hosted
 * backend; falls back to the local dev server when it isn't set.
 */
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000";
