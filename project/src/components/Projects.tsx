import { useEffect, useRef } from 'react';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

const projects = [
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
    badge: 'Capstone Project',
    accent: '#c41230',
    borderColor: 'border-crimson-DEFAULT/30',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-crimson-DEFAULT opacity-5 blur-3xl pointer-events-none" />

      <div className="container-max px-6">
        <div className="text-center mb-10 reveal">
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
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`reveal group relative rounded-sm border-2 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${project.borderColor}`}
              style={{ background: '#111111', transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative grid lg:grid-cols-2 gap-0">
                {/* Image side */}
                <div className={`relative ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-52 overflow-hidden bg-[#0a0a0a]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 brightness-[0.55] saturate-[0.8]"
                    />
                    {/* Strong dark overlay covering the full image */}
                    <div className="absolute inset-0 bg-black/30" />
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
                      <div className="flex items-center gap-1.5 bg-crimson-DEFAULT backdrop-blur-sm text-white text-xs font-pixel font-semibold px-3 py-1.5 rounded-sm border-2 border-crimson-300/60">
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
                    className="inline-block self-start font-pixel text-xs px-2.5 py-1 rounded-sm border-2 mb-3"
                    style={{ borderColor: `${project.accent}60`, color: project.accent, background: `${project.accent}15` }}
                  >
                    {project.subtitle}
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-5">{project.description}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-5">
                    {project.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-neutral-300 text-xs">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: project.accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-pixel px-2.5 py-1 rounded-sm border-2 border-white/10 bg-white/5 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start btn-primary flex items-center gap-2 text-sm"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
