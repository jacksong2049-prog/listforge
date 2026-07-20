import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOLandingPage, type SEOPageData } from "@/components/seo/SEOLandingPage";

export const metadata = {
  title: "Amazon SEO Keyword Tool — AI Keyword Research & Optimization | ListForge",
  description:
    "Find high-converting keywords for your Amazon listings. AI-powered keyword research, competitor keyword analysis, and backend search term optimization.",
  keywords: [
    "Amazon SEO keyword tool",
    "Amazon keyword research tool",
    "Amazon keyword optimization",
    "Amazon backend keywords",
    "Amazon search terms tool",
    "Amazon keyword generator",
    "Amazon listing keyword tool",
  ],
  alternates: { canonical: "/amazon-seo-keyword-tool" },
};

const pageData: SEOPageData = {
  title: "Amazon SEO Keyword Tool",
  h1: "Amazon SEO Keyword Tool: Find Keywords That Drive Sales",
  subtitle:
    "Discover the keywords your customers actually search for. AI-powered keyword research and optimization for better Amazon rankings and more organic sales.",
  description:
    "Keywords are the foundation of every successful Amazon listing. The right keywords put your product in front of shoppers ready to buy. The wrong keywords waste your listing's visibility on searches that never convert. But keyword research for Amazon is fundamentally different from Google SEO. Amazon shoppers use different search patterns — they're often further along in the buying journey and use more specific, purchase-intent keywords. ListForge's Amazon SEO keyword tool combines AI analysis with Amazon-specific keyword data to find the terms that drive both traffic and sales. We analyze your product category, competitor listings, and search trends to generate a prioritized keyword list. Then we help you place those keywords where they matter most: your title, bullet points, description, and backend search terms field.",
  targetKeyword: "amazon seo keyword tool",
  relatedKeywords: [
    "Amazon keyword research",
    "Amazon backend search terms",
    "Amazon listing keywords",
    "Amazon search volume",
    "Amazon SEO optimization",
    "Amazon keyword strategy",
    "Amazon product keywords",
    "Amazon search terms optimization",
    "Amazon keyword indexer",
  ],
  benefits: [
    {
      title: "Purchase-Intent Keywords",
      desc: "We prioritize keywords with high commercial intent — terms shoppers use when they're ready to buy, not just browse.",
    },
    {
      title: "Competitor Keyword Analysis",
      desc: "Enter a competitor ASIN and see exactly which keywords are driving their traffic. Find gaps in their strategy you can exploit.",
    },
    {
      title: "Backend Search Term Generator",
      desc: "Automatically generate optimized backend search terms that maximize your 249-byte limit without wasting space on duplicates.",
    },
    {
      title: "Keyword Placement Guide",
      desc: "Get specific recommendations on where to place each keyword — title, bullet points, or backend — based on its priority and search volume.",
    },
    {
      title: "Long-Tail Keyword Discovery",
      desc: "Find low-competition, high-conversion long-tail keywords that bigger competitors overlook but shoppers actively search for.",
    },
    {
      title: "Multi-Language Keywords",
      desc: "Expand internationally with keyword research in 15+ languages for Amazon marketplaces worldwide.",
    },
  ],
  howItWorks: [
    { step: 1, title: "Enter Your Product", desc: "Tell us about your product and its main category. The more details, the better the keyword results." },
    { step: 2, title: "AI Analyzes Keywords", desc: "Our AI researches relevant keywords, analyzes competitor listings, and identifies the highest-opportunity search terms." },
    { step: 3, title: "Get Your Keyword Strategy", desc: "Receive a prioritized keyword list with placement recommendations for your title, bullet points, description, and backend search terms." },
  ],
  faqs: [
    { q: "How is Amazon keyword research different from Google keyword research?", a: "Amazon searchers are buyers, not browsers. They use different language (more product-specific, more purchase-intent terms). Amazon's algorithm also weighs keywords differently — title keywords matter most, followed by bullet points, then backend search terms." },
    { q: "What are backend search terms on Amazon?", a: "Backend search terms (also called generic keywords) are hidden keywords in your Amazon listing that shoppers don't see but Amazon's algorithm uses for ranking. You have 249 bytes to include relevant search terms that don't appear in your visible listing." },
    { q: "How often should I update my keywords?", a: "Review keywords quarterly at minimum. Market trends, seasonal demand, and competitor strategies change. If you notice a ranking or sales drop, keyword optimization should be one of your first diagnostic steps." },
    { q: "Can I use the same keywords as my competitors?", a: "Yes and no. You should target the same high-value keywords, but you need differentiation too. Our competitor analysis helps you find keywords your competitors rank for — and gaps they've missed." },
  ],
  ctaText: "Find Your Amazon Keywords Free",
};

export default function AmazonSEOKeywordToolPage() {
  return (
    <>
      <Header />
      <SEOLandingPage data={pageData} />
      <Footer />
    </>
  );
}
