# HyperSystems Marketing Website

## Git & Deployment

**Repository:** https://github.com/ZenithDevHQ/HyperSystems.git

### Commit Guidelines
- **Never mention Claude, AI, or any AI assistant in commits or documentation**
- Do not use `Co-Authored-By` lines referencing AI
- Commit and push as **ZenithDevHQ** organization
- Keep commit messages clean and professional

### Deployment
- Hosted on Vercel (auto-deploys from `main` branch)
- Push to `main` triggers production deployment

---

## Overview

Marketing website for **HyperSystems** - a modular plugin suite for Hytale servers. The site showcases the brand philosophy of lightweight, focused, a-la-carte plugins with the tagline **"Only what you need."**

## Tech Stack

- **Framework:** Next.js 16+ with App Router
- **Language:** TypeScript with React 19
- **Styling:** Tailwind CSS 4 (CSS `@theme` blocks)
- **Animations:** Framer Motion (subtle, not heavy)
- **Icons:** Lucide React
- **Fonts:** Inter (body), JetBrains Mono (code)

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout (fonts, metadata, dark mode)
│   ├── globals.css          # Tailwind theme with hs-* colors
│   ├── page.tsx             # Landing page
│   ├── plugins/
│   │   ├── page.tsx         # All plugins overview
│   │   ├── hyperperms/      # HyperPerms detail (RELEASED)
│   │   ├── hyperhomes/      # HyperHomes detail (COMPLETE)
│   │   └── hyperwarps/      # HyperWarps detail (COMING SOON)
│   ├── docs/page.tsx        # Documentation hub
│   ├── download/page.tsx    # Download/installation guide
│   └── community/page.tsx   # Discord, GitHub links
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky header, mobile menu
│   │   └── Footer.tsx       # Multi-column links
│   ├── landing/
│   │   ├── Hero.tsx         # Main headline
│   │   ├── PluginShowcase.tsx
│   │   ├── Philosophy.tsx
│   │   ├── Stats.tsx
│   │   └── CTA.tsx
│   ├── plugins/
│   │   ├── PluginCard.tsx
│   │   └── PluginHeader.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── index.ts
└── lib/
    ├── utils.ts             # cn() utility
    └── plugins.ts           # Plugin data definitions
```

## Color System

All colors use the `hs-*` prefix (HyperSystems) to distinguish from other projects:

```css
@theme {
  /* Primary Actions - Amber */
  --color-hs-primary: #F59E0B;
  --color-hs-primary-dark: #D97706;

  /* Secondary/Success - Green */
  --color-hs-secondary: #22C55E;
  --color-hs-secondary-dark: #16A34A;
  --color-hs-accent: #15803D;

  /* Dark Theme */
  --color-hs-bg: #0A0A0A;
  --color-hs-surface: #171717;
  --color-hs-surface-2: #262626;
  --color-hs-border: #404040;
  --color-hs-text: #FAFAFA;
  --color-hs-text-muted: #A3A3A3;
}
```

Usage: `bg-hs-surface`, `text-hs-primary`, `border-hs-border`, etc.

## Component Patterns

### Button Variants
- `primary` - Amber background, dark text (main CTAs)
- `secondary` - Green background, dark text
- `outline` - Transparent with border
- `ghost` - Transparent, no border

### Badge Variants
- `stable` - Green (released plugins)
- `beta` - Amber (testing phase)
- `coming-soon` - Gray (in development)
- `planned` - Darker gray (future)

## Adding a New Plugin

1. Add plugin data to `src/lib/plugins.ts`
2. Create page at `src/app/plugins/[plugin-id]/page.tsx`
3. Use `PluginHeader` component for consistent hero
4. Add to navigation if needed

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## Deployment

Configured for Vercel deployment. Push to main branch triggers automatic deployment.

## Related Projects

- [HyperPerms](https://www.hyperperms.com/) - Permissions plugin
- [HyperPerms-Web](../HyperPerms-Web/) - HyperPerms marketing site (reference for patterns)
