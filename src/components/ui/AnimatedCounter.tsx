"use client";

import { useCallback, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimatedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const callbackRef = useCallback(
    (node: HTMLSpanElement | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting || hasAnimatedRef.current) return;
          hasAnimatedRef.current = true;

          const match = value.match(/^([<>≈]?\s*)(\d+)(\s*\S*)?$/);
          if (!match) {
            setDisplayValue(value);
            return;
          }

          const prefix = match[1] || "";
          const target = parseInt(match[2], 10);
          const suffix = match[3] || "";
          const startTime = performance.now();
          const duration = 600;

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplayValue(`${prefix}${current}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          }

          requestAnimationFrame(animate);
        },
        { rootMargin: "-50px" }
      );

      observerRef.current.observe(node);
    },
    [value]
  );

  return (
    <span ref={callbackRef} className={className}>
      {displayValue}
    </span>
  );
}
