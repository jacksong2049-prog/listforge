import Link from "next/link";
import { Button } from "@/components/ui/Button";

export interface SEOPageData {
  title: string;
  subtitle: string;
  description: string;
  h1: string;
  targetKeyword: string;
  relatedKeywords: string[];
  benefits: { title: string; desc: string }[];
  howItWorks: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaText: string;
}

export function SEOLandingPage({ data }: { data: SEOPageData }) {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-accent-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] mb-6">
            {data.h1}
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
            {data.subtitle}
          </p>
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              {data.ctaText}
            </Button>
          </Link>
          <p className="mt-4 text-sm text-slate-400">Free to start. No credit card required.</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed">{data.description}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            Why Use {data.title}?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl border border-slate-200/60 p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-800 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            {data.howItWorks.map((step) => (
              <div key={step.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Keywords */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Related Topics
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {data.relatedKeywords.map((kw) => (
              <span key={kw} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-white hover:border-brand-200 transition-colors"
              >
                <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none">
                  <span className="font-medium text-slate-800 pr-4 text-sm">{faq.q}</span>
                  <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl gradient-bg p-8 md:p-12 shadow-xl shadow-brand-500/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Optimize Your Listings?
            </h2>
            <p className="text-white/80 mb-8">
              Join 2,000+ sellers using ListForge to create high-converting product listings.
            </p>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-slate-100">
                {data.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
