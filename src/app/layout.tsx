import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
