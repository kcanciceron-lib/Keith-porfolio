import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, Gamepad2, RotateCcw } from 'lucide-react';

// 👇 COMMENT: CANONICAL DATA REPOSITORY ARRAY (DECLARED EXACTLY ONCE AT THE TOP) 👇
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

interface LightboxState {
  images: { src: string; caption: string }[];
  index: number;
}

export default function OJTGame() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 👇 COMMENT: ASTRONAUT RETRO CANVAS JUMP MACHINE LOOP 👇
  useEffect(() => {
    if (!showGame || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let scoreCounter = 0;

    // Player Properties
    let pY = 100;
    let vY = 0;
    const gravity = 0.6;
    let isJumping = false;

    // Obstacle Properties
    let obsX = 760;
    let obsSpeed = 5;

    const handleInput = (e: KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'ArrowUp') && !isJumping) {
        vY = -11.5;
        isJumping = true;
      }
    };
    window.addEventListener('keydown', handleInput);

    const updateFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Floor ground drawing
      ctx.strokeStyle = '#262626';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 135);
      ctx.lineTo(800, 135);
      ctx.stroke();

      // Physics Engine
      vY += gravity;
      pY += vY;
      if (pY >= 100) {
        pY = 100;
        vY = 0;
        isJumping = false;
      }

      // Obstacle Tracking
      obsX -= obsSpeed;
      if (obsX < -40) {
        obsX = 820;
        scoreCounter++;
        setGameScore(scoreCounter);
        if (scoreCounter % 3 === 0) obsSpeed += 0.7; // Variable acceleration
      }

      // Render Text Vectors as high fidelity custom character elements
      ctx.font = '32px Arial';
      ctx.fillText('🧑‍🚀', 60, pY + 26);
      ctx.fillText('👾', obsX, 128);

      // AABB Box Hit Intersection Tests Tailored for Emoji sizing bounds
      if (obsX > 50 && obsX < 92 && pY > 70) {
        setGameOver(true);
        cancelAnimationFrame(animId);
        return;
      }

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => {
      window.removeEventListener('keydown', handleInput);
      cancelAnimationFrame(animId);
    };
  }, [showGame]);

  const triggerRestart = () => {
    setGameOver(false);
    setGameScore(0);
    setShowGame(false);
    setTimeout(() => setShowGame(true), 40);
  };

  return (
    <section id="ojt" ref={sectionRef} className="relative py-16 overflow-hidden z-10">
      <div className="container-max px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            On-The-Job <span className="text-gradient-red">Training</span>
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">Real-world workplace experience applying skills in production environments.</p>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto mb-14">
          {ojtEntries.map((entry) => (
            <div key={entry.id} className={`glass rounded-sm border-2 ${entry.borderColor} p-6 sm:p-8`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{entry.role}</h3>
                  <p className="text-crimson-400 text-sm font-medium">{entry.company} · {entry.duration}</p>
                </div>
                <span className={`font-pixel text-[10px] px-2.5 py-1 rounded-sm border ${entry.badgeColor}`}>🏢 INTERN</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">{entry.description}</p>
              
              <ul className="grid sm:grid-cols-2 gap-2 mt-4 text-neutral-400 text-sm">
                {entry.tasks.map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${entry.dotColor}`} />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                {entry.images.map((img, idx) => (
                  <button key={idx} onClick={() => setLightbox({ images: entry.images, index: idx })} className="border border-white/10 rounded-sm overflow-hidden aspect-video group relative">
                    <img src={img.src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 👇 COMMENT: RETRO ARCADIA INTERACTIVE MINIGAME BLOCK CONTAINER 👇 */}
        <div className="w-full bg-neutral-900/30 border border-white/5 rounded-sm p-6 max-w-2xl mx-auto flex flex-col items-center shadow-xl">
          <div className="text-center mb-4">
            <h4 className="font-pixel text-xs text-white uppercase tracking-widest">BORED?</h4>
            <p className="text-neutral-500 text-[10px] font-pixel mt-0.5">Jump over incoming alien monsters!</p>
          </div>

          {!showGame ? (
            <button onClick={() => { setGameOver(false); setGameScore(0); setShowGame(true); }} className="flex items-center gap-2 font-pixel text-[10px] px-5 py-2.5 bg-crimson-DEFAULT/20 border border-crimson-500 text-crimson-300 rounded-sm hover:bg-crimson-DEFAULT/30 transition-all uppercase tracking-wider">
              <Gamepad2 size={14} /> Play Mini-Game
            </button>
          ) : (
            <div className="relative w-full border border-white/10 bg-black p-4 rounded-sm">
              <div className="flex justify-between font-pixel text-[10px] text-neutral-500 mb-3">
                <span className="text-crimson-400 tracking-wider">SCORE: {gameScore}</span>
                <button onClick={() => setShowGame(false)} className="hover:text-white transition-colors">CLOSE</button>
              </div>
              <canvas ref={canvasRef} width={800} height={160} className="w-full h-[160px] bg-neutral-950 rounded-sm" />
              
              {gameOver && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-sm z-20">
                  <span className="font-pixel text-xs text-red-500 mb-3 tracking-widest">GAME OVER</span>
                  <button onClick={triggerRestart} className="flex items-center gap-1.5 font-pixel text-[9px] bg-white text-black px-4 py-2 rounded-sm hover:bg-neutral-200 transition-colors uppercase tracking-wide">
                    <RotateCcw size={12}/> Restart Game
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Overlay Window */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white"><X size={24}/></button>
            <img src={lightbox.images[lightbox.index].src} className="max-w-full max-h-[75vh] border border-white/10 rounded-sm object-contain mx-auto" alt="" />
            <p className="text-center font-pixel text-xs text-neutral-400 mt-4 bg-black/60 py-2 rounded-sm">{lightbox.images[lightbox.index].caption}</p>
            {lightbox.images.length > 1 && (
              <div className="flex justify-center gap-4 mt-3">
                <button disabled={lightbox.index === 0} onClick={() => setLightbox(p => p ? { ...p, index: p.index - 1 } : null)} className="px-3 py-1 bg-white/10 text-white text-xs rounded-sm disabled:opacity-30">Prev</button>
                <button disabled={lightbox.index === lightbox.images.length - 1} onClick={() => setLightbox(p => p ? { ...p, index: p.index + 1 } : null)} className="px-3 py-1 bg-white/10 text-white text-xs rounded-sm disabled:opacity-30">Next</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
