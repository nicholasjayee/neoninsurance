import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/common/ProgressBarProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const getSiteUrl = () => {
  if (process.env.VERCEL_ENV === "production") {
    // Use the final production domain
    return "https://neoninsurancebrokerltd.org/";
  }
  if (process.env.VERCEL_URL) {
    // Use the Vercel preview URL
    return `https://${process.env.VERCEL_URL}`;
  }
  // Use the local development URL
  return "http://localhost:3000";
};

// --- SEO METADATA ---
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  // --- Core Metadata ---
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Neon Insurance Brokers Ltd | Expert Risk Management in Kampala, Uganda",
    template: "%s | Neon Insurance Brokers Ltd",
  },
  description:
    "With over 21 years of experience, Neon Insurance Brokers provides expert risk assessment, tailored insurance solutions, and dedicated claims advocacy for personal and commercial needs in Kampala, Uganda. Clarity in complexity.",
  keywords: [
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
  authors: [{ name: "Neon Insurance Brokers Limited", url: siteUrl }],
  publisher: "Neon Insurance Brokers Limited",

  // --- Canonical URL and Alternates ---
  alternates: {
    canonical: "/",
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
    title: "Neon Insurance Brokers Ltd | Your Trusted Partner in Protection",
    description:
      "Expert risk management and tailored insurance solutions in Uganda. We are your unwavering advocates in securing your world.",
    url: siteUrl,
    siteName: "Neon Insurance Brokers Limited",
    images: [
      {
        url: "/og-image.png", // Place a 1200x630px image in the /public folder
        width: 1200,
        height: 630,
        alt: "Neon Insurance Brokers Limited Logo and Tagline",
      },
    ],
    locale: "en_UG",
    type: "website",
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image",
    title: "Neon Insurance Brokers Ltd | Your Trusted Partner in Protection",
    description:
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added lang for better accessibility and local SEO
    <html lang="en-UG">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>

        <div id="portal-root"></div>
      </body>
    </html>
  );
}
