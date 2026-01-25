"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, Star, Download, ExternalLink } from "lucide-react";
import { Badge, PluginIcon, Button } from "@/components/ui";
import { plugins, type PluginStatus } from "@/lib/plugins";
import type { GitHubPluginStats } from "@/lib/github";

interface ComparisonTableProps {
  pluginStats: Record<string, GitHubPluginStats>;
}

const statusColors: Record<PluginStatus, string> = {
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

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

// Get main plugins for comparison (exclude planned)
const mainPlugins = plugins.filter((p) => p.status !== "planned");

// Define comparison features
const comparisonFeatures = [
  { key: "visualEditor", label: "Visual Web Editor", plugins: ["hyperperms"] },
  { key: "guiManagement", label: "GUI Management", plugins: ["hyperhomes", "hyperfactions"] },
  { key: "multiStorage", label: "Multiple Storage Options", plugins: ["hyperperms", "hyperhomes", "hyperfactions"] },
  { key: "hyperpermsIntegration", label: "HyperPerms Integration", plugins: ["hyperhomes", "hyperfactions"] },
  { key: "contextAware", label: "Context-Aware System", plugins: ["hyperperms"] },
  { key: "sharing", label: "Player Sharing/Invites", plugins: ["hyperhomes", "hyperfactions"] },
  { key: "teleportation", label: "Teleportation System", plugins: ["hyperhomes", "hyperfactions", "hyperwarps"] },
  { key: "diplomacy", label: "Diplomacy/Relations", plugins: ["hyperfactions"] },
  { key: "territories", label: "Territory/Claims", plugins: ["hyperfactions"] },
  { key: "chatFormatting", label: "Chat Formatting", plugins: ["hyperperms", "hyperfactions"] },
];

export function ComparisonTable({ pluginStats }: ComparisonTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="border-b border-hs-border">
            <th className="sticky left-0 bg-hs-bg px-6 py-4 text-left text-sm font-semibold text-hs-text">
              Feature
            </th>
            {mainPlugins.map((plugin) => (
              <th key={plugin.id} className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <PluginIcon name={plugin.iconName} className="h-8 w-8 text-hs-primary" />
                  <span className="font-semibold text-hs-text">{plugin.name}</span>
                  <Badge variant={statusColors[plugin.status] as "default" | "secondary" | "success" | "warning" | "danger"}>
                    {statusLabels[plugin.status]}
                  </Badge>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* GitHub Stats Row */}
          <tr className="border-b border-hs-border bg-hs-surface">
            <td className="sticky left-0 bg-hs-surface px-6 py-4 text-sm font-medium text-hs-text">
              GitHub Stats
            </td>
            {mainPlugins.map((plugin) => {
              const stats = pluginStats[plugin.id];
              return (
                <td key={plugin.id} className="px-6 py-4 text-center">
                  {stats?.stats ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1 text-hs-text-muted">
                        <Star className="h-4 w-4" />
                        <span className="text-sm">{formatNumber(stats.stats.stars)}</span>
                      </div>
                      {stats.totalDownloads > 0 && (
                        <div className="flex items-center gap-1 text-hs-text-muted">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">{formatNumber(stats.totalDownloads)}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-hs-text-muted">-</span>
                  )}
                </td>
              );
            })}
          </tr>

          {/* Feature Rows */}
          {comparisonFeatures.map((feature, index) => (
            <tr
              key={feature.key}
              className={`border-b border-hs-border ${index % 2 === 0 ? "" : "bg-hs-surface/50"}`}
            >
              <td className={`sticky left-0 px-6 py-4 text-sm text-hs-text ${index % 2 === 0 ? "bg-hs-bg" : "bg-hs-surface/50"}`}>
                {feature.label}
              </td>
              {mainPlugins.map((plugin) => (
                <td key={plugin.id} className="px-6 py-4 text-center">
                  {feature.plugins.includes(plugin.id) ? (
                    <Check className="mx-auto h-5 w-5 text-hs-success" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-hs-text-muted/50" />
                  )}
                </td>
              ))}
            </tr>
          ))}

          {/* Links Row */}
          <tr className="border-b border-hs-border bg-hs-surface">
            <td className="sticky left-0 bg-hs-surface px-6 py-4 text-sm font-medium text-hs-text">
              Links
            </td>
            {mainPlugins.map((plugin) => (
              <td key={plugin.id} className="px-6 py-4">
                <div className="flex flex-col items-center gap-2">
                  <Link href={`/plugins/${plugin.id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                  {plugin.links?.github && (
                    <Link
                      href={plugin.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-hs-text-muted hover:text-hs-text"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      GitHub
                    </Link>
                  )}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}
