import { useEffect, useRef } from 'react';

export function useGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    function drawGrid() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const sz = 60;
      ctx!.strokeStyle = 'rgba(255,92,26,0.12)';
      ctx!.lineWidth = 0.5;
      for (let x = 0; x < canvas!.width; x += sz) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, canvas!.height);
        ctx!.stroke();
      }
      for (let y = 0; y < canvas!.height; y += sz) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(canvas!.width, y);
        ctx!.stroke();
      }

      const cx = Math.floor(canvas!.width / 2 / sz) * sz;
      const cy = Math.floor(canvas!.height / 2 / sz) * sz;
      ctx!.strokeStyle = 'rgba(255,92,26,0.4)';
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(cx - 20, cy);
      ctx!.lineTo(cx + 20, cy);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(cx, cy - 20);
      ctx!.lineTo(cx, cy + 20);
      ctx!.stroke();
    }

    drawGrid();
    window.addEventListener('resize', drawGrid);
    return () => window.removeEventListener('resize', drawGrid);
  }, []);

  return canvasRef;
}
