import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createPayPalSubscription, SUBSCRIPTION_PLANS } from "@/lib/payment";

/**
 * POST /api/payment/create-subscription
 *
 * Creates a PayPal subscription for the authenticated user.
 * Body: { plan: "pro" | "business" }
 * Returns: { approvalUrl } — redirect user to this URL to complete payment.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { plan } = body;

    if (!plan || !["pro", "business"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'pro' or 'business'" },
        { status: 400 }
      );
    }

    const planConfig = SUBSCRIPTION_PLANS[plan as "pro" | "business"];
    if (!planConfig.planId) {
      return NextResponse.json(
        { error: "PayPal plan ID not configured. Set PAYPAL_PRO_PLAN_ID or PAYPAL_BUSINESS_PLAN_ID in .env" },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

    const subscription = await createPayPalSubscription({
      planId: planConfig.planId,
      userId: session.user.id || session.user.email,
      userEmail: session.user.email,
      returnUrl: `${baseUrl}/dashboard?subscription=success`,
      cancelUrl: `${baseUrl}/pricing?subscription=cancelled`,
    });

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      approvalUrl: subscription.approvalUrl,
    });
  } catch (error) {
    console.error("Create subscription error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create subscription" },
      { status: 500 }
    );
  }
}
