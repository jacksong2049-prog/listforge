import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        {/* Trusted By */}
        <section className="py-12 border-y border-slate-200/60 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium text-slate-400 mb-6">
              TRUSTED BY SELLERS ON
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              {["Amazon", "Shopify", "Etsy", "eBay", "Walmart", "Alibaba"].map(
                (name) => (
                  <span
                    key={name}
                    className="text-lg md:text-xl font-bold text-slate-300"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
