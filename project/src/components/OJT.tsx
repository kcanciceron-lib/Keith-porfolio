import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const ojtEntries = [
  {
    id: 1,
    company: 'TBA — Internship Host',
    role: 'IT Intern / Developer Intern',
    duration: '2025 – 2026',
    description:
      'Practical on-the-job training covering front-end development, UI/UX support, and system testing in a professional workplace environment.',
    tasks: [
      'Assisted with front-end development tasks',
      'Participated in team stand-ups and sprint reviews',
      'Performed manual testing and bug documentation',
      'Contributed to UI design improvements',
    ],
    images: [
      {
        src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
        caption: 'Team collaboration & planning',
      },
      {
        src: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
        caption: 'Development workspace',
      },
      {
        src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
        caption: 'Project presentation',
      },
    ],
    borderColor: 'border-blue-500/30',
    badgeColor: 'bg-blue-500/20 border-blue-400 text-blue-300',
    dotColor: 'bg-blue-400',
  },
];

interface LightboxProps {
  images: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
}

function Lightbox({ images, index, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrent(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setCurrent(i => Math.min(images.length - 1, i + 1));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        <div className="relative rounded-sm overflow-hidden border-2 border-white/10">
          <img
            src={images[current].src}
            alt={images[current].caption}
            className="w-full max-h-[70vh] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-3">
            <p className="text-white text-sm font-pixel">{images[current].caption}</p>
            <p className="text-neutral-400 text-xs mt-0.5">{current + 1} / {images.length}</p>
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent(i => Math.max(0, i - 1))}
              disabled={current === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-sm border border-white/20 disabled:opacity-30 transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrent(i => Math.min(images.length - 1, i + 1))}
              disabled={current === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-sm border border-white/20 disabled:opacity-30 transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Thumbnails */}
        <div className="flex gap-2 mt-3 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-16 h-12 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                i === current ? 'border-crimson-400 opacity-100' : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
              aria-label={`View ${img.caption}`}
            >
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OJT() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<{ images: { src: string; caption: string }[]; index: number } | null>(null);

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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ojt" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-DEFAULT/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background-secondary to-background-DEFAULT pointer-events-none" />

      <div className="container-max relative">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-pixel text-xs bg-crimson-DEFAULT/20 border-2 border-crimson-400 text-crimson-300 px-3 py-1.5 rounded-sm">
              🏢 OJT Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            On-The-Job <span className="text-gradient-red">Training</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-md mx-auto">
            Real-world workplace experience applying skills in a professional environment.
          </p>
        </div>

        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {ojtEntries.map((entry, idx) => (
            <div
              key={entry.id}
              className="reveal"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className={`glass rounded-sm border-2 ${entry.borderColor} hover:border-opacity-80 transition-all duration-300 overflow-hidden`}>
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-white/5">
                  <div className="flex flex-wrap items-start gap-4 justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`font-pixel text-xs px-2 py-0.5 rounded-sm border-2 ${entry.badgeColor}`}>
                          💼 Intern
                        </span>
                        <span className="text-neutral-500 text-xs font-pixel">{entry.duration}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{entry.role}</h3>
                      <p className="text-crimson-400 text-sm font-medium mt-0.5">{entry.company}</p>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-sm leading-relaxed mt-4">{entry.description}</p>

                  <ul className="grid sm:grid-cols-2 gap-2 mt-4">
                    {entry.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-neutral-400 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${entry.dotColor}`} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image gallery */}
                <div className="p-6 sm:p-8">
                  <p className="text-neutral-500 text-xs font-pixel uppercase mb-4">✦ Photo Gallery</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {entry.images.map((img, imgIdx) => (
                      <button
                        key={imgIdx}
                        onClick={() => setLightbox({ images: entry.images, index: imgIdx })}
                        className="relative group aspect-video rounded-sm overflow-hidden border-2 border-white/10 hover:border-crimson-400/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        aria-label={`Open ${img.caption}`}
                      >
                        <img
                          src={img.src}
                          alt={img.caption}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-xs font-pixel truncate">{img.caption}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
