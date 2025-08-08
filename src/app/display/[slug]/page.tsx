import React from "react";
import { notFound } from "next/navigation";
import { solutionsData } from "@/data/navigationData";
import DisplayClientPage from "@/components/pages/display/DisplayClientPage";

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
    alternates: { canonical: `/display/${slug}` },
    openGraph: {
      title: `${service.name} | Neon Insurance Brokers Ltd`,
      description,
      url: `https://neoninsurancebrokerltd.org/display/${slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `Details about ${service.name} from Neon Insurance`,
        },
      ],
    },
    twitter: {
      title: `${service.name} | Neon Insurance Brokers Ltd`,
      description,
      images: ["/og-image.png"],
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
