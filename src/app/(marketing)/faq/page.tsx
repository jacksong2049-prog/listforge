import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Common questions about ListForge: pricing, platforms supported, AI technology, refund policy, and more.",
};

const FAQS = [
  {
    q: "What platforms does ListForge support?",
    a: "ListForge supports Amazon, Shopify, Etsy, and eBay. We optimize listings for each platform's specific format, character limits, and SEO requirements.",
  },
  {
    q: "How does the AI generate listings?",
    a: "ListForge uses advanced AI models trained on high-performing ecommerce listings. You provide your product details, target keywords, and preferences — the AI generates platform-optimized titles, bullet points, descriptions, and backend search terms. You can review, edit, and regenerate until you're satisfied.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes! The Free plan gives you 3 listings per month with basic quality scoring and 3 language options. No credit card required. Pro and Business plans come with a 7-day free trial.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. You can cancel your Pro or Business subscription at any time from your account settings. You'll continue to have access until the end of your current billing period. No questions asked.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept PayPal and major credit/debit cards (Visa, Mastercard, American Express) through our secure payment partners.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 7-day free trial on Pro and Business plans. If you forget to cancel and get charged, contact us within 48 hours for a full refund. We believe in fair and transparent billing.",
  },
  {
    q: "Is my product data safe?",
    a: "Yes. Your product data is encrypted in transit and at rest. We do not share, sell, or train AI models on your listing data. You can export and delete your data at any time.",
  },
  {
    q: "How many languages do you support?",
    a: "ListForge supports 15+ languages including English, Japanese, German, Spanish, French, Chinese, Korean, Italian, Portuguese, Dutch, Arabic, Thai, Vietnamese, Turkish, and Polish. More languages are added regularly.",
  },
  {
    q: "What is Rufus optimization?",
    a: "Rufus is Amazon's AI-powered shopping assistant that helps customers find products through conversational search. ListForge generates Rufus-ready Q&A content to help your listings rank better in Amazon's AI search results.",
  },
  {
    q: "Can I use ListForge for multiple brands or stores?",
    a: "Yes. The Business plan supports up to 5 team accounts and is designed for sellers managing multiple brands. You can easily switch between stores from the dashboard.",
  },
  {
    q: "How do I get support?",
    a: "Pro and Business users get priority email support. Free users can access our help center and community forum. Typical response time is under 24 hours.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-slate-500">
              Everything you need to know about ListForge.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-white hover:border-brand-200 transition-colors"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                  <span className="font-medium text-slate-800 pr-4">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-slate-600 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
