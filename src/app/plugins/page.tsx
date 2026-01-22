import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PluginCard } from "@/components/plugins/PluginCard";
import { plugins } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "Plugins",
  description:
    "Browse the HyperSystems plugin suite. Lightweight, focused plugins for Hytale servers.",
};

export default function PluginsPage() {
  const stablePlugins = plugins.filter(
    (p) => p.status === "stable" || p.status === "beta"
  );
  const upcomingPlugins = plugins.filter(
    (p) => p.status === "coming-soon" || p.status === "planned"
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header */}
        <section className="border-b border-hs-border bg-hs-bg py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-hs-text sm:text-4xl">
              All Plugins
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-hs-text-muted">
              Browse the complete HyperSystems suite. Each plugin is standalone,
              lightweight, and designed to do one thing exceptionally well.
            </p>
          </div>
        </section>

        {/* Released Plugins */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Available Now</h2>
            <p className="mt-2 text-hs-text-muted">
              Production-ready plugins for your server.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {stablePlugins.map((plugin, index) => (
                <PluginCard key={plugin.id} plugin={plugin} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Plugins */}
        {upcomingPlugins.length > 0 && (
          <section className="border-t border-hs-border bg-hs-surface py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-hs-text">Coming Soon</h2>
              <p className="mt-2 text-hs-text-muted">
                Plugins currently in development.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {upcomingPlugins.map((plugin, index) => (
                  <PluginCard key={plugin.id} plugin={plugin} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
