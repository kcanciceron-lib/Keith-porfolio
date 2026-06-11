import { useEffect, useRef } from 'react';

const HtmlIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <rect width="32" height="32" rx="2" fill="#E34F26"/>
    <path d="M6 4l2.5 22 7.5 2 7.5-2L26 4H6z" fill="#EF652A"/>
    <path d="M16 24.5l6.1-1.7 2.1-19H16v20.7z" fill="#EBEBEB"/>
    <path d="M16 13.5h-4l-.4-4H16v-4H7.8l1.2 13h7V13.5zM16 20.5l-.04.01-3.1-.85-.2-2.16h-4l.38 4.3 7 1.96.04-.01v-3.25z" fill="#999"/>
    <path d="M16 13.5v4h3.7l-.38 4.16-3.32.91V25.7l7-1.96.05-.52.81-9.22H16z" fill="#fff"/>
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <rect width="32" height="32" rx="2" fill="#1572B6"/>
    <path d="M6 4l2.5 22 7.5 2 7.5-2L26 4H6z" fill="#33A9DC"/>
    <path d="M16 24.5l6.1-1.7 2.1-19H16v20.7z" fill="#fff"/>
    <path d="M16 13.5H8.8l.4 4H16v-4zM16 5.5H8l.4 4H16v-4zM16 20.45l-.04.01-3.1-.84-.2-2.17h-4l.38 4.3 7 1.96.04-.01v-3.25z" fill="#EBEBEB"/>
    <path d="M16 13.5v4h3.32l-.31 3.46-3 .82V25.7l7-1.96.08-.84.82-9.4H16zM16 5.5v4h7.2l.06-.6.12-1.4.1-2H16z" fill="#fff"/>
  </svg>
);

const JsIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <rect width="32" height="32" rx="2" fill="#F7DF1E"/>
    <path d="M7 26.7l2.9-1.8c.56 1 1.07 1.85 2.3 1.85 1.18 0 1.93-.46 1.93-2.27V14h3.57v10.54c0 3.74-2.2 5.44-5.4 5.44-2.9 0-4.58-1.5-5.3-3.28zM19.8 26.3l2.9-1.77c.76 1.25 1.75 2.17 3.5 2.17 1.47 0 2.4-.73 2.4-1.75 0-1.22-.96-1.64-2.58-2.35l-.88-.38c-2.56-1.09-4.26-2.46-4.26-5.35 0-2.66 2.03-4.69 5.2-4.69 2.26 0 3.89.79 5.06 2.84l-2.77 1.78c-.61-1.09-1.27-1.52-2.29-1.52-1.04 0-1.7.66-1.7 1.52 0 1.07.66 1.5 2.18 2.16l.88.37c3.02 1.3 4.72 2.62 4.72 5.59 0 3.2-2.52 4.93-5.9 4.93-3.3 0-5.44-1.58-6.46-3.55z" fill="#323330"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="5.5"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)"/>
    </g>
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <rect width="32" height="32" rx="2" fill="#3178C6"/>
    <path d="M6 18.5h4v-1.7H7.8v-1.3H10v-1.7H7.8v-1.3H10V11H6v7.5zM11 11v7.5h2v-2.8h1.5c1.6 0 2.5-.9 2.5-2.4 0-1.4-.9-2.3-2.5-2.3H11zm2 1.6h1.3c.6 0 .9.3.9.8 0 .5-.3.8-.9.8H13v-1.6zM22 13v5.5h2V13h2.5V11H19.5v2H22z" fill="#fff"/>
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#539E43"/>
    <path d="M16 7l-8 4.5v9L16 25l8-4.5v-9L16 7z" fill="#6CC24A"/>
    <path d="M16 11v4l3.5 2 3.5-2v-4L16 9l-7 2v4l3.5 2 3.5-2z" fill="none" stroke="#fff" strokeWidth="1.2"/>
    <circle cx="16" cy="16" r="2.5" fill="#fff"/>
  </svg>
);

const MySQLIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <path d="M3 8s0-2 2-2h22s2 0 2 2v16s0 2-2 2H5s-2 0-2-2V8z" fill="#00758F"/>
    <path d="M3 10h26v6H3z" fill="#F29111"/>
    <text x="8" y="23" fill="#fff" fontSize="8" fontFamily="monospace" fontWeight="bold">SQL</text>
    <path d="M7 13h4M7 15h4M7 17h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <path d="M11 28a5 5 0 005-5v-5h-5a5 5 0 000 10z" fill="#0ACF83"/>
    <path d="M6 18a5 5 0 015-5h5v10h-5a5 5 0 01-5-5z" fill="#A259FF"/>
    <path d="M6 8a5 5 0 015-5h5v10h-5a5 5 0 01-5-5z" fill="#F24E1E"/>
    <path d="M16 3h5a5 5 0 010 10h-5V3z" fill="#FF7262"/>
    <circle cx="21" cy="18" r="5" fill="#1ABCFE"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <path d="M30.3 14.7L17.3 1.7a2.4 2.4 0 00-3.4 0l-3.4 3.4 4.3 4.3a2.85 2.85 0 003.6 3.6l4.2 4.2a2.85 2.85 0 001 5.5 2.85 2.85 0 000-5.7l-3.9-3.9v10.3a2.85 2.85 0 11-3.1-2.8V11a2.85 2.85 0 01-1.7-3.8L10.7 3 1.7 12a2.4 2.4 0 000 3.4l13 13a2.4 2.4 0 003.4 0l12-12a2.4 2.4 0 000-3.7z" fill="#F05032"/>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <path d="M16 8c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25C14.98 12.15 15.9 13.1 16.9 14.1c1.66 1.69 3.58 3.65 7.6 3.65 4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-.98-.24-1.9-1.2-2.9-2.1C22.18 10.21 20.27 8.25 16.25 8.25L16 8zM8.5 18c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25.98.24 1.9 1.2 2.9 2.1 1.66 1.69 3.58 3.65 7.6 3.65 4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-.98-.24-1.9-1.2-2.9-2.1C14.44 20 12.5 18 8.5 18z" fill="#38BDF8"/>
  </svg>
);

const PhotoshopIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <rect width="32" height="32" rx="4" fill="#001E36"/>
    <path d="M7 8v16h3.5v-5.5h2.8c2.6 0 4.7-2 4.7-5.25C18 10.8 16.2 8 13 8H7zm3.5 3H13c1.2 0 2 .9 2 2.2 0 1.3-.8 2.3-2 2.3h-2.5V11zM19.5 12c-1.4 0-2.3.5-2.8 1l.7 2c.4-.4 1-.7 1.8-.7.8 0 1.3.5 1.3 1 0 2-4 1.7-4 5 0 1.8 1.3 3 3.3 3 1.3 0 2.3-.4 3-.9l-.8-2c-.6.4-1.1.7-2 .7-.7 0-1.1-.4-1.1-1 0-2 4-1.6 4-4.9 0-2-1.5-3.2-3.4-3.2z" fill="#31A8FF"/>
  </svg>
);

const FirebaseIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <path d="M5.8 25.6L9.6 5.3l6.4 6.3L5.8 25.6z" fill="#FFA000"/>
    <path d="M5.8 25.6l8.7-3-2.6-5.9-6.1 8.9z" fill="#F57F17"/>
    <path d="M14.5 22.6l-2.7-5.9L5.8 25.6l8.7-3z" fill="#FFCA28"/>
    <path d="M16 28l10.2-2.4-10-10.3L16 28z" fill="#FFA000"/>
    <path d="M16 28L5.8 25.6l8.7-3L16 28z" fill="#FFCA28"/>
    <path d="M26.2 25.6L16 28l.2-12.7 10 10.3z" fill="#F57F17"/>
    <path d="M16.2 15.3l-4.4-2L9.6 5.3l6.6 10z" fill="#FFA000"/>
  </svg>
);

