import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignInButton } from "./SignInButton";

export const metadata = {
  title: "Sign In — ListForge",
  description: "Sign in to ListForge to manage your product listings.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl p-8 text-center">
            {/* Logo */}
            <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
              L
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome to ListForge
            </h1>
            <p className="text-slate-500 mb-8">
              Sign in to create and manage your product listings.
            </p>

            {/* Google Sign-In */}
            <SignInButton />

            <p className="mt-6 text-xs text-slate-400">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <p className="text-center text-sm text-slate-400 mt-6">
            Continue without signing in?{" "}
            <a href="/dashboard" className="text-brand-600 hover:text-brand-700 font-medium">
              Use Free Mode
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
