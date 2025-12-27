import "dotenv/config";
import { defineConfig } from "drizzle-kit";

module.exports = defineConfig({
  schema: "./db/schema",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
