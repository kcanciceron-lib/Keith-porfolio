import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const { mode } = useTheme();
  const [isTouch, setIsTouch] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100, moved: false });
  const isMouseDownRef = useRef(false);
  const isHoveringRef = useRef(false);
  const cursorRef = useRef({ x: -100, y: -100 });
  
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const isWithinWindowRef = useRef(false); // Start as false, wait for first mousemove
  const isTabFocusedRef = useRef(true);

  useEffect(() => {
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(isCoarse);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const style = document.createElement('style');
    style.id = 'hide-native-cursor';
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('hide-native-cursor');
      if (el) el.remove();
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    const particles: Particle[] = [];

    // Preload pixel star image
    const starImg = new Image();
    starImg.src = '/images/pixel_star.png';

    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.moved = true;
      isWithinWindowRef.current = true; // Show cursor once inside
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
      targetScaleRef.current = 1.45; // Scale up on click

      // Explosion burst of pixel sparkles on click
      const count = 12 + Math.floor(Math.random() * 8);
      const themeColor = mode === 'space' ? '#ff007f' : '#c41230';
      const colors = ['#ffd700', '#ffea00', '#ffffff', themeColor];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particles.push({
          x: cursorRef.current.x,
          y: cursorRef.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1.5,
          alpha: 1.0,
          color,
          life: 0,
          maxLife: 20 + Math.random() * 15
        });
      }
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      targetScaleRef.current = isHoveringRef.current ? 1.25 : 1.0;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      
      if (isInteractive) {
        isHoveringRef.current = true;
        if (!isMouseDownRef.current) targetScaleRef.current = 1.25; // Hover scaling
      } else {
        isHoveringRef.current = false;
        if (!isMouseDownRef.current) targetScaleRef.current = 1.0;
      }
    };

    const handleMouseLeave = () => {
      isWithinWindowRef.current = false;
    };

    const handleMouseEnter = () => {
      isWithinWindowRef.current = true;
    };

    const handleVisibilityChange = () => {
      isTabFocusedRef.current = !document.hidden;
    };

    const handleWindowBlur = () => {
      isTabFocusedRef.current = false;
    };

    const handleWindowFocus = () => {
      isTabFocusedRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Visibility check
      const shouldRender = isWithinWindowRef.current && isTabFocusedRef.current && mouseRef.current.moved;

      if (!shouldRender) {
        // Still decay particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = 1 - (p.life / p.maxLife);
          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
          }
        }
        rafId = requestAnimationFrame(draw);
        return;
      }

      // Smooth cursor follow (lerping)
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      
      if (cursorRef.current.x === -100) {
        cursorRef.current.x = targetX;
        cursorRef.current.y = targetY;
        mouseRef.current.lastX = targetX;
        mouseRef.current.lastY = targetY;
      } else {
        cursorRef.current.x += (targetX - cursorRef.current.x) * 0.35;
        cursorRef.current.y += (targetY - cursorRef.current.y) * 0.35;
      }

      // Lerp scale
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.2;

      // Spawn trail sparkles (very subtle, gold/yellow/accent color)
      if (mouseRef.current.moved) {
        const dist = Math.hypot(cursorRef.current.x - mouseRef.current.lastX, cursorRef.current.y - mouseRef.current.lastY);
        if (dist > 6) {
          const themeColor = mode === 'space' ? '#00f0ff' : '#ffd700';
          const colors = [themeColor, '#ffffff', '#ffea00'];
          const color = colors[Math.floor(Math.random() * colors.length)];

          particles.push({
            x: cursorRef.current.x + (Math.random() - 0.5) * 6,
            y: cursorRef.current.y + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4 - 0.2, // drift up
            size: Math.random() * 1.5 + 1.0,
            alpha: 0.6,
            color,
            life: 0,
            maxLife: 12 + Math.random() * 8
          });
          mouseRef.current.lastX = cursorRef.current.x;
          mouseRef.current.lastY = cursorRef.current.y;
        }
      }

      // Draw particle trails
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = 1 - (p.life / p.maxLife);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.floor(p.size), Math.floor(p.size));

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1.0;

      // Draw star cursor
      const currentScale = scaleRef.current;
      const size = 28 * currentScale;

      ctx.save();
      ctx.imageSmoothingEnabled = false; // Pixel art scaling style

      // Bouncy jumping pattern when hovering
      let bob = 0;
      if (isHoveringRef.current && !isMouseDownRef.current) {
        bob = -Math.abs(Math.sin(timestamp / 100)) * 3.5;
      }

      ctx.drawImage(
        starImg,
        Math.floor(cursorRef.current.x - size / 2),
        Math.floor(cursorRef.current.y - size / 2 + bob),
        Math.floor(size),
        Math.floor(size)
      );
      ctx.restore();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, mode]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999999]"
      aria-hidden="true"
    />
  );
}