import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://zynthra.com";

const PAGES = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/products", changefreq: "weekly", priority: "0.9" },
  { loc: "/solutions", changefreq: "weekly", priority: "0.9" },
  { loc: "/pricing", changefreq: "monthly", priority: "0.8" },
  { loc: "/resources", changefreq: "weekly", priority: "0.8" },
  { loc: "/company", changefreq: "monthly", priority: "0.7" },
];

export const Route = createFileRoute("/sitemap.xml")({
  head: () => ({
    headers: {
      "Content-Type": "application/xml",
    },
  }),
  component: Sitemap,
});

function Sitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((page) => `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}