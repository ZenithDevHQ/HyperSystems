"use client";

import { motion } from "framer-motion";
import { PluginCard } from "@/components/plugins/PluginCard";
import { plugins } from "@/lib/plugins";

export function PluginShowcase() {
  return (
    <section className="border-t border-hs-border bg-hs-bg py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-hs-text sm:text-4xl">
            The HyperSystems Suite
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-hs-text-muted">
            Pick what you need. Each plugin is standalone, lightweight, and
            designed to integrate seamlessly with others.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {plugins.map((plugin, index) => (
            <PluginCard key={plugin.id} plugin={plugin} index={index} maxFeatures={3} />
          ))}
        </div>
      </div>
    </section>
  );
}
