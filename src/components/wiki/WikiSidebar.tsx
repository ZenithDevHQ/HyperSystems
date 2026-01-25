"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WikiNavSection } from "@/lib/wiki-navigation";

interface WikiSidebarProps {
  plugin: string;
  pluginName: string;
  navigation: WikiNavSection[];
}

export function WikiSidebar({ plugin, pluginName, navigation }: WikiSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-hs-primary text-hs-bg shadow-lg lg:hidden"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 z-40 h-screen w-72 overflow-y-auto border-r border-hs-border bg-hs-bg pt-20 transition-transform lg:sticky lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 pb-8">
          {/* Wiki Home Link */}
          <Link
            href={`/plugins/${plugin}/wiki`}
            className={cn(
              "mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === `/plugins/${plugin}/wiki`
                ? "bg-hs-primary/10 text-hs-primary"
                : "text-hs-text-muted hover:bg-hs-surface hover:text-hs-text"
            )}
            onClick={() => setMobileOpen(false)}
          >
            <span>{pluginName} Wiki</span>
          </Link>

          {/* Navigation Sections */}
          <nav className="space-y-6">
            {navigation.map((section) => (
              <NavSection
                key={section.title}
                section={section}
                currentPath={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

interface NavSectionProps {
  section: WikiNavSection;
  currentPath: string;
  onNavigate: () => void;
}

function NavSection({ section, currentPath, onNavigate }: NavSectionProps) {
  const hasActiveItem = section.items.some((item) => currentPath === item.href);
  const [expanded, setExpanded] = useState(hasActiveItem);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-hs-text-muted hover:text-hs-text"
      >
        {section.title}
        {expanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {expanded && (
        <ul className="mt-1 space-y-1">
          {section.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                  currentPath === item.href
                    ? "bg-hs-primary/10 text-hs-primary"
                    : "text-hs-text-muted hover:bg-hs-surface hover:text-hs-text"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
