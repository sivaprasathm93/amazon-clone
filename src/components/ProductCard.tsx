import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const open = () => navigate(`/product/${product.id}`);

  return (
    <div
      className="h-full cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
      onClick={open}
    >
      <div className="relative pb-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate" title={product.name}>
          {product.name}
        </h3>
        <StarRating rate={product.rating.rate} count={product.rating.count} />
        <p className="text-gray-600 font-bold mt-2">
          ₹ {product.price.toLocaleString("en-IN")}
        </p>

        <button
          className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          aria-label={`View details for ${product.name}`}
        >
          View details
        </button>
      </div>
    </div>
  );
}
