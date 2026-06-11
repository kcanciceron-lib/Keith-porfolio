import { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import AdminPanel from './AdminPanel';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [adminOpen, setAdminOpen] = useState(false);
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sections = ['home', 'projects', 'contact'];
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id === 'projects' ? 'work' : id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#contact') {
      // trigger contact modal via custom event handled by components (Hero)
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoIconClick = () => {
    logoClickCount.current += 1;
    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      setAdminOpen(true);
    } else {
      logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; }, 2000);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'py-2 glass border-b border-white/5' : 'py-4 bg-transparent'
        }`}
      >
        <div className="container-max px-6 flex items-center justify-between">
          {/* Logo — icon is the secret 5-click trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogoIconClick}
              className="w-7 h-7 rounded-sm bg-crimson-DEFAULT flex items-center justify-center border border-crimson-300/40 hover:shadow-[0_0_12px_rgba(196,18,48,0.5)] transition-all duration-300 select-none"
              aria-label="Logo"
            >
              <Code2 size={14} className="text-white" />
            </button>
            <button onClick={() => handleNavClick('#home')} className="flex items-center gap-1.5 group">
              <span className="font-bold text-white text-sm tracking-wide font-pixel">Keith.dev</span>
              <span className="text-xs text-green-400 animate-pulse">●</span>
            </button>
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const key = link.href.replace('#', '');
              const isActive =
                key === 'projects'
                  ? activeSection === 'work' || activeSection === 'projects'
                  : activeSection === key;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded group ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-crimson-DEFAULT opacity-100' : 'bg-crimson-DEFAULT opacity-0 group-hover:opacity-50'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-primary text-xs px-4 py-2 font-pixel"
            >
              Hire Me ✦
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-64 glass border-l border-white/10 flex flex-col pt-20 pb-8 px-6 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-neutral-300 hover:text-white hover:bg-white/5 rounded-sm font-pixel text-sm transition-all duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-primary w-full text-center font-pixel text-xs"
            >
              Hire Me ✦
            </button>
          </div>
        </div>
      </div>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </>
  );
}
