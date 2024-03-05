import { defineConfig } from "drizzle-kit";

import config from "./lib/config";

export default defineConfig({
  schema: config.SCHEMA,
  out: config.MIGRATIONS,
  driver: "pg",
  dbCredentials: {
    connectionString: config.POSTGRES_URL,
    // database: process.env.POSTGRES_DB!,
    // host: "db-service",
    // password: process.env.POSTGRES_PASSWORD,
    // port: +process.env.POSTGRES_PORT!,
    // user: process.env.POSTGRES_USER!,
  },
  verbose: true,
  strict: false,
});
