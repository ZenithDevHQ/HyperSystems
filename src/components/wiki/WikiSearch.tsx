"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
}

interface PagefindInstance {
  search: (query: string) => Promise<{
    results: Array<{
      data: () => Promise<{
        url: string;
        meta?: { title?: string };
        excerpt?: string;
      }>;
    }>;
  }>;
  init?: () => Promise<void>;
}

declare global {
  interface Window {
    pagefind?: PagefindInstance;
  }
}

export function WikiSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagefindLoaded, setPagefindLoaded] = useState(false);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load Pagefind when search opens
  useEffect(() => {
    if (isOpen && !pagefindLoaded && typeof window !== "undefined") {
      const loadPagefind = async () => {
        if (window.pagefind) {
          setPagefindLoaded(true);
          return;
        }

        try {
          // Load Pagefind script dynamically
          const script = document.createElement("script");
          script.src = "/pagefind/pagefind.js";
          script.async = true;
          script.onload = async () => {
            if (window.pagefind?.init) {
              await window.pagefind.init();
            }
            setPagefindLoaded(true);
          };
          script.onerror = () => {
            // Pagefind not available (hasn't been built yet)
            console.log("Pagefind not available");
          };
          document.head.appendChild(script);
        } catch {
          // Silently fail - Pagefind may not be built yet
        }
      };
      loadPagefind();
    }
  }, [isOpen, pagefindLoaded]);

  // Search using Pagefind (if available)
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      if (typeof window !== "undefined" && window.pagefind) {
        const search = await window.pagefind.search(searchQuery);
        const searchResults: SearchResult[] = [];

        for (const result of search.results.slice(0, 5)) {
          const data = await result.data();
          searchResults.push({
            url: data.url,
            title: data.meta?.title || "Untitled",
            excerpt: data.excerpt || "",
          });
        }

        setResults(searchResults);
      } else {
        // Fallback: Pagefind not available
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isOpen && pagefindLoaded) {
        performSearch(query);
      }
    }, 200);

    return () => clearTimeout(debounce);
  }, [query, isOpen, pagefindLoaded, performSearch]);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-hs-border bg-hs-surface px-3 py-2 text-sm text-hs-text-muted transition-colors hover:border-hs-text-muted hover:text-hs-text"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden rounded bg-hs-surface-2 px-1.5 py-0.5 font-mono text-xs sm:inline">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
              setResults([]);
            }}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg rounded-xl border border-hs-border bg-hs-bg shadow-2xl">
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-hs-border px-4 py-3">
              <Search className="h-5 w-5 text-hs-text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-hs-text placeholder-hs-text-muted outline-none"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                  }}
                  className="rounded p-1 text-hs-text-muted hover:bg-hs-surface hover:text-hs-text"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {isLoading && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  Searching...
                </div>
              )}

              {!isLoading && query && results.length === 0 && pagefindLoaded && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  No results found for &quot;{query}&quot;
                </div>
              )}

              {!isLoading && query && !pagefindLoaded && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  Search is loading...
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <ul className="space-y-1">
                  {results.map((result, index) => (
                    <li key={index}>
                      <a
                        href={result.url}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery("");
                          setResults([]);
                        }}
                        className={cn(
                          "block rounded-lg px-4 py-3 transition-colors",
                          "hover:bg-hs-surface"
                        )}
                      >
                        <div className="font-medium text-hs-text">
                          {result.title}
                        </div>
                        {result.excerpt && (
                          <div
                            className="mt-1 text-sm text-hs-text-muted line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: result.excerpt }}
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {!isLoading && !query && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  Type to start searching...
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-hs-border px-4 py-2 text-xs text-hs-text-muted">
              <span className="mr-4">
                <kbd className="rounded bg-hs-surface px-1.5 py-0.5 font-mono">↵</kbd> to select
              </span>
              <span>
                <kbd className="rounded bg-hs-surface px-1.5 py-0.5 font-mono">esc</kbd> to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
