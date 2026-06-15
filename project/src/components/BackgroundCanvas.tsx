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
      const count = mode === 'space' ? 260 : 70;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5,
          speed: mode === 'space' ? Math.random() * 0.4 + 0.05 : 0.02,
          opacity: Math.random(),
          color: Math.random() > 0.75 ? (mode === 'space' ? '#fecaca' : '#bfdbfe') : '#ffffff',
        });
      }
    };

    // Meteor data
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      type: 'normal' | 'streak' | 'large';
      width: number;
      colorStart: string;
      colorEnd: string;
    }
    const meteors: Meteor[] = [];
    let meteorShowerTimer = 0;

    const createMeteor = (forcedType?: 'normal' | 'streak' | 'large') => {
      if (mode !== 'space') return;
      const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x = 0, y = 0, angle = 0;
      const pad = 80;
      
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

      const rand = Math.random();
      const type = forcedType || (rand < 0.1 ? 'streak' : rand < 0.2 ? 'large' : 'normal');

      let length = Math.random() * 80 + 45;
      let speed = Math.random() * 12 + 10;
      let width = 1.8;
      let opacity = 0.9;
      let colorStart = 'rgba(255, 255, 255, ';
      let colorEnd = 'rgba(255, 255, 255, 0)';

      if (type === 'streak') {
        length = Math.random() * 100 + 160;
        speed = Math.random() * 8 + 26; // High speed cosmic streaks
        width = 1.0;
        opacity = 0.95;
        const colorOpt = Math.random() > 0.5 ? '0, 240, 255' : '255, 0, 127'; // cyan vs neon pink
        colorStart = `rgba(${colorOpt}, `;
      } else if (type === 'large') {
        length = Math.random() * 40 + 80;
        speed = Math.random() * 2 + 4.5; // Rare slow large meteors
        width = 4.0;
        opacity = 0.85;
        colorStart = 'rgba(251, 113, 133, '; // rose/coral glowing trail
      }

      meteors.push({
        x,
        y,
        length,
        speed,
        angle,
        opacity,
        type,
        width,
        colorStart,
        colorEnd
      });
    };

    // Plain Mode animated code symbols data
    const symbolsList = ['</>', '{ }', '[]', '=>', 'let', 'const', 'var', 'async', 'await', '===', 'npm', 'git'];
    const codeSymbols: { x: number; y: number; text: string; speed: number; size: number; opacity: number }[] = [];
    const initCodeSymbols = () => {
      codeSymbols.length = 0;
      if (mode === 'space') return;
      const count = 12;
      for (let i = 0; i < count; i++) {
        codeSymbols.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          text: symbolsList[Math.floor(Math.random() * symbolsList.length)],
          speed: Math.random() * 0.25 + 0.12,
          size: Math.random() * 2 + 7.5, // 7.5px to 9.5px
          opacity: Math.random() * 0.2 + 0.1,
        });
      }
    };

    // Plain Mode floating red pixel sparkles
    const plainSparkles: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];
    const initPlainSparkles = () => {
      plainSparkles.length = 0;
      if (mode === 'space') return;
      const count = 20;
      for (let i = 0; i < count; i++) {
        plainSparkles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speed: Math.random() * 0.12 + 0.05,
          size: Math.random() * 1.5 + 1.5,
          opacity: Math.random() * 0.35 + 0.08,
        });
      }
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

      // Cruising Spaceship
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

      // Tumbling Meteor 1
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
    initCodeSymbols();
    initPlainSparkles();

    const animate = (time: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (mode === 'space') {
        // Draw deep space purple/dark radial gradients (Nebula Glows)
        const neb1 = ctx.createRadialGradient(window.innerWidth * 0.2, window.innerHeight * 0.3, 0, window.innerWidth * 0.2, window.innerHeight * 0.3, 360);
        neb1.addColorStop(0, 'rgba(123, 0, 255, 0.07)');
        neb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        const neb2 = ctx.createRadialGradient(window.innerWidth * 0.85, window.innerHeight * 0.65, 0, window.innerWidth * 0.85, window.innerHeight * 0.65, 300);
        neb2.addColorStop(0, 'rgba(0, 240, 255, 0.05)');
        neb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Semi-transparent canvas cover overlay
        ctx.fillStyle = 'rgba(13, 2, 28, 0.45)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      } else {
        // Plain Mode gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        grad.addColorStop(0, '#0a0a0a');
        grad.addColorStop(1, '#050505');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Subtle tech grid pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.lineWidth = 1;
        const gridSize = 45;
        for (let x = 0; x < window.innerWidth; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, window.innerHeight);
          ctx.stroke();
        }
        for (let y = 0; y < window.innerHeight; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(window.innerWidth, y);
          ctx.stroke();
        }
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

      // Handle space specific systems
      if (mode === 'space') {
        // Random meteor shower triggers
        if (Math.random() < 0.0015 && meteorShowerTimer <= 0) {
          meteorShowerTimer = 150 + Math.floor(Math.random() * 150); // duration in frames
        }

        if (meteorShowerTimer > 0) {
          meteorShowerTimer--;
          if (Math.random() < 0.35) createMeteor('normal'); // higher density wave
        }

        // Regular spawning
        if (Math.random() < 0.018) {
          createMeteor();
        }

        // Drawing meteors (Meteor Showers / Cosmic Streaks / Large Meteors)
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          const endX = m.x - Math.cos(m.angle) * m.length;
          const endY = m.y - Math.sin(m.angle) * m.length;

          const meteorGrad = ctx.createLinearGradient(m.x, m.y, endX, endY);
          meteorGrad.addColorStop(0, m.colorStart + `${m.opacity})`);
          meteorGrad.addColorStop(1, m.colorEnd);

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = m.width;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          
          // Speed changes trail fade rate
          const fadeRate = m.type === 'streak' ? 0.009 : m.type === 'large' ? 0.004 : 0.007;
          m.opacity -= fadeRate;

          // Bounds check
          if (m.opacity <= 0 || 
              m.x < -200 || 
              m.x > window.innerWidth + 200 || 
              m.y < -200 || 
              m.y > window.innerHeight + 200) {
            meteors.splice(i, 1);
          }
        }

        // Draw floating space assets
        assets.forEach((asset) => {
          asset.x += asset.vx;
          asset.y += asset.vy;
          asset.angle += asset.rotSpeed;
          asset.phase += asset.bobSpeed;

          const displayY = asset.y + Math.sin(asset.phase) * asset.bobAmp;

          const margin = 120;
          if (asset.x < -margin) asset.x = window.innerWidth + margin;
          if (asset.x > window.innerWidth + margin) asset.x = -margin;
          if (asset.y < -margin) asset.y = window.innerHeight + margin;
          if (asset.y > window.innerHeight + margin) asset.y = -margin;

          drawMatrix(ctx, asset.matrix, asset.x, displayY, asset.pixelSize, asset.colorMap, asset.angle);
        });
      } else {
        // Upgraded Plain Mode: code symbol particles & red sparkles
        codeSymbols.forEach((sym) => {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = sym.opacity * (0.4 + Math.sin(time / 600 + sym.x) * 0.3);
          ctx.font = `${sym.size}px monospace`;
          ctx.fillText(sym.text, sym.x, sym.y);

          sym.y += sym.speed;
          if (sym.y > window.innerHeight + 20) {
            sym.y = -20;
            sym.x = Math.random() * window.innerWidth;
            sym.text = symbolsList[Math.floor(Math.random() * symbolsList.length)];
          }
        });

        plainSparkles.forEach((p) => {
          ctx.fillStyle = '#c41230'; // red sparkles matching Keith's branding
          ctx.globalAlpha = p.opacity * (0.6 + Math.sin(time / 450 + p.x) * 0.4);
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.ceil(p.size), Math.ceil(p.size));

          p.y -= p.speed; // float upward
          if (p.y < -10) {
            p.y = window.innerHeight + 10;
            p.x = Math.random() * window.innerWidth;
          }
        });
        ctx.globalAlpha = 1.0;
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
