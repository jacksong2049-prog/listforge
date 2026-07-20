import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/payment/webhook
 *
 * PayPal sends subscription events here.
 * Verify webhook signature in production.
 * Events to handle:
 * - BILLING.SUBSCRIPTION.ACTIVATED → User subscribed successfully
 * - BILLING.SUBSCRIPTION.CANCELLED → Subscription cancelled
 * - BILLING.SUBSCRIPTION.SUSPENDED → Payment failed, subscription suspended
 * - BILLING.SUBSCRIPTION.PAYMENT.FAILED → Retry payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = body.event_type;

    console.log(`[PayPal Webhook] Event: ${eventType}`);

    // TODO: Verify webhook signature in production
    // https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature

    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
        // User's subscription is now active
        // Update your database: set user.plan = "pro", subscription.status = "active"
        console.log(`[Webhook] Subscription activated: ${body.resource?.id}`);
        break;

      case "BILLING.SUBSCRIPTION.CANCELLED":
        // User cancelled their subscription
        // Update your database: set subscription.status = "cancelled"
        console.log(`[Webhook] Subscription cancelled: ${body.resource?.id}`);
        break;

      case "BILLING.SUBSCRIPTION.SUSPENDED":
        // Payment failed multiple times, subscription suspended
        console.log(`[Webhook] Subscription suspended: ${body.resource?.id}`);
        break;

      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
        // A payment attempt failed — notify user to update payment method
        console.log(`[Webhook] Payment failed: ${body.resource?.id}`);
        break;

      default:
        console.log(`[Webhook] Unhandled event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
