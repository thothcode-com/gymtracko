import { useEffect, useRef } from 'react';

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frame: number | undefined;

    function handleMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      cursor!.style.left = `${mx}px`;
      cursor!.style.top = `${my}px`;

      // With reduced motion requested, snap the ring straight to the
      // pointer instead of continuously animating a trailing/easing loop.
      if (prefersReducedMotion) {
        ring!.style.left = `${mx}px`;
        ring!.style.top = `${my}px`;
      }
    }

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring!.style.left = `${rx}px`;
      ring!.style.top = `${ry}px`;
      frame = requestAnimationFrame(animRing);
    }

    document.addEventListener('mousemove', handleMove);
    if (!prefersReducedMotion) {
      frame = requestAnimationFrame(animRing);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  return { cursorRef, ringRef };
}
