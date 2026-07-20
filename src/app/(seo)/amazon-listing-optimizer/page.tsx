import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOLandingPage, type SEOPageData } from "@/components/seo/SEOLandingPage";

export const metadata = {
  title: "Amazon Listing Optimizer — AI-Powered Optimization Tool | ListForge",
  description:
    "Optimize your Amazon product listings with AI. Get SEO-optimized titles, bullet points, descriptions, and backend search terms. Improve ranking and conversion rates.",
  keywords: [
    "Amazon listing optimizer",
    "Amazon SEO tool",
    "Amazon product listing optimization",
    "Amazon keyword optimization",
    "improve Amazon ranking",
    "Amazon listing quality score",
    "AI Amazon listing tool",
  ],
  alternates: { canonical: "/amazon-listing-optimizer" },
};

const pageData: SEOPageData = {
  title: "Amazon Listing Optimizer",
  h1: "Amazon Listing Optimizer: AI-Powered Product Listing Optimization",
  subtitle:
    "Create high-ranking Amazon listings in minutes. Our AI generates SEO-optimized titles, bullet points, descriptions, and backend search terms that drive traffic and conversions.",
  description:
    "Amazon's search algorithm (A9) evaluates hundreds of signals to decide which products appear at the top of search results. Title relevance, keyword placement, bullet point completeness, description depth, and backend search terms all play critical roles. But manually optimizing every listing across your catalog takes hours — time you could spend sourcing products or growing your business. ListForge's Amazon listing optimizer uses AI trained on top-performing listings to generate platform-specific copy in seconds. Just enter your product details, target keywords, and preferences. You get a complete listing — title, 5 bullet points, product description, backend search terms — plus a quality score with actionable improvement suggestions. Whether you're launching a new product or refreshing existing listings, our tool helps you rank higher, convert better, and sell more.",
  targetKeyword: "amazon listing optimizer",
  relatedKeywords: [
    "Amazon SEO",
    "Amazon product listing",
    "Amazon keyword research",
    "Amazon listing optimization",
    "Amazon seller tools",
    "Amazon A9 algorithm",
    "Amazon listing quality score",
    "Amazon backend keywords",
    "Amazon product title optimization",
    "Amazon bullet points best practices",
  ],
  benefits: [
    {
      title: "AI-Generated Titles",
      desc: "Get keyword-rich titles optimized for Amazon's 200-character limit that front-load primary keywords for maximum ranking impact.",
    },
    {
      title: "5 SEO Bullet Points",
      desc: "Each bullet point is crafted to include relevant keywords while clearly communicating product features and benefits to shoppers.",
    },
    {
      title: "Backend Search Terms",
      desc: "Automatically generate compellering backend search terms (up to 249 bytes) to capture additional search traffic.",
    },
    {
      title: "Listing Quality Score",
      desc: "Get a 0-100 quality score with a breakdown of your title, bullet points, description, and keyword coverage.",
    },
    {
      title: "Rufus AI Ready",
      desc: "Generate Q&A formatted content optimized for Amazon's new Rufus AI shopping assistant, helping your listings appear in conversational search.",
    },
    {
      title: "Competitor Analysis",
      desc: "Enter a competitor's ASIN to analyze their keyword strategy and find gaps you can exploit to outrank them.",
    },
  ],
  howItWorks: [
    { step: 1, title: "Enter Product Details", desc: "Tell us about your product — name, category, key features, target keywords, and audience." },
    { step: 2, title: "AI Generates Your Listing", desc: "Our AI creates a complete Amazon-optimized listing with titles, bullet points, description, and backend search terms." },
    { step: 3, title: "Review & Optimize", desc: "Check your quality score, review the suggestions, make edits if needed, and copy the final listing to Amazon Seller Central." },
  ],
  faqs: [
    { q: "How is this different from Amazon's built-in AI listing generator?", a: "Amazon's free tool is a good starting point, but it only covers basic listing creation. ListForge provides a quality score, actionable optimization suggestions, competitor analysis, and multi-language support that Amazon's tool doesn't offer." },
    { q: "Does it work for all Amazon marketplaces?", a: "Yes. ListForge supports all Amazon marketplaces including US, UK, DE, JP, FR, ES, IT, and more. You can generate listings in 15+ languages with native-quality localization." },
    { q: "Can I optimize existing listings or only create new ones?", a: "Both. You can generate new listings from scratch or paste in your existing listing to get a quality score and improvement suggestions." },
    { q: "What is the A9 algorithm and why does optimization matter?", a: "A9 is Amazon's search ranking algorithm. It determines which products appear for which searches. Optimized listings with proper keyword placement, complete information, and strong conversion signals rank higher and get more sales." },
  ],
  ctaText: "Optimize Your Amazon Listing Free",
};

export default function AmazonListingOptimizerPage() {
  return (
    <>
      <Header />
      <SEOLandingPage data={pageData} />
      <Footer />
    </>
  );
}
