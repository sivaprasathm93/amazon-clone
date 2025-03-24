import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Star } from 'lucide-react';

interface ProductSliderProps {
  products: Product[];
}

export function ProductSlider({ products }: ProductSliderProps) {
  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3_000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      className="product-slider"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div 
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="relative pb-[75%]">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{product.name}</h3>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                   <Star 
                   key={index}
                   className={`text-blue-500 ${index < product.rating.rate ? '' : 'opacity-25'} h-5 w-5`}
                 />
                ))}
                <span className="text-gray-600 ml-2">({product.rating.count})</span>
              </div>
              <p className="text-gray-600 font-bold mt-2">₹ {product.price.toLocaleString('en-IN')}</p>
              
              <button 
                className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${product.id}`);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}