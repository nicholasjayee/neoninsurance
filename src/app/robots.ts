import { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: ["/admin", "/privacy"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
