import { Calendar } from "lucide-react";
import { UpcomingProduct } from "../types";

interface UpcomingProps {
  upcomingProductsDetails: UpcomingProduct[];
}

export function UpcomingProducts({ upcomingProductsDetails }: UpcomingProps) {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8">Upcoming Launches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingProductsDetails.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                Coming Soon
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">
                  Expected Price: ₹ {product.expectedPrice.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-5 h-5 mr-2" />
                  {new Date(product.launchDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <button
                className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                onClick={() => alert("You will be notified when the product is available")}
              >
                Notify Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
