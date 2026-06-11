import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Github, Linkedin, ArrowRight, Send, CheckCircle, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ciceronkeith4@gmail.com',
    href: 'mailto:ciceronkeith4@gmail.com',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '09944933136',
    href: 'tel:09944933136',
    color: 'text-green-400',
    borderColor: 'border-green-500/20 hover:border-green-500/40',
    bg: 'bg-green-500/10',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/keith',
    href: 'https://github.com',
    color: 'text-neutral-300',
    borderColor: 'border-white/10 hover:border-white/25',
    bg: 'bg-white/5',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/keith',
    href: 'https://linkedin.com',
    color: 'text-sky-400',
    borderColor: 'border-sky-500/20 hover:border-sky-500/40',
    bg: 'bg-sky-500/10',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const { error: sbError } = await supabase
      .from('contact_messages')
      .insert({ name: formData.name, email: formData.email, message: formData.message });

    setSending(false);

    if (sbError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-DEFAULT/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background-DEFAULT to-background-secondary pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 rounded-full bg-crimson-DEFAULT opacity-5 blur-3xl pointer-events-none" />

      <div className="container-max relative px-6">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="font-pixel text-xs bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1 rounded-sm">
              💬 Let's Connect
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Let's Build Something <span className="text-gradient-red">Great Together</span>
          </h2>
          <p className="text-neutral-400 mt-3 max-w-lg mx-auto text-sm">
            Have a project in mind, a role to fill, or just want to connect? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left — contact cards */}
          <div className="reveal-left">
            <p className="text-neutral-400 text-xs font-pixel mb-4 uppercase tracking-wide">Reach out directly</p>
            <div className="grid gap-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`glass rounded-sm p-4 border-2 ${item.borderColor} flex items-center gap-4 transition-all duration-300 group hover:-translate-y-0.5`}
                  >
                    <div className={`w-10 h-10 rounded-sm ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={item.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-500 text-xs font-pixel uppercase tracking-wide">{item.label}</p>
                      <p className="text-white font-medium text-sm mt-0.5 truncate">{item.value}</p>
                    </div>
                    <ArrowRight size={14} className="text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            <p className="text-neutral-400 text-xs font-pixel mb-4 uppercase tracking-wide">Send a message</p>
            <div className="glass rounded-sm p-6 border-2 border-white/8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-12 h-12 rounded-sm bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-400" />
                  </div>
                  <p className="text-white font-semibold font-pixel text-sm">✦ Message Sent!</p>
                  <p className="text-neutral-400 text-xs text-center">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-neutral-400 text-xs mb-1.5 font-pixel">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-crimson-DEFAULT/60 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-xs mb-1.5 font-pixel">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-crimson-DEFAULT/60 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-xs mb-1.5 font-pixel">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-crimson-DEFAULT/60 transition-all duration-200 resize-none"
                    />
                  </div>
                  {error && <p className="text-red-400 text-xs font-pixel">{error}</p>}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary flex items-center justify-center gap-2 flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send size={14} />
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open('/documents/Ciceron,_Keith_Czimonne_Anderson_RESUME_(3).pdf', '_blank')}
                      className="btn-secondary flex items-center justify-center gap-2 px-4"
                      title="View Resume"
                    >
                      <FileText size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
