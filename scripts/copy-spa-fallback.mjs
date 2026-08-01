/**
 * GitHub Pages (and similar static hosts) need 404.html to serve the SPA
 * for deep links like /about. Copy index.html after build.
 */
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

const dist = join(process.cwd(), "dist");
const index = join(dist, "index.html");

if (!existsSync(index)) {
  console.error("copy-spa-fallback: dist/index.html not found. Run vite build first.");
  process.exit(1);
}

copyFileSync(index, join(dist, "404.html"));
