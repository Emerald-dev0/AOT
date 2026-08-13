import { useState, useEffect } from 'react';

export interface CameraState {
  mouseX: number; // Normalized -1 to 1
  mouseY: number; // Normalized -1 to 1
  tiltX: number;  // In degrees (-5 to 5)
  tiltY: number;  // In degrees (-5 to 5)
  scrollY: number;
  scrollVelocity: number;
  isReducedMotion: boolean;
}

export function useCinematicCamera(): CameraState {
  const [camera, setCamera] = useState<CameraState>({
    mouseX: 0,
    mouseY: 0,
    tiltX: 0,
    tiltY: 0,
    scrollY: 0,
    scrollVelocity: 0,
    isReducedMotion: false,
  });

  useEffect(() => {
    // Check system prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setCamera((prev) => ({ ...prev, isReducedMotion: motionQuery.matches }));
    };
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (motionQuery.matches) return;
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

      setCamera((prev) => ({
        ...prev,
        mouseX: normalizedX,
        mouseY: normalizedY,
        tiltX: normalizedY * -4, // Pitch
        tiltY: normalizedX * 4,  // Yaw
      }));
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = Math.max(1, currentTime - lastTime);
      const velocity = ((currentScrollY - lastScrollY) / dt) * 50;

      lastScrollY = currentScrollY;
      lastTime = currentTime;

      setCamera((prev) => ({
        ...prev,
        scrollY: currentScrollY,
        scrollVelocity: Math.min(100, Math.max(-100, velocity)),
      }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', updateMotion);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return camera;
}
