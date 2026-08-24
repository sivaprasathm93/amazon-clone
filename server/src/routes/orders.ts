import { Router } from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// All order routes require a logged-in user.
router.use(requireAuth);

// POST /orders - create an order from a list of { productId, quantity }
router.post("/", async (req: AuthRequest, res): Promise<any> => {
  try {
    const { items } = req.body as { items: { productId: string; quantity: number }[] };

    if (!items || !items.length) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      total += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      total,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: (err as Error).message });
  }
});

// GET /orders - list the logged-in user's orders
router.get("/", async (req: AuthRequest, res): Promise<any> => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: (err as Error).message });
  }
});

export default router;
