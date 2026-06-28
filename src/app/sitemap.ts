import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jeshurun.ie";

  const routes = [
    "/",
    "/about",
    "/about/sla",
    "/services",
    "/services/it-consulting",
    "/services/project-management",
    "/services/test-management",
    "/services/infrastructure-management",
    "/technology",
    "/technology/cloud-solutions",
    "/technology/data-management",
    "/technology/cybersecurity",
    "/technology/ai-machine-learning",
    "/technology/network-infrastructure",
    "/technology/devops",
    "/software",
    "/case-studies",
    "/blog",
    "/careers",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
