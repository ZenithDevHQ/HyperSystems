"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LineType = "input" | "output" | "success" | "info" | "warn" | "header";

interface TerminalLine {
  text: string;
  type: LineType;
  delay: number;
}

const sequences: TerminalLine[][] = [
  // Sequence 1: Authentic Hytale server startup — plugin discovery + HyperPerms/HyperFactions boot
  [
    { text: "$ ./start-server.sh", type: "input", delay: 0 },
    { text: "[HytaleServer] Booting up HytaleServer - Version: 2026.02.06", type: "info", delay: 800 },
    { text: "[HytaleServer] Setup phase...", type: "info", delay: 400 },
    { text: "[PluginManager] Loading pending plugins from directory: mods", type: "info", delay: 600 },
    { text: "[PluginManager] - com.hyperperms:HyperPerms from path HyperPerms-2.8.2.jar", type: "output", delay: 250 },
    { text: "[PluginManager] - com.hyperfactions:HyperFactions from path HyperFactions-0.7.1.jar", type: "output", delay: 250 },
    { text: "[PluginManager] - com.ecotale:Ecotale from path Ecotale-1.0.8.jar", type: "output", delay: 250 },
    { text: "[PluginManager] - com.werchat:Werchat from path Werchat-1.10.1.jar", type: "output", delay: 250 },
    { text: "[HytaleServer] Setup phase completed! Boot time 8sec 149ms", type: "info", delay: 600 },
    { text: "[HyperPerms] Configuration loaded", type: "success", delay: 400 },
    { text: "[HyperPerms] Loaded 7 groups, 3 users from storage", type: "success", delay: 200 },
    { text: "[HyperPerms] Registered 426 built-in permissions", type: "success", delay: 200 },
    { text: "[HyperPerms|P] HyperPerms v2.8.2 enabled!", type: "header", delay: 400 },
    { text: "[HyperFactions] HyperFactions v0.7.1 starting...", type: "success", delay: 400 },
    { text: "[HyperFactions] HyperPerms integration enabled successfully", type: "success", delay: 200 },
    { text: "[HyperFactions] Loaded 1 factions with 1 members indexed", type: "success", delay: 200 },
    { text: "[HyperFactions|P] Registered command: /faction (/f, /hf)", type: "success", delay: 200 },
    { text: "[HyperFactions|P] HyperFactions v0.7.1 enabled!", type: "header", delay: 400 },
    { text: "[HytaleServer] Hytale Server Booted! [Multiplayer] took 11sec", type: "header", delay: 600 },
  ],
  // Sequence 2: Ecotale + Werchat boot (authentic from source)
  [
    { text: "[Ecotale] VaultUnlocked is installed, enabling VaultUnlocked support.", type: "success", delay: 0 },
    { text: "[Ecotale] Cassaforte is not installed, disabling Cassaforte support.", type: "output", delay: 300 },
    { text: "[Ecotale] Ecotale Economy loaded - HUD balance display active!", type: "header", delay: 400 },
    { text: "[PluginManager] Enabled plugin com.ecotale:Ecotale", type: "info", delay: 300 },
    { text: "[Werchat] Werchat 1.10.1 is loading...", type: "success", delay: 500 },
    { text: "[Werchat] Werchat is registering events and commands...", type: "success", delay: 300 },
    { text: "[Werchat] Werchat enabled! 4 channels loaded.", type: "header", delay: 300 },
    { text: "[Werchat] Persistence mode: dirty + debounced saves (20s)", type: "output", delay: 200 },
    { text: "[Werchat] Channel permission enforcement: ENABLED", type: "success", delay: 200 },
    { text: "[Werchat] Word filter: ENABLED (BLOCK mode)", type: "success", delay: 200 },
    { text: "[Werchat] Mentions: ENABLED", type: "success", delay: 200 },
    { text: "[PluginManager] Enabled plugin com.werchat:Werchat", type: "info", delay: 300 },
    { text: "[HytaleServer] Plugin manager started! Startup time: 11sec", type: "header", delay: 600 },
  ],
  // Sequence 3: In-game commands (player perspective)
  [
    { text: "> /f create Vanguard", type: "input", delay: 0 },
    { text: "  Faction 'Vanguard' created!", type: "success", delay: 600 },
    { text: "> /f claim", type: "input", delay: 1000 },
    { text: "  Chunk (-3, 12) claimed for Vanguard", type: "success", delay: 600 },
    { text: "> /balance", type: "input", delay: 1000 },
    { text: "  Balance: 1,250 coins", type: "output", delay: 400 },
    { text: "> /pay Steve 200", type: "input", delay: 1000 },
    { text: "  Sent 200 coins to Steve", type: "success", delay: 400 },
    { text: "> /hp group admin info", type: "input", delay: 1000 },
    { text: "  Group: admin | Weight: 100 | Members: 1", type: "output", delay: 400 },
    { text: "  Permissions: 42 | Inherited: moderator", type: "output", delay: 200 },
    { text: "> /channel global", type: "input", delay: 1000 },
    { text: "  Switched to channel: global", type: "info", delay: 400 },
  ],
];

