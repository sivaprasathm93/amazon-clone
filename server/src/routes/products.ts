import { Router } from "express";
import { Product } from "../models/Product";

const router = Router();

// GET /products - list all products (public)
router.get("/", async (_req, res): Promise<any> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: (err as Error).message });
  }
});

// GET /products/:id - fetch a single product (public)
router.get("/:id", async (req, res): Promise<any> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: (err as Error).message });
  }
});

export default router;
