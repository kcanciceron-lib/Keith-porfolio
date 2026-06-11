import { useEffect, useRef } from 'react';
import { Code2, Palette, TestTube, Lightbulb, Camera, Video } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Full Stack Development', desc: 'End-to-end web solutions' },
  { icon: Palette, label: 'UI/UX Design', desc: 'Figma & design systems' },
  { icon: TestTube, label: 'QA Testing', desc: 'Manual testing & bug reports' },
  { icon: Lightbulb, label: 'Product Thinking', desc: 'User-centered ideation' },
  { icon: Camera, label: 'Photo Editing', desc: 'Visual enhancement' },
  { icon: Video, label: 'Video Editing', desc: 'Content creation' },
];

const stats = [
  { value: '3rd Yr', label: 'Currently' },
  { value: '2027', label: 'Graduation' },
  { value: '5+', label: 'Projects Built' },
  { value: 'Full Stack', label: 'Focus Area' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-DEFAULT/30 to-transparent" />
      <div className="absolute -left-40 top-20 w-80 h-80 rounded-full bg-crimson-DEFAULT opacity-5 blur-3xl pointer-events-none" />

      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-crimson-DEFAULT" />
            <span className="text-crimson-400 text-sm font-medium tracking-widest uppercase">About Me</span>
            <div className="h-px w-8 bg-crimson-DEFAULT" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Who I <span className="text-gradient-red">Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <div className="reveal-left">
            <div className="glass rounded-2xl p-8 border border-white/8 mb-6">
              <div className="inline-flex items-center gap-2 bg-crimson-DEFAULT/10 border-2 border-crimson-400 rounded-sm px-3 py-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-crimson-400 text-xs font-pixel font-semibold">⚡ 3rd Year BSIT • 2027</span>
              </div>
              <p className="text-neutral-300 text-base leading-relaxed mb-5">
                Hi, I'm <span className="text-white font-semibold">Keith Czimonne Anderson Ciceron</span> — a 3rd Year BS Information Technology student at{' '}
                <span className="text-crimson-400 font-medium">San Sebastian College Recoletos-Manila</span> with a passion for building intuitive digital experiences through design and development.
              </p>
              <p className="text-neutral-400 text-base leading-relaxed mb-5">
                My background combines full stack development, UI/UX design, QA testing, product thinking, and creative direction. I enjoy turning ideas into functional and visually engaging systems that solve real-world problems.
              </p>
              <p className="text-neutral-400 text-base leading-relaxed">
                I'm constantly learning, building, and pushing myself toward creating impactful technology that is both technically strong and enjoyable to use. With graduation coming in 2027, I'm excited to bring my skills to industry-level projects.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 border border-white/8 text-center hover:border-crimson-DEFAULT/30 transition-all duration-300 group">
                  <p className="text-2xl font-bold text-white group-hover:text-crimson-400 transition-colors duration-300">{stat.value}</p>
                  <p className="text-neutral-500 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Skill highlights */}
          <div className="reveal-right">
            <h3 className="text-lg font-semibold text-white mb-6">What I bring to the table</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="glass rounded-xl p-5 border border-white/8 hover:border-crimson-DEFAULT/30 transition-all duration-300 group cursor-default"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-crimson-DEFAULT/10 flex items-center justify-center flex-shrink-0 group-hover:bg-crimson-DEFAULT/20 transition-colors duration-300">
                        <Icon size={18} className="text-crimson-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{item.label}</p>
                        <p className="text-neutral-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
