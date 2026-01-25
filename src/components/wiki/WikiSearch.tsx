"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
}

interface PagefindAPI {
  search: (query: string) => Promise<{
    results: Array<{
      data: () => Promise<{
        url: string;
        meta?: { title?: string };
        excerpt?: string;
      }>;
    }>;
  }>;
}

// Extend window type for Pagefind
declare global {
  interface Window {
    pagefind?: PagefindAPI;
  }
}

export function WikiSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchReady, setSearchReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadAttempted = useRef(false);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  // Load Pagefind when search opens
  useEffect(() => {
    if (!isOpen || loadAttempted.current) return;

    loadAttempted.current = true;

    // Check if already loaded
    if (window.pagefind) {
      setSearchReady(true);
      return;
    }

    // Load Pagefind via script tag
    const script = document.createElement("script");
    script.src = "/pagefind/pagefind.js";
    script.type = "text/javascript";

    script.onload = () => {
      // Pagefind should now be available on window
      // Give it a moment to initialize
      setTimeout(() => {
        if (window.pagefind) {
          setSearchReady(true);
          setError(null);
        } else {
          setError("Search failed to initialize");
        }
      }, 100);
    };

    script.onerror = () => {
      setError("Search is not available");
      setSearchReady(false);
    };

    document.head.appendChild(script);
  }, [isOpen]);

  // Perform search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    if (!window.pagefind) {
      return;
    }

    setIsLoading(true);
    try {
      const search = await window.pagefind.search(searchQuery);
      const searchResults: SearchResult[] = [];

      for (const result of search.results.slice(0, 8)) {
        const data = await result.data();
        searchResults.push({
          url: data.url,
          title: data.meta?.title || "Untitled",
          excerpt: data.excerpt || "",
        });
      }

      setResults(searchResults);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!isOpen || !searchReady) return;

    const debounce = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => clearTimeout(debounce);
  }, [query, isOpen, searchReady, performSearch]);

  // Close modal handler
  const closeModal = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg rounded-xl border border-hs-border bg-hs-bg shadow-2xl">
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-hs-border px-4 py-3">
              <Search className="h-5 w-5 text-hs-text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-hs-text placeholder-hs-text-muted outline-none"
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
              {/* Error state */}
              {error && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  {error}
                </div>
              )}

              {/* Loading search */}
              {!error && !searchReady && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  Loading search...
                </div>
              )}

              {/* Searching */}
              {!error && searchReady && isLoading && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  Searching...
                </div>
              )}

              {/* No results */}
              {!error && searchReady && !isLoading && query && results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-hs-text-muted">
                  No results found for &quot;{query}&quot;
                </div>
              )}

              {/* Results list */}
              {!error && !isLoading && results.length > 0 && (
                <ul className="space-y-1">
                  {results.map((result, index) => (
                    <li key={index}>
                      <a
                        href={result.url}
                        onClick={closeModal}
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

              {/* Initial state */}
              {!error && searchReady && !isLoading && !query && (
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
