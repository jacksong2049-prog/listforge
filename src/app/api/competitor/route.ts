import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/competitor
 *
 * Analyze a competitor's listing by ASIN or URL.
 * In production: scrape the competitor page and use AI to analyze.
 * Demo mode returns sample analysis.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { asinOrUrl, platform } = body;

    if (!asinOrUrl || !platform) {
      return NextResponse.json(
        { error: "asinOrUrl and platform are required" },
        { status: 400 }
      );
    }

    // Demo analysis — replace with real scraping + AI analysis in production
    const analysis = generateDemoAnalysis(asinOrUrl, platform);

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("Competitor analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze competitor" },
      { status: 500 }
    );
  }
}

function generateDemoAnalysis(asinOrUrl: string, platform: string) {
  const platformName =
    platform === "amazon" ? "Amazon" :
    platform === "shopify" ? "Shopify" :
    platform === "etsy" ? "Etsy" : "eBay";

  return {
    title: `Competitor Product on ${platformName} — ${asinOrUrl}`,
    keywords: [
      "premium quality",
      "fast shipping",
      "best seller",
      "top rated 2026",
      "professional grade",
      "money back guarantee",
      "free shipping",
      "limited stock",
    ],
    strengths: [
      "Strong keyword placement in title — primary keyword in first 5 words",
      "Detailed bullet points with specifications and measurements",
      "High-quality main image on white background (meets platform guidelines)",
      "Competitive pricing within category range",
      "Active Q&A section with seller responses",
    ],
    weaknesses: [
      "Missing backend search terms optimization — not fully utilizing keyword field",
      "Product description under 300 words — insufficient for SEO depth",
      "No A+ Content / Enhanced Brand Content module",
      "Only 4 out of 7 image slots used — missing lifestyle and infographic images",
      "Review response rate below 50% — missed trust-building opportunity",
    ],
    suggestions: [
      "Add long-tail keyword variations to backend search terms (use all 249 bytes)",
      "Expand product description to 500+ words with keyword-rich paragraphs that answer common customer questions",
      "Create A+ Content / EBC module with comparison chart, size guide, and lifestyle photography",
      "Fill all 7 image slots: main + lifestyle + infographic + size chart + packaging + video thumbnail + comparison",
      "Respond to all negative reviews within 24 hours with solutions, not excuses",
      "Add video content — listings with video convert 3.6x higher on average",
    ],
  };
}
