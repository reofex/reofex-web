// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://reofex.com", // TODO: confirm production domain (also in src/data/site.ts)
  trailingSlash: "never",
  build: { format: "directory" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
});
