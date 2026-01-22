"use client";

import { motion } from "framer-motion";
import { HardDrive, Zap, Link2Off, RefreshCw } from "lucide-react";

const stats = [
  {
    icon: HardDrive,
    value: "< 5MB",
    label: "Plugin Size",
    description: "Minimal footprint",
  },
  {
    icon: Zap,
    value: "< 1ms",
    label: "Command Latency",
    description: "Instant response",
  },
  {
    icon: Link2Off,
    value: "Zero",
    label: "Dependencies",
    description: "Standalone by design",
  },
  {
    icon: RefreshCw,
    value: "100%",
    label: "Async Operations",
    description: "Non-blocking I/O",
  },
];

export function Stats() {
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
            Performance First
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-hs-text-muted">
            Every HyperSystems plugin is built with performance as a core requirement.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-hs-border bg-hs-surface p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-hs-surface-2">
                  <Icon className="h-6 w-6 text-hs-secondary" />
                </div>
                <div className="mt-4 text-3xl font-bold text-hs-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-hs-text">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs text-hs-text-muted">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
