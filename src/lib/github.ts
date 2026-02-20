// GitHub API utilities with caching for HyperSystems plugins

const REPOS = {
  hyperperms: "HyperSystemsDev/HyperPerms",
  hyperfactions: "HyperSystemsDev/HyperFactions",
  ecotale: "HyperSystemsDev/Ecotale",
  werchat: "HyperSystemsDev/Werchat",
  terranova: "HyperSystemsDev/TerraNova",
} as const;

export type PluginRepoId = keyof typeof REPOS;

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
}

export interface GitHubRelease {
  tagName: string;
  name: string;
  body: string;
  publishedAt: string;
  htmlUrl: string;
  downloads: number;
}

export interface GitHubPluginStats {
  repo: string;
  stats: GitHubRepoStats | null;
  releases: GitHubRelease[];
  totalDownloads: number;
  latestVersion: string | null;
  error?: string;
}

/**
 * Get the GitHub repo path for a plugin
 */
export function getRepoPath(pluginId: string): string | null {
  return REPOS[pluginId as PluginRepoId] || null;
}

/**
 * Fetch repository stats from GitHub API
 */
async function fetchRepoStats(owner: string, repo: string): Promise<GitHubRepoStats | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: 300 }, // ISR: 5 minute cache
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} for ${owner}/${repo}`);
      return null;
    }

    const data = await response.json();
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      openIssues: data.open_issues_count || 0,
      watchers: data.watchers_count || 0,
    };
  } catch (error) {
    console.error(`Failed to fetch repo stats for ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Fetch releases from GitHub API
 */
async function fetchReleases(owner: string, repo: string): Promise<GitHubRelease[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: 300 }, // ISR: 5 minute cache
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} for ${owner}/${repo}/releases`);
      return [];
    }

    const data = await response.json();
    return data.map((release: Record<string, unknown>) => ({
      tagName: release.tag_name as string,
      name: release.name as string || release.tag_name as string,
      body: release.body as string || "",
      publishedAt: release.published_at as string,
      htmlUrl: release.html_url as string,
      downloads: Array.isArray(release.assets)
        ? release.assets.reduce(
            (sum: number, asset: { download_count?: number }) => sum + (asset.download_count || 0),
            0
          )
        : 0,
    }));
  } catch (error) {
    console.error(`Failed to fetch releases for ${owner}/${repo}:`, error);
    return [];
  }
}

/**
 * Get complete stats for a plugin
 */
export async function getPluginGitHubStats(pluginId: string): Promise<GitHubPluginStats> {
  const repoPath = getRepoPath(pluginId);

  if (!repoPath) {
    return {
      repo: pluginId,
      stats: null,
      releases: [],
      totalDownloads: 0,
      latestVersion: null,
      error: "Unknown plugin",
    };
  }

  const [owner, repo] = repoPath.split("/");
  const [stats, releases] = await Promise.all([
    fetchRepoStats(owner, repo),
    fetchReleases(owner, repo),
  ]);

  const totalDownloads = releases.reduce((sum, release) => sum + release.downloads, 0);
  const latestVersion = releases.length > 0 ? releases[0].tagName : null;

  return {
    repo: repoPath,
    stats,
    releases,
    totalDownloads,
    latestVersion,
  };
}

/**
 * Get stats for all plugins
 */
export async function getAllPluginStats(): Promise<Record<string, GitHubPluginStats>> {
  const pluginIds = Object.keys(REPOS) as PluginRepoId[];
  const statsPromises = pluginIds.map(async (id) => {
    const stats = await getPluginGitHubStats(id);
    return [id, stats] as const;
  });

  const results = await Promise.all(statsPromises);
  return Object.fromEntries(results);
}

/**
 * Get combined releases from all plugins, sorted by date
 */
export async function getAllReleases(): Promise<(GitHubRelease & { pluginId: string; pluginName: string })[]> {
  const pluginNames: Record<string, string> = {
    hyperperms: "HyperPerms",
    hyperfactions: "HyperFactions",
    ecotale: "Ecotale",
    werchat: "WerChat",
    terranova: "TerraNova",
  };

  const pluginIds = Object.keys(REPOS) as PluginRepoId[];
  const allReleases = await Promise.all(
    pluginIds.map(async (id) => {
      const { releases } = await getPluginGitHubStats(id);
      return releases.map((release) => ({
        ...release,
        pluginId: id,
        pluginName: pluginNames[id] || id,
      }));
    })
  );

  return allReleases
    .flat()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
