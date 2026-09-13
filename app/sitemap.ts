import type { MetadataRoute } from "next";
import { communities } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.westproperties.ca";
  const staticRoutes = [
    "",
    "/buy",
    "/sell",
    "/home-value",
    "/tools",
    "/lifestyle-match",
    "/buying-strategy",
    "/insider",
    "/journal",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const communityRoutes = communities.map((c) => ({
    url: `${base}/communities/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...communityRoutes];
}
