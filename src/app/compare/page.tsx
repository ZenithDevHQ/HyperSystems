import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllPluginStats } from "@/lib/github";
import { ComparisonTable } from "./ComparisonTable";

export const metadata: Metadata = {
  title: "Compare Plugins",
  description: "Compare HyperSystems plugins side by side. See features, GitHub stats, and find the right plugin for your server.",
};

export const revalidate = 300; // ISR: 5 minute cache

export default async function ComparePage() {
  const pluginStats = await getAllPluginStats();

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-hs-text">
              Compare Plugins
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-hs-text-muted">
              Find the right plugin for your server. Compare features, capabilities, and GitHub stats across the HyperSystems plugin suite.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="rounded-xl border border-hs-border bg-hs-bg">
            <ComparisonTable pluginStats={pluginStats} />
          </div>

          {/* Info Note */}
          <p className="mt-8 text-center text-sm text-hs-text-muted">
            All plugins are designed to work together seamlessly. HyperHomes and HyperFactions include built-in HyperPerms integration.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
