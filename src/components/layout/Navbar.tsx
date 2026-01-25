"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/plugins", label: "Plugins" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Download" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hs-border bg-hs-bg/80 backdrop-blur-lg">
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
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-hs-surface text-hs-text"
                  : "text-hs-text-muted hover:bg-hs-surface hover:text-hs-text"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="https://github.com/ZenithDevHQ"
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
          className="rounded-lg p-2 text-hs-text-muted transition-colors hover:bg-hs-surface hover:text-hs-text md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-b border-hs-border bg-hs-bg transition-all duration-200 md:hidden",
          isOpen ? "max-h-80" : "max-h-0 border-b-0"
        )}
      >
        <div className="space-y-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-hs-surface text-hs-text"
                  : "text-hs-text-muted hover:bg-hs-surface hover:text-hs-text"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3">
            <Link
              href="https://github.com/ZenithDevHQ"
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
