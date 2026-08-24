import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PrimeBanner } from "../components/PrimeBanner";
import { ProductCard } from "../components/ProductCard";
import { ProductSlider } from "../components/ProductSlider";
import { TrendingProducts } from "../components/TrendingProducts";
import { UpcomingProducts } from "../components/UpcomingProducts";
import {
  products,
  trendingProducts,
  upcomingProductsList,
} from "../data/products";

export function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const category = searchParams.get("category") ?? "";
  const isSearching = Boolean(query || category);

  const results = useMemo(() => {
    const needle = query.toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle);
      const matchesCategory = !category || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  // A search replaces the landing page rather than sitting below it, so the
  // results are the first thing on screen instead of being buried under banners.
  if (isSearching) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">
            {results.length}{" "}
            {results.length === 1 ? "result" : "results"}
            {query && (
              <>
                {" "}
                for <span className="text-yellow-600">“{query}”</span>
              </>
            )}
            {category && <> in {category}</>}
          </h1>
          <Link
            to="/home"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Clear search
          </Link>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <p className="text-lg font-semibold mb-2">No products matched</p>
            <p className="text-gray-600 mb-6">
              Try a different word, or browse everything we have.
            </p>
            <Link
              to="/home"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }

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
