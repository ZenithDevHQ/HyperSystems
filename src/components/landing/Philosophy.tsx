"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Feather, Target } from "lucide-react";

const pillars = [
  {
    icon: ShoppingCart,
    title: "A-La-Carte",
    description:
      "Pick only what you need. Each plugin is standalone with no forced bundles, no bloat, and no dependencies.",
  },
  {
    icon: Feather,
    title: "Lightweight",
    description:
      "Performance matters. Every plugin is optimized for minimal memory footprint, fast startup, and zero impact on your server's TPS.",
  },
  {
    icon: Target,
    title: "Focused",
    description:
      "Each plugin does one thing exceptionally well. No feature creep. Just clean, reliable functionality.",
  },
];

export function Philosophy() {
  return (
    <section className="border-t border-hs-border bg-hs-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-hs-text sm:text-4xl">
            Why HyperSystems?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-hs-text-muted">
            Built on three core principles that make server management simpler.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-hs-primary/20 to-hs-secondary/20">
                  <Icon className="h-7 w-7 text-hs-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-hs-text">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-hs-text-muted">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
