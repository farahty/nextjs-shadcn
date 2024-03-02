import config from "@/lib/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: config.POSTGRES_URL,
});

console.log("from next app bootstrap ", config.POSTGRES_URL);

export const db = drizzle(pool, { logger: true });

export default db;
