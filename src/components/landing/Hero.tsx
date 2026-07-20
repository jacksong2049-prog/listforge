import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-white to-accent-50/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Trusted by 2,000+ independent sellers
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-slide-up">
            Create{" "}
            <span className="gradient-text">High-Converting</span>{" "}
            Product Listings in Minutes
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            AI-powered listing optimization for Amazon, Shopify, Etsy, and eBay.
            Generate SEO-optimized titles, bullet points, and descriptions in 12+ languages.
            Get a quality score and actionable suggestions in seconds.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                Start Free — No Credit Card
              </Button>
            </Link>
            <Link href="/#features">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-400 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <span>No credit card required</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">3 free listings/month</span>
            <span className="hidden sm:inline">|</span>
            <span>12+ languages</span>
          </div>
        </div>

        {/* Visual placeholder - replace with product screenshot/GIF */}
        <div className="mt-16 max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <div className="rounded-2xl border border-slate-200/60 shadow-2xl shadow-brand-500/5 bg-white overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200/60 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-400 ml-2">ListForge — Dashboard</span>
            </div>
            <div className="p-6 md:p-8 space-y-4">
              {/* Fake UI */}
              <div className="flex gap-3 flex-wrap">
                {["Amazon", "Shopify", "Etsy", "eBay"].map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium border border-brand-200">
                    {p}
                  </span>
                ))}
              </div>
              <div className="h-3 bg-slate-100 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 border border-brand-100" />
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <div className="h-9 w-24 rounded-lg bg-slate-100" />
                <div className="h-9 w-32 rounded-lg bg-gradient-to-r from-brand-500 to-accent-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
