import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold gradient-text mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 text-white font-medium hover:brightness-110 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
