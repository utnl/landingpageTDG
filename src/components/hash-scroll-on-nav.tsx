"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Sau khi đổi route, nếu URL có #id thì cuộn tới phần tử (Next Link không luôn làm việc này).
 * `scroll-padding-top` trên html bù fixed header.
 */
export default function HashScrollOnNav() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    let cancelled = false;
    let attempts = 0;
    let timeoutId: number | undefined;
    const maxAttempts = 16;
    const interval = 100;

    const tick = () => {
      if (cancelled) return;
      const el = document.getElementById(hash);
      if (el) {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        timeoutId = window.setTimeout(tick, interval);
      }
    };

    tick();
    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
