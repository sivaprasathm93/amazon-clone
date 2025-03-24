import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { ArrowLeft, Star } from "lucide-react";

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const navigate = useNavigate();

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back to Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-lg rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`text-blue-500 ${
                  index < product.rating.rate ? "" : "opacity-25"
                } h-5 w-5`}
              />
            ))}
            <span className="text-gray-600 ml-2">({product.rating.count})</span>
          </div>
          <p className="text-2xl text-gray-700 mb-4">
            ₹ {product.price.toLocaleString('en-IN')}
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.description2 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Key Features
              </h2>
              <ul className="list-disc list-inside text-gray-600">
                {product.description2.split(",").map((feature, index) => (
                  <li key={index} className="mb-1">
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full mb-4"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-yellow-500 hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full mb-4"
          >
            Buy Now
          </button>

          <div className="text-gray-500">
            <p className="mb-1">
              <span className="font-semibold">Warranty:</span> 1 Year Limited
              Warranty
            </p>
            <p>
              <span className="font-semibold">Return Policy:</span> 30-Day
              Return Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
