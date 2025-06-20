import React, { useEffect, useRef } from 'react';
import { CursorTrailPoint } from '../types';

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<CursorTrailPoint[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add multiple sparkle points for richer effect
      for (let i = 0; i < 3; i++) {
        trailPoints.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          opacity: 1,
          size: Math.random() * 4 + 2,
        });
      }

      // Limit trail length
      if (trailPoints.current.length > 100) {
        trailPoints.current = trailPoints.current.slice(-100);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailPoints.current.forEach((point, index) => {
        // Fade out over time
        point.opacity -= 0.02;
        point.size *= 0.98;

        if (point.opacity > 0) {
          // Create glittery sparkle effect
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, point.size
          );
          gradient.addColorStop(0, `rgba(0, 255, 255, ${point.opacity})`);
          gradient.addColorStop(0.5, `rgba(138, 43, 226, ${point.opacity * 0.7})`);
          gradient.addColorStop(1, `rgba(255, 20, 147, ${point.opacity * 0.3})`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
          ctx.fill();

          // Add sparkle lines
          if (Math.random() > 0.7) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${point.opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            const angle = Math.random() * Math.PI * 2;
            const length = point.size * 2;
            ctx.moveTo(
              point.x - Math.cos(angle) * length,
              point.y - Math.sin(angle) * length
            );
            ctx.lineTo(
              point.x + Math.cos(angle) * length,
              point.y + Math.sin(angle) * length
            );
            ctx.stroke();
          }
        }
      });

      // Remove faded points
      trailPoints.current = trailPoints.current.filter(point => point.opacity > 0);

      animationRef.current = requestAnimationFrame(animate);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CursorTrail;