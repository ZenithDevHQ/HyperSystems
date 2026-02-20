"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "< 5MB",
    label: "Plugin Size",
    barWidth: "5%",
  },
  {
    value: "< 1ms",
    label: "Command Latency",
    barWidth: "3%",
    pulse: true,
  },
  {
    value: "Zero",
    label: "Dependencies",
    barWidth: null,
  },
  {
    value: "100%",
    label: "Async Operations",
    barWidth: "100%",
    glow: true,
  },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative bg-hs-surface py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-hs-text sm:text-4xl">
            Performance First
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-hs-text-muted">
            Every HyperSystems plugin is built with performance as a core requirement.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              className={`px-4 py-6 text-center sm:px-6 ${
                index < stats.length - 1 ? "border-r border-white/[0.06]" : ""
              }`}
            >
              <div className="text-4xl font-bold tracking-tight text-hs-text sm:text-5xl lg:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-widest text-hs-text-muted">
                {stat.label}
              </div>

              {/* Gauge bar */}
              {stat.barWidth && (
                <div className="mx-auto mt-4 h-[2px] w-full max-w-[120px] overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.1 + 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`h-full origin-left rounded-full bg-hs-primary ${
                      stat.glow ? "shadow-[0_0_8px_rgba(6,182,212,0.5)]" : ""
                    } ${stat.pulse ? "animate-pulse" : ""}`}
                    style={{ width: stat.barWidth }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
