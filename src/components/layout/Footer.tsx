import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { href: "/#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  Resources: [
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-xs">
                L
              </div>
              <span className="font-bold text-lg">
                List<span className="text-brand-600">Forge</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI-powered listing optimization for independent sellers across Amazon, Shopify, Etsy, and eBay.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-slate-800 text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-brand-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ListForge. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Built for independent sellers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
