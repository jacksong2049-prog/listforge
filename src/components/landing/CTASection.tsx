import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl gradient-bg p-8 md:p-14 text-center overflow-hidden shadow-2xl shadow-brand-500/20">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Listings?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join 2,000+ independent sellers who create high-converting listings with ListForge.
              Start free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-brand-700 hover:bg-slate-100 shadow-lg"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-2 border-white/30 hover:bg-white/10"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              3 free listings per month. Pro plans start at $19/month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
