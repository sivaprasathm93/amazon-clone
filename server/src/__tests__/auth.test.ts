import request from "supertest";
import { app } from "../server";

describe("Auth routes", () => {
  const user = { name: "Test User", email: "test@example.com", password: "password123" };

  it("signs up a new user", async () => {
    const res = await request(app).post("/signup").send(user);
    expect(res.status).toBe(201);
  });

  it("rejects duplicate signup", async () => {
    await request(app).post("/signup").send(user);
    const res = await request(app).post("/signup").send(user);
    expect(res.status).toBe(400);
  });

  it("logs in with correct credentials and returns a token", async () => {
    await request(app).post("/signup").send(user);
    const res = await request(app)
      .post("/login")
      .send({ email: user.email, password: user.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("rejects login with wrong password", async () => {
    await request(app).post("/signup").send(user);
    const res = await request(app)
      .post("/login")
      .send({ email: user.email, password: "wrong-password" });

    expect(res.status).toBe(400);
  });
});
