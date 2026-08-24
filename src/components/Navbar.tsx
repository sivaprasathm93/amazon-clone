import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingCart, Search, Home, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/auth-context";
import { products } from "../data/products";
import "./Navbar.scss";

const ALL_CATEGORIES = "all";

// Derived from the catalogue so the dropdown can never drift from the data.
const categories = Array.from(
  new Set(products.map((product) => product.category).filter(Boolean))
).sort() as string[];

export function Navbar() {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlQuery = searchParams.get("q") ?? "";
  const urlCategory = searchParams.get("category") ?? ALL_CATEGORIES;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const query = String(data.get("q") ?? "").trim();
    const category = String(data.get("category") ?? ALL_CATEGORIES);

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== ALL_CATEGORIES) params.set("category", category);

    const search = params.toString();
    navigate(search ? `/home?${search}` : "/home");
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link
          to={isAuthenticated ? "/home" : "/"}
          className="flex items-center space-x-2 shrink-0"
        >
          <Home />
          <span className="text-xl font-bold">A2ZMandi</span>
        </Link>

        {/* Search and cart are only meaningful once past the login screen. */}
        {isAuthenticated && (
          <>
            <div className="header-searchBar">
              {/* Keyed on the URL so a back/forward navigation or a shared link
                  remounts the fields with the right values, rather than syncing
                  them from an effect. */}
              <form
                key={`${urlQuery}|${urlCategory}`}
                className="headerSearchBar flexBox"
                role="search"
                onSubmit={handleSearch}
              >
                <label htmlFor="header-category" className="sr-only">
                  Category
                </label>
                <select
                  id="header-category"
                  name="category"
                  defaultValue={urlCategory}
                >
                  <option value={ALL_CATEGORIES}>All Categories</option>
                  {categories.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <label htmlFor="header-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="header-search"
                  name="q"
                  className="searchBar"
                  type="search"
                  placeholder="Search A2ZMandi"
                  defaultValue={urlQuery}
                />
                <button
                  className="searchButton"
                  type="submit"
                  aria-label="Search"
                >
                  <Search />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link to="/cart" className="flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">
                  Cart, {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
                {itemCount > 0 && (
                  <span
                    className="bg-red-500 rounded-full px-2 py-1 text-xs"
                    aria-hidden="true"
                  >
                    {itemCount}
                  </span>
                )}
              </Link>

              {user && (
                <span className="hidden sm:inline text-sm text-gray-300">
                  Hi, {user.name}
                </span>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm rounded-md px-3 py-2 hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
