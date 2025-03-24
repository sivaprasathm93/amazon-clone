import { TrendingProduct } from '../types';
import { TrendingUp, Users, ChevronRight } from 'lucide-react';

interface TrendingProductsProps {
  products: TrendingProduct[];
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-red-500" />
          <h2 className="text-3xl font-bold">Trending Now</h2>
        </div>
        <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                #{product.trending.rank} Trending
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-semibold">{product.trending.salesIncrease}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">{product.trending.reviews} reviews</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">₹ {product.price.toLocaleString('en-IN')}</span>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}