/**
 * Payment integration (PayPal + Creem)
 *
 * PayPal: PayPal REST API v2 for subscriptions
 * Creem: Alternative payment aggregator
 *
 * To enable:
 * 1. Set environment variables in .env
 * 2. Uncomment and implement the functions below
 * 3. Create payment webhook handlers
 */

/**
 * PayPal — Create Subscription
 */
/*
export async function createPayPalSubscription(
  planId: string,
  userId: string
) {
  const response = await fetch("https://api-m.paypal.com/v1/billing/subscriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getPayPalAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      subscriber: { payer_id: userId },
      application_context: {
        brand_name: "ListForge",
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?subscription=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?subscription=cancelled`,
      },
    }),
  });
  return response.json();
}

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  const response = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}
*/

/**
 * Creem — Create Checkout Session
 */
/*
export async function createCreemCheckout(
  priceId: string,
  userId: string,
  userEmail: string
) {
  const response = await fetch("https://api.creem.io/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CREEM_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_id: priceId,
      customer_email: userEmail,
      customer_id: userId,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?subscription=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    }),
  });
  return response.json();
}
*/

/**
 * Subscription plans (matching pricing page)
 */
/*
export const SUBSCRIPTION_PLANS = {
  pro: {
    name: "Pro",
    price: 19,
    currency: "USD",
    interval: "month",
    features: ["50 listings/mo", "12+ languages", "Competitor analysis"],
    paypalPlanId: "P-XXX",
    creemPriceId: "price_XXX",
  },
  business: {
    name: "Business",
    price: 39,
    currency: "USD",
    interval: "month",
    features: ["Unlimited listings", "Bulk import", "API access", "Team accounts"],
    paypalPlanId: "P-YYY",
    creemPriceId: "price_YYY",
  },
} as const;
*/
