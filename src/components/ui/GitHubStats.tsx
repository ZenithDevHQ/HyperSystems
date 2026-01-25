import { Star, GitFork, Download, Tag, AlertCircle } from "lucide-react";
import { getPluginGitHubStats, type GitHubPluginStats } from "@/lib/github";

interface GitHubStatsProps {
  pluginId: string;
  variant?: "compact" | "full";
  className?: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-1.5 text-hs-text-muted">
      <Icon className="h-4 w-4" />
      <span className="text-sm">
        <span className="font-medium text-hs-text">{value}</span>
        <span className="ml-1 hidden sm:inline">{label}</span>
      </span>
    </div>
  );
}

function StatsDisplay({ stats, variant }: { stats: GitHubPluginStats; variant: "compact" | "full" }) {
  if (!stats.stats && stats.releases.length === 0) {
    return (
      <div className="flex items-center gap-2 text-hs-text-muted">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">Stats unavailable</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {stats.stats && <StatItem icon={Star} label="stars" value={formatNumber(stats.stats.stars)} />}
        {stats.totalDownloads > 0 && (
          <StatItem icon={Download} label="downloads" value={formatNumber(stats.totalDownloads)} />
        )}
        {stats.latestVersion && <StatItem icon={Tag} label="" value={stats.latestVersion} />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.stats && (
        <>
          <StatItem icon={Star} label="stars" value={formatNumber(stats.stats.stars)} />
          <StatItem icon={GitFork} label="forks" value={formatNumber(stats.stats.forks)} />
        </>
      )}
      {stats.totalDownloads > 0 && (
        <StatItem icon={Download} label="downloads" value={formatNumber(stats.totalDownloads)} />
      )}
      {stats.latestVersion && <StatItem icon={Tag} label="latest" value={stats.latestVersion} />}
    </div>
  );
}

export async function GitHubStats({ pluginId, variant = "compact", className = "" }: GitHubStatsProps) {
  const stats = await getPluginGitHubStats(pluginId);

  return (
    <div className={className}>
      <StatsDisplay stats={stats} variant={variant} />
    </div>
  );
}

// Client component wrapper for use in client components
export function GitHubStatsPlaceholder({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const itemCount = variant === "compact" ? 3 : 4;
  
  return (
    <div className={`flex ${variant === "full" ? "grid-cols-4 gap-4" : "gap-4"} animate-pulse`}>
      {Array.from({ length: itemCount }).map((_, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded bg-hs-surface-2" />
          <div className="h-4 w-12 rounded bg-hs-surface-2" />
        </div>
      ))}
    </div>
  );
}
