import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SubscribeButton } from "@/components/pricing/SubscribeButton";

export const metadata = {
  title: "Pricing — Simple, Transparent Plans",
  description:
    "Start free with 3 listings/month. Upgrade to Pro for $19/month or Business for $39/month. No hidden fees.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out ListForge with your first few products.",
    features: [
      "3 listings per month",
      "Basic quality score",
      "3 languages",
      "Amazon & Shopify support",
      "Standard templates",
    ],
    cta: "Get Started",
    href: "/dashboard",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For growing sellers who need more volume and features.",
    features: [
      "50 listings per month",
      "Full quality score breakdown",
      "12+ languages",
      "All platforms (Amazon, Shopify, Etsy, eBay)",
      "Competitor analysis",
      "Rufus AI optimization",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/dashboard",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$39",
    period: "/month",
    description: "For power sellers and agencies managing multiple brands.",
    features: [
      "Unlimited listings",
      "Everything in Pro",
      "Bulk CSV import/export",
      "API access",
      "Team accounts (up to 5)",
      "White-label exports",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    href: "/dashboard",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
              Simple,{" "}
              <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-lg text-slate-500">
              Start free. Upgrade when you&apos;re ready. Cancel anytime.
              All plans include a 7-day free trial on Pro and Business.
            </p>
          </div>

          {/* Plans */}
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  plan.highlighted
                    ? "border-brand-300 shadow-xl shadow-brand-500/10 bg-white ring-2 ring-brand-500/20"
                    : "border-slate-200 bg-white hover:shadow-lg transition-shadow"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 text-white text-xs font-bold">
                    MOST POPULAR
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.name === "Free" ? (
                  <Link href={plan.href}>
                    <Button variant="outline" size="lg" className="w-full">
                      {plan.cta}
                    </Button>
                  </Link>
                ) : (
                  <SubscribeButton
                    plan={plan.name.toLowerCase() as "pro" | "business"}
                    planName={plan.name}
                    variant={plan.highlighted ? "primary" : "outline"}
                  >
                    {plan.cta}
                  </SubscribeButton>
                )}
              </div>
            ))}
          </div>

          {/* FAQ teaser */}
          <div className="text-center mt-16">
            <p className="text-slate-500">
              Have questions?{" "}
              <Link href="/faq" className="text-brand-600 hover:text-brand-700 font-medium">
                Check our FAQ
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
