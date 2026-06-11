import { useEffect, useRef } from 'react';

const schools = [
  {
    id: 1,
    school: 'San Sebastian College Recoletos-Manila',
    degree: 'Bachelor of Science in Information Technology',
    period: 'Aug 2023 – May 2027',
    status: 'Current',
    statusColor: 'bg-green-500/20 border-green-400 text-green-300',
    dotColor: 'bg-green-400',
    borderColor: 'border-blue-500/30',
    highlights: [
      'Consistent Dean\'s Lister A.Y 2023–2026 (1 Bronze, 2 Silver, 1 Gold Medal)',
      'President of JPCS Organization at SSCRMNL',
      'OAR Scholar',
      'Capstone: Web-Based Smart Library System',
      'Street Dance Competition NCAA Season 100 (7th Place)',
      'REAP Dance Competition (2nd Place)',
    ],
  },
  {
    id: 2,
    school: 'The Lady Mediatrix Institute Inc.',
    degree: 'Senior High School — STEM Strand',
    period: 'Aug 2020 – May 2023',
    status: 'Graduated',
    statusColor: 'bg-crimson-DEFAULT/20 border-crimson-400 text-crimson-300',
    dotColor: 'bg-crimson-400',
    borderColor: 'border-crimson-DEFAULT/30',
    highlights: [
      'Consistent With and With High Honors A.Y 2020–2023',
      'Best in Co-curricular',
      'President in Math Club A.Y 2020–2023',
      'Mr. TLMII Title Holder 2023',
      'Indayog Dance Troupe Core Member',
      'Singles and Doubles Table Tennis Champion',
    ],
  },
  {
    id: 3,
    school: 'Recto Memorial National High School',
    degree: 'Junior High School — Pilot Section',
    period: 'Sep 2019 – May 2020',
    status: 'Graduated',
    statusColor: 'bg-orange-500/20 border-orange-400 text-orange-300',
    dotColor: 'bg-orange-400',
    borderColor: 'border-orange-500/30',
    highlights: [
      'Consistent With Honors A.Y 2019–2020',
    ],
  },
  {
    id: 4,
    school: 'Our Lady of Mt. Carmel Seminary',
    degree: 'Junior High School — Seminarian',
    period: 'Jun 2016 – Feb 2019',
    status: 'Graduated',
    statusColor: 'bg-purple-500/20 border-purple-400 text-purple-300',
    dotColor: 'bg-purple-400',
    borderColor: 'border-purple-500/30',
    highlights: [
      'Consistent With and With High Honors A.Y 2016–2019',
      'Seminarian Scholarship Grantee',
      'Editor-in-Chief of Tech-Club',
      'President in Math Club',
      '3 consecutive years of Table Tennis Champion (SANGKAN 7–9)',
      '3 consecutive years of Overall Champion (SANGKAN 7–9)',
      'Mr. Carmelian 2019',
    ],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left').forEach((el, i) => {
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
    <section id="education" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background-DEFAULT to-background-secondary pointer-events-none" />

      <div className="container-max relative">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-pixel text-xs bg-blue-500/20 border-2 border-blue-400 text-blue-300 px-3 py-1.5 rounded-sm">
              🎓 Education
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Academic <span className="text-gradient-red">Background</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-md mx-auto">
            A strong academic foundation built through years of consistent achievement.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-blue-400/40 via-crimson-DEFAULT/30 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">
            {schools.map((s, idx) => (
              <div
                key={s.id}
                className="reveal-left relative sm:pl-16"
                style={{ transitionDelay: `${idx * 130}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-5 hidden sm:flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-sm glass border-2 ${s.borderColor} flex items-center justify-center`}>
                    <span className="text-lg">🎓</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`glass rounded-sm p-6 border-2 ${s.borderColor} hover:border-opacity-80 transition-all duration-300 group hover:-translate-y-0.5`}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`font-pixel text-xs px-2 py-0.5 rounded-sm border-2 ${s.statusColor}`}>
                          {s.status}
                        </span>
                        <span className="text-neutral-500 text-xs font-pixel">{s.period}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug">{s.school}</h3>
                      <p className="text-neutral-400 text-sm mt-0.5">{s.degree}</p>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-neutral-400 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${s.dotColor}`} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
