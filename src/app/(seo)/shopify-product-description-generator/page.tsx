import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOLandingPage, type SEOPageData } from "@/components/seo/SEOLandingPage";

export const metadata = {
  title: "Shopify Product Description Generator — AI-Powered | ListForge",
  description:
    "Generate compelling Shopify product descriptions that convert. AI-powered tool creates brand-focused, SEO-optimized descriptions for your online store.",
  keywords: [
    "Shopify product description generator",
    "Shopify product description writer",
    "Shopify SEO description",
    "product description for Shopify store",
    "Shopify copywriting tool",
    "ecommerce product description AI",
  ],
  alternates: { canonical: "/shopify-product-description-generator" },
};

const pageData: SEOPageData = {
  title: "Shopify Product Description Generator",
  h1: "Shopify Product Description Generator: Write Descriptions That Convert",
  subtitle:
    "Turn product features into compelling Shopify descriptions that sell. AI-generated copy optimized for your brand voice, SEO, and conversion.",
  description:
    "A great product description on Shopify does more than list features — it tells a story, builds trust, and persuades visitors to click 'Add to Cart.' But writing unique, engaging descriptions for dozens or hundreds of products is time-consuming. Most store owners either copy manufacturer descriptions (hurting SEO) or write generic copy that fails to convert. ListForge's Shopify product description generator solves this. Our AI creates brand-aligned, SEO-optimized product descriptions that match your store's tone — whether that's professional, casual, luxury, or technical. Each description includes keyword placement for search engines and persuasive copy for human readers. Plus, get a quality score and actionable suggestions to continuously improve your product pages.",
  targetKeyword: "shopify product description generator",
  relatedKeywords: [
    "Shopify SEO",
    "Shopify product page optimization",
    "product description writer",
    "Shopify copywriting",
    "ecommerce product descriptions",
    "Shopify conversion optimization",
    "Shopify store tools",
    "AI product description",
    "Shopify marketing tools",
  ],
  benefits: [
    {
      title: "Brand Voice Matching",
      desc: "Choose from professional, casual, luxury, or technical tones so every description sounds like your brand — not like AI.",
    },
    {
      title: "SEO-Optimized Copy",
      desc: "Each description naturally incorporates your target keywords for better Google and Shopify search rankings.",
    },
    {
      title: "Mobile-First Formatting",
      desc: "Descriptions are formatted for mobile shoppers with scannable structure that works on small screens.",
    },
    {
      title: "Unique Descriptions Per Product",
      desc: "Every description is unique — no duplicate content penalties from search engines, no cannibalizing your own SEO.",
    },
    {
      title: "Conversion-Focused Structure",
      desc: "Descriptions follow proven ecommerce copywriting formulas: hook, benefits, features, social proof, and call to action.",
    },
    {
      title: "Batch Generation Ready",
      desc: "Pro and Business plans support generating descriptions for multiple products at once, saving hours of manual work.",
    },
  ],
  howItWorks: [
    { step: 1, title: "Describe Your Product", desc: "Enter your product name, key features, target keywords, and preferred brand tone." },
    { step: 2, title: "AI Generates Descriptions", desc: "Our AI creates a unique, SEO-optimized product description tailored to your Shopify store's style." },
    { step: 3, title: "Paste & Publish", desc: "Copy the description to your Shopify product page. Review, tweak if needed, and publish." },
  ],
  faqs: [
    { q: "Does this work with any Shopify theme?", a: "Yes. The descriptions we generate are plain text (with optional HTML formatting) that works with every Shopify theme. Just paste into your product description field." },
    { q: "Can I generate descriptions for my entire catalog at once?", a: "Yes, on the Business plan. You can upload a CSV with all your products and get descriptions generated in batch." },
    { q: "How is this better than using ChatGPT directly?", a: "ListForge is purpose-built for Shopify product descriptions. It understands Shopify's SEO best practices, character limits, and formatting conventions. Plus, you get quality scoring and optimization suggestions that ChatGPT doesn't provide." },
    { q: "Will search engines penalize AI-generated descriptions?", a: "No. Google has stated that AI-generated content is fine as long as it's valuable to readers. Our descriptions are designed to be helpful, unique, and informative — exactly what search engines want." },
  ],
  ctaText: "Generate Shopify Descriptions Free",
};

export default function ShopifyDescriptionPage() {
  return (
    <>
      <Header />
      <SEOLandingPage data={pageData} />
      <Footer />
    </>
  );
}
