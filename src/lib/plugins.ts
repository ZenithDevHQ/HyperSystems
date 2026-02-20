export type PluginStatus = "stable" | "beta" | "coming-soon" | "planned";
export type PluginIconName =
  | "Shield"
  | "Swords"
  | "Coins"
  | "MessageCircle"
  | "Globe";

export interface Plugin {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: PluginStatus;
  iconName: PluginIconName;
  features: string[];
  commands?: string[];
  isDesktopApp?: boolean;
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
      github: "https://github.com/HyperSystemsDev/HyperPerms",
      curseforge: "https://www.curseforge.com/hytale/mods/hyperperms",
      docs: "https://www.hyperperms.com/wiki",
    },
  },
  {
    id: "hyperfactions",
    name: "HyperFactions",
    tagline: "Forge your empire",
    description:
      "A comprehensive faction management mod with territory claims, alliances, strategic PvP, power systems, and 59 GUI pages for extensive in-game customization.",
    status: "stable",
    iconName: "Swords",
    features: [
      "Faction Management with Role Hierarchy",
      "Chunk-Based Territory System",
      "Power System for Balanced Expansion",
      "Diplomatic Relations (Allies, Enemies, Neutral)",
      "Overclaiming for Strategic Warfare",
      "Faction & Alliance Chat",
      "59 GUI Pages for Full In-Game Management",
      "Home Teleportation System",
      "Combat Tagging",
      "SafeZones & WarZones",
      "HyperPerms Integration",
    ],
    commands: ["/faction", "/f", "/hf"],
    links: {
      github: "https://github.com/HyperSystemsDev/HyperFactions",
      curseforge: "https://www.curseforge.com/hytale/mods/hyperfactions",
      docs: "/plugins/hyperfactions/wiki",
    },
  },
  {
    id: "ecotale",
    name: "Ecotale",
    tagline: "A living economy",
    description:
      "A complete server economy suite with persistent storage, HUD balance display, admin panels, and modular addons for jobs, marketplace, and physical currency.",
    status: "stable",
    iconName: "Coins",
    features: [
      "Persistent Multi-Backend Storage (H2, JSON, MySQL)",
      "Customizable HUD Balance Display",
      "Multi-Language Support (8+ languages)",
      "Admin Control Panel",
      "EcotaleJobs - Earn from mining, mobs, crafting",
      "EcotaleMarketplace - Player-driven buy/sell market",
      "EcotaleCoins - Physical currency items & banking",
    ],
    links: {
      github: "https://github.com/HyperSystemsDev/Ecotale",
      curseforge: "https://www.curseforge.com/hytale/mods/ecotale",
    },
  },
  {
    id: "werchat",
    name: "WerChat",
    tagline: "Chat, organized",
    description:
      "A flexible chat management mod with customizable channels, private messaging, and moderation tools for organized server communication.",
    status: "stable",
    iconName: "MessageCircle",
    features: [
      "Customizable Chat Channels",
      "Private Messaging",
      "Moderation Tools",
      "Channel-Based Organization",
    ],
    links: {
      github: "https://github.com/HyperSystemsDev/Werchat",
      curseforge: "https://www.curseforge.com/hytale/mods/werchat",
    },
  },
  {
    id: "terranova",
    name: "TerraNova",
    tagline: "Design worlds visually",
    description:
      "A desktop world generation studio with a visual node-based editor, live terrain previews, biome editing, and one-click server deployment.",
    status: "stable",
    iconName: "Globe",
    isDesktopApp: true,
    features: [
      "Visual Node-Based Editor",
      "Live 2D & 3D Terrain Preview",
      "Biome Editor (terrain, materials, props)",
      "10 Bundled Starting Templates",
      "Built-in Schema Validation",
      "One-Click Server Deployment",
      "Offline-First (no telemetry)",
    ],
    links: {
      github: "https://github.com/HyperSystemsDev/TerraNova",
    },
  },
];

export function getPlugin(id: string): Plugin | undefined {
  return plugins.find((p) => p.id === id);
}

export function getPluginsByStatus(status: PluginStatus): Plugin[] {
  return plugins.filter((p) => p.status === status);
}
