import { ExternalLink, ArrowRight, Sparkles, Github } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

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
}

const projects: Project[] = [
  {
    id: 1,
    title: 'SSCRecoletos Connect',
    subtitle: 'Outreach Program Satisfaction System',
    description:
      'A web-based satisfaction monitoring platform designed to collect, analyze, and visualize feedback from outreach participants. Built with a focus on usability and insightful data reporting.',
    image: '/images/files_10350705-2026-05-26T08-24-20-248Z-files_10350705-2026-05-26T08-20-46-763Z-image.webp',
    tags: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Responsive Design'],
    features: ['User feedback collection', 'Survey analytics dashboard', 'Response management', 'Satisfaction reporting'],
    liveUrl: 'http://connect-outreach-joy.lovable.app/',
    githubUrl: null,
    badge: null,
    accent: '#3b82f6',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 2,
    title: 'Smart Library System',
    subtitle: 'San Sebastian College Web-Based Library Management',
    description:
      'A capstone project developed for San Sebastian College Recoletos-Manila focused on modernizing library management through digital solutions. Full-featured book catalog, search, and admin dashboard.',
    image: '/images/files_10350705-2026-05-26T08-24-22-058Z-files_10350705-2026-05-26T08-21-29-171Z-Screenshot_2026-03-13_164205.png',
    tags: ['Full Stack', 'MySQL', 'JavaScript', 'UI/UX Design', 'Database Management'],
    features: ['Book catalog management', 'Online search & filtering', 'Student borrowing records', 'Admin dashboard & analytics'],
    liveUrl: null,
    githubUrl: null,
    badge: 'Software Engineering Project',
    accent: '#c41230',
    borderColor: 'border-crimson-DEFAULT/30',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-crimson-DEFAULT opacity-5 blur-3xl pointer-events-none" />

      <div className="container-max px-6">
        <ScrollReveal className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-pixel text-xs bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1.5 rounded-sm">
              ✨ Featured Projects
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Featured <span className="text-gradient-red">Projects in School</span>
          </h2>
          <p className="text-neutral-400 mt-3 max-w-lg mx-auto flex items-center justify-center gap-2 text-sm">
            <Sparkles size={14} className="text-crimson-400" />
            Real projects built during my academic journey
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              className={`group relative rounded-sm border-2 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${project.borderColor}`}
              style={{ background: '#111111' }}
            >
              <div className="relative grid lg:grid-cols-2 gap-0">
                {/* Image side */}
                <div className={`relative ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-52 overflow-hidden bg-[#0a0a0a]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 brightness-[0.7] saturate-[0.9]"
                    />
                    {/* Strong dark overlay covering the full image */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    {/* Directional fade toward content */}
                    <div
                      className={`absolute inset-0 hidden lg:block ${
                        idx % 2 !== 0
                          ? 'bg-gradient-to-l from-transparent to-[#111111]'
                          : 'bg-gradient-to-r from-transparent to-[#111111]'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111] lg:hidden" />
                  </div>

                  {project.badge && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1.5 bg-crimson-DEFAULT backdrop-blur-sm text-white text-[10px] font-pixel font-semibold px-3 py-1.5 rounded-sm border-2 border-crimson-300/60 shadow-lg">
                        <span>⭐</span>
                        {project.badge}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div
                  className={`p-7 lg:p-9 flex flex-col justify-center bg-[#111111] ${
                    idx % 2 !== 0 ? 'lg:order-1' : ''
                  }`}
                >
                  <div
                    className="inline-block self-start font-pixel text-[10px] px-2.5 py-1 rounded-sm border-2 mb-3"
                    style={{ borderColor: `${project.accent}60`, color: project.accent, background: `${project.accent}15` }}
                  >
                    {project.subtitle}
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-5">{project.description}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                    {project.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-neutral-400 text-xs">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: project.accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-pixel px-2 py-1 rounded-sm border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2 text-xs px-4 py-2"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2 text-xs px-4 py-2"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <div className="text-neutral-500 text-xs font-pixel italic">
                        Private Institutional Project
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
