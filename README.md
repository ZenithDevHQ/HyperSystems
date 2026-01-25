# HyperSystems Website

The official marketing website for **HyperSystems** - a modular plugin suite for Hytale servers.

**Live Site:** [hypersystems.dev](https://hypersystems.dev) (when deployed)

## Overview

HyperSystems offers lightweight, focused, a-la-carte plugins with the philosophy of **"Only what you need."** This website showcases the plugin suite and provides documentation for each plugin.

## Features

- **Plugin Showcase** - Overview of all HyperSystems plugins
- **Plugin Pages** - Detailed feature lists, commands, and resources for each plugin
- **Wiki System** - MDX-based documentation with sidebar navigation
- **Responsive Design** - Mobile-friendly with dark theme

## Plugins

| Plugin | Status | Description |
|--------|--------|-------------|
| [HyperPerms](https://www.hyperperms.com/) | Stable | Modern permissions system with web editor |
| HyperHomes | Stable | GUI-based home management with sharing |
| HyperFactions | Beta | Faction management with territories & diplomacy |
| HyperWarps | Coming Soon | TPA, spawns, warps, and location history |
| HyperKits | Planned | Kit management with cooldowns and GUIs |

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript / React 19
- **Styling:** Tailwind CSS 4
- **Content:** MDX with next-mdx-remote
- **Icons:** Lucide React
- **Fonts:** Inter, JetBrains Mono

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── plugins/           # Plugin pages and wiki routes
│   └── ...
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── landing/           # Homepage sections
│   ├── plugins/           # Plugin-specific components
│   ├── wiki/              # Wiki documentation components
│   └── ui/                # Reusable UI components
└── lib/                   # Utilities and data

content/
└── wiki/                  # MDX wiki content by plugin
```

## Wiki System

Documentation is written in MDX and located in `content/wiki/[plugin]/`. The wiki supports:

- Custom components (InfoBox, CommandBlock, PermissionTable, CodeBlock)
- Sidebar navigation with collapsible sections
- Breadcrumb navigation
- Previous/Next page links
- Mobile-responsive sidebar

### Wiki URLs

- `/plugins/hyperfactions/wiki` - Wiki home
- `/plugins/hyperfactions/wiki/commands/basic` - Specific page

## Deployment

The site is configured for Vercel deployment. Push to `main` triggers automatic deployment.

## Related Repositories

- [HyperPerms](https://github.com/HyperSystemsDev/HyperPerms)
- [HyperHomes](https://github.com/HyperSystemsDev/HyperHomes)
- [HyperFactions](https://github.com/HyperSystemsDev/HyperFactions)

## Community

- **Discord:** [discord.gg/SNPjyfkYPc](https://discord.gg/SNPjyfkYPc)
- **GitHub:** [github.com/HyperSystemsDev](https://github.com/HyperSystemsDev)

## License

MIT
