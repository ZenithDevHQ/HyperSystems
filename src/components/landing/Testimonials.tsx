"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextTestimonial]);

  return (
    <section className="border-t border-hs-border bg-hs-surface py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-hs-text">
            What Users Are Saying
          </h2>
          <p className="mb-12 text-hs-text-muted">
            Trusted by server administrators and community managers
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote Icon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <Quote className="h-8 w-8 text-hs-primary opacity-50" />
          </div>

          {/* Testimonial */}
          <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-hs-border bg-hs-bg p-8 pt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="mb-6 text-lg text-hs-text leading-relaxed">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-hs-text">
                    {testimonials[current].author}
                  </p>
                  <p className="text-sm text-hs-text-muted">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full bg-hs-surface-2 p-2 text-hs-text-muted transition-colors hover:bg-hs-border hover:text-hs-text sm:-translate-x-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-hs-surface-2 p-2 text-hs-text-muted transition-colors hover:bg-hs-border hover:text-hs-text sm:translate-x-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === current
                  ? "bg-hs-primary w-6"
                  : "bg-hs-border hover:bg-hs-text-muted"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
