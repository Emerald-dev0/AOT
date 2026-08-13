import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
  type: 'ember' | 'ash' | 'steam';
}

export const AtmosphericCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate balanced atmosphere particles
    const particleCount = window.innerWidth < 768 ? 25 : 55;
    const particles: Particle[] = [];

    const colors = [
      'rgba(230, 92, 92, ',   // Crimson ember
      'rgba(240, 180, 100, ', // Gold ember
      'rgba(200, 200, 210, ', // Steam / ash
      'rgba(140, 140, 150, ', // Dark ash
    ];

    for (let i = 0; i < particleCount; i++) {
      const isEmber = Math.random() > 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isEmber ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: isEmber ? -Math.random() * 0.6 - 0.2 : -Math.random() * 0.3 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        type: isEmber ? 'ember' : 'ash',
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.6 || p.opacity < 0.08) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = p.type === 'ember' ? 6 : 0;
        ctx.shadowColor = p.type === 'ember' ? 'rgba(230, 92, 92, 0.4)' : 'transparent';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 opacity-65"
      aria-hidden="true"
    />
  );
};
