import config from "./lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./sql",
  driver: "pg",
  dbCredentials: {
    connectionString: config.POSTGRES_URL,
  },
  verbose: true,
  strict: false,
});
