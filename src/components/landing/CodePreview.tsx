"use client";

import { motion } from "framer-motion";

interface CodePreviewProps {
  lines: Array<{ text: string; className?: string }>;
  title?: string;
}

export function CodePreview({ lines, title }: CodePreviewProps) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-zinc-950/80 p-3 font-mono text-xs">
      {title && (
        <div className="mb-2 border-b border-white/[0.06] pb-2 text-[10px] text-zinc-600">
          {title}
        </div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className={line.className || "text-zinc-400"}
          >
            {line.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
