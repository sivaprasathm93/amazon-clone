import { Link } from "react-router-dom";
import { ShoppingCart, Search, Home } from "lucide-react";
import { useCart } from "../context/CartContext";
import './Navbar.scss';

export function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
        <Home />
          <span className="text-xl font-bold">Amazon</span>
        </Link>
        <div className="header-searchBar">
          <div className="headerSearchBar flexBox">
            <select id="header-category">
              <option defaultValue="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Appliances">Home Appliances</option>
              <option value="Appliances">Furnitures</option>
              <option value="Appliances">Fashion</option>
            </select>
            <input
              className="searchBar"
              type="text"
              placeholder="Search Amazon.in"
            />
            <button className="searchButton">
              <Search />
            </button>
          </div>
        </div>
        <Link to="/cart" className="flex items-center space-x-2">
          <ShoppingCart className="w-6 h-6" />
          <span className="bg-red-500 rounded-full px-2 py-1 text-xs">
            {itemCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}
