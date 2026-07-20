import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "How to Write Shopify Product Descriptions That Convert — Complete Guide | ListForge",
  description:
    "Learn the psychology-backed framework for writing Shopify product descriptions that drive conversions. Covers copywriting formulas, SEO, mobile optimization, and AI tools.",
  keywords: [
    "write Shopify product descriptions",
    "Shopify product description tips",
    "product copywriting framework",
    "Shopify conversion optimization",
    "ecommerce product descriptions",
  ],
};

export default function ShopifyDescriptionsGuide() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-xs font-medium">
            Shopify
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4 leading-tight">
            How to Write Shopify Product Descriptions That Convert
          </h1>
          <p className="text-slate-400 text-sm mb-8">Published July 18, 2026 · 7 min read</p>

          <div className="prose prose-slate prose-lg max-w-none space-y-6">
            <p className="lead text-xl text-slate-600">
              Your product description is often the difference between a sale and a bounce. Unlike Amazon where shoppers scan bullet points, Shopify customers read — if you give them something worth reading. Here&apos;s how to write descriptions that turn visitors into customers.
            </p>

            <h2>Why Shopify Descriptions Are Different</h2>
            <p>
              On Amazon, shoppers are comparison-shopping. They want specs, prices, and reviews — fast. On Shopify, visitors have chosen to be on your store. They&apos;re open to your brand story. Your description needs to do three things simultaneously: connect emotionally, communicate value logically, and convince them this is the right choice. That&apos;s a lot harder than listing features.
            </p>

            <h2>The PAS Framework: Problem → Agitate → Solution</h2>
            <p>
              The most effective Shopify descriptions follow a simple three-part structure. First, name the problem your customer faces — make them feel understood. Second, agitate that problem — describe what happens if they don&apos;t solve it. Third, present your product as the natural solution. This framework works because it mirrors how people actually make purchasing decisions.
            </p>

            <h2>Write for Scanners, Not Readers</h2>
            <p>
              Mobile accounts for 70%+ of Shopify traffic. Nobody reads paragraphs on their phone. Structure your description for scanning: short paragraphs (2-3 sentences), bold key phrases, bullet points for features, and generous white space. If a shopper can get your product&apos;s value proposition in a 5-second scroll, you&apos;ve done your job.
            </p>

            <h2>Know Your Brand Voice</h2>
            <p>
              Are you the friendly expert? The luxury curator? The no-nonsense problem solver? Your descriptions should sound like one person wrote them — not a committee. Pick a tone (professional, casual, luxury, technical) and apply it consistently across every product. Inconsistency erodes trust. Consistency builds brands.
            </p>

            <h2>Address Objections Before They Arise</h2>
            <p>
              Every product has potential objections: &quot;Is this worth the price?&quot; &quot;Will it fit?&quot; &quot;What if it breaks?&quot; &quot;Why this brand and not the cheaper one?&quot; Your description should preemptively answer these. Include sizing guides, material details, warranty information, and social proof. Don&apos;t make shoppers hunt for reassurance — serve it to them.
            </p>

            <h2>SEO Still Matters on Shopify</h2>
            <p>
              Google indexes your product pages. If you&apos;re selling &quot;handmade leather laptop bags,&quot; that exact phrase should appear naturally in your title (H1), first paragraph, and at least once more in the body. But don&apos;t keyword stuff — Google penalizes unnatural writing. Write for humans first, include keywords where they fit naturally.
            </p>

            <hr className="my-10" />

            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Generate converting product descriptions in seconds
              </h3>
              <p className="text-slate-500 mb-6">
                ListForge creates brand-aligned, SEO-optimized Shopify descriptions using AI. Choose your tone, add your features, and publish.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 text-white font-medium hover:brightness-110 transition-all"
              >
                Try ListForge Free
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
