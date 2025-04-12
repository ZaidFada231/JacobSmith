import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless"; // or `/edge` depending on your needs

export default defineConfig({
  output: "server", // important for vercel serverless
  adapter: vercel(),
});
