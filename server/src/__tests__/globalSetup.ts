import { MongoMemoryServer } from "mongodb-memory-server";

/**
 * Starts a single in-memory MongoDB for the whole Jest run and publishes its
 * URI on process.env. Starting one instance here (rather than one per test
 * file) avoids racing several `mongod` launches against Jest's hook timeout.
 */
export default async function globalSetup(): Promise<void> {
  // The default 10s launch timeout is not enough on a cold Windows run,
  // where mongod may still be unpacking when the timer expires.
  const mongoServer = await MongoMemoryServer.create({
    instance: { launchTimeout: 60_000 },
  });

  // Stash the handle so globalTeardown can stop the same instance.
  (globalThis as any).__MONGO_SERVER__ = mongoServer;

  process.env.MONGO_TEST_URI = mongoServer.getUri();
  // Set before any app code loads, so dotenv can't pull in a real secret.
  process.env.JWT_SECRET = "test-secret";
}
