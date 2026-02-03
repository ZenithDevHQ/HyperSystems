export interface WikiNavItem {
  title: string;
  href: string;
  items?: WikiNavItem[];
}

export interface WikiNavSection {
  title: string;
  items: WikiNavItem[];
}

// Navigation configuration for each plugin's wiki
export const wikiNavigation: Record<string, WikiNavSection[]> = {
  hyperperms: [
    {
      title: "Overview",
      items: [
        { title: "Introduction", href: "/plugins/hyperperms/wiki" },
      ],
    },
  ],
  hyperhomes: [
    {
      title: "Overview",
      items: [
        { title: "Introduction", href: "/plugins/hyperhomes/wiki" },
      ],
    },
  ],
  hyperfactions: [
    {
      title: "Getting Started",
      items: [
        { title: "Installation", href: "/plugins/hyperfactions/wiki/getting-started/installation" },
        { title: "Configuration", href: "/plugins/hyperfactions/wiki/getting-started/configuration" },
        { title: "First Setup", href: "/plugins/hyperfactions/wiki/getting-started/first-setup" },
      ],
    },
    {
      title: "Guides",
      items: [
        { title: "GUI Walkthrough", href: "/plugins/hyperfactions/wiki/guides/gui-walkthrough" },
        { title: "Starting a Faction", href: "/plugins/hyperfactions/wiki/guides/starting-faction" },
        { title: "Growing Your Faction", href: "/plugins/hyperfactions/wiki/guides/growing-your-faction" },
        { title: "Diplomacy Strategy", href: "/plugins/hyperfactions/wiki/guides/diplomacy-strategy" },
        { title: "Defending Territory", href: "/plugins/hyperfactions/wiki/guides/defending-territory" },
      ],
    },
    {
      title: "Concepts",
      items: [
        { title: "Factions", href: "/plugins/hyperfactions/wiki/concepts/factions" },
        { title: "Power System", href: "/plugins/hyperfactions/wiki/concepts/power-system" },
        { title: "Territories", href: "/plugins/hyperfactions/wiki/concepts/territories" },
        { title: "Diplomacy", href: "/plugins/hyperfactions/wiki/concepts/diplomacy" },
        { title: "Roles", href: "/plugins/hyperfactions/wiki/concepts/roles" },
        { title: "Zones", href: "/plugins/hyperfactions/wiki/concepts/zones" },
      ],
    },
    {
      title: "Commands",
      items: [
        { title: "Basic", href: "/plugins/hyperfactions/wiki/commands/basic" },
        { title: "Territory", href: "/plugins/hyperfactions/wiki/commands/territory" },
        { title: "Diplomacy", href: "/plugins/hyperfactions/wiki/commands/diplomacy" },
        { title: "Member Management", href: "/plugins/hyperfactions/wiki/commands/member-management" },
        { title: "Home & Teleport", href: "/plugins/hyperfactions/wiki/commands/home-teleport" },
        { title: "Communication", href: "/plugins/hyperfactions/wiki/commands/communication" },
        { title: "Settings", href: "/plugins/hyperfactions/wiki/commands/settings" },
        { title: "Admin", href: "/plugins/hyperfactions/wiki/commands/admin" },
      ],
    },
    {
      title: "Reference",
      items: [
        { title: "Permissions", href: "/plugins/hyperfactions/wiki/reference/permissions" },
        { title: "Configuration", href: "/plugins/hyperfactions/wiki/reference/configuration" },
      ],
    },
  ],
};

/**
 * Get navigation for a specific plugin
 */
export function getWikiNavigation(plugin: string): WikiNavSection[] {
  return wikiNavigation[plugin] || [];
}

/**
 * Find the current page in navigation and get prev/next links
 */
export function getAdjacentPages(
  plugin: string,
  currentPath: string
): { prev: WikiNavItem | null; next: WikiNavItem | null } {
  const nav = getWikiNavigation(plugin);
  const allPages: WikiNavItem[] = [];

  // Flatten navigation
  for (const section of nav) {
    for (const item of section.items) {
      allPages.push(item);
    }
  }

  const currentIndex = allPages.findIndex((page) => page.href === currentPath);

  return {
    prev: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
  };
}
