/**
 * Payment Integration — PayPal Subscriptions
 *
 * Setup:
 * 1. Go to https://developer.paypal.com → Create REST API App
 * 2. Set PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env
 * 3. Create subscription plans in PayPal dashboard
 * 4. Set PAYPAL_PRO_PLAN_ID and PAYPAL_BUSINESS_PLAN_ID in .env
 */

const PAYPAL_API = process.env.PAYPAL_SANDBOX === "true"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com";

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`PayPal auth failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export interface CreateSubscriptionParams {
  planId: string;
  userId: string;
  userEmail: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface SubscriptionResponse {
  id: string;
  status: string;
  approvalUrl: string;
}

/**
 * Create a PayPal subscription
 * Returns { id, approvalUrl } — redirect user to approvalUrl to complete payment.
 */
export async function createPayPalSubscription(
  params: CreateSubscriptionParams
): Promise<SubscriptionResponse> {
  const token = await getAccessToken();

  const response = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `listforge-${params.userId}-${Date.now()}`,
    },
    body: JSON.stringify({
      plan_id: params.planId,
      subscriber: {
        name: { given_name: params.userEmail.split("@")[0] },
        email_address: params.userEmail,
      },
      application_context: {
        brand_name: "ListForge",
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        return_url: params.returnUrl,
        cancel_url: params.cancelUrl,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PayPal subscription creation failed: ${error}`);
  }

  const data = await response.json();

  // Find approval URL
  const approvalUrl = data.links?.find(
    (link: any) => link.rel === "approve"
  )?.href;

  return {
    id: data.id,
    status: data.status,
    approvalUrl: approvalUrl || "",
  };
}

/**
 * Cancel a PayPal subscription
 */
export async function cancelPayPalSubscription(
  subscriptionId: string,
  reason: string = "Customer requested cancellation"
): Promise<void> {
  const token = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PayPal cancellation failed: ${error}`);
  }
}

/**
 * Get subscription details
 */
export async function getPayPalSubscription(subscriptionId: string) {
  const token = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error(`PayPal subscription fetch failed: ${response.status}`);
  }

  return response.json();
}

export const SUBSCRIPTION_PLANS = {
  pro: {
    name: "Pro",
    price: 19,
    listings: 50,
    planId: process.env.PAYPAL_PRO_PLAN_ID || "",
  },
  business: {
    name: "Business",
    price: 39,
    listings: "Unlimited",
    planId: process.env.PAYPAL_BUSINESS_PLAN_ID || "",
  },
} as const;
