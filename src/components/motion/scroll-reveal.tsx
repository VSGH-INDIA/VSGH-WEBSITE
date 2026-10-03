"use client";

import { useEffect } from "react";

const revealSelector = ".vsgh-reveal, .vsgh-image-reveal, .vsgh-process-step";

export function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("vsgh-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const element = entry.target as HTMLElement;
          element.dataset.revealed = "true";
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    const observePending = () => {
      document
        .querySelectorAll<HTMLElement>(revealSelector)
        .forEach((element) => {
          if (element.dataset.revealObserved === "true") {
            return;
          }
          element.dataset.revealObserved = "true";
          observer.observe(element);
        });
    };

    observePending();
    const mutations = new MutationObserver(observePending);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      root.classList.remove("vsgh-motion-ready");
      document
        .querySelectorAll<HTMLElement>(revealSelector)
        .forEach((element) => {
          delete element.dataset.revealObserved;
          delete element.dataset.revealed;
        });
    };
  }, []);

  return null;
}
