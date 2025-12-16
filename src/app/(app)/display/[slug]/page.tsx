import React from "react";
import { notFound } from "next/navigation";
import { solutionsData } from "@/data/navigationData";
import DisplayClientPage from "@/components/pages/display/DisplayClientPage";
import { getSiteConfig } from "@/lib/siteConfig";

// cache from react

// generateStaticParams

// --- Server-Side Metadata Generation (Using the async/await pattern) ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params to get the slug
  const { slug } = await params;
  const allServices = solutionsData.flatMap((solution) => solution.services);
  const service = allServices.find((s) => s.slug === slug);
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  if (!service) {
    return { title: "Service Not Found" };
  }

  const description =
    service.content?.find((item) => item.type === "paragraph")?.text ||
    `Learn more about our ${service.name} insurance services.`;

  return {
    title: `${service.name} | Neon Insurance Brokers Ltd`,
    description: description.substring(0, 155),
    keywords: [
      service.name,
      `${service.name} Uganda`,
      `${service.name} Kampala`,
      "Neon Insurance Brokers",
    ],
    canonical: `${siteUrl}/display/${slug}`,
    openGraph: {
      title: `${service.name} | Neon Insurance Brokers Ltd`,
      description,
      url: `${siteUrl}/display/${slug}`,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `Details about ${service.name} from Neon Insurance`,
        },
      ],
    },
    twitter: {
      title: `${service.name} | Neon Insurance Brokers Ltd`,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

// --- Main Page Component (Using the async/await pattern) ---
export default async function DisplayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params to get the slug
  const { slug } = await params;

  const allServices = solutionsData.flatMap((solution) => solution.services);
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <DisplayClientPage service={service} />;
}
