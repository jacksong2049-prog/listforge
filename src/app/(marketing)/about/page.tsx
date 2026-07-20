import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About ListForge — Our Story",
  description:
    "ListForge was built to help independent sellers create high-converting product listings across multiple platforms with AI.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
              About{" "}
              <span className="gradient-text">ListForge</span>
            </h1>
            <p className="text-lg text-slate-500">
              Built for independent sellers, by independent sellers.
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Story</h2>
              <p className="text-slate-600 leading-relaxed">
                ListForge was born from a frustration every independent seller knows: spending hours writing
                and optimizing product listings across multiple platforms, only to wonder if they could be
                doing better. Between Amazon&apos;s character limits, Shopify&apos;s brand-focused style,
                Etsy&apos;s storytelling approach, and eBay&apos;s keyword-packed format — managing listings
                felt like a full-time job.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                We built ListForge to solve this. An AI-powered tool that understands each platform&apos;s
                unique requirements and generates optimized listings in seconds — not hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To level the playing field for independent sellers. Big brands have teams of copywriters and
                SEO specialists. With ListForge, solo sellers and small teams get the same advantage — at a
                fraction of the cost.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">What We Believe</h2>
              <ul className="space-y-3">
                {[
                  { title: "Sellers own their data", desc: "Your product data is yours. We never train AI on your listings or share your data with third parties." },
                  { title: "Transparent pricing", desc: "No hidden fees, no surprise charges. You always know what you're paying and why." },
                  { title: "Platforms should serve sellers", desc: "We optimize for what sellers actually need — not what platform algorithms claim to want." },
                  { title: "AI should assist, not replace", desc: "Our AI generates drafts. You review, edit, and approve. The final decision is always yours." },
                ].map((belief) => (
                  <li key={belief.title} className="flex gap-3">
                    <span className="text-brand-500 font-bold mt-0.5">•</span>
                    <div>
                      <span className="font-semibold text-slate-800">{belief.title}.</span>
                      <span className="text-slate-600"> {belief.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                Have questions, feedback, or want to partner with us? Reach out at{" "}
                <a href="mailto:hello@listforge.ai" className="text-brand-600 hover:text-brand-700 font-medium">
                  hello@listforge.ai
                </a>
                . We read every message.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
