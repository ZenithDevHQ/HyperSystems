import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PluginHeader } from "@/components/plugins/PluginHeader";
import { Card } from "@/components/ui";
import { getPlugin } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "Ecotale",
  description:
    "A complete server economy suite for Hytale with persistent storage, HUD balance display, admin panels, and modular addons.",
};

export default function EcotalePage() {
  const plugin = getPlugin("ecotale");

  if (!plugin) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PluginHeader plugin={plugin} />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-hs-text">Features</h2>
            <p className="mt-2 text-hs-text-muted">
              Everything you need for a thriving server economy.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plugin.features.map((feature) => (
                <Card key={feature} className="group">
                  <h3 className="font-semibold text-hs-text">{feature}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
