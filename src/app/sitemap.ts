import { MetadataRoute } from "next";
// We will import your data to dynamically generate URLs for each service
import { solutionsData } from "@/data/navigationData";

// This is the base URL for your website.
// IMPORTANT: Update this to your final domain when you go live.
const siteUrl = "https://neoninsurance.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Get the current date to use as the `lastModified` value.
  const lastModified = new Date().toISOString().split("T")[0];

  // 1. Define your main, static pages with their priorities and change frequencies.
  const staticRoutes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.url}`,
    lastModified,
    // priority: route.priority,
    // changeFrequency: route.changeFrequency,
  }));

  // 2. Dynamically generate URLs for all your service display pages.
  const dynamicServiceUrls = solutionsData
    .flatMap((solution) => solution.services) // Get all services from all categories
    .filter((service) => service.slug && service.content) // Only include services that are actual pages
    .map((service) => ({
      url: `${siteUrl}/display/${service.slug}`,
      lastModified,
      // priority: 0.7, // Service pages are important, but less so than top-level pages
      // changeFrequency: "yearly" as const, // Content doesn't change often
    }));

  // 3. Combine the static and dynamic URLs into a single array.
  return [...staticUrls, ...dynamicServiceUrls];
}
