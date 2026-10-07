import type { APIRoute } from "astro";
import { products, productHref } from "../data/products";

const paths = [
  "/",
  "/products",
  ...products.map((p) => productHref(p.slug)),
  "/solutions",
  "/how-we-build",
  "/about",
  "/case-studies",
  "/contact",
  "/privacy",
  "/terms",
];

export const GET: APIRoute = ({ site }) => {
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site).href.replace(/\/$/, p === "/" ? "/" : "")}</loc></url>`).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
