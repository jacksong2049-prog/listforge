import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://listforge.ai";

  // Core pages
  const pages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  // SEO landing pages (targeted keywords)
  const seoPages = [
    "amazon-listing-optimizer",
    "shopify-product-description-generator",
    "ai-ecommerce-listing-tool",
    "amazon-seo-keyword-tool",
    "etsy-listing-optimization",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog pages
  const blogPages = [
    "amazon-listing-optimization-tips",
    "shopify-product-descriptions-guide",
    "multi-platform-ecommerce-strategy",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  };

  return [...pages, ...seoPages, blogIndex, ...blogPages];
}
