import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenisScroll() {
  useEffect(() => {
    // Respect the OS-level "reduce motion" preference: skip the inertia/
    // easing scroll library entirely so wheel/touch scrolling stays native
    // and instant, matching the global prefers-reduced-motion handling in
    // src/styles/reset.css.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      const activeLenis = lenis;
      const raf = (time: number) => {
        activeLenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }

      // preventDefault() above suppresses the browser's native anchor-jump
      // behavior, which normally also moves focus to the target. Restore
      // that manually so the skip link and in-page nav (#pilares, #admin,
      // etc.) keep working for keyboard and screen reader users instead of
      // leaving focus stranded on the link that was activated.
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    }
    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      if (lenis) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      }
    };
  }, []);
}
