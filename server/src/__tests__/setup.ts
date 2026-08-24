import mongoose from "mongoose";

// Connects to the in-memory MongoDB started in globalSetup, so tests never
// touch the real database and don't need real credentials.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI as string);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
