import { PrimeBanner } from "../components/PrimeBanner";
import { ProductSlider } from "../components/ProductSlider";
import { TrendingProducts } from "../components/TrendingProducts";
import { UpcomingProducts } from "../components/UpcomingProducts";
import {
  products,
  trendingProducts,
  upcomingProductsList,
} from "../data/products";

export function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PrimeBanner />
      <TrendingProducts products={trendingProducts} />
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <ProductSlider products={products} />
      <UpcomingProducts upcomingProductsDetails={upcomingProductsList} />
    </div>
  );
}
