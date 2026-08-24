import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  description2?: string;
  image: string;
  rating: { rate: number; count: number };
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  description2: { type: String },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
