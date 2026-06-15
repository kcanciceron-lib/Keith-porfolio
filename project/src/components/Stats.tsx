import { ScrollReveal } from './ScrollReveal';

// 👇 COMMENT: BALANCED STATISTICS LOOKUP ARRAY 👇
// Strips away empty square boxes to ensure numbers and text labels center perfectly.
const metrics = [
  { value: '2', label: 'PROJECTS COMPLETED', color: 'border-blue-500/20 text-blue-400' },
  { value: '2027', label: 'GRADUATION YEAR', color: 'border-pink-500/20 text-pink-400' },
  { value: '10+', label: 'TECH STACK TOOLS', color: 'border-yellow-500/20 text-yellow-400' },
  { value: '∞', label: 'ALWAYS LEARNING', color: 'border-green-500/20 text-green-400' },
];

export default function Stats() {
  return (
    <section className="py-6 max-w-6xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((card, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.1} className="w-full">
            <div className={`bg-neutral-900/40 backdrop-blur-sm border-2 rounded-sm p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-neutral-900/70 ${card.color}`}>
              <span className="text-3xl font-bold tracking-tight font-pixel block mb-1.5">{card.value}</span>
              <span className="text-[9px] text-neutral-400 font-pixel uppercase tracking-widest leading-none">{card.label}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
