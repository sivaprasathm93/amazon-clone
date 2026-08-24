import { MongoMemoryServer } from "mongodb-memory-server";

export default async function globalTeardown(): Promise<void> {
  const mongoServer = (globalThis as any).__MONGO_SERVER__ as
    | MongoMemoryServer
    | undefined;

  await mongoServer?.stop();
}
