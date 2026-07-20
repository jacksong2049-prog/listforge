"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface SubscribeButtonProps {
  plan: "pro" | "business";
  planName: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export function SubscribeButton({
  plan,
  planName,
  children,
  variant = "primary",
}: SubscribeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);

    // Must be logged in to subscribe
    if (!session?.user) {
      router.push(`/login?callbackUrl=/pricing`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/payment/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create subscription");
      }

      if (data.approvalUrl) {
        // Redirect to PayPal for payment approval
        window.location.href = data.approvalUrl;
      } else if (data.error?.includes("not configured")) {
        // PayPal not set up yet — show friendly message
        setError("Payment coming soon! PayPal integration is being configured.");
      } else {
        throw new Error("No approval URL received");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant={variant}
        size="lg"
        className="w-full"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Redirecting to PayPal...
          </span>
        ) : (
          children
        )}
      </Button>

      {error && (
        <p className="mt-2 text-xs text-center text-red-600">{error}</p>
      )}
    </div>
  );
}
