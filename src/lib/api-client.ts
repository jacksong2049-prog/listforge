/**
 * Client-side API wrapper
 *
 * Handles API calls to our backend routes.
 * Falls back to demo mode when API is unavailable (for local dev without API keys).
 */

import type { ListingInput, ListingOutput, Platform, Language } from "@/lib/ai";

const API_BASE = "/api";

interface GenerateResponse {
  success: boolean;
  data?: ListingOutput;
  error?: string;
}

/** Generate a listing via API, falls back to demo if API unavailable */
export async function generateListingAPI(
  input: ListingInput
): Promise<ListingOutput> {
  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: GenerateResponse = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.error || "Unknown error");
    }

    return data.data;
  } catch (error) {
    console.warn("API call failed, falling back to demo mode:", error);
    // Dynamic import of demo logic (only runs on client)
    const { generateListing } = await import("@/lib/ai");
    return generateListing(input);
  }
}

/** Analyze a competitor listing by ASIN or URL */
export async function analyzeCompetitor(
  asinOrUrl: string,
  platform: Platform
): Promise<{
  title: string;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}> {
  try {
    const response = await fetch(`${API_BASE}/competitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asinOrUrl, platform }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.warn("Competitor analysis API failed, using demo:", error);
    // Demo fallback
    return {
      title: `Competitor Product - ${asinOrUrl}`,
      keywords: ["premium quality", "fast shipping", "best seller", "top rated", "affordable"],
      strengths: [
        "Strong keyword placement in title",
        "Detailed bullet points with measurements",
        "High-quality lifestyle images",
      ],
      weaknesses: [
        "Missing backend search terms optimization",
        "Description too short for SEO (under 300 words)",
        "No A+ Content / Enhanced Brand Content",
        "Limited customer review responses",
      ],
      suggestions: [
        `Add more long-tail keywords to the backend search terms field`,
        `Expand description to 500+ words with keyword-rich paragraphs`,
        `Create A+ Content module with comparison chart and lifestyle images`,
        `Respond to top 10 customer questions in the description`,
      ],
    };
  }
}

/** Save a listing (requires auth - demo mode uses localStorage) */
export function saveListing(listing: {
  input: ListingInput;
  output: ListingOutput;
  createdAt: string;
}): void {
  if (typeof window === "undefined") return;

  try {
    const saved = getSavedListings();
    saved.unshift(listing);
    // Keep only last 20
    localStorage.setItem("listforge_listings", JSON.stringify(saved.slice(0, 20)));
  } catch {
    // localStorage not available
  }
}

/** Get saved listings from localStorage */
export function getSavedListings(): Array<{
  input: ListingInput;
  output: ListingOutput;
  createdAt: string;
}> {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem("listforge_listings");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Delete a saved listing */
export function deleteSavedListing(index: number): void {
  if (typeof window === "undefined") return;

  try {
    const saved = getSavedListings();
    saved.splice(index, 1);
    localStorage.setItem("listforge_listings", JSON.stringify(saved));
  } catch {
    // localStorage not available
  }
}

/** Check if user has exceeded free tier limit (in-memory for demo, DB in production) */
export function checkUsageLimit(): { allowed: boolean; used: number; limit: number } {
  if (typeof window === "undefined") return { allowed: true, used: 0, limit: 3 };

  try {
    const today = new Date().toISOString().split("T")[0];
    const usageKey = `listforge_usage_${today}`;
    const used = parseInt(localStorage.getItem(usageKey) || "0", 10);
    return { allowed: used < 3, used, limit: 3 };
  } catch {
    return { allowed: true, used: 0, limit: 3 };
  }
}

/** Increment usage counter */
export function incrementUsage(): void {
  if (typeof window === "undefined") return;

  try {
    const today = new Date().toISOString().split("T")[0];
    const usageKey = `listforge_usage_${today}`;
    const used = parseInt(localStorage.getItem(usageKey) || "0", 10);
    localStorage.setItem(usageKey, String(used + 1));
  } catch {
    // localStorage not available
  }
}
