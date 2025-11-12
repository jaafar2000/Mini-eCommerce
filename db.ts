import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); // Load .env locally

const sql = neon(process.env.DATABASE_URL!); // Use the aliased env var
export const db = drizzle({ client: sql });