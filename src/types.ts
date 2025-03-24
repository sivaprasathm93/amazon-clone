export interface Product {
  id: number;
  name: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
  description2: string;
  image: string;
}

export interface UpcomingProduct {
  id: string,
  name: string,
  expectedPrice: number,
  description: string,
  image: string,
  launchDate: string
}

export interface TrendingProduct extends Product {
  trending: {
    rank: number;
    salesIncrease: string;
    reviews: number;
  };
}