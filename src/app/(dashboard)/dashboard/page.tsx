"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ListingGenerator } from "@/components/dashboard/ListingGenerator";
import { CompetitorAnalysis } from "@/components/dashboard/CompetitorAnalysis";
import { SavedListings } from "@/components/dashboard/SavedListings";

const TABS = [
  { id: "generator", label: "Generator", desc: "Create new listings" },
  { id: "competitor", label: "Competitor", desc: "Analyze competitors" },
  { id: "history", label: "History", desc: "Saved listings" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("generator");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Create, analyze, and manage your product listings.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-8 bg-white rounded-xl border border-slate-200/60 p-1 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "generator" && <ListingGenerator />}
          {activeTab === "competitor" && <CompetitorAnalysis />}
          {activeTab === "history" && <SavedListings />}
        </div>
      </main>
      <Footer />
    </>
  );
}
