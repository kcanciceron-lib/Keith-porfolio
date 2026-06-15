import { Code2, Palette, TestTube, Lightbulb, Camera, Video, Award, Heart, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const highlights = [
  { icon: Code2, label: 'Full Stack Development', desc: 'End-to-end web solutions' },
  { icon: Palette, label: 'UI/UX Design', desc: 'Figma & design systems' },
  { icon: TestTube, label: 'QA Testing', desc: 'Manual testing & bug reports' },
  { icon: Lightbulb, label: 'Product Thinking', desc: 'User-centered ideation' },
  { icon: Camera, label: 'Photo Editing', desc: 'Visual enhancement' },
  { icon: Video, label: 'Video Editing', desc: 'Content creation' },
];

const attributes = [
  { label: 'STR (Strength)', value: '88', desc: 'Database Design & Backend APIs' },
  { label: 'AGI (Agility)', value: '92', desc: 'Fast Interface Load Times & Easing' },
  { label: 'INT (Intellect)', value: '95', desc: 'Algorithm Design & QA Diagnostics' },
  { label: 'VIT (Vitality)', value: '85', desc: 'Code Maintainability & Clean Docs' }
];

const skillBars = [
  { name: 'FRONTEND DEVELOPMENT', percent: 90, color: 'bg-emerald-500' },
  { name: 'BACKEND SERVICES & APIs', percent: 30, color: 'bg-blue-500' },
  { name: 'DATABASE & ARCHITECTURE', percent: 20, color: 'bg-yellow-500' },
  { name: 'UI/UX & WIREFRAMING', percent: 75, color: 'bg-pink-500' },
  { name: 'QA TESTING & DEBUGGING', percent: 40, color: 'bg-cyan-500' },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-DEFAULT/30 to-transparent" />
      <div className="absolute -left-40 top-20 w-80 h-80 rounded-full bg-crimson-DEFAULT opacity-5 blur-3xl pointer-events-none" />

      <div className="container-max">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-crimson-DEFAULT" />
            <span className="text-crimson-400 text-sm font-medium tracking-widest uppercase">About Me</span>
            <div className="h-px w-8 bg-crimson-DEFAULT" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Who I <span className="text-gradient-red">Am</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — RPG Character Sheet Panel */}
          <ScrollReveal direction="left">
            <div className="glass p-6 border-2 border-white/10 relative overflow-hidden space-y-6 text-left" style={{ borderRadius: '0px', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
              {/* Scanline CRT overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.015] z-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                  backgroundSize: '100% 4px, 6px 100%'
                }}
              />
              
              {/* Character Sheet Title Header */}
              <div className="border-b-2 border-white/10 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h3 className="text-white text-xs md:text-sm font-bold tracking-widest flex items-center gap-1.5">
                    🛡️ PROFILE SHEET: KEITH.DEV
                  </h3>
                  <p className="text-[7.5px] text-neutral-400 mt-1 uppercase tracking-wider">Class: Full Stack Developer / Builder / Creator</p>
                </div>
                <div className="flex items-center gap-2 border-2 border-crimson-500 bg-crimson-DEFAULT/10 px-2.5 py-1" style={{ borderRadius: '0px' }}>
                  <Award size={12} className="text-crimson-400" />
                  <span className="text-crimson-400 font-bold text-[8.5px] uppercase tracking-wider">LEVEL 22</span>
                </div>
              </div>

              {/* Status Bars (HP & MP) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* HP Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] tracking-wider text-neutral-400 uppercase">
                    <span className="flex items-center gap-1"><Heart size={8} className="text-red-500 fill-red-500" /> HP (Energy)</span>
                    <span className="text-white">100/100</span>
                  </div>
                  <div className="border-2 border-white/10 p-0.5" style={{ borderRadius: '0px' }}>
                    <div className="h-2 bg-red-600 w-full" />
                  </div>
                </div>

                {/* MP Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] tracking-wider text-neutral-400 uppercase">
                    <span className="flex items-center gap-1"><Zap size={8} className="text-cyan-400 fill-cyan-400" /> MP (Creativity)</span>
                    <span className="text-white">99/99</span>
                  </div>
                  <div className="border-2 border-white/10 p-0.5" style={{ borderRadius: '0px' }}>
                    <div className="h-2 bg-cyan-500 w-[95%]" />
                  </div>
                </div>
              </div>

              {/* Core Attributes Matrix */}
              <div className="space-y-2.5">
                <h4 className="text-[8px] text-neutral-400 uppercase tracking-widest font-bold font-pixel">Core Attributes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {attributes.map((attr) => (
                    <div key={attr.label} className="border border-white/5 bg-neutral-900/40 p-2.5 animate-pulse-slow" style={{ borderRadius: '0px' }}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white font-bold text-[8px] tracking-wider uppercase">{attr.label}</span>
                        <span className="text-crimson-400 font-bold text-[9px]">{attr.value}</span>
                      </div>
                      <p className="text-neutral-500 text-[6.5px] leading-relaxed uppercase tracking-wider">{attr.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Short Bio Block */}
              <div className="border-t border-white/10 pt-4 text-[8px] sm:text-[9px] text-neutral-400 leading-relaxed space-y-3">
                <p>
                  Hi, I'm <span className="text-white font-semibold">Keith Czimonne Anderson Ciceron</span> — a 3rd Year BSIT student at <span className="text-crimson-400 font-medium">San Sebastian College Recoletos-Manila</span>. With graduation targeted for 2027, I specialize in combining robust full-stack engineering with creative design layers.
                </p>
                <p>
                  My mission is to build scalable backend architectures and visually spectacular user interfaces that make software memorable, unique, and professional.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Skills Inventory & Inventory Grid */}
          <ScrollReveal direction="right" className="space-y-8">
            {/* Skills Inventory */}
            <div className="glass p-6 border-2 border-white/10 space-y-4" style={{ borderRadius: '0px', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
              <h3 className="text-white text-xs md:text-sm font-bold tracking-widest text-left border-b border-white/10 pb-2 mb-3 font-pixel">
                🎒 SKILLS INVENTORY
              </h3>
              <div className="space-y-4">
                {skillBars.map((skill) => (
                  <div key={skill.name} className="space-y-1 text-left">
                    <div className="flex justify-between text-[7px] tracking-wider uppercase text-neutral-400 font-pixel">
                      <span>{skill.name}</span>
                      <span className="text-white font-bold">{skill.percent}%</span>
                    </div>
                    <div className="border-2 border-white/10 p-0.5" style={{ borderRadius: '0px' }}>
                      <div className={`h-2 ${skill.color} transition-all duration-500`} style={{ width: `${skill.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RPG Specializations Items Box */}
            <div className="glass p-6 border-2 border-white/10 space-y-4" style={{ borderRadius: '0px', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
              <h3 className="text-white text-xs md:text-sm font-bold tracking-widest text-left border-b border-white/10 pb-2 mb-4 font-pixel">
                📦 SPECIALIZATION ACCESSORIES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="border border-white/10 bg-neutral-900/40 p-3 hover:border-crimson-DEFAULT/30 transition-all duration-300 group cursor-default text-left flex items-start gap-3 animate-float"
                      style={{ animationDelay: `${i * 300}ms`, borderRadius: '0px' }}
                    >
                      <div className="w-8 h-8 bg-crimson-DEFAULT/10 border border-crimson-400/55 flex items-center justify-center flex-shrink-0 group-hover:bg-crimson-DEFAULT/20 transition-colors duration-300" style={{ borderRadius: '0px' }}>
                        <Icon size={14} className="text-crimson-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-[8px] sm:text-[9px] uppercase tracking-wider">{item.label}</p>
                        <p className="text-neutral-500 text-[6.5px] mt-0.5 uppercase leading-normal tracking-wide">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
