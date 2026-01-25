"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-4 rounded-lg border border-hs-border bg-hs-surface overflow-hidden">
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-hs-border bg-hs-surface-2 px-4 py-2">
          <span className="text-xs font-medium text-hs-text-muted">
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-hs-text-muted transition-colors hover:bg-hs-border hover:text-hs-text"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative">
        {!filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 flex items-center gap-1.5 rounded px-2 py-1 text-xs text-hs-text-muted opacity-0 transition-all hover:bg-hs-border hover:text-hs-text group-hover:opacity-100"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        )}
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="font-mono text-hs-text">{children.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
