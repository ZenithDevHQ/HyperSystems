"use client";

import { useState, useEffect } from "react";
import GithubSlugger from "github-slugger";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const slugger = new GithubSlugger();
  // Match h2 and h3 headings in MDX/markdown
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = slugger.slug(title);
    headings.push({ id, title, level });
  }

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const headings = extractHeadings(content);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop TOC - Sticky Sidebar */}
      <nav className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <h4 className="mb-3 text-sm font-semibold text-hs-text">
            On this page
          </h4>
          <ul className="space-y-1 border-l border-hs-border">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    "block border-l-2 py-1 text-sm transition-colors",
                    heading.level === 2 ? "pl-4" : "pl-6",
                    activeId === heading.id
                      ? "border-hs-primary text-hs-primary"
                      : "border-transparent text-hs-text-muted hover:border-hs-border hover:text-hs-text"
                  )}
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile TOC - Collapsible */}
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-hs-border bg-hs-surface px-4 py-3 text-sm font-medium text-hs-text"
        >
          <span>On this page</span>
          <span className="text-hs-text-muted">
            {isOpen ? "−" : "+"}
          </span>
        </button>
        {isOpen && (
          <ul className="mt-2 space-y-1 rounded-lg border border-hs-border bg-hs-surface p-4">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block py-1.5 text-sm transition-colors",
                    heading.level === 2 ? "pl-0" : "pl-4",
                    activeId === heading.id
                      ? "text-hs-primary"
                      : "text-hs-text-muted hover:text-hs-text"
                  )}
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
