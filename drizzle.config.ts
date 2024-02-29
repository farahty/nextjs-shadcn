import config from "./lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: config.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
});
