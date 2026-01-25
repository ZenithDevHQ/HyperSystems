import type { Metadata } from "next";
import { PageLayout, PageSection } from "@/components/layout";
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
    <PageLayout
      title="All Plugins"
      description="Browse the complete HyperSystems suite. Each plugin is standalone, lightweight, and designed to do one thing exceptionally well."
    >
      {/* Released Plugins */}
      <PageSection>
        <h2 className="text-2xl font-bold text-hs-text">Available Now</h2>
        <p className="mt-2 text-hs-text-muted">
          Production-ready plugins for your server.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {stablePlugins.map((plugin, index) => (
            <PluginCard key={plugin.id} plugin={plugin} index={index} />
          ))}
        </div>
      </PageSection>

      {/* Upcoming Plugins */}
      {upcomingPlugins.length > 0 && (
        <PageSection variant="surface" border="top">
          <h2 className="text-2xl font-bold text-hs-text">Coming Soon</h2>
          <p className="mt-2 text-hs-text-muted">
            Plugins currently in development.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {upcomingPlugins.map((plugin, index) => (
              <PluginCard key={plugin.id} plugin={plugin} index={index} />
            ))}
          </div>
        </PageSection>
      )}
    </PageLayout>
  );
}
