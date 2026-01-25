"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { WikiNavItem } from "@/lib/wiki-navigation";

interface WikiKeyboardNavProps {
  prev: WikiNavItem | null;
  next: WikiNavItem | null;
}

export function WikiKeyboardNav({ prev, next }: WikiKeyboardNavProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Skip if modifier keys are pressed
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }

      // Left arrow - previous page
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        router.push(prev.href);
      }

      // Right arrow - next page
      if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        router.push(next.href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, prev, next]);

  // This component doesn't render anything - it's just for handling keyboard events
  return null;
}
