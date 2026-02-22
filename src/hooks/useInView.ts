"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "50px" }
    );

    observer.observe(el);

    // Fallback: ensure visibility after 1.5s even if observer doesn't fire
    const timer = setTimeout(() => setIsInView(true), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [threshold]);

  return { ref, isInView };
}
