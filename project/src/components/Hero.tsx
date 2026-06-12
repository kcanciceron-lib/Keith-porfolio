import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, FileText, Folder } from 'lucide-react';
import ContactModal from './ContactModal';

const PROFILE_IMAGE = '/images/me.jpg';

const roles = ['Full Stack Developer', 'UI/UX Designer', 'Web Developer', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);

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
        ctx.fillStyle = `rgba(196, 18, 48, ${p.alpha})`;
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
            ctx.strokeStyle = `rgba(196, 18, 48, ${0.06 * (1 - dist / 120)})`;
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
  }, []);

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
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-crimson-DEFAULT animate-float-slow pointer-events-none z-0" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl bg-crimson-deep animate-float pointer-events-none z-0" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-DEFAULT to-transparent z-10 pointer-events-none" />

      <div className="container-max px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-screen py-16">

          {/* Left — Text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <div className="h-px w-8 bg-crimson-DEFAULT" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-crimson-400 text-sm font-medium tracking-widest uppercase">Available for work</span>
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
              <span className="font-pixel text-sm bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1.5 rounded-sm">
                👾 Full Stack Developer
              </span>
              <span className="font-pixel text-sm bg-blue-500/20 border-2 border-blue-400 text-blue-300 px-3 py-1.5 rounded-sm">
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
              <span className="w-0.5 h-6 bg-crimson-DEFAULT animate-pulse" />
            </div>

            <p
              className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-md opacity-0 animate-slide-up"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              I build modern, scalable, and user-centered digital experiences
              through code, design, and innovation.
            </p>

            <div
              className="flex flex-wrap gap-3 opacity-0 animate-slide-up"
              style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2"
              >
                <Folder size={16} />
                View Projects
              </button>
              <button
                onClick={() => setContactOpen(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={16} />
                Socials
              </button>
              <button
                onClick={() => window.open('/documents/Ciceron,_Keith_Czimonne_Anderson_RESUME_(3).pdf', '_blank')}
                className="btn-secondary flex items-center gap-2"
              >
                <FileText size={16} />
                View Resume
              </button>
            </div>

            <div
              className="flex items-center gap-4 opacity-0 animate-slide-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              <span className="text-neutral-500 text-sm">Find me on</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:border-crimson-DEFAULT/50 hover:glow-red-sm transition-all duration-300 group"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:border-crimson-DEFAULT/50 hover:glow-red-sm transition-all duration-300"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:ciceronkeith4@gmail.com"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:border-crimson-DEFAULT/50 hover:glow-red-sm transition-all duration-300"
                >
                  <Mail size={18} />
                </a>
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
              <div className="absolute -inset-4 rounded-3xl bg-crimson-gradient opacity-15 blur-xl animate-pulse-glow" />

              {/* Card */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden glass-strong border border-white/10 animate-float group">
                <img
                  src={PROFILE_IMAGE}
                  alt="Keith Czimonne Anderson Ciceron"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="glass rounded-xl px-4 py-3">
                    <p className="text-white font-semibold text-sm">Keith Ciceron</p>
                    <p className="text-crimson-400 text-xs mt-0.5">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Floating badge — experience */}
              <div className="absolute -top-3 -right-3 glass rounded-2xl px-4 py-3 border border-white/10 animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-white font-bold text-xl leading-none">BSIT</p>
                <p className="text-neutral-400 text-xs mt-0.5">Student</p>
              </div>

              {/* Floating badge — status */}
              <div className="absolute -bottom-3 -left-3 glass rounded-2xl px-4 py-3 border border-crimson-DEFAULT/30 animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-white text-xs font-medium">Open to opportunities</p>
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
