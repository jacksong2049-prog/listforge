import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ListForge — AI-Powered Ecommerce Listing Optimizer",
    template: "%s | ListForge",
  },
  description:
    "Create high-converting product listings for Amazon, Shopify, Etsy, and eBay in minutes. AI-powered optimization with multi-language support. Free to start.",
  keywords: [
    "AI listing optimizer",
    "Amazon listing tool",
    "product description generator",
    "ecommerce listing optimization",
    "Shopify product description",
    "Etsy SEO tool",
    "eBay listing optimization",
    "AI product copy",
    "listing quality score",
  ],
  authors: [{ name: "ListForge" }],
  openGraph: {
    title: "ListForge — AI-Powered Ecommerce Listing Optimizer",
    description: "Create high-converting product listings in minutes. Multi-platform, multi-language, AI-powered.",
    type: "website",
    siteName: "ListForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ListForge — AI Listing Optimizer",
    description: "High-converting listings for Amazon, Shopify, Etsy & eBay.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
