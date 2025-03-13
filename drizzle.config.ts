import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/lib/server/db/schema.ts",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	verbose: true,
	strict: true,
	dialect: "postgresql",
});
