import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllPluginStats } from "@/lib/github";
import { FeatureShowcase } from "./FeatureShowcase";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore what HyperSystems plugins can do. A modular suite of lightweight, focused plugins for Hytale servers.",
};

export const revalidate = 300; // ISR: 5 minute cache

export default async function FeaturesPage() {
  const pluginStats = await getAllPluginStats();

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-hs-text">
              What Can HyperSystems Do?
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-hs-text-muted">
              A modular plugin suite for Hytale servers. Each plugin is lightweight, focused, and designed to work seamlessly together.
            </p>
          </div>

          {/* Feature Showcase */}
          <FeatureShowcase pluginStats={pluginStats} />

          {/* Integration Note */}
          <div className="mt-16 rounded-xl border border-hs-border bg-hs-surface p-8 text-center">
            <h2 className="mb-3 text-xl font-semibold text-hs-text">
              Better Together
            </h2>
            <p className="mx-auto max-w-2xl text-hs-text-muted">
              All HyperSystems plugins are designed to integrate seamlessly. HyperHomes and HyperFactions
              include built-in HyperPerms integration, allowing for fine-grained permission control across
              your entire server ecosystem.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
