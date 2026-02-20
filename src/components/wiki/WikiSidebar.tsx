"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WikiNavSection } from "@/lib/wiki-navigation";
import { WikiSearch } from "./WikiSearch";

interface WikiSidebarProps {
  plugin: string;
  pluginName: string;
  navigation: WikiNavSection[];
}

export function WikiSidebar({ plugin, pluginName, navigation }: WikiSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Focus trap
  useEffect(() => {
    if (!mobileOpen || !sidebarRef.current) return;
    const sidebar = sidebarRef.current;
    const focusables = sidebar.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length > 0) focusables[0].focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Toggle Button - z-50 to sit above BackToTop's z-40 */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-hs-primary text-hs-bg shadow-[var(--shadow-hs-md)] transition-all duration-150 hover:bg-hs-primary-dark hover:shadow-[var(--shadow-hs-glow)] lg:hidden"
        aria-label={mobileOpen ? "Close wiki menu" : "Open wiki menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        role={mobileOpen ? "dialog" : undefined}
        aria-modal={mobileOpen || undefined}
        aria-label="Wiki navigation"
        className={cn(
          "fixed top-0 z-40 h-screen w-72 overflow-y-auto border-r border-white/[0.08] bg-hs-bg pt-20 transition-transform duration-200 ease-out lg:sticky lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 pb-8">
          {/* Search */}
          <div className="mb-6">
            <WikiSearch />
          </div>

          {/* Wiki Home Link */}
          <Link
            href={`/plugins/${plugin}/wiki`}
            className={cn(
              "mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
              pathname === `/plugins/${plugin}/wiki`
                ? "bg-hs-primary/10 text-hs-primary"
                : "text-hs-text-muted hover:bg-white/5 hover:text-hs-text"
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
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-hs-text-muted transition-colors duration-150 hover:text-hs-text"
        aria-expanded={expanded}
      >
        {section.title}
        {expanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <ul className="mt-1 space-y-1 overflow-hidden">
          {section.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                  currentPath === item.href
                    ? "bg-hs-primary/10 text-hs-primary"
                    : "text-hs-text-muted hover:bg-white/5 hover:text-hs-text"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
