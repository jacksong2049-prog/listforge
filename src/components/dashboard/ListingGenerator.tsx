"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import {
  type Platform,
  type Language,
  type ListingInput,
  type ListingOutput,
  PLATFORM_NAMES,
} from "@/lib/ai";
import { generateListingAPI, saveListing, checkUsageLimit, incrementUsage } from "@/lib/api-client";

const PLATFORMS: Platform[] = ["amazon", "shopify", "etsy", "ebay"];
const LANGUAGES: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "zh", name: "中文" },
  { code: "ko", name: "한국어" },
  { code: "it", name: "Italiano" },
];
const TONES = ["professional", "casual", "luxury", "technical"] as const;

export function ListingGenerator() {
  const [input, setInput] = useState<ListingInput>({
    productName: "",
    category: "",
    keyFeatures: [""],
    targetAudience: "",
    keywords: [""],
    platform: "amazon",
    language: "en",
    tone: "professional",
  });
  const [result, setResult] = useState<ListingOutput | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const updateField = useCallback(
    <K extends keyof ListingInput>(field: K, value: ListingInput[K]) => {
      setInput((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateArrayField = useCallback(
    (field: "keyFeatures" | "keywords", index: number, value: string) => {
      setInput((prev) => {
        const arr = [...prev[field]];
        arr[index] = value;
        return { ...prev, [field]: arr };
      });
    },
    []
  );

  const addArrayItem = useCallback(
    (field: "keyFeatures" | "keywords") => {
      setInput((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    },
    []
  );

  const removeArrayItem = useCallback(
    (field: "keyFeatures" | "keywords", index: number) => {
      setInput((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    },
    []
  );

  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState(() => checkUsageLimit());

  const handleGenerate = useCallback(async () => {
    if (!input.productName.trim()) return;

    // Check free tier limit
    const limit = checkUsageLimit();
    setUsage(limit);
    if (!limit.allowed) {
      setError(`You've used ${limit.used}/${limit.limit} free listings today. Upgrade to Pro for unlimited.`);
      return;
    }

    setError(null);
    setGenerating(true);
    setResult(null);

    try {
      const output = await generateListingAPI(input);
      setResult(output);
      incrementUsage();
      setUsage({ allowed: limit.used + 1 < limit.limit, used: limit.used + 1, limit: limit.limit });
      // Auto-save to history
      saveListing({
        input,
        output,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate listing. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [input]);

  const handleCopy = useCallback(
    async (label: string, text: string) => {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    },
    []
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Great";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-5">
          <h2 className="font-bold text-lg text-slate-800">Product Details</h2>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              value={input.productName}
              onChange={(e) => updateField("productName", e.target.value)}
              placeholder="e.g. Wireless Bluetooth Headphones"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Category
            </label>
            <input
              type="text"
              value={input.category}
              onChange={(e) => updateField("category", e.target.value)}
              placeholder="e.g. Electronics > Headphones"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
            />
          </div>

          {/* Key Features */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Key Features
            </label>
            <div className="space-y-2">
              {input.keyFeatures.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => updateArrayField("keyFeatures", i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  />
                  {input.keyFeatures.length > 1 && (
                    <button
                      onClick={() => removeArrayItem("keyFeatures", i)}
                      className="px-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => addArrayItem("keyFeatures")}
              className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              + Add feature
            </button>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Target Keywords
            </label>
            <div className="space-y-2">
              {input.keywords.map((kw, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={kw}
                    onChange={(e) => updateArrayField("keywords", i, e.target.value)}
                    placeholder={`Keyword ${i + 1}`}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  />
                  {input.keywords.length > 1 && (
                    <button
                      onClick={() => removeArrayItem("keywords", i)}
                      className="px-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => addArrayItem("keywords")}
              className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              + Add keyword
            </button>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={input.targetAudience}
              onChange={(e) => updateField("targetAudience", e.target.value)}
              placeholder="e.g. Fitness enthusiasts, remote workers"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
            />
          </div>

          {/* Platform + Tone + Language */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Platform
              </label>
              <select
                value={input.platform}
                onChange={(e) => updateField("platform", e.target.value as Platform)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {PLATFORM_NAMES[p]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Language
              </label>
              <select
                value={input.language}
                onChange={(e) => updateField("language", e.target.value as Language)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tone
            </label>
            <div className="flex gap-2 flex-wrap">
              {TONES.map((tone) => (
                <button
                  key={tone}
                  onClick={() => updateField("tone", tone)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all capitalize ${
                    input.tone === tone
                      ? "bg-brand-50 text-brand-700 border-brand-300"
                      : "bg-white text-slate-600 border-slate-200 hover:border-brand-200"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Usage indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {usage.used}/{usage.limit} free listings used today
            </span>
            <span className={usage.allowed ? "text-green-500" : "text-red-500"}>
              {usage.allowed ? `${usage.limit - usage.used} remaining` : "Limit reached"}
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
              {!usage.allowed && (
                <a href="/pricing" className="ml-2 underline font-medium hover:text-red-800">
                  Upgrade →
                </a>
              )}
            </div>
          )}

          {/* Generate Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            disabled={!input.productName.trim() || generating}
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Listing"
            )}
          </Button>
        </div>
      </div>

      {/* Result Panel */}
      <div>
        {!result && !generating && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-slate-400 p-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-medium">Your listing will appear here</p>
              <p className="text-sm mt-1">Fill in the form and click Generate</p>
            </div>
          </div>
        )}

        {generating && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-12">
              <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-medium">AI is crafting your listing...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-fade-in">
            {/* Score Card */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">Listing Quality Score</h3>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getScoreColor(result.score)}`}>
                  {result.score}/100 — {getScoreLabel(result.score)}
                </span>
              </div>
              {/* Score bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    result.score >= 80 ? "bg-green-500" : result.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Suggestions</p>
                  {result.suggestions.map((s, i) => (
                    <p key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-brand-500 mt-0.5">•</span>
                      {s}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">Title</h3>
                <button
                  onClick={() => handleCopy("title", result.title)}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  {copied === "title" ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed">{result.title}</p>
            </div>

            {/* Bullet Points */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">Bullet Points</h3>
                <button
                  onClick={() => handleCopy("bullets", result.bulletPoints.join("\n"))}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  {copied === "bullets" ? "Copied!" : "Copy All"}
                </button>
              </div>
              <ul className="space-y-2">
                {result.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-brand-500 font-bold mt-0.5">•</span>
                    {bp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">Description</h3>
                <button
                  onClick={() => handleCopy("desc", result.description)}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  {copied === "desc" ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {result.description}
              </p>
            </div>

            {/* Search Terms */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <h3 className="font-bold text-slate-800 mb-2">Backend Search Terms</h3>
              <div className="flex flex-wrap gap-2">
                {result.searchTerms.map((term, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
