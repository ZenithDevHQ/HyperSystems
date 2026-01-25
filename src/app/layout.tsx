import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BackToTop, ThemeProvider } from "@/components/ui";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hypersystems.dev"),
  title: {
    default: "HyperSystems - Only What You Need",
    template: "%s | HyperSystems",
  },
  description:
    "A modular plugin suite for Hytale servers. Lightweight, focused, a-la-carte plugins that do one thing well.",
  keywords: [
    "Hytale",
    "plugins",
    "mods",
    "HyperPerms",
    "HyperHomes",
    "HyperWarps",
    "server",
    "permissions",
  ],
  authors: [{ name: "HyperSystems" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hypersystems.dev",
    siteName: "HyperSystems",
    title: "HyperSystems - Only What You Need",
    description:
      "A modular plugin suite for Hytale servers. Lightweight, focused, a-la-carte plugins.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperSystems - Only What You Need",
    description:
      "A modular plugin suite for Hytale servers. Lightweight, focused, a-la-carte plugins.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HyperSystems",
    url: "https://hypersystems.dev",
    logo: "https://hypersystems.dev/logo.webp",
    description:
      "A modular plugin suite for Hytale servers. Lightweight, focused, a-la-carte plugins that do one thing well.",
    sameAs: [
      "https://github.com/HyperSystemsDev",
      "https://discord.gg/SNPjyfkYPc",
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-hs-primary focus:px-4 focus:py-2 focus:text-hs-bg focus:outline-none"
          >
            Skip to main content
          </a>
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
