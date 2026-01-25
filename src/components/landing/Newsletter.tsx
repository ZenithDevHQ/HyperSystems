"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";

type SubmitState = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      setState("error");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setState("error");
      return;
    }

    setState("loading");

    // Simulate API call - in production, integrate with your email service
    // For now, just log to console
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter signup:", email);
    
    setState("success");
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setState("idle"), 3000);
  };

  return (
    <section className="border-t border-hs-border bg-gradient-to-b from-hs-surface to-hs-bg py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex rounded-full bg-hs-primary/10 p-3">
            <Mail className="h-6 w-6 text-hs-primary" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-hs-text">
            Stay Updated
          </h2>
          <p className="mb-8 text-hs-text-muted">
            Get notified about new plugin releases, major updates, and Hytale modding news.
            No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="Enter your email"
                  disabled={state === "loading" || state === "success"}
                  className="w-full rounded-lg border border-hs-border bg-hs-bg px-4 py-3 text-hs-text placeholder-hs-text-muted transition-colors focus:border-hs-primary focus:outline-none focus:ring-2 focus:ring-hs-primary/20 disabled:opacity-50"
                  aria-label="Email address"
                />
              </div>
              <Button
                type="submit"
                disabled={state === "loading" || state === "success"}
                className="min-w-[140px]"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : state === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Subscribed!
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {/* Error Message */}
            {state === "error" && errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center justify-center gap-2 text-sm text-hs-danger"
              >
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </motion.div>
            )}

            {/* Success Message */}
            {state === "success" && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-hs-success"
              >
                Thanks for subscribing! Check your inbox for confirmation.
              </motion.p>
            )}
          </form>

          <p className="mt-6 text-xs text-hs-text-muted">
            By subscribing, you agree to receive occasional emails about HyperSystems.
            We respect your privacy and will never share your information.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