const categories = [
  {
    name: 'Frontend',
    colorClass: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    techs: [
      { name: 'HTML5', icon: <HtmlIcon /> },
      { name: 'CSS3', icon: <CssIcon /> },
      { name: 'JavaScript', icon: <JsIcon /> },
      { name: 'TypeScript', icon: <TypeScriptIcon /> },
      { name: 'React', icon: <ReactIcon /> },
      { name: 'Tailwind CSS', icon: <TailwindIcon /> },
    ],
  },
  {
    name: 'Backend',
    colorClass: 'text-green-400',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/5',
    techs: [
      { name: 'Node.js', icon: <NodeIcon /> },
      { name: 'REST API', icon: (
        <div className="w-6 h-6 flex items-center justify-center bg-green-900/50 rounded text-green-300 text-xs font-bold">API</div>
      )},
    ],
  },
  {
    name: 'Database',
    colorClass: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    bgColor: 'bg-yellow-500/5',
    techs: [
      { name: 'MySQL', icon: <MySQLIcon /> },
      { name: 'Firebase', icon: <FirebaseIcon /> },
    ],
  },
  {
    name: 'Design',
    colorClass: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    bgColor: 'bg-pink-500/5',
    techs: [
      { name: 'Figma', icon: <FigmaIcon /> },
      { name: 'Photoshop', icon: <PhotoshopIcon /> },
    ],
  },
  {
    name: 'Tools & DevOps',
    colorClass: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/5',
    techs: [
      { name: 'Git', icon: <GitIcon /> },
      { name: 'GitHub', icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white" aria-hidden="true">
          <path d="M16 2a14 14 0 00-4.43 27.28c.7.13.95-.3.95-.67v-2.62c-3.89.85-4.71-1.87-4.71-1.87-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.27 1.52 4.07 1.16.13-.9.49-1.52.89-1.87-3.1-.35-6.37-1.56-6.37-6.93 0-1.53.55-2.78 1.44-3.76-.14-.35-.62-1.78.14-3.71 0 0 1.18-.38 3.85 1.44A13.4 13.4 0 0116 10.3c1.19.01 2.39.16 3.51.47 2.67-1.82 3.84-1.44 3.84-1.44.76 1.93.28 3.36.14 3.71.9.98 1.44 2.23 1.44 3.76 0 5.38-3.28 6.57-6.4 6.92.5.44.95 1.3.95 2.62v3.88c0 .38.25.81.96.67A14 14 0 0016 2z"/>
        </svg>
      )},
      { name: 'VS Code', icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M23.7 4L12.5 14.5 7 9.5 4 11v10l3 1.5 5.5-5 11.2 10.5L28 25.5V6.5L23.7 4z" fill="#007ACC"/>
          <path d="M28 6.5l-4.3-2.5L12.5 14.5l-5.5-5L4 11v10l3 1.5 5.5-5 11.2 10.5L28 25.5V6.5z" fill="#1BA1E2"/>
          <path d="M4 11l3 10 5.5-6.5L4 11zM28 21l-3-10-5.5 4.5L28 21z" fill="#0063B1" opacity=".5"/>
        </svg>
      )},
    ],
  },
  {
    name: 'Additional Skills',
    colorClass: 'text-crimson-400',
    borderColor: 'border-crimson-DEFAULT/30',
    bgColor: 'bg-crimson-DEFAULT/5',
    techs: [
      { name: 'QA Testing', icon: (
        <div className="w-6 h-6 flex items-center justify-center text-lg">🧪</div>
      )},
      { name: 'Debugging', icon: (
        <div className="w-6 h-6 flex items-center justify-center text-lg">🔍</div>
      )},
      { name: 'AI-assisted Dev', icon: (
        <div className="w-6 h-6 flex items-center justify-center text-lg">🤖</div>
      )},
      { name: 'UI/UX Design', icon: (
        <div className="w-6 h-6 flex items-center justify-center text-lg">🎯</div>
      )},
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
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
    <section id="tech" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-DEFAULT/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background-secondary to-background-DEFAULT pointer-events-none" />

      <div className="container-max relative">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-pixel text-xs bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1.5 rounded-sm">
              ⚙️ Tech Stack
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Tools I <span className="text-gradient-red">Work With</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-md mx-auto">
            A curated set of technologies I use to design, build, and ship quality products.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, catIdx) => (
            <div
              key={cat.name}
              className={`reveal glass rounded-sm p-6 border-2 ${cat.borderColor} hover:border-opacity-70 transition-all duration-300 group hover:-translate-y-1`}
              style={{ transitionDelay: `${catIdx * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-2 h-2 rounded-full ${cat.colorClass.replace('text-', 'bg-')}`} />
                <h3 className={`text-xs font-semibold tracking-wide uppercase font-pixel ${cat.colorClass}`}>✦ {cat.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className={`flex items-center gap-2 px-3 py-2 rounded-sm border-2 ${cat.borderColor} ${cat.bgColor} transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-default`}
                  >
                    <span className="flex-shrink-0">{tech.icon}</span>
                    <span className="text-neutral-300 text-xs font-pixel font-semibold">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
