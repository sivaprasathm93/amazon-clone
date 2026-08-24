/**
 * Seeds the database with sample products.
 * Run with: yarn seed  (after setting MONGO_URI in server/.env)
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/Product";

dotenv.config();

const sampleProducts = [
  {
    name: "Apple iPhone 16e",
    price: 59999,
    description: "6.1-inch Super Retina XDR display, A15 Bionic chip, 5G connectivity.",
    description2: "6.1-inch display, A15 Bionic chip, 5G, Enhanced Face ID",
    image: "https://via.placeholder.com/300?text=iPhone+16e",
    rating: { rate: 4.5, count: 120 },
  },
  {
    name: "PlayStation 5",
    price: 48000,
    description: "Next-gen gaming console with 4K graphics and fast loading times.",
    description2: "4K graphics, custom SSD, haptic feedback controller",
    image: "https://via.placeholder.com/300?text=PS5",
    rating: { rate: 4.1, count: 3000 },
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI as string);
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log(`Seeded ${sampleProducts.length} products`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
