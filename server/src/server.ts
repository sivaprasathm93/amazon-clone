import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Auth routes are mounted at root ("/signup", "/login") to match the
// existing frontend, which already calls those paths directly.
app.use("/", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// Only connect to MongoDB and start listening when this file is run directly
// (keeps `app` importable in tests without opening a real DB connection/port).
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}
