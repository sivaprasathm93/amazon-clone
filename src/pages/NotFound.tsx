import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-5xl font-bold text-gray-400 mb-4">404</p>
      <h1 className="text-3xl font-bold mb-2">This page doesn't exist</h1>
      <p className="text-gray-600 mb-8">
        The link may be out of date, or the address mistyped.
      </p>
      <Link
        to="/home"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Back to home
      </Link>
    </div>
  );
}
