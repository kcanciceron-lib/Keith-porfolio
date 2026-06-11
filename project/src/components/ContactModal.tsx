import { useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const socials = [
  {
    name: 'Facebook',
    handle: 'keith.ciceron',
    href: 'https://www.facebook.com/keith.ciceron',
    color: 'bg-blue-600/20 border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/30',
    iconColor: 'text-blue-400',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@mon.czii',
    href: 'https://www.instagram.com/mon.czii',
    color: 'bg-pink-600/20 border-pink-500/40 hover:border-pink-400 hover:bg-pink-500/30',
    iconColor: 'text-pink-400',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@keith_ciceron',
    href: 'https://www.tiktok.com/@keith_ciceron',
    color: 'bg-neutral-800/60 border-neutral-600/40 hover:border-white/40 hover:bg-white/10',
    iconColor: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.13a8.18 8.18 0 004.78 1.52V7.2a4.85 4.85 0 01-1.01-.51z" />
      </svg>
    ),
  },
  {
    name: 'Gmail',
    handle: 'ciceronkeith4@gmail.com',
    href: 'mailto:ciceronkeith4@gmail.com',
    color: 'bg-red-600/20 border-red-500/40 hover:border-red-400 hover:bg-red-500/30',
    iconColor: 'text-red-400',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.908 1.528-1.147C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
];

export default function ContactModal({ onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-strong rounded-sm border-2 border-white/10 p-8 shadow-2xl animate-slide-up">
        {/* Pixel corner accents */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-crimson-400" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-crimson-400" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-crimson-400" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-crimson-400" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-white hover:bg-white/10 rounded-sm transition-all duration-200"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <span className="font-pixel text-xs text-crimson-400 border-2 border-crimson-400 px-3 py-1 rounded-sm bg-crimson-DEFAULT/10">
            💬 Get In Touch
          </span>
          <h2 className="text-xl font-bold text-white mt-3">Reach Me via Social Media</h2>
          <p className="text-neutral-400 text-sm mt-1">Pick any platform and let's talk!</p>
        </div>

        <div className="flex flex-col gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 p-4 rounded-sm border-2 transition-all duration-200 group hover:-translate-y-0.5 ${s.color}`}
            >
              <div className={`flex-shrink-0 ${s.iconColor} group-hover:scale-110 transition-transform duration-200`}>
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm">{s.name}</p>
                <p className="text-neutral-400 text-xs truncate">{s.handle}</p>
              </div>
              <svg className="ml-auto w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
