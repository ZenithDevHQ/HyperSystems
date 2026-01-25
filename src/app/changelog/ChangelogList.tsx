"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Tag, Calendar, ExternalLink } from "lucide-react";
import { Badge, PluginIcon } from "@/components/ui";
import { plugins } from "@/lib/plugins";
import type { GitHubRelease } from "@/lib/github";

type ReleaseWithPlugin = GitHubRelease & { pluginId: string; pluginName: string };

interface ChangelogListProps {
  releases: ReleaseWithPlugin[];
}

const pluginIconNames: Record<string, "Shield" | "Home" | "MapPin" | "Swords"> = {
  hyperperms: "Shield",
  hyperhomes: "Home",
  hyperwarps: "MapPin",
  hyperfactions: "Swords",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function truncateBody(body: string, maxLength: number = 200): string {
  if (!body) return "";
  const cleaned = body.replace(/#{1,6}\s/g, "").replace(/\*\*/g, "").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength) + "...";
}

export function ChangelogList({ releases }: ChangelogListProps) {
  const [filter, setFilter] = useState<string>("all");

  const pluginFilters = [
    { id: "all", label: "All Plugins" },
    ...plugins
      .filter((p) => p.status !== "planned" && p.status !== "coming-soon")
      .map((p) => ({ id: p.id, label: p.name })),
  ];

  const filteredReleases = filter === "all"
    ? releases
    : releases.filter((r) => r.pluginId === filter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {pluginFilters.map((pf) => (
          <button
            key={pf.id}
            onClick={() => setFilter(pf.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === pf.id
                ? "bg-hs-primary text-hs-bg"
                : "bg-hs-surface text-hs-text-muted hover:bg-hs-surface-2 hover:text-hs-text"
            }`}
          >
            {pf.label}
          </button>
        ))}
      </div>

      {/* Release List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredReleases.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-hs-border bg-hs-surface p-8 text-center"
            >
              <p className="text-hs-text-muted">No releases found for this filter.</p>
            </motion.div>
          ) : (
            filteredReleases.map((release, index) => (
              <motion.article
                key={`${release.pluginId}-${release.tagName}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group rounded-xl border border-hs-border bg-hs-surface p-6 transition-colors hover:border-hs-primary/50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:block">
                      <PluginIcon
                        name={pluginIconNames[release.pluginId] || "Shield"}
                        className="h-10 w-10 text-hs-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{release.pluginName}</Badge>
                        <div className="flex items-center gap-1 text-hs-primary">
                          <Tag className="h-4 w-4" />
                          <span className="font-mono text-sm font-semibold">
                            {release.tagName}
                          </span>
                        </div>
                      </div>
                      <h2 className="mb-2 text-lg font-semibold text-hs-text">
                        {release.name}
                      </h2>
                      {release.body && (
                        <p className="text-sm text-hs-text-muted">
                          {truncateBody(release.body)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <div className="flex items-center gap-1.5 text-sm text-hs-text-muted">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={release.publishedAt}>
                        {formatDate(release.publishedAt)}
                      </time>
                    </div>
                    <Link
                      href={release.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-hs-text-muted transition-colors hover:text-hs-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on GitHub
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
