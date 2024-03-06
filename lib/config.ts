import { loadEnvConfig } from "@next/env";
import { Client } from "pg";
const projectDir = process.cwd();

loadEnvConfig(projectDir);

const config = {
  POSTGRES_URL: process.env.POSTGRES_URL!,
  APP_ENV: process.env.APP_ENV!,
  SCHEMA: `./db/schema.ts`,
  MIGRATIONS: `./sql`,
};

export default config;
