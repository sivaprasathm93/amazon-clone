import request from "supertest";
import { app } from "../server";
import { Product } from "../models/Product";

async function signupAndLogin() {
  const user = { name: "Buyer", email: "buyer@example.com", password: "password123" };
  await request(app).post("/signup").send(user);
  const res = await request(app)
    .post("/login")
    .send({ email: user.email, password: user.password });
  return res.body.token as string;
}

describe("Orders routes (protected)", () => {
  it("rejects requests without a token", async () => {
    const res = await request(app).get("/orders");
    expect(res.status).toBe(401);
  });

  it("creates an order for a logged-in user", async () => {
    const token = await signupAndLogin();
    const product = await Product.create({
      name: "Test Product",
      price: 100,
      description: "A product",
      image: "http://example.com/img.png",
      rating: { rate: 5, count: 1 },
    });

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ items: [{ productId: product._id, quantity: 2 }] });

    expect(res.status).toBe(201);
    expect(res.body.total).toBe(200);
  });
});