const lineColors: Record<LineType, string> = {
  input: "text-zinc-300",
  output: "text-zinc-500",
  success: "text-emerald-400",
  info: "text-cyan-400/80",
  warn: "text-amber-400/80",
  header: "text-hs-primary",
};

export function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<{ text: string; type: LineType }[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const sequenceIndexRef = useRef(0);
  const mountedRef = useRef(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStarted(true);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const typeText = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (prefersReducedMotion.current) {
        setCurrentTyping(text);
        setTimeout(() => {
          setCurrentTyping("");
          resolve();
        }, 50);
        return;
      }
      let i = 0;
      setIsTyping(true);
      const interval = setInterval(() => {
        if (!mountedRef.current) {
          clearInterval(interval);
          resolve();
          return;
        }
        i++;
        setCurrentTyping(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          setCurrentTyping("");
          resolve();
        }
      }, 40);
    });
  }, []);

  const wait = useCallback((ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, prefersReducedMotion.current ? 50 : ms);
    });
  }, []);

  const playLoop = useCallback(async () => {
    while (mountedRef.current) {
      const sequence = sequences[sequenceIndexRef.current];
      setVisibleLines([]);
      setCurrentTyping("");

      for (const line of sequence) {
        if (!mountedRef.current) return;
        await wait(line.delay);

        if (line.type === "input") {
          await typeText(line.text);
          if (!mountedRef.current) return;
          setVisibleLines((prev) => [...prev, { text: line.text, type: line.type }]);
        } else {
          setVisibleLines((prev) => [...prev, { text: line.text, type: line.type }]);
        }
      }

      await wait(3000);
      if (!mountedRef.current) return;

      sequenceIndexRef.current = (sequenceIndexRef.current + 1) % sequences.length;
    }
  }, [typeText, wait]);

  useEffect(() => {
    if (started) {
      playLoop();
    }
  }, [started, playLoop]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines, currentTyping]);

  return (
    <div className="w-full rounded-xl border border-white/10 bg-zinc-950 shadow-[0_0_60px_-12px_rgba(6,182,212,0.15)] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 font-mono text-xs text-zinc-500">hyper@server:~</span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="h-[280px] overflow-y-auto p-4 font-mono text-[11px] leading-relaxed sm:h-[340px] sm:text-xs"
      >
        <AnimatePresence mode="sync">
          {visibleLines.map((line, i) => (
            <motion.div
              key={`${line.text}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className={lineColors[line.type]}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Currently typing line */}
        {currentTyping && (
          <div className="text-zinc-300">
            {currentTyping}
            {isTyping && <span className="terminal-cursor" />}
          </div>
        )}

        {/* Idle cursor */}
        {!currentTyping && visibleLines.length === 0 && (
          <div className="text-zinc-300">
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
