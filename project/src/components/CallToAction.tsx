import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-crimson-DEFAULT/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-crimson-DEFAULT opacity-5 blur-3xl pointer-events-none" />

      <div className="container-max px-6 relative">
        <div className="glass rounded-3xl border border-white/10 p-12 lg:p-16 text-center max-w-2xl mx-auto reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-pixel text-xs bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1.5 rounded-sm">
              ✨ Let's Build Something
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Let's create something <span className="text-gradient-red">extraordinary</span> together
          </h2>

          <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">
            Whether you have a project in mind, want to discuss opportunities, or just want to connect — I'm always excited to collaborate with creative minds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 rounded-xl font-semibold"
            >
              Get In Touch
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => window.open('/documents/Ciceron,_Keith_Czimonne_Anderson_RESUME_(3).pdf', '_blank')}
              className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4 rounded-xl font-semibold"
            >
              View Resume
            </button>
          </div>

          {/* Bottom gradient line */}
          <div className="mt-12 h-px bg-gradient-to-r from-transparent via-crimson-DEFAULT/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
