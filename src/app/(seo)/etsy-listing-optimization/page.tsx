import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOLandingPage, type SEOPageData } from "@/components/seo/SEOLandingPage";

export const metadata = {
  title: "Etsy Listing Optimization — AI Tool for Better Rankings | ListForge",
  description:
    "Optimize your Etsy listings with AI. Get SEO-friendly titles, tags, and descriptions that help your handmade products get found by more shoppers.",
  keywords: [
    "Etsy listing optimization",
    "Etsy SEO tool",
    "Etsy listing tips",
    "Etsy tag generator",
    "Etsy product description",
    "Etsy search ranking",
    "handmade product SEO",
    "Etsy seller tools",
  ],
  alternates: { canonical: "/etsy-listing-optimization" },
};

const pageData: SEOPageData = {
  title: "Etsy Listing Optimization",
  h1: "Etsy Listing Optimization: Get Your Handmade Products Found",
  subtitle:
    "Stand out in Etsy's crowded marketplace. AI-powered listing optimization that understands Etsy's unique search algorithm and shopper behavior.",
  description:
    "Etsy is home to millions of creative sellers, but only the best-optimized listings get seen. Etsy's search algorithm considers title keywords, tags, categories, attributes, description content, and shop quality scores — all weighted differently than Amazon or Google. Generic SEO advice doesn't work for Etsy sellers. ListForge's Etsy listing optimization tool is built specifically for Etsy's unique marketplace. Our AI understands that Etsy shoppers value stories, craftsmanship, and authenticity. We generate warm, personal titles and descriptions that connect with buyers while incorporating the keywords and tags Etsy's algorithm needs to surface your products. From tag optimization (you get 13 — we help you use them all strategically) to description structure to title keyword placement, every element is designed to improve your Etsy search ranking and conversion rate.",
  targetKeyword: "etsy listing optimization",
  relatedKeywords: [
    "Etsy SEO",
    "Etsy tag generator",
    "Etsy listing tips",
    "Etsy search ranking",
    "Etsy product title",
    "Etsy shop optimization",
    "handmade SEO",
    "Etsy seller guide",
    "Etsy keyword research",
    "Etsy algorithm",
  ],
  benefits: [
    {
      title: "Etsy-Specific SEO",
      desc: "Our AI understands Etsy's unique algorithm — how it weights titles, tags, categories, and attributes differently from other platforms.",
    },
    {
      title: "13 Tags Optimized",
      desc: "Etsy gives you 13 tags per listing. We generate all 13 with strategic keyword combinations that maximize your search visibility.",
    },
    {
      title: "Story-Driven Descriptions",
      desc: "Etsy shoppers connect with stories. Our AI generates warm, authentic product descriptions that highlight craftsmanship while including SEO keywords naturally.",
    },
    {
      title: "Title Structure That Works",
      desc: "Etsy titles need to balance keyword placement with readability. We front-load your strongest keywords while keeping titles natural and inviting.",
    },
    {
      title: "Attribute & Category Guidance",
      desc: "Get recommendations for which Etsy categories and attributes to select — often overlooked but critical for search visibility.",
    },
    {
      title: "Shop Cohesion",
      desc: "All your listings maintain a consistent voice and style, building a recognizable brand that earns repeat customers.",
    },
  ],
  howItWorks: [
    { step: 1, title: "Describe Your Handmade Product", desc: "Tell us about your item — materials, techniques, style, and who it's perfect for." },
    { step: 2, title: "AI Optimizes for Etsy", desc: "Get an Etsy-optimized title, 13 strategic tags, a story-driven description, and recommended categories." },
    { step: 3, title: "Publish & Grow", desc: "Copy your optimized listing to Etsy. Monitor performance and refresh seasonally to maintain strong rankings." },
  ],
  faqs: [
    { q: "How is Etsy SEO different from Amazon SEO?", a: "Etsy's algorithm places equal weight on tags and titles, while Amazon prioritizes titles heavily. Etsy shoppers also respond to storytelling and brand personality — descriptions matter more on Etsy than they do on Amazon. And Etsy values shop-level signals (reviews, response rate, policies) alongside listing-level optimization." },
    { q: "How do Etsy tags work?", a: "Etsy gives each listing 13 tags (short keyword phrases). These tags, combined with your title words, determine which searches your listing can appear for. Using all 13 tags strategically — without repeating words already in your title — is one of the most impactful optimizations you can make." },
    { q: "Should I optimize old Etsy listings or focus on new ones?", a: "Both. New listings get a temporary 'new listing boost' from Etsy, so optimizing them upfront is critical. But refreshing older listings — especially seasonal items or those with declining views — can revive their rankings." },
    { q: "Can I use the same listing content on Etsy and my own website?", a: "We recommend unique content for each platform. Duplicate content can confuse search engines. ListForge generates platform-specific copy for each marketplace you sell on." },
  ],
  ctaText: "Optimize Your Etsy Listing Free",
};

export default function EtsyListingOptimizationPage() {
  return (
    <>
      <Header />
      <SEOLandingPage data={pageData} />
      <Footer />
    </>
  );
}
