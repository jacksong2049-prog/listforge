import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const SITE_CONFIG = {
  name: "ListForge",
  tagline: "AI-Powered Listing Optimization for Independent Sellers",
  description:
    "Create high-converting product listings for Amazon, Shopify, Etsy, and eBay in minutes. AI-powered optimization with multi-language support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://listforge.ai",
  ogImage: "/og-image.png",
  author: "ListForge Team",
  links: {
    twitter: "https://twitter.com/listforge",
    github: "https://github.com/listforge",
  },
} as const;
