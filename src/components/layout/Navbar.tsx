"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/plugins", label: "Plugins" },
  { href: "/features", label: "Features" },
  { href: "/changelog", label: "Changelog" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Download" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Focus trap inside mobile panel
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-white/[0.06] bg-hs-bg/80 backdrop-blur-xl shadow-[var(--shadow-hs-sm)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.webp"
            alt="HyperSystems"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="text-lg font-semibold text-hs-text">HyperSystems</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                isActive(link.href)
                  ? "bg-white/10 text-hs-text"
                  : "text-hs-text-muted hover:bg-white/5 hover:text-hs-text"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="https://github.com/HyperSystemsDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm">
              GitHub
            </Button>
          </Link>
          <Link href="/plugins">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-hs-text-muted transition-colors hover:bg-white/5 hover:text-hs-text md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu - Slide Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Navigation menu"
        className={cn(
          "fixed right-0 top-16 z-50 h-[calc(100dvh-4rem)] w-72 border-l border-white/[0.08] bg-hs-bg/95 backdrop-blur-xl transition-transform duration-200 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col px-4 py-6">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-white/10 text-hs-text"
                    : "text-hs-text-muted hover:bg-white/5 hover:text-hs-text"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto space-y-3 border-t border-white/[0.08] pt-6">
            <Link
              href="https://github.com/HyperSystemsDev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="outline" size="sm" className="w-full">
                GitHub
              </Button>
            </Link>
            <Link href="/plugins" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
