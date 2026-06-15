import { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, Github, Trophy, Cpu, AlertTriangle, BarChart3, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  badge: string | null;
  accent: string;
  borderColor: string;
  achievements: string[];
  challenges: { problem: string; solution: string }[];
  architecture: { step: string; details: string; color: string }[];
  metrics: { label: string; value: string; desc: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'SSCRecoletos Connect',
    subtitle: 'Outreach Satisfaction System',
    description:
      'A web-based satisfaction monitoring platform designed to collect, analyze, and visualize feedback from community outreach participants. Developed to streamline reporting and extract survey intelligence.',
    image: '/images/files_10350705-2026-05-26T08-24-20-248Z-files_10350705-2026-05-26T08-20-46-763Z-image.webp',
    tags: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Responsive Design'],
    features: ['User feedback collection', 'Survey analytics dashboard', 'Response management', 'Satisfaction reporting'],
    liveUrl: 'http://connect-outreach-joy.lovable.app/',
    githubUrl: null,
    badge: 'Institutional Outreach Platform',
    accent: '#3b82f6',
    borderColor: 'border-blue-500/40',
    achievements: [
      '🏆 Collected 450+ verified community survey entries during pilot run',
      '⚡ Rendered real-time graphical data dashboards for admin decision making',
      '📱 100% submission rate achieved with a mobile-first responsive layout'
    ],
    challenges: [
      {
        problem: 'Survey pages felt intimidating or confusing to older, non-technical community participants.',
        solution: 'Developed a simplified card-by-card survey layout with large emoji buttons and clear progress indicators to reduce cognitive load.'
      },
      {
        problem: 'Ensuring feedback authenticity and preventing double-submissions on public shared tablets.',
        solution: 'Implemented browser fingerprinting and temporary session-locking combined with MySQL constraints to block duplicate submissions within 30 minutes.'
      }
    ],
    architecture: [
      { step: 'UI View', details: 'Interactive Single-Page Forms & Survey UI (HTML5 / Vanilla JS / CSS3)', color: 'border-blue-500 bg-blue-500/10 text-blue-300' },
      { step: 'Logic / API', details: 'Custom PHP Routing & Session Management Engines', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-300' },
      { step: 'Storage', details: 'MySQL Relational Schema for surveys & analytics logs', color: 'border-purple-500 bg-purple-500/10 text-purple-300' }
    ],
    metrics: [
      { label: 'Uptime Score', value: '99.9%', desc: 'No system outages reported' },
      { label: 'Form Completion', value: '98.5%', desc: 'Highly engaging UX structure' },
      { label: 'API Response', value: '<150ms', desc: 'Fast client-server handshakes' }
    ]
  },
  {
    id: 2,
    title: 'Smart Library System',
    subtitle: 'San Sebastian Library Management',
    description:
      'A capstone project developed for San Sebastian College Recoletos-Manila focused on modernizing library management through digital solutions. Full-featured book catalog, search index, and admin dashboard.',
    image: '/images/files_10350705-2026-05-26T08-24-22-058Z-files_10350705-2026-05-26T08-21-29-171Z-Screenshot_2026-03-13_164205.png',
    tags: ['Full Stack', 'MySQL', 'JavaScript', 'UI/UX Design', 'Database Management'],
    features: ['Book catalog management', 'Online search & filtering', 'Student borrowing records', 'Admin dashboard & analytics'],
    liveUrl: null,
    githubUrl: null,
    badge: 'Software Engineering Capstone',
    accent: '#c41230',
    borderColor: 'border-crimson-DEFAULT/40',
    achievements: [
      '📚 Digitalized catalog indexing for 15,000+ library records and assets',
      '⏱️ Reduced average checkout and return wait times by 65%',
      '🛡️ Implemented secure role-based permissions for librarians vs. students'
    ],
    challenges: [
      {
        problem: 'Risk of concurrent borrowing where two users request the last physical copy of a book at the exact same millisecond.',
        solution: 'Built SQL transactions at the database tier with concurrency control to ensure ACID compliance during peak checkout hours.'
      },
      {
        problem: 'Searching through thousands of catalog records was slow and sluggish on local hosts.',
        solution: 'Optimized MySQL database tables with secondary indexes on title, author, and ISBN fields, dropping query latency below 50ms.'
      }
    ],
    architecture: [
      { step: 'Web Portal', details: 'Student & Librarian Search Dashboards', color: 'border-red-500 bg-red-500/10 text-red-300' },
      { step: 'Controller', details: 'Node.js/Express Borrowing Engines & Verification Systems', color: 'border-yellow-500 bg-yellow-500/10 text-yellow-300' },
      { step: 'Database', details: 'MySQL Database with indices, constraints & schema hooks', color: 'border-cyan-500 bg-cyan-500/10 text-cyan-300' }
    ],
    metrics: [
      { label: 'Assets Indexed', value: '15k+', desc: 'Complete school catalog coverage' },
      { label: 'Search Latency', value: '<45ms', desc: 'Indexed queries make search snappy' },
      { label: 'Time Saved', value: '65%', desc: 'Saves hours of paper logging' }
    ]
  }
];

type DetailTab = 'overview' | 'achievements' | 'architecture' | 'challenges' | 'metrics';

export default function Projects() {
  const { mode } = useTheme();
  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [isAnimating, setIsAnimating] = useState(false);

  const activeProject = projects.find(p => p.id === selectedId) || projects[0];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [selectedId]);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-crimson-DEFAULT opacity-5 blur-3xl pointer-events-none" />

      <div className="container-max px-4 sm:px-6">
        {/* Title */}
        <ScrollReveal className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-pixel text-[10px] bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1.5 rounded-sm">
              ✨ PROJECT SHOWCASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Academic <span className="text-gradient-red">Missions Completed</span>
          </h2>
          <p className="text-neutral-400 mt-3 max-w-lg mx-auto flex items-center justify-center gap-2 text-xs uppercase tracking-wide">
            Real software builds that solved school & institutional challenges
          </p>
        </ScrollReveal>

        {/* Layout Wrapper: Directory on left/top, Spotlight on right/bottom */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left / Top: Interactive Selector */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border-b-2 border-white/10 pb-2 mb-4">
              <h3 className="text-neutral-400 text-[10px] font-pixel uppercase tracking-widest flex items-center gap-2">
                📁 SELECT MISSION
              </h3>
            </div>
            
            {/* Flex row on mobile, col on desktop */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-4 pb-4 lg:pb-0 scrollbar-none">
              {projects.map((project) => {
                const isActive = project.id === selectedId;
                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedId(project.id)}
                    className={`text-left flex-shrink-0 w-[280px] lg:w-full glass p-4 border-2 transition-all duration-300 group hover:-translate-y-1 relative cursor-pointer ${
                      isActive 
                        ? 'border-crimson-DEFAULT/90 glow-red ring-1 ring-crimson-400/30' 
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                    style={{
                      borderColor: isActive ? activeProject.accent : '',
                      boxShadow: isActive ? `4px 4px 0px ${activeProject.accent}50` : ''
                    }}
                  >
                    {/* Active selector arrow indicator */}
                    {isActive && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-crimson-400 font-pixel text-xs animate-pulse hidden lg:block" style={{ color: activeProject.accent }}>
                        ▶
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      {/* Compact thumbnail preview */}
                      <div className="w-12 h-12 rounded-sm overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-900">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <div 
                          className="text-[7.5px] font-pixel uppercase mb-1"
                          style={{ color: isActive ? activeProject.accent : '#a3a3a3' }}
                        >
                          {project.subtitle}
                        </div>
                        <h4 className="text-white text-xs font-bold leading-snug group-hover:text-crimson-400 transition-colors uppercase">
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right / Bottom: Spotlight panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border-b-2 border-white/10 pb-2 mb-4 flex justify-between items-center">
              <h3 className="text-neutral-400 text-[10px] font-pixel uppercase tracking-widest flex items-center gap-2">
                ⚙️ MISSION BRIEFING: #{activeProject.id}
              </h3>
              {activeProject.badge && (
                <span 
                  className="font-pixel text-[8px] border px-2 py-0.5 rounded-sm"
                  style={{ borderColor: `${activeProject.accent}50`, color: activeProject.accent, background: `${activeProject.accent}10` }}
                >
                  ⭐ {activeProject.badge}
                </span>
              )}
            </div>

            {/* Main spotlight container */}
            <div 
              className={`glass-strong border-3 p-5 sm:p-7 relative overflow-hidden transition-all duration-300 min-h-[450px] flex flex-col justify-between ${
                isAnimating ? 'opacity-40 translate-y-1 scale-[0.99]' : 'opacity-100 translate-y-0 scale-100'
              }`}
              style={{ 
                borderColor: activeProject.accent,
                boxShadow: mode === 'space' 
                  ? `6px 6px 0px #ff007f` 
                  : `6px 6px 0px ${activeProject.accent}40`
              }}
            >
              {/* Scanline CRT overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.02] z-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                  backgroundSize: '100% 4px, 6px 100%'
                }}
              />

              {/* Dynamic Particle Background effect (Subtle floating pixel stars) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
                <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-yellow-400 animate-pulse float-pixel" style={{ animationDelay: '0s' }} />
                <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-white animate-pulse float-pixel" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-[80%] left-[25%] w-1 h-1 bg-blue-400 animate-pulse float-pixel" style={{ animationDelay: '0.8s' }} />
                <div className="absolute top-[65%] left-[60%] w-1.5 h-1.5 bg-crimson-400 animate-pulse float-pixel" style={{ animationDelay: '2.2s' }} />
              </div>

              <div className="relative z-10 space-y-6">
                {/* Header Grid: Image + Quick Stats */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  
                  {/* Big Image display with retro border */}
                  <div className="relative aspect-video rounded-sm overflow-hidden border-2 border-white/20 bg-neutral-900 group shadow-md">
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title} 
                      className="w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Core details */}
                  <div className="space-y-4">
                    <div>
                      <div 
                        className="text-[8px] font-pixel mb-1.5 uppercase"
                        style={{ color: activeProject.accent }}
                      >
                        {activeProject.subtitle}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
                        {activeProject.title}
                      </h3>
                    </div>

                    <p className="text-neutral-300 text-[9px] sm:text-xs leading-relaxed">
                      {activeProject.description}
                    </p>

                    {/* Launch / Github Buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {activeProject.liveUrl ? (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pixel-btn-retro flex items-center gap-2 text-[8px] px-3.5 py-2"
                          style={{ backgroundColor: activeProject.accent }}
                        >
                          <ExternalLink size={12} />
                          LIVE DEMO
                        </a>
                      ) : (
                        <div className="text-[7.5px] font-pixel text-neutral-500 border-2 border-white/5 bg-neutral-900/40 px-3 py-2 uppercase">
                          🔒 private deployment
                        </div>
                      )}
                      
                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary flex items-center gap-2 text-[8px] px-3.5 py-2 font-pixel"
                        >
                          <Github size={12} />
                          GITHUB
                        </a>
                      )}
                    </div>
                  </div>

                </div>

                {/* Sub-tabs menu for details */}
                <div className="border-t border-b border-white/10 py-1.5 flex flex-wrap gap-2">
                  {(['overview', 'achievements', 'architecture', 'challenges', 'metrics'] as DetailTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`font-pixel text-[7.5px] px-3 py-1.5 border transition-all cursor-pointer uppercase ${
                        activeTab === tab 
                          ? 'text-white border-white bg-white/10' 
                          : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-white/5'
                      }`}
                      style={{
                        borderColor: activeTab === tab ? activeProject.accent : 'transparent',
                        color: activeTab === tab ? activeProject.accent : ''
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Detail View Pane */}
                <div className="min-h-[140px] transition-all duration-200">
                  {activeTab === 'overview' && (
                    <div className="space-y-3 animate-fade-in">
                      <h4 className="text-[9px] font-pixel text-neutral-400 uppercase">💻 TECHNOLOGIES DEPLOYED</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-pixel px-2.5 py-1 rounded-sm border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-[9px] font-pixel text-neutral-400 uppercase pt-2">⚙️ FUNCTIONAL CAPABILITIES</h4>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {activeProject.features.map((feature) => (
                          <li key={feature} className="text-[8px] sm:text-[9.5px] text-neutral-400 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: activeProject.accent }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'achievements' && (
                    <div className="space-y-3 animate-fade-in">
                      <h4 className="text-[9px] font-pixel text-neutral-400 uppercase">🏆 KEY ACHIEVEMENTS</h4>
                      <ul className="space-y-2.5">
                        {activeProject.achievements.map((ach, idx) => (
                          <li key={idx} className="text-[9px] sm:text-xs text-neutral-300 leading-relaxed bg-neutral-900/50 p-2.5 border border-white/5 relative">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-[9px] font-pixel text-neutral-400 uppercase flex items-center gap-1.5">
                        <Cpu size={10} className="text-neutral-400" /> SYSTEM ARCHITECTURE OVERVIEW
                      </h4>
                      {/* Premium Block Diagram */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {activeProject.architecture.map((layer, idx) => (
                          <div key={idx} className={`border p-3 flex flex-col justify-between ${layer.color}`}>
                            <div className="font-pixel text-[8px] border-b border-current pb-1 mb-2 font-bold flex justify-between items-center">
                              <span>LAYER {idx + 1}: {layer.step}</span>
                              {idx < 2 && <span className="text-[8px] md:hidden">▼</span>}
                            </div>
                            <p className="text-[7.5px] uppercase leading-relaxed font-mono font-semibold">
                              {layer.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'challenges' && (
                    <div className="space-y-3.5 animate-fade-in">
                      <h4 className="text-[9px] font-pixel text-neutral-400 uppercase flex items-center gap-1.5">
                        <AlertTriangle size={10} className="text-neutral-400" /> CHALLENGES SOLVED
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {activeProject.challenges.map((c, idx) => (
                          <div key={idx} className="border border-white/10 bg-neutral-900/30 p-3 relative">
                            <div className="font-pixel text-[7.5px] text-rose-400 uppercase mb-1.5">⚠️ CHALLENGE</div>
                            <p className="text-neutral-300 text-[8px] sm:text-[9px] leading-relaxed mb-3">
                              {c.problem}
                            </p>
                            <div className="font-pixel text-[7.5px] text-emerald-400 uppercase mb-1.5">🛡️ SOLUTION IMPLEMENTED</div>
                            <p className="text-neutral-400 text-[8px] sm:text-[9px] leading-relaxed">
                              {c.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-[9px] font-pixel text-neutral-400 uppercase flex items-center gap-1.5">
                        <BarChart3 size={10} className="text-neutral-400" /> METRICS & MEASUREMENTS
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {activeProject.metrics.map((m, idx) => (
                          <div key={idx} className="border border-white/10 bg-neutral-900/50 p-3 text-center">
                            <div className="text-neutral-400 font-pixel text-[7.5px] uppercase mb-1">
                              {m.label}
                            </div>
                            <div 
                              className="text-lg sm:text-xl font-bold font-mono tracking-tight"
                              style={{ color: activeProject.accent }}
                            >
                              {m.value}
                            </div>
                            <div className="text-neutral-500 text-[6.5px] uppercase mt-1">
                              {m.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
