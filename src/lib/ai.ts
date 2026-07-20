/**
 * AI Listing Generator - Core Logic
 *
 * Generates optimized ecommerce listings using AI API.
 * Supports multiple platforms: Amazon, Shopify, Etsy, eBay.
 * Demo mode uses templates; replace with real API for production.
 */

export type Platform = "amazon" | "shopify" | "etsy" | "ebay";
export type Language =
  | "en" | "ja" | "de" | "es" | "fr" | "zh"
  | "ko" | "it" | "pt" | "nl" | "ar" | "th" | "vi" | "tr" | "pl";

export interface ListingInput {
  productName: string;
  category: string;
  keyFeatures: string[];
  targetAudience: string;
  keywords: string[];
  platform: Platform;
  language: Language;
  tone: "professional" | "casual" | "luxury" | "technical";
}

export interface ListingOutput {
  title: string;
  bulletPoints: string[];
  description: string;
  searchTerms: string[];
  score: number;
  suggestions: string[];
}

export interface CompetitorAnalysis {
  asin: string;
  title: string;
  strengths: string[];
  weaknesses: string[];
  keywordGaps: string[];
  suggestedAngle: string;
}

const PLATFORM_NAMES: Record<Platform, string> = {
  amazon: "Amazon",
  shopify: "Shopify",
  etsy: "Etsy",
  ebay: "eBay",
};

const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English", ja: "日本語", de: "Deutsch", es: "Español",
  fr: "Français", zh: "中文", ko: "한국어", it: "Italiano",
  pt: "Português", nl: "Nederlands", ar: "العربية",
  th: "ไทย", vi: "Tiếng Việt", tr: "Türkçe", pl: "Polski",
};

/** Platform-specific title character limits */
const TITLE_LIMITS: Record<Platform, number> = {
  amazon: 200,
  shopify: 70,
  etsy: 140,
  ebay: 80,
};

/**
 * Generate an optimized listing. Replace this with real AI API call.
 */
export function generateListing(input: ListingInput): ListingOutput {
  const { productName, keyFeatures, keywords, platform } = input;

  // Simulate AI generation with platform-specific templates
  const title = generateTitle(productName, keyFeatures, keywords, platform);
  const bulletPoints = generateBulletPoints(keyFeatures, platform);
  const description = generateDescription(productName, keyFeatures, platform);
  const searchTerms = generateSearchTerms(keywords, platform);
  const score = calculateScore(title, bulletPoints, description, platform);
  const suggestions = generateSuggestions(score, title, bulletPoints, platform);

  return { title, bulletPoints, description, searchTerms, score, suggestions };
}

/** Generate platform-specific title */
function generateTitle(
  productName: string,
  features: string[],
  keywords: string[],
  platform: Platform
): string {
  const topKeywords = keywords.slice(0, 3).join(", ");
  const mainFeature = features[0] || "";

  const templates: Record<Platform, string> = {
    amazon: `${productName} - ${mainFeature} | Premium ${topKeywords} for Professional Results`,
    shopify: `${productName}: ${mainFeature}`,
    etsy: `${productName} | ${mainFeature} | Handcrafted Quality ${topKeywords}`,
    ebay: `${productName} ${mainFeature} - Fast Shipping ${topKeywords}`,
  };

  let title = templates[platform];
  const limit = TITLE_LIMITS[platform];
  if (title.length > limit) {
    title = title.substring(0, limit - 3) + "...";
  }
  return title;
}

