import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const INVADER_MATRIX = [
  "  1    1  ",
  "   1  1   ",
  "  111111  ",
  " 11 11 11 ",
  "1111111111",
  "1 111111 1",
  "1 1    1 1",
  "   1111   "
];

const SPACESHIP_MATRIX = [
  "    1    ",
  "   111   ",
  "   111   ",
  "  11211  ",
  " 1112111 ",
  "111222111",
  "112222211",
  "1  2 2  1",
  "   2 2   "
];

const PLANET_MATRIX = [
  "      222      ",
  "    2211122    ",
  " 332111111233  ",
  "33331111113333 ",
  "  3321111233   ",
  "    222222     ",
  "      33       "
];

const ASTRONAUT_MATRIX = [
  "   11111   ",
  "  1122211  ",
  " 112222211 ",
  " 112222211 ",
  "  1111111  ",
  "   11311   ",
  "  1113111  ",
  " 11 111 11 ",
  " 1  1 1  1 ",
  "    1 1    ",
  "   11 11   "
];

const METEOR_MATRIX = [
  "  222  ",
  " 21112 ",
  "2111112",
  "2111112",
  " 21112 ",
  "  222  "
];

export default function BackgroundCanvas() {
  const { mode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Star data
    const stars: { x: number; y: number; size: number; speed: number; opacity: number; color: string }[] = [];
    const initStars = () => {
      stars.length = 0;
      const count = mode === 'space' ? 300 : 80;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5,
          speed: mode === 'space' ? Math.random() * 0.4 + 0.05 : 0.03,
          opacity: Math.random(),
          color: Math.random() > 0.8 ? (mode === 'space' ? '#fecaca' : '#bfdbfe') : '#ffffff',
        });
      }
    };

    // Meteor data
    const meteors: { x: number; y: number; length: number; speed: number; angle: number; opacity: number }[] = [];
    const createMeteor = () => {
      if (mode !== 'space') return;
      const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x = 0, y = 0, angle = 0;
      const pad = 50;
      
      if (edge === 0) { // Spawn top, travel down
        x = Math.random() * window.innerWidth;
        y = -pad;
        angle = Math.PI / 4 + Math.random() * (Math.PI / 2); // 45 to 135 deg
      } else if (edge === 1) { // Spawn right, travel left
        x = window.innerWidth + pad;
        y = Math.random() * window.innerHeight;
        angle = Math.PI * 0.75 + Math.random() * (Math.PI / 2); // 135 to 225 deg
      } else if (edge === 2) { // Spawn bottom, travel up
        x = Math.random() * window.innerWidth;
        y = window.innerHeight + pad;
        angle = Math.PI * 1.25 + Math.random() * (Math.PI / 2); // 225 to 315 deg
      } else { // Spawn left, travel right
        x = -pad;
        y = Math.random() * window.innerHeight;
        angle = -Math.PI / 4 + Math.random() * (Math.PI / 2); // -45 to 45 deg
      }

      meteors.push({
        x,
        y,
        length: Math.random() * 80 + 45,
        speed: Math.random() * 12 + 10,
        angle,
        opacity: 0.9,
      });
    };

    // Floating Pixel Art Assets data
    interface SpaceAsset {
      x: number;
      y: number;
      vx: number;
      vy: number;
      matrix: string[];
      pixelSize: number;
      colorMap: Record<string, string>;
      angle: number;
      rotSpeed: number;
      phase: number;
      bobSpeed: number;
      bobAmp: number;
    }

    const assets: SpaceAsset[] = [];
    const initAssets = () => {
      assets.length = 0;
      if (mode !== 'space') return;

      // Saturn Planet
      assets.push({
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.2,
        vx: -0.04,
        vy: 0.015,
        matrix: PLANET_MATRIX,
        pixelSize: 3,
        colorMap: { "1": "#ffcc00", "2": "#00f0ff", "3": "#ff00ff" },
        angle: 0.2,
        rotSpeed: 0.0002,
        phase: 0,
        bobSpeed: 0.003,
        bobAmp: 12
      });

      // Cruising Spaceship (moving horizontally)
      assets.push({
        x: window.innerWidth * 0.05,
        y: window.innerHeight * 0.45,
        vx: 0.2,
        vy: 0,
        matrix: SPACESHIP_MATRIX,
        pixelSize: 2.5,
        colorMap: { "1": "#ff3366", "2": "#ffffff" },
        angle: 0,
        rotSpeed: 0,
        phase: 0,
        bobSpeed: 0.02,
        bobAmp: 5
      });

      // Alien Invader
      assets.push({
        x: window.innerWidth * 0.45,
        y: window.innerHeight * 0.3,
        vx: -0.06,
        vy: 0.04,
        matrix: INVADER_MATRIX,
        pixelSize: 2.5,
        colorMap: { "1": "#00ffcc" },
        angle: 0,
        rotSpeed: 0.0015,
        phase: Math.random() * Math.PI,
        bobSpeed: 0.01,
        bobAmp: 8
      });

      // Floating Astronaut
      assets.push({
        x: window.innerWidth * 0.25,
        y: window.innerHeight * 0.75,
        vx: 0.03,
        vy: 0.02,
        matrix: ASTRONAUT_MATRIX,
        pixelSize: 2.5,
        colorMap: { "1": "#ffffff", "2": "#333333", "3": "#ff3366" },
        angle: -0.4,
        rotSpeed: -0.001,
        phase: Math.random() * Math.PI,
        bobSpeed: 0.006,
        bobAmp: 15
      });

      // Tumbling Meteor 1 (rotating)
      assets.push({
        x: window.innerWidth * 0.55,
        y: window.innerHeight * 0.5,
        vx: -0.08,
        vy: 0.08,
        matrix: METEOR_MATRIX,
        pixelSize: 3,
        colorMap: { "1": "#5c5c5c", "2": "#2e2e2e" },
        angle: 0.5,
        rotSpeed: 0.012,
        phase: 0,
        bobSpeed: 0.005,
        bobAmp: 3
      });

      // Tumbling Meteor 2
      assets.push({
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.8,
        vx: -0.07,
        vy: 0.07,
        matrix: METEOR_MATRIX,
        pixelSize: 2,
        colorMap: { "1": "#7a7a7a", "2": "#3a3a3a" },
        angle: 1.2,
        rotSpeed: -0.008,
        phase: Math.PI / 2,
        bobSpeed: 0.006,
        bobAmp: 4
      });
    };

    const drawMatrix = (
      ctx: CanvasRenderingContext2D,
      matrix: string[],
      x: number,
      y: number,
      pixelSize: number,
      colorMap: Record<string, string>,
      angle: number
    ) => {
      ctx.save();
      const height = matrix.length * pixelSize;
      const width = matrix[0].length * pixelSize;
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(angle);
      ctx.translate(-width / 2, -height / 2);

      matrix.forEach((row, rIdx) => {
        for (let cIdx = 0; cIdx < row.length; cIdx++) {
          const char = row[cIdx];
          if (char !== ' ' && colorMap[char]) {
            ctx.fillStyle = colorMap[char];
            ctx.fillRect(cIdx * pixelSize, rIdx * pixelSize, pixelSize, pixelSize);
          }
        }
      });
      ctx.restore();
    };

    initStars();
    initAssets();

    const animate = (time: number) => {
      // Background clear / overlay
      if (mode === 'space') {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // Draw a semi-transparent purple/dark overlay to let the galaxy gif show through beautifully
        ctx.fillStyle = 'rgba(13, 2, 28, 0.45)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        const grad = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        grad.addColorStop(0, '#0a0a0a');
        grad.addColorStop(1, '#050505');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      // Drawing stars
      stars.forEach((star) => {
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        
        if (mode === 'space') {
          ctx.fillRect(Math.floor(star.x), Math.floor(star.y), Math.ceil(star.size), Math.ceil(star.size));
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        star.y += star.speed;
        if (star.y > window.innerHeight) {
          star.y = -5;
          star.x = Math.random() * window.innerWidth;
        }

        // Twinkle
        if (mode === 'space') {
          star.opacity = 0.4 + Math.sin(time / 800 + star.x) * 0.4;
        }
      });
      ctx.globalAlpha = 1.0;

      // Drawing meteors (Meteor Showers)
      if (mode === 'space') {
        if (Math.random() < 0.02) createMeteor(); // Symmetrical & dynamic frequency

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          // Drag tail behind the head (subtract cos/sin)
          const endX = m.x - Math.cos(m.angle) * m.length;
          const endY = m.y - Math.sin(m.angle) * m.length;

          const meteorGrad = ctx.createLinearGradient(m.x, m.y, endX, endY);
          meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
          meteorGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.opacity -= 0.007;

          // Universal bounds check for multi-directional motion
          if (m.opacity <= 0 || 
              m.x < -150 || 
              m.x > window.innerWidth + 150 || 
              m.y < -150 || 
              m.y > window.innerHeight + 150) {
            meteors.splice(i, 1);
          }
        }

        // Animating and drawing floating pixel assets
        assets.forEach((asset) => {
          asset.x += asset.vx;
          asset.y += asset.vy;
          asset.angle += asset.rotSpeed;
          asset.phase += asset.bobSpeed;

          // Bobbing calculation
          const displayY = asset.y + Math.sin(asset.phase) * asset.bobAmp;

          // Screen wraparound
          const margin = 120;
          if (asset.x < -margin) asset.x = window.innerWidth + margin;
          if (asset.x > window.innerWidth + margin) asset.x = -margin;
          if (asset.y < -margin) asset.y = window.innerHeight + margin;
          if (asset.y > window.innerHeight + margin) asset.y = -margin;

          drawMatrix(ctx, asset.matrix, asset.x, displayY, asset.pixelSize, asset.colorMap, asset.angle);
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
