import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/cms/", "/crm/", "/login", "/register"],
      },
    ],
    sitemap: "https://www.jeshurun.ie/sitemap.xml",
  };
}
