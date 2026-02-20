"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, PluginIcon, Button } from "@/components/ui";
import { plugins, type PluginStatus } from "@/lib/plugins";
import type { GitHubPluginStats } from "@/lib/github";

interface FeatureShowcaseProps {
  pluginStats: Record<string, GitHubPluginStats>;
}

const statusColors: Record<PluginStatus, "default" | "secondary" | "success" | "warning" | "danger"> = {
  stable: "success",
  beta: "warning",
  "coming-soon": "secondary",
  planned: "default",
};

const statusLabels: Record<PluginStatus, string> = {
  stable: "Stable",
  beta: "Beta",
  "coming-soon": "Coming Soon",
  planned: "Planned",
};

// Get main plugins (exclude planned)
const mainPlugins = plugins.filter((p) => p.status !== "planned");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function FeatureShowcase({ pluginStats }: FeatureShowcaseProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-2"
    >
      {mainPlugins.map((plugin) => {
        return (
          <motion.div
            key={plugin.id}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-xl border border-hs-border bg-hs-surface p-6 transition-all hover:border-hs-primary/50"
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-hs-surface-2 p-2">
                  <PluginIcon name={plugin.iconName} className="h-8 w-8 text-hs-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-hs-text">{plugin.name}</h3>
                  <p className="text-sm text-hs-text-muted">{plugin.tagline}</p>
                </div>
              </div>
              <Badge variant={statusColors[plugin.status]}>
                {statusLabels[plugin.status]}
              </Badge>
            </div>

            {/* Description */}
            <p className="mb-6 text-hs-text-muted">
              {plugin.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-medium text-hs-text">Key Features</h4>
              <ul className="grid gap-2">
                {plugin.features.slice(0, 5).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-hs-text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hs-primary" />
                    {feature}
                  </li>
                ))}
                {plugin.features.length > 5 && (
                  <li className="text-sm text-hs-text-muted">
                    + {plugin.features.length - 5} more features
                  </li>
                )}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end border-t border-hs-border pt-4">
              <Link href={`/plugins/${plugin.id}`}>
                <Button size="sm" variant="ghost" className="group/btn">
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
