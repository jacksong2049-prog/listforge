"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { type Platform, PLATFORM_NAMES } from "@/lib/ai";
import { analyzeCompetitor } from "@/lib/api-client";

interface AnalysisResult {
  title: string;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export function CompetitorAnalysis() {
  const [asinUrl, setAsinUrl] = useState("");
  const [platform, setPlatform] = useState<Platform>("amazon");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!asinUrl.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeCompetitor(asinUrl.trim(), platform);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }, [asinUrl, platform]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-5">
          <h2 className="font-bold text-lg text-slate-800">Analyze a Competitor Listing</h2>
          <p className="text-sm text-slate-500">
            Enter a competitor&apos;s ASIN (Amazon) or product URL to see their keyword strategy, strengths,
            weaknesses, and opportunities.
          </p>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Competitor ASIN or URL *
            </label>
            <input
              type="text"
              value={asinUrl}
              onChange={(e) => setAsinUrl(e.target.value)}
              placeholder="e.g. B0EXAMPLE or https://amazon.com/dp/B0EXAMPLE"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
            >
              {(Object.keys(PLATFORM_NAMES) as Platform[]).map((p) => (
                <option key={p} value={p}>{PLATFORM_NAMES[p]}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleAnalyze}
            disabled={!asinUrl.trim() || loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              "Analyze Competitor"
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      <div>
        {!result && !loading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-slate-400 p-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="font-medium">Competitor insights will appear here</p>
              <p className="text-sm mt-1">Enter a competitor&apos;s ASIN or URL to start</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-12">
              <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Scanning competitor listing...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-fade-in">
            {/* Product Title */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Product</h3>
              <p className="text-slate-800 font-medium">{result.title}</p>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">
                Keywords Detected ({result.keywords.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700 font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white rounded-2xl border border-green-200/60 p-6">
              <h3 className="text-xs font-semibold text-green-600 uppercase mb-3">
                Strengths ({result.strengths.length})
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-white rounded-2xl border border-red-200/60 p-6">
              <h3 className="text-xs font-semibold text-red-600 uppercase mb-3">
                Weaknesses ({result.weaknesses.length})
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-red-500 mt-0.5">✗</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl border border-brand-200/60 p-6">
              <h3 className="text-xs font-semibold text-brand-600 uppercase mb-3">
                How to Beat Them ({result.suggestions.length})
              </h3>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-brand-500 mt-0.5 font-bold">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
