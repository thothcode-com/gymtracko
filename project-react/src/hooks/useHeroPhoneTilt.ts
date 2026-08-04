import { useEffect, useRef } from 'react';

const MAX_TILT = 14;

export function useHeroPhoneTilt() {
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const phone = phoneRef.current;
    const inner = innerRef.current;
    if (!phone || !inner) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let frame: number;

    function handleMove(e: MouseEvent) {
      const rect = phone!.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      targetY = (px - 0.5) * MAX_TILT * 2;
      targetX = (py - 0.5) * -MAX_TILT * 2;
    }

    function tiltLoop() {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      inner!.style.transform = `rotateX(${curX}deg) rotateY(${curY}deg)`;
      frame = requestAnimationFrame(tiltLoop);
    }

    document.addEventListener('mousemove', handleMove);
    frame = requestAnimationFrame(tiltLoop);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { phoneRef, innerRef };
}
