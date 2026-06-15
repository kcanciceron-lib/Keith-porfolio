import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const ojtEntries = [
  {
    id: 1,
    company: 'TBA — Internship Host',
    role: 'IT Intern / Developer Intern',
    duration: '2025 – 2026',
    description:
      'Practical on-the-job training covering front-end development, UI/UX support, and system testing in a professional workplace environment.',
    tasks: [
      'Assisted with front-end development tasks',
      'Participated in team stand-ups and sprint reviews',
      'Performed manual testing and bug documentation',
      'Contributed to UI design improvements',
    ],
    images: [
      { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Team collaboration & planning' },
      { src: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Development workspace' },
      { src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Project presentation' },
    ],
    borderColor: 'border-blue-500/30',
    badgeColor: 'bg-blue-500/20 border-blue-400 text-blue-300',
    dotColor: 'bg-blue-400',
  },
];

interface LightboxProps { 
  images: { src: string; caption: string }[]; 
  index: number;
  onClose: () => void; 
}

function Lightbox({ images, index, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrent(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setCurrent(i => Math.min(images.length - 1, i + 1));
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow; 
    document.body.style.overflow = 'hidden';
    return () => { 
      document.removeEventListener('keydown', onKey); 
      document.body.style.overflow = prev; 
    };
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-3xl">
        <button onClick={onClose} className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="relative rounded-sm overflow-hidden border-2 border-white/10">
          <img src={images[current].src} alt={images[current].caption} className="w-full max-h-[70vh] object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-3">
            <p className="text-white text-sm font-pixel">{images[current].caption}</p>
            <p className="text-neutral-400 text-xs mt-0.5">{current + 1} / {images.length}</p>
          </div>
        </div>
        {images.length > 1 && (
          <>
            <button 
              onClick={() => setCurrent(i => Math.max(0, i - 1))} 
              disabled={current === 0} 
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-sm border border-white/20 disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrent(i => Math.min(images.length - 1, i + 1))} 
              disabled={current === images.length - 1} 
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-sm border border-white/20 disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function OJT() {
  const [lightbox, setLightbox] = useState<{ images: { src: string; caption: string }[]; index: number } | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!showGame) return;
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf = 0; let last = performance.now(); const DPR = window.devicePixelRatio || 1;
    
    const resize = () => { 
      const rect = canvas.getBoundingClientRect(); 
      canvas.width = Math.floor(rect.width * DPR); 
      canvas.height = Math.floor(rect.height * DPR); 
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); 
    };
    resize(); 
    window.addEventListener('resize', resize);

    const gravity = 0.6; const jumpVel = -12; let obstacleInterval = 1100; let speed = 6; const groundY = 110;
    const playerFont = 36; const player = { x: 44, y: groundY - playerFont, w: playerFont * 0.9, h: playerFont, vy: 0, onGround: true };
    const obstacles: { x: number; w: number; h: number; y: number; char: string }[] = [];
    let localScore = 0; let spawnTimer = 0; let localGameOver = false;
    
    const spawn = () => { 
      const ch = '👾'; 
      const w = 28 + Math.random() * 18;
      const h = 28 + Math.random() * 24; 
      obstacles.push({ x: canvas.clientWidth + 10, w, h, y: groundY - h, char: ch });
    };

    const onKey = (e: KeyboardEvent) => { 
      if (e.code === 'Space' || e.key === 'ArrowUp') { 
        e.preventDefault();
        if (!localGameOver && player.onGround) { 
          player.vy = jumpVel; player.onGround = false;
        } 
      } 
      if (e.key === 'r' && localGameOver) { 
        localGameOver = false; setGameOver(false); localScore = 0; setScore(0); obstacles.length = 0;
        spawnTimer = 0; speed = 6; obstacleInterval = 1100; 
      } 
    };
    window.addEventListener('keydown', onKey);

    const loop = (ts: number) => {
      const dt = ts - last;
      last = ts;
      
      if (localGameOver) { 
        ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR); ctx.fillStyle = '#0b0b0b';
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); ctx.fillStyle = '#222'; ctx.fillRect(0, groundY + 2, canvas.clientWidth, 10); ctx.font = `${playerFont}px serif`; ctx.textAlign = 'left';
        ctx.textBaseline = 'top'; ctx.fillText('🧑‍🚀', player.x, player.y); ctx.font = `28px serif`; for (const ob of obstacles) ctx.fillText(ob.char, ob.x, ob.y);
        raf = requestAnimationFrame(loop); return; 
      }

      spawnTimer += dt;
      if (spawnTimer > obstacleInterval) { 
        spawnTimer = 0; spawn(); if (obstacleInterval > 650) obstacleInterval -= 12; speed += 0.08;
      }
      
      player.vy += gravity; player.y += player.vy;
      if (player.y >= groundY - player.h) { 
        player.y = groundY - player.h; player.vy = 0; player.onGround = true;
      }
      
      for (let i = obstacles.length - 1; i >= 0; i--) { 
        const ob = obstacles[i];
        ob.x -= speed; 
        if (ob.x + ob.w < -20) { 
          obstacles.splice(i, 1); localScore += 1; setScore(localScore);
        } 
      }
      
      for (const ob of obstacles) { 
        const pL = player.x, pR = player.x + player.w, pT = player.y, pB = player.y + player.h;
        const oL = ob.x, oR = ob.x + ob.w, oT = ob.y, oB = ob.y + ob.h;
        if (!(pR < oL || pL > oR || pB < oT || pT > oB)) { 
          localGameOver = true;
          setGameOver(true); 
        } 
      }

      ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR); ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); ctx.fillStyle = '#222'; ctx.fillRect(0, groundY + 2, canvas.clientWidth, 10);
      ctx.font = `${playerFont}px serif`; ctx.textAlign = 'left';
      ctx.textBaseline = 'top'; ctx.fillText('🧑‍🚀', player.x, player.y);
      ctx.font = `28px serif`; for (const ob of obstacles) ctx.fillText(ob.char, ob.x, ob.y);
      ctx.fillStyle = '#aaa'; ctx.font = '12px monospace'; ctx.fillText(`Score: ${localScore}`, 10, 14);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, [showGame]);

  return (
    <section id="ojt" className="py-20 relative overflow-hidden border-b border-white/5">
      <div className="container-max relative px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="font-pixel text-xs bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1.5 rounded-sm">OJT Experience</span>
          <h2 className="text-3xl font-bold text-white mt-3">On-The-Job <span className="text-gradient-red">Training</span></h2>
          <p className="text-neutral-400 mt-3 max-w-md mx-auto">Real-world workplace experience applying skills in a professional environment.</p>
        </ScrollReveal>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {ojtEntries.map((entry, idx) => (
            <ScrollReveal key={entry.id} delay={idx * 0.1}>
              <div className={`glass rounded-sm border-2 ${entry.borderColor} p-6`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{entry.role}</h3>
                    <p className="text-crimson-400 text-sm">{entry.company} · {entry.duration}</p>
                  </div>
                </div>
                
                <p className="text-neutral-400 mt-3">{entry.description}</p>
                <ul className="grid sm:grid-cols-2 gap-2 mt-4">
                  {entry.tasks.map((t) => (
                    <li key={t} className="text-neutral-400 text-sm flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${entry.dotColor}`} />
                      {t}
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {entry.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setLightbox({ images: entry.images, index: i })} 
                      className="relative group aspect-video rounded-sm overflow-hidden border border-white/5 bg-neutral-900 flex items-center justify-center"
                    >
                      <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn size={18} className="text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <h3 className="text-lg font-pixel text-neutral-300 mb-2">BORED?</h3>
          <button
            onClick={() => setShowGame(s => !s)}
            className="pixel-btn bg-black/20 border-2 border-white/10 text-white px-4 py-2 text-xs font-pixel hover:bg-white/5 transition-all"
          >
            {showGame ? 'CLOSE GAME' : 'PLAY A GAME'}
          </button>

          {showGame && (
            <div className="mt-4 animate-fade-in">
              <canvas
                ref={canvasRef}
                id="dino-canvas"
                className="w-full max-w-2xl h-40 mx-auto rounded-sm border-2 border-white/10 bg-[#0b0b0b] block shadow-2xl"
              />
              <p className="text-neutral-500 text-xs mt-2 font-mono">
                {gameOver ? (
                  <span className="text-red-400 font-bold animate-pulse">GAME OVER — PRESS 'R' TO RESTART INTERN MISSION</span>
                ) : (
                  "Press SPACEBAR or UP ARROW to leap over oncoming alien obstacles."
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <Lightbox 
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
