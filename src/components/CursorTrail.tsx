import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  age: number;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const maxAge = 60;
    const spawnRate = 2;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const points = pointsRef.current;
      const m = mouseRef.current;

      frame++;
      if (frame % spawnRate === 0 && m.x > 0) {
        points.push({ x: m.x, y: m.y, age: 0 });
      }

      // Age and remove
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age++;
        if (points[i].age > maxAge) points.splice(i, 1);
      }

      if (points.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const life = 1 - p1.age / maxAge;
          const width = life * 2.5;

          // Gradient from cyan to purple based on position in trail
          const ratio = i / points.length;
          const r = Math.round(0 + ratio * 160);
          const g = Math.round(200 - ratio * 140);
          const b = Math.round(255);

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${life * 0.6})`;
          ctx.lineWidth = width;
          ctx.stroke();

          // Glow layer
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${life * 0.15})`;
          ctx.lineWidth = width * 4;
          ctx.stroke();
        }

        // Subtle particles at recent points
        for (let i = points.length - 1; i >= Math.max(0, points.length - 5); i--) {
          const p = points[i];
          const life = 1 - p.age / maxAge;
          if (life > 0.7) {
            ctx.beginPath();
            ctx.arc(p.x + (Math.random() - 0.5) * 8, p.y + (Math.random() - 0.5) * 8, life * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 200, 255, ${life * 0.4})`;
            ctx.fill();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

export default CursorTrail;
