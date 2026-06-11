import { useEffect, useRef } from 'react';
import { Briefcase, Camera } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'QA Assistant & Bug Finder',
    company: 'Rideshare & Opoli',
    type: 'Quality Assurance',
    period: '2023 — Present',
    icon: Briefcase,
    accentColor: 'bg-blue-500/10 border-blue-500/20',
    dotColor: 'bg-blue-400',
    responsibilities: [
      'Manual testing of application features and user flows',
      'Bug reporting and documentation with detailed reproduction steps',
      'UI issue identification and visual regression testing',
      'Retesting patches and verifying bug fixes',
      'Usability testing and UX feedback analysis',
      'Product quality assurance across multiple platforms',
    ],
    tags: ['Manual Testing', 'Bug Reporting', 'QA', 'Usability Testing'],
  },
  {
    id: 2,
    role: 'Freelance Creative Editor',
    company: 'Independent Projects',
    type: 'Creative & Design',
    period: '2022 — Present',
    icon: Camera,
    accentColor: 'bg-crimson-DEFAULT/10 border-crimson-DEFAULT/20',
    dotColor: 'bg-crimson-400',
    responsibilities: [
      'Photo editing and visual enhancement for clients',
      'Video editing and post-production for content creators',
      'Social media design and brand visual identity',
      'Content creation for digital platforms',
    ],
    tags: ['Photo Editing', 'Video Editing', 'Social Media Design', 'Photoshop'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
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
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -left-40 bottom-20 w-96 h-96 rounded-full bg-crimson-DEFAULT opacity-4 blur-3xl pointer-events-none" />

      <div className="container-max">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-pixel text-xs bg-blue-500/20 border-2 border-blue-400 text-blue-300 px-3 py-1.5 rounded-sm">
              💼 My Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            My Work <span className="text-gradient-red">Experience</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-md mx-auto">
            Hands-on experience across development, quality assurance, and creative production.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-crimson-DEFAULT/40 via-white/10 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <div
                  key={exp.id}
                  className="reveal-left relative sm:pl-16"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-sm border-2 ${exp.accentColor} flex items-center justify-center`}>
                      <span className="text-lg">{exp.role.includes('QA') ? '🧪' : '🎬'}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`glass rounded-sm p-7 border-2 ${exp.accentColor} hover:border-opacity-80 transition-all duration-300 group hover:-translate-y-1`}>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${exp.dotColor}`} />
                          <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{exp.type}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <p className="text-neutral-400 font-medium mt-0.5">{exp.company}</p>
                      </div>
                      <span className="text-sm text-neutral-500 glass px-4 py-2 rounded-full border border-white/8">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {exp.responsibilities.map((resp) => (
                        <li key={resp} className="flex items-start gap-3 text-neutral-400 text-sm">
                          <div className={`w-1 h-1 rounded-full ${exp.dotColor} mt-2 flex-shrink-0`} />
                          {resp}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/8 text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <div className="mt-12 max-w-3xl mx-auto reveal">
          <div className="glass rounded-2xl p-7 border border-crimson-DEFAULT/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-400" />
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Education</span>
                </div>
                <h3 className="text-xl font-bold text-white">BS Information Technology</h3>
                <p className="text-neutral-400 mt-0.5">San Sebastian College Recoletos-Manila</p>
                <p className="text-neutral-500 text-sm mt-1">Specialization: Full Stack Development & UI/UX Design</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-neutral-500 glass px-4 py-2 rounded-full border border-white/8">
                  2022 — Present
                </span>
                <p className="text-crimson-400 text-xs mt-2 font-medium">Current Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
