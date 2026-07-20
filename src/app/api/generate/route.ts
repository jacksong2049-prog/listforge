import { NextRequest, NextResponse } from "next/server";
import { generateListing, PLATFORM_NAMES, LANGUAGE_NAMES } from "@/lib/ai";
import { callAIStructured, type AIProvider } from "@/lib/ai-providers";
import type { ListingOutput, Platform, Language } from "@/lib/ai";

/**
 * POST /api/generate
 *
 * Generate an AI-optimized product listing.
 * Uses real AI when API keys are set, falls back to demo mode.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.productName || !body.platform) {
      return NextResponse.json(
        { error: "productName and platform are required" },
        { status: 400 }
      );
    }

    const validPlatforms = ["amazon", "shopify", "etsy", "ebay"];
    if (!validPlatforms.includes(body.platform)) {
      return NextResponse.json(
        { error: `Invalid platform. Must be one of: ${validPlatforms.join(", ")}` },
        { status: 400 }
      );
    }

    // Try real AI first, fall back to demo
    const result = await generateWithAI({
      productName: body.productName,
      category: body.category || "",
      keyFeatures: body.keyFeatures || [],
      targetAudience: body.targetAudience || "",
      keywords: body.keywords || [],
      platform: body.platform as Platform,
      language: (body.language || "en") as Language,
      tone: (body.tone || "professional") as "professional" | "casual" | "luxury" | "technical",
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate listing" },
      { status: 500 }
    );
  }
}

/** Check if any AI provider is configured */
function hasAIProvider(): boolean {
  return !!(
    process.env.DEEPSEEK_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.ANTHROPIC_API_KEY
  );
}

/** Get the available provider */
function getProvider(): AIProvider {
  if (process.env.DEEPSEEK_API_KEY) return "deepseek";
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  return "deepseek";
}

/** Generate listing with real AI */
async function generateWithAI(input: {
  productName: string;
  category: string;
  keyFeatures: string[];
  targetAudience: string;
  keywords: string[];
  platform: Platform;
  language: Language;
  tone: "professional" | "casual" | "luxury" | "technical";
}): Promise<ListingOutput> {
  // If no AI key configured, use demo mode
  if (!hasAIProvider()) {
    console.log("[API] No AI key configured, using demo mode");
    return generateListing(input);
  }

  const provider = getProvider();
  const platformName = PLATFORM_NAMES[input.platform];
  const languageName = LANGUAGE_NAMES[input.language];
  const features = input.keyFeatures.filter((f) => f.trim()).join(", ");
  const keywords = input.keywords.filter((k) => k.trim()).join(", ");

  const systemPrompt = `You are an expert ecommerce listing optimizer. You create high-converting product listings for ${platformName}.

Key rules:
- Title: ${input.platform === "amazon" ? "Max 200 characters, front-load primary keywords" : input.platform === "shopify" ? "Max 70 characters, brand-focused" : input.platform === "etsy" ? "Max 140 characters, warm and personal" : "Max 80 characters, keyword-dense"}
- Bullet points: ${input.platform === "amazon" ? "5 bullet points, each 150-250 characters, keyword-rich" : input.platform === "shopify" ? "4 bullet points, benefit-focused" : input.platform === "etsy" ? "3 bullet points, story-driven" : "5 bullet points, feature-heavy"}
- Description: ${input.platform === "etsy" ? "Story-driven, warm tone, 300+ words" : "Professional, SEO-optimized, 500+ characters"}
- Tone: ${input.tone}
- Language: ${languageName}
- Include a quality score (0-100) and 2-3 specific improvement suggestions.

Return ONLY valid JSON — no markdown, no explanation.`;

  const userPrompt = `Generate a ${platformName} product listing in ${languageName} with ${input.tone} tone.

Product: ${input.productName}
Category: ${input.category || "General"}
Key Features: ${features || "High-quality product"}
Target Audience: ${input.targetAudience || "General consumers"}
Keywords: ${keywords || input.productName}

Return this exact JSON structure:
{
  "title": "the optimized title",
  "bulletPoints": ["bullet 1", "bullet 2", ...],
  "description": "full product description",
  "searchTerms": ["keyword1", "keyword2", ...],
  "score": 85,
  "suggestions": ["suggestion 1", "suggestion 2"]
}`;

  try {
    console.log(`[API] Calling ${provider} for ${input.platform} listing...`);
    const aiResult = await callAIStructured<ListingOutput>(systemPrompt, userPrompt, {
      provider,
      temperature: 0.7,
      maxTokens: 2000,
    });

    console.log(`[API] ${provider} responded, score: ${aiResult.score}`);
    return aiResult;
  } catch (error) {
    console.error(`[API] ${provider} call failed, falling back to demo:`, error);
    return generateListing(input);
  }
}
