export type PluginStatus = "stable" | "beta" | "coming-soon" | "planned";
export type PluginIconName = "Shield" | "Home" | "MapPin" | "Package";

export interface Plugin {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: PluginStatus;
  iconName: PluginIconName;
  features: string[];
  commands?: string[];
  links?: {
    website?: string;
    github?: string;
    curseforge?: string;
    docs?: string;
  };
}

export const plugins: Plugin[] = [
  {
    id: "hyperperms",
    name: "HyperPerms",
    tagline: "Permissions, simplified",
    description:
      "A modern permissions system with a visual web editor, context-aware permissions, and seamless group inheritance.",
    status: "stable",
    iconName: "Shield",
    features: [
      "Visual Web Editor",
      "Context-Aware Permissions (per-world, region, biome, gamemode, time)",
      "Group Inheritance with Weight Priority",
      "Timed/Temporary Permissions",
      "Promotion Tracks (promote/demote paths)",
      "High-Performance LRU Caching",
      "Multiple Storage Options (JSON, SQLite, MySQL)",
      "Chat & Tab List Formatting",
      "Automatic Backup System",
    ],
    links: {
      website: "https://www.hyperperms.com/",
      github: "https://github.com/ZenithDevHQ/HyperPerms/releases",
      curseforge: "https://www.curseforge.com/hytale/mods/hyperperms",
      docs: "https://www.hyperperms.com/wiki",
    },
  },
  {
    id: "hyperhomes",
    name: "HyperHomes",
    tagline: "Home is one command away",
    description:
      "Complete home management with GUI support, home sharing, and cross-world teleportation.",
    status: "stable",
    iconName: "Home",
    features: [
      "Multiple Named Homes (configurable limit)",
      "Full GUI System with Pagination",
      "Home Sharing with Accept/Deny",
      "Cross-World Teleportation",
      "Warmup & Cooldown System",
      "Bed Spawn Sync (auto-creates 'bed' home)",
      "Movement/Damage Cancellation",
      "HyperPerms Integration",
      "Admin Panel",
    ],
    commands: ["/home", "/sethome", "/delhome", "/homes"],
  },
  {
    id: "hyperwarps",
    name: "HyperWarps",
    tagline: "Server-wide teleportation",
    description:
      "Complete teleportation suite with TPA, spawns, warps, and location history.",
    status: "coming-soon",
    iconName: "MapPin",
    features: [
      "TPA System (/tpa, /tpahere, /tpaccept, /tpdeny)",
      "Spawn Management (Multiple, Per-World)",
      "Warp System with Categories",
      "/back Command with Location History",
      "Admin Teleport Commands",
    ],
  },
  {
    id: "hyperkits",
    name: "HyperKits",
    tagline: "Gear up instantly",
    description:
      "Kit management system with cooldowns, first-join kits, and preview GUIs.",
    status: "planned",
    iconName: "Package",
    features: [
      "Kit Management",
      "Cooldowns",
      "First-Join Kits",
      "GUI Preview",
      "Permission-Based Access",
    ],
  },
];

export function getPlugin(id: string): Plugin | undefined {
  return plugins.find((p) => p.id === id);
}

export function getPluginsByStatus(status: PluginStatus): Plugin[] {
  return plugins.filter((p) => p.status === status);
}
