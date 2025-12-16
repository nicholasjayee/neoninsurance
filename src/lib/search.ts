import { prisma } from "@/lib/prisma";

export type SearchResult = {
  id: string;
  type: "Page" | "Article" | "FAQ" | "Tool";
  title: string;
  description: string;
  url: string;
  category?: string;
};

const staticPages: SearchResult[] = [
  {
    id: "home",
    type: "Page",
    title: "Home",
    description: "Neon Insurance homepage",
    url: "/",
    category: "General",
  },
  {
    id: "about",
    type: "Page",
    title: "About Us",
    description: "Learn more about Neon Insurance Brokers",
    url: "/about",
    category: "General",
  },
  {
    id: "contact",
    type: "Page",
    title: "Contact Us",
    description: "Get in touch with our support team",
    url: "/contact",
    category: "General",
  },
  {
    id: "claims",
    type: "Page",
    title: "Claims Center",
    description: "File a claim or track existing claims",
    url: "/claims",
    category: "Services",
  },
  {
    id: "calculator",
    type: "Tool",
    title: "Premium Calculator",
    description: "Estimate your insurance premium",
    url: "/calculator",
    category: "Tools",
  },
  {
    id: "risk-map",
    type: "Tool",
    title: "Risk Assessment Map",
    description: "View local risk factors in your area",
    url: "/risks",
    category: "Tools",
  },
  {
    id: "insights",
    type: "Page",
    title: "Neon Insights",
    description: "Read our latest articles and news",
    url: "/insights",
    category: "Resources",
  },
  {
    id: "help",
    type: "Page",
    title: "Help Center",
    description: "Frequently asked questions and support",
    url: "/help",
    category: "Resources",
  },
];

export async function globalSearchCore(
  query: string
): Promise<{ success: boolean; results: SearchResult[] }> {
  if (!query || query.length < 2) {
    return { success: true, results: [] };
  }

  const normalizedQuery = query.toLowerCase();

  try {
    // 1. Search Static Pages
    const pageResults = staticPages.filter(
      (page) =>
        page.title.toLowerCase().includes(normalizedQuery) ||
        page.description.toLowerCase().includes(normalizedQuery)
    );

    // 2. Search Blog Posts
    const blogPosts = await prisma.blogPost.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
    });

    const blogResults: SearchResult[] = blogPosts.map((post) => ({
      id: post.id,
      type: "Article",
      title: post.title,
      description: post.excerpt,
      url: `/insights/${post.slug}`,
      category: post.category,
    }));

    // 3. Search FAQs
    const faqs = await prisma.faq.findMany({
      where: {
        OR: [
          { question: { contains: query, mode: "insensitive" } },
          { answer: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
    });

    const faqResults: SearchResult[] = faqs.map((faq) => ({
      id: faq.id,
      type: "FAQ",
      title: faq.question,
      description: faq.answer.substring(0, 100) + "...",
      url: "/help",
      category: faq.category,
    }));

    // Combine results
    const results = [...pageResults, ...blogResults, ...faqResults];

    return { success: true, results };
  } catch (error) {
    console.error("Global search error:", error);
    return { success: false, results: [] };
  }
}
