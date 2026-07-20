/**
 * Create PayPal subscription plans via API
 *
 * Usage:
 *   node scripts/create-paypal-plans.js YOUR_CLIENT_ID YOUR_CLIENT_SECRET
 */

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Usage: node scripts/create-paypal-plans.js CLIENT_ID CLIENT_SECRET");
  process.exit(1);
}

const API_BASE = "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function createProduct(token) {
  const res = await fetch(`${API_BASE}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `listforge-product-${Date.now()}`,
    },
    body: JSON.stringify({
      name: "ListForge Subscription",
      type: "SERVICE",
      category: "SOFTWARE",
      description: "AI-powered ecommerce listing optimization tool",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Product creation failed: ${JSON.stringify(data)}`);
  return data.id;
}

async function createPlan(token, productId, name, price, description) {
  const res = await fetch(`${API_BASE}/v1/billing/plans`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `listforge-plan-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    },
    body: JSON.stringify({
      product_id: productId,
      name,
      description,
      status: "ACTIVE",
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0, // 0 = infinite
          pricing_scheme: {
            fixed_price: { value: String(price), currency_code: "USD" },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: { value: "0", currency_code: "USD" },
        setup_fee_failure_action: "CANCEL",
        payment_failure_threshold: 3,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error(`Plan creation failed: ${JSON.stringify(data, null, 2)}`);
    throw new Error(`Failed to create plan "${name}"`);
  }
  return data;
}

async function main() {
  console.log("🔑 Getting access token...");
  const token = await getAccessToken();
  console.log("✅ Authenticated\n");

  console.log("📦 Creating product...");
  const productId = await createProduct(token);
  console.log(`✅ Product ID: ${productId}\n`);

  console.log("📦 Creating Pro plan ($19/month)...");
  const proPlan = await createPlan(
    token, productId,
    "ListForge Pro Monthly",
    19,
    "50 listings/month, all platforms, 12+ languages, competitor analysis, priority support"
  );
  console.log(`✅ Pro Plan ID: ${proPlan.id}`);

  console.log("\n📦 Creating Business plan ($39/month)...");
  const bizPlan = await createPlan(
    token, productId,
    "ListForge Business Monthly",
    39,
    "Unlimited listings, bulk CSV import, API access, team accounts, dedicated support"
  );
  console.log(`✅ Business Plan ID: ${bizPlan.id}`);

  console.log("\n===== ADD THESE TO VERCEL ENV VARS =====");
  console.log(`PAYPAL_PRO_PLAN_ID=${proPlan.id}`);
  console.log(`PAYPAL_BUSINESS_PLAN_ID=${bizPlan.id}`);
  console.log("==========================================\n");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
