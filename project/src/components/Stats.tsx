import { useEffect, useRef } from 'react';
import { Zap, Code2, Award, Users } from 'lucide-react';

const statsData = [
  {
    icon: Code2,
    value: '5+',
    label: 'Projects Completed',
    color: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Award,
    value: '2027',
    label: 'Graduation Year',
    color: 'from-crimson-DEFAULT/10 to-rose-500/10',
    borderColor: 'border-crimson-DEFAULT/20',
    textColor: 'text-crimson-400',
  },
  {
    icon: Zap,
    value: '10+',
    label: 'Tech Stack Tools',
    color: 'from-yellow-500/10 to-orange-500/10',
    borderColor: 'border-yellow-500/20',
    textColor: 'text-yellow-400',
  },
  {
    icon: Users,
    value: '∞',
    label: 'Always Learning',
    color: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
    textColor: 'text-green-400',
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
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
    <section ref={sectionRef} className="py-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-max px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`reveal glass rounded-sm p-6 border-2 ${stat.borderColor} hover:border-opacity-80 transition-all duration-300 group hover:-translate-y-1`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-sm bg-gradient-to-br ${stat.color} border-2 ${stat.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-lg">{stat.label.includes('Projects') ? '🎮' : stat.label.includes('2027') ? '🚀' : stat.label.includes('Tech') ? '⚙️' : '∞'}</span>
                </div>
                <p className={`text-3xl font-bold font-pixel ${stat.textColor} mb-1`}>{stat.value}</p>
                <p className="text-neutral-400 text-xs font-pixel font-semibold uppercase">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
