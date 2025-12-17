import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/common/ProgressBarProvider";

import { getSiteConfig } from "@/lib/siteConfig";

// --- SEO METADATA ---
export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    // --- Core Metadata ---
    metadataBase: new URL(siteUrl),
    title: {
      default:
        config?.defaultTitle ||
        "Neon Insurance Brokers Ltd | Expert Risk Management in Kampala, Uganda",
      template: `%s | ${config?.name || "Neon Insurance Brokers Ltd"}`,
    },
    description:
      config?.defaultDescription ||
      "With over 21 years of experience, Neon Insurance Brokers provides expert risk assessment, tailored insurance solutions, and dedicated claims advocacy for personal and commercial needs in Kampala, Uganda. Clarity in complexity.",
    keywords: config?.defaultKeywords
      ? config.defaultKeywords.split(",").map((k) => k.trim())
      : [
          // Core & Location
          "insurance broker Uganda",
          "Kampala insurance",
          "risk management Uganda",
          "motor comprehensive insurance",
          "medical insurance Uganda",
          "business insurance Kampala",
          "group personal accident",
          "fire and perils insurance",
          "Neon Insurance Brokers",
          "IBAU member",
          "neon insurance brokers uganda",
          "neon insurance",
          "neon",
          "insurance",

          // Expanded Services
          "car insurance Kampala",
          "health insurance Uganda",
          "SME insurance",
          "life assurance",
          "goods-in-transit insurance",
          "travel insurance",

          // Trust & Action
          "licensed insurance broker",
          "expert risk assessment",
          "insurance claims support",
          "get insurance quote Uganda",

          // Broader Terms
          "insurance companies in Kampala",
          "best insurance brokers in Uganda",
        ],
    // <meta name="google-site-verification" content="VTStVITxJ_6O8fMKgTRJAEnV5h0qeoIoJR-ccCa0r4I" />
    verification: {
      // google: "VTStVITxJ_6O8fMKgTRJAEnV5h0qeoIoJR-ccCa0r4I",
      // You can also add verification for other services here if needed
      // yandex: 'yandex-verification-code',
      // other: {
      //   'msvalidate.01': 'BING_VALIDATION_CODE',
      // },
    },
    // --- Author and Publisher ---
    authors: [
      { name: config?.name || "Neon Insurance Brokers Limited", url: siteUrl },
    ],
    publisher: config?.name || "Neon Insurance Brokers Limited",

    // --- Canonical URL and Alternates ---
    alternates: {
      canonical: siteUrl,
    },

    // --- Search Engine Robots ---
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    // --- Social Media (Open Graph for Facebook, LinkedIn, etc.) ---
    openGraph: {
      title:
        config?.defaultTitle ||
        "Neon Insurance Brokers Ltd | Your Trusted Partner in Protection",
      description:
        config?.defaultDescription ||
        "Expert risk management and tailored insurance solutions in Uganda. We are your unwavering advocates in securing your world.",
      url: siteUrl,
      siteName: config?.name || "Neon Insurance Brokers Limited",
      images: [
        {
          url: "/og-image.png", // Place a 1200x630px image in the /public folder
          width: 1200,
          height: 630,
          alt: `${
            config?.name || "Neon Insurance Brokers Limited"
          } Logo and Tagline`,
        },
      ],
      locale: "en_UG",
      type: "website",
    },

    // --- Twitter Card ---
    twitter: {
      card: "summary_large_image",
      title:
        config?.defaultTitle ||
        "Neon Insurance Brokers Ltd | Your Trusted Partner in Protection",
      description:
        config?.defaultDescription ||
        "Expert risk management and tailored insurance solutions in Uganda. We are your unwavering advocates in securing your world.",
      images: ["/og-image.png"], // Twitter uses the same image
    },

    // --- Favicons and App Icons ---
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },

    // --- Web App Manifest ---
    manifest: "/site.webmanifest",
  };
}

import { Inter, Roboto_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added lang for better accessibility and local SEO
    <html
      lang="en-UG"
      className={`${inter.variable} ${robotoMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className={`font-sans antialiased bg-white`}>
        <Providers>
          <div className="">{children}</div>
        </Providers>

        <div id="portal-root"></div>
      </body>
    </html>
  );
}
