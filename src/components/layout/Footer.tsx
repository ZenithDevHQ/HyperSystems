import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";

const footerLinks = {
  plugins: [
    { href: "/plugins/hyperperms", label: "HyperPerms" },
    { href: "/plugins/hyperhomes", label: "HyperHomes" },
    { href: "/plugins/hyperwarps", label: "HyperWarps" },
  ],
  resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/download", label: "Download" },
    { href: "https://github.com/ZenithDevHQ", label: "GitHub", external: true },
  ],
  community: [
    { href: "/community", label: "Community Hub" },
    {
      href: "https://discord.gg/SNPjyfkYPc",
      label: "Discord Server",
      external: true,
    },
    {
      href: "https://github.com/ZenithDevHQ/HyperPerms/issues",
      label: "Report an Issue",
      external: true,
    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-hs-border bg-hs-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="HyperSystems"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-hs-text">
                HyperSystems
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-hs-text-muted">
              A modular plugin suite for Hytale servers. Lightweight, focused,
              a-la-carte plugins that do one thing well.
            </p>
            <div className="mt-6">
              <Link
                href="https://discord.gg/SNPjyfkYPc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4" />
                  Join Discord
                </Button>
              </Link>
            </div>
          </div>

          {/* Plugins Links */}
          <div>
            <h3 className="text-sm font-semibold text-hs-text">Plugins</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.plugins.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-hs-text-muted transition-colors hover:text-hs-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-hs-text">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-hs-text-muted transition-colors hover:text-hs-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-hs-text">Community</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-hs-text-muted transition-colors hover:text-hs-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-hs-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-hs-text-muted">
              &copy; {new Date().getFullYear()} HyperSystems. All rights
              reserved.
            </p>
            <p className="text-sm text-hs-text-muted">
              Built for{" "}
              <span className="text-hs-primary">Hytale</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
