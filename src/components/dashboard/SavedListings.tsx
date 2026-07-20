"use client";

import { useState, useEffect, useCallback } from "react";
import { getSavedListings, deleteSavedListing } from "@/lib/api-client";
import type { ListingInput, ListingOutput } from "@/lib/ai";

interface SavedItem {
  input: ListingInput;
  output: ListingOutput;
  createdAt: string;
}

export function SavedListings() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setItems(getSavedListings());
  }, []);

  const handleDelete = useCallback((index: number) => {
    deleteSavedListing(index);
    setItems((prev) => prev.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
  }, [expandedIndex]);

  const handleCopyAll = useCallback(async (item: SavedItem) => {
    const text = [
      `Title: ${item.output.title}`,
      "",
      "Bullet Points:",
      ...item.output.bulletPoints.map((b) => `- ${b}`),
      "",
      `Description: ${item.output.description}`,
      "",
      `Search Terms: ${item.output.searchTerms.join(", ")}`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopiedId(item.createdAt);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="font-medium text-slate-500">No saved listings yet</p>
        <p className="text-sm text-slate-400 mt-1">
          Generated listings will automatically appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        {items.length} saved listing{items.length > 1 ? "s" : ""} — auto-saved from the Generator tab
      </p>

      {items.map((item, index) => (
        <div
          key={item.createdAt}
          className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-brand-200 transition-colors"
        >
          {/* Header row */}
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`shrink-0 px-2 py-0.5 rounded-lg text-xs font-bold ${
                  item.output.score >= 80
                    ? "bg-green-50 text-green-700"
                    : item.output.score >= 60
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {item.output.score}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-slate-800 truncate">
                  {item.input.productName}
                </p>
                <p className="text-xs text-slate-400">
                  {item.input.platform.toUpperCase()} ·{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyAll(item);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600 transition-all"
              >
                {copiedId === item.createdAt ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className="px-2 py-1 rounded-lg text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                Delete
              </button>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Expanded content */}
          {expandedIndex === index && (
            <div className="border-t border-slate-100 p-4 space-y-4 bg-slate-50/50 animate-slide-down">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Title</h4>
                <p className="text-sm text-slate-700">{item.output.title}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Bullet Points</h4>
                <ul className="space-y-1">
                  {item.output.bulletPoints.map((bp, i) => (
                    <li key={i} className="text-sm text-slate-700 flex gap-2">
                      <span className="text-brand-400">•</span> {bp}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Description</h4>
                <p className="text-sm text-slate-700 whitespace-pre-line line-clamp-6">
                  {item.output.description}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
