import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface WikiBreadcrumbProps {
  plugin: string;
  pluginName: string;
  slug?: string[];
  pageTitle?: string;
}

export function WikiBreadcrumb({
  plugin,
  pluginName,
  slug = [],
  pageTitle,
}: WikiBreadcrumbProps) {
  const breadcrumbs = [
    { label: "Plugins", href: "/plugins" },
    { label: pluginName, href: `/plugins/${plugin}` },
    { label: "Wiki", href: `/plugins/${plugin}/wiki` },
  ];

  // Add intermediate path segments
  if (slug.length > 0) {
    let path = `/plugins/${plugin}/wiki`;
    for (let i = 0; i < slug.length - 1; i++) {
      path += `/${slug[i]}`;
      breadcrumbs.push({
        label: formatBreadcrumbLabel(slug[i]),
        href: path,
      });
    }
  }

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="text-hs-text-muted transition-colors hover:text-hs-text"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-hs-border" />
          <Link
            href={crumb.href}
            className="text-hs-text-muted transition-colors hover:text-hs-text"
          >
            {crumb.label}
          </Link>
        </span>
      ))}
      {pageTitle && (
        <span className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-hs-border" />
          <span className="text-hs-text">{pageTitle}</span>
        </span>
      )}
    </nav>
  );
}

function formatBreadcrumbLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
