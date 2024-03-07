import { defineConfig } from "drizzle-kit";

import config from "./lib/config";

export default defineConfig({
  schema: config.SCHEMA,
  out: config.MIGRATIONS,
  driver: "pg",
  dbCredentials: {
    connectionString: config.POSTGRES_URL,
  },
  verbose: true,
  strict: false,
});
