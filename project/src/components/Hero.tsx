import { useEffect, useRef, useState } from 'react';
import { ArrowDown, FileText, Folder } from 'lucide-react';
import ContactModal from './ContactModal';
import { useTheme } from '../context/ThemeContext';
import { 
  LinkedInPixelIcon, 
  GitHubPixelIcon, 
  MailPixelIcon,
  FacebookPixelIcon,
  InstagramPixelIcon,
  TikTokPixelIcon,
  PhonePixelIcon
} from './PixelIcons';

const socialOutlets = [
  { name: 'Facebook', href: 'https://www.facebook.com/keith.ciceron', icon: FacebookPixelIcon, borderHover: 'hover:border-blue-500/50' },
  { name: 'Instagram', href: 'https://www.instagram.com/mon.czii', icon: InstagramPixelIcon, borderHover: 'hover:border-pink-500/50' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@keith_ciceron', icon: TikTokPixelIcon, borderHover: 'hover:border-neutral-500/50' },
  { name: 'Gmail', href: 'mailto:ciceronkeith4@gmail.com', icon: MailPixelIcon, borderHover: 'hover:border-red-500/50' },
  { name: 'GitHub', href: 'https://github.com/keith-ciceron', icon: GitHubPixelIcon, borderHover: 'hover:border-purple-500/50' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/keith-ciceron', icon: LinkedInPixelIcon, borderHover: 'hover:border-blue-400/50' },
  { name: 'Phone', href: 'tel:+639682544293', icon: PhonePixelIcon, borderHover: 'hover:border-green-500/50' },
];

const PROFILE_IMAGE = '/images/me.jpg';

const roles = ['Full Stack Developer', 'UI/UX Designer', 'Web Developer', 'Problem Solver'];

export default function Hero() {
  const { accentColor, setMode, mode } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Terminal state hooks
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'SYSTEM BOOT SUCCESSFUL...',
    'CONNECTING TO KEITH-DB...',
    'ESTABLISHED SECURE LINK.',
    'TYPE "help" FOR AVAILABLE COMMANDS.'
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];
    if (cmd === 'help') {
      response = [
        `> ${terminalInput}`,
        'AVAILABLE COMMANDS:',
        ' - skills: Display developer skills stack',
        ' - contact: Display email and phone contact',
        ' - ojt: Display San Sebastian OJT details',
        ' - space: Toggle Space Mode galaxy theme',
        ' - clear: Clear the console terminal logs'
      ];
    } else if (cmd === 'skills') {
      response = [
        `> ${terminalInput}`,
        'TECH STACK CORE:',
        ' [FRONTEND] React, TypeScript, TailwindCSS',
        ' [BACKEND] Node.js, Express, REST APIs',
        ' [DATABASE] MySQL, PostgreSQL, Supabase'
      ];
    } else if (cmd === 'contact') {
      response = [
        `> ${terminalInput}`,
        'CONTACT CHANNELS:',
        ' EMAIL: ciceronkeith4@gmail.com',
        ' TEL: +639682544293',
        ' REGION: Manila, Philippines'
      ];
    } else if (cmd === 'ojt') {
      response = [
        `> ${terminalInput}`,
        'OJT MILESTONES:',
        ' - Satisfaction Survey Outreach portal developer',
        ' - Frontend styling & layout symmetry adjustments',
        ' - Interactive component integration & testing'
      ];
    } else if (cmd === 'space') {
      const nextMode = mode === 'space' ? 'plain' : 'space';
      response = [
        `> ${terminalInput}`,
        `TOGGLING SPACE MODE -> ${nextMode.toUpperCase()}...`,
      ];
      setTimeout(() => {
        setMode(nextMode);
      }, 400);
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      response = [
        `> ${terminalInput}`,
        `bash: command not found: ${cmd}`,
        'Type "help" for a list of valid options.'
      ];
    }

    setTerminalHistory(prev => [...prev, ...response]);
    setTerminalInput('');
  };

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Typewriter
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex + 1));
        setCharIndex(i => i + 1);
      }, 80);
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex - 1));
        setCharIndex(i => i - 1);
      }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  // Particle canvas
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accentColor + '66';
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accentColor + '10';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [accentColor]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float-slow pointer-events-none z-0" style={{ backgroundColor: accentColor }} />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl animate-float pointer-events-none z-0" style={{ backgroundColor: accentColor }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-DEFAULT to-transparent z-10 pointer-events-none" />

      <div className="container-max px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center min-h-screen py-24 lg:py-16">

          {/* Left — Text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium tracking-widest uppercase" style={{ color: accentColor }}>Available for work</span>
              </div>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight opacity-0 animate-slide-up"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <span className="text-white">Keith</span>
              <br />
              <span className="text-white">Czimonne</span>
              <br />
              <span className="text-gradient-red">Anderson</span>
              <br />
              <span className="text-white">Ciceron</span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-2 opacity-0 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              <span className="font-pixel text-sm bg-red-500/10 border-2 border-red-500/40 text-red-400 px-3 py-1.5 rounded-sm">
                👾 Full Stack Developer
              </span>
              <span className="font-pixel text-sm bg-blue-500/10 border-2 border-blue-400 text-blue-300 px-3 py-1.5 rounded-sm">
                ✦ Creative Coder
              </span>
            </div>

            <div
              className="flex items-center gap-2 opacity-0 animate-slide-up"
              style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
            >
              <span className="text-xl sm:text-2xl font-semibold text-neutral-200">
                {displayed}
              </span>
              <span className="w-0.5 h-6 animate-pulse" style={{ backgroundColor: accentColor }} />
            </div>

            <p
              className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-md opacity-0 animate-slide-up"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              I build modern, scalable, and user-centered digital experiences
              through code, design, and innovation.
            </p>

            <div
              className="flex flex-wrap gap-4 opacity-0 animate-slide-up"
              style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="pixel-btn-retro flex items-center gap-2 px-5 py-2.5 bg-crimson-DEFAULT text-white text-[10px] uppercase tracking-wider"
              >
                <Folder size={14} />
                View Projects
              </button>
              <button
                onClick={() => window.open('/documents/Ciceron,_Keith_Czimonne_Anderson_RESUME_(3).pdf', '_blank')}
                className="pixel-btn-retro flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-[10px] uppercase tracking-wider"
              >
                <FileText size={14} />
                View Resume
              </button>
            </div>

            {/* Interactive Retro Terminal */}
            <div
              className="w-full max-w-md border-2 border-white/10 bg-neutral-950/90 p-3 mt-4 opacity-0 animate-slide-up select-text font-mono relative overflow-hidden"
              style={{ animationDelay: '820ms', animationFillMode: 'forwards', borderRadius: '0px', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
            >
              {/* Scanline CRT overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.02] z-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                  backgroundSize: '100% 4px, 6px 100%'
                }}
              />
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5 mb-2 text-[8px] text-neutral-500 font-bold">
                <span>📟 KEITH-OS terminal v1.0.4</span>
                <span className="animate-pulse text-green-400">● ONLINE</span>
              </div>
              <div className="h-28 overflow-y-auto pr-1 text-left space-y-1 scrollbar-thin text-green-400 text-[8px] sm:text-[9px] leading-snug">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">{line}</div>
                ))}
                <div ref={terminalBottomRef} />
              </div>
              <form onSubmit={handleTerminalSubmit} className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-left text-green-400 text-[8px] sm:text-[9px]">
                <span className="font-bold flex-shrink-0 text-green-600">keith@dev:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help' for options..."
                  className="flex-1 bg-transparent border-none outline-none text-green-400 text-[8px] sm:text-[9px] p-0 m-0 w-full placeholder-green-900"
                  style={{ caretColor: '#22c55e' }}
                />
              </form>
            </div>

            <div
              className="flex flex-col gap-4 opacity-0 animate-slide-up mt-8 items-start w-full"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              <span className="text-neutral-500 text-[10px] font-pixel uppercase tracking-widest text-left">Find me on</span>
              <div className="flex flex-wrap gap-4 mt-2">
                {socialOutlets.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center border-2 border-white/10 bg-neutral-900/60 hover:bg-neutral-900 hover:scale-110 active:scale-95 transition-all ${social.borderHover}`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Profile Image */}
          <div
            className="flex justify-center lg:justify-end opacity-0 animate-slide-in-right"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 opacity-15 blur-xl animate-pulse-glow" style={{ backgroundColor: accentColor, borderRadius: '0px' }} />

              {/* Card */}
              <div className="relative w-64 h-72 sm:w-80 sm:h-96 max-w-full overflow-hidden glass-strong border-2 border-white/10 animate-float group" style={{ borderRadius: '0px' }}>
                <img
                  src={PROFILE_IMAGE}
                  alt="Keith Czimonne Anderson Ciceron"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="glass px-3 py-2.5 border-2 border-white/10" style={{ borderRadius: '0px' }}>
                    <p className="text-white font-semibold text-[10px] leading-snug">Keith Ciceron</p>
                    <p className="text-[7px] mt-1" style={{ color: accentColor }}>Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Floating badge — experience */}
              <div className="absolute -top-4 -right-4 glass p-2.5 border-2 border-white/10 animate-float z-20 text-left min-w-[75px]" style={{ animationDelay: '1s', borderRadius: '0px' }}>
                <p className="text-white font-bold text-[9px] md:text-[10px] leading-none">BSIT</p>
                <p className="text-neutral-400 text-[6.5px] md:text-[7px] mt-1.5 leading-none">Student</p>
              </div>

              {/* Floating badge — status */}
              <div className="absolute -bottom-4 -left-4 glass p-2.5 border-2 animate-float z-20" style={{ animationDelay: '2s', borderColor: accentColor + '4D', borderRadius: '0px' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 animate-pulse flex-shrink-0" style={{ borderRadius: '0px' }} />
                  <p className="text-white text-[6.5px] md:text-[7px] font-medium leading-none">Open to opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-neutral-500 text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-neutral-500" />
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </section>
  );
}
