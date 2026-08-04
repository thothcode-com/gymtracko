import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  orange: boolean;
}

const PARTICLE_COUNT = 80;
const CONNECT_DISTANCE = 120;

export function useParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      orange: Math.random() < 0.2,
    }));

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((p) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.orange
          ? `rgba(255,92,26,${p.alpha})`
          : `rgba(240,238,232,${p.alpha * 0.4})`;
        ctx!.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DISTANCE) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            const a = (1 - d / CONNECT_DISTANCE) * 0.06;
            ctx!.strokeStyle = `rgba(255,92,26,${a})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    }

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      if (prefersReducedMotion) draw();
    }
    resize();
    window.addEventListener('resize', resize);

    let frame: number | undefined;

    function animate() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;
      });
      draw();
      frame = requestAnimationFrame(animate);
    }

    // Respect prefers-reduced-motion: render the particle field once as a
    // static image instead of continuously animating drifting particles
    // and their connecting lines.
    if (prefersReducedMotion) {
      draw();
    } else {
      frame = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  return canvasRef;
}