/** Generate bullet points based on features */
function generateBulletPoints(
  features: string[],
  platform: Platform
): string[] {
  const baseBullets = [
    `PREMIUM QUALITY: ${features[0] || "Professional grade materials ensure durability and long-lasting performance"}`,
    `VERSATILE USE: ${features[1] || "Perfect for both beginners and professionals, home and commercial use"}`,
    `EASY TO USE: ${features[2] || "Intuitive design requires no special training — get started in minutes"}`,
    `VALUE PACK: ${features[3] || "Includes all essential accessories so you don't need to buy anything separately"}`,
    `SATISFACTION GUARANTEED: ${features[4] || "30-day money-back guarantee. If you're not 100% satisfied, return for a full refund"}`,
  ];

  // Amazon uses 5 bullets, Etsy uses descriptive paragraphs
  if (platform === "etsy") {
    return baseBullets.slice(0, 3).map((b) => b.replace(/^[A-Z\s]+: /, ""));
  }
  return baseBullets.slice(0, platform === "shopify" ? 4 : 5);
}

/** Generate product description */
function generateDescription(
  productName: string,
  features: string[],
  platform: Platform
): string {
  const intro = platform === "etsy"
    ? `Welcome to our shop! Presenting the ${productName} — carefully crafted with attention to every detail.`
    : `Introducing the ${productName} — your ultimate solution for professional results.`;

  const featureText = features.join(". ");
  const cta = platform === "amazon"
    ? "Click 'Add to Cart' now and experience the difference!"
    : "Order now and transform your workflow today!";

  return `${intro}\n\n${featureText}.\n\nWhy choose ${productName}? We combine premium materials with expert craftsmanship to deliver a product that exceeds expectations. Backed by our satisfaction guarantee.\n\n${cta}`;
}

/** Generate backend search terms */
function generateSearchTerms(
  keywords: string[],
  _platform: Platform
): string[] {
  const base = [...keywords];
  const modifiers = ["best", "premium", "professional", "top rated", "affordable"];
  const expanded: string[] = [];
  for (const kw of base) {
    for (const mod of modifiers) {
      expanded.push(`${mod} ${kw}`);
    }
  }
  return [...new Set([...base, ...expanded])].slice(0, 15);
}

/** Calculate listing quality score (0-100) */
function calculateScore(
  title: string,
  bullets: string[],
  description: string,
  platform: Platform
): number {
  let score = 0;

  // Title length (optimal range)
  const limit = TITLE_LIMITS[platform];
  const titleRatio = title.length / limit;
  if (titleRatio >= 0.6 && titleRatio <= 0.95) score += 20;
  else if (titleRatio >= 0.3) score += 10;

  // Bullet points count
  const expectedBullets = platform === "shopify" ? 4 : 5;
  if (bullets.length >= expectedBullets) score += 20;
  else score += bullets.length * 4;

  // Bullet point length (each > 100 chars is good)
  const goodBullets = bullets.filter((b) => b.length >= 80).length;
  score += (goodBullets / bullets.length) * 20;

  // Description length (> 500 chars is good for SEO)
  if (description.length >= 500) score += 20;
  else if (description.length >= 200) score += 10;

  // Keyword usage in title
  score += 10; // Assume keywords present in template

  // Platform-specific bonuses
  if (platform === "amazon") score += 10; // Search terms provided

  return Math.min(100, Math.round(score));
}

/** Generate improvement suggestions based on score */
function generateSuggestions(
  score: number,
  title: string,
  bullets: string[],
  platform: Platform
): string[] {
  const suggestions: string[] = [];

  if (score < 80) {
    suggestions.push(`Title is ${title.length} characters. Consider optimizing to 60-95% of ${TITLE_LIMITS[platform]} character limit.`);
  }
  if (bullets.length < 5 && platform !== "shopify") {
    suggestions.push(`Add ${5 - bullets.length} more bullet points to maximize keyword coverage.`);
  }
  if (platform === "amazon") {
    suggestions.push("Ensure backend search terms field is fully utilized (up to 249 bytes).");
  }
  if (score < 70) {
    suggestions.push("Front-load primary keywords in the title for better ranking.");
    suggestions.push("Include size/dimensions/material in bullet points to reduce returns.");
  }

  return suggestions.length > 0 ? suggestions : ["Your listing looks well-optimized! Consider A/B testing different main images."];
}

export { PLATFORM_NAMES, LANGUAGE_NAMES };
