import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Blog — Ecommerce Listing Optimization Tips & Guides | ListForge",
  description:
    "Expert guides on ecommerce listing optimization, Amazon SEO, Shopify product descriptions, and multi-platform selling strategies for independent sellers.",
};

const POSTS = [
  {
    title: "10 Amazon Listing Optimization Tips for 2026",
    slug: "/blog/amazon-listing-optimization-tips",
    excerpt:
      "Master Amazon's A9 algorithm with these 10 proven listing optimization strategies. From keyword research to A+ Content, learn what actually moves the ranking needle.",
    date: "2026-07-15",
    category: "Amazon",
  },
  {
    title: "How to Write Shopify Product Descriptions That Convert",
    slug: "/blog/shopify-product-descriptions-guide",
    excerpt:
      "Your product description is your best salesperson. Learn the psychology-backed copywriting framework that turns browsers into buyers on your Shopify store.",
    date: "2026-07-18",
    category: "Shopify",
  },
  {
    title: "Multi-Platform Ecommerce Strategy: Amazon vs Shopify vs Etsy vs eBay",
    slug: "/blog/multi-platform-ecommerce-strategy",
    excerpt:
      "Should you sell on one platform or all of them? A complete comparison of fees, audience, SEO differences, and how to manage listings efficiently across marketplaces.",
    date: "2026-07-20",
    category: "Strategy",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            ListForge <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-slate-500 mb-12">
            Expert guides on ecommerce listing optimization for independent sellers.
          </p>

          <div className="space-y-8">
            {POSTS.map((post) => (
              <article key={post.slug} className="group">
                <Link href={post.slug} className="block">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-brand-600 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
