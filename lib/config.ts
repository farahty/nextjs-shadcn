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

console.log(config);

async function main() {
  const client = new Client({
    connectionString:
      "postgres://nimer_farahty:20210810@host.docker.internal:5436/shadcn-bun",
  });

  try {
    await client.connect();
    const result = await client.query("SELECT NOW()");
    console.log(result.rows);

    await client.end();
  } catch (e) {
    console.log(e);
  }
}

main();

export default config;
