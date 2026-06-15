import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X as CloseIcon } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode, setMode, messages, clearMessages } = useTheme();
  const dropRef = useRef<HTMLDivElement>(null);

  // Easter egg states
  const [clickCount, setClickCount] = useState(0);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', checkClick);
    return () => document.removeEventListener('mousedown', checkClick);
  }, []);

  const selectMode = (newMode: ThemeMode) => {
    setMode(newMode);
    setOpen(false);
  };

  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowLogsModal(true);
        return 0; // reset after trigger
      }
      return newCount;
    });

    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2500); // Reset click counter if inactive for 2.5 seconds
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#projects' },
    { label: 'OJT', href: '#ojt' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between relative">
          <button
            onClick={handleBrandClick}
            className="font-pixel text-xs md:text-sm text-white tracking-widest flex items-center gap-1.5 hover:text-crimson-400 hover:scale-105 transition-all cursor-pointer z-10 focus:outline-none bg-transparent border-none"
          >
            Keith.dev <span className="text-[8px] text-green-400 animate-pulse">●</span>
          </button>
          
          {/* Desktop Links */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-6 font-pixel text-sm lg:text-base text-neutral-400 pointer-events-auto">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 z-10">
            <div className="relative" ref={dropRef}>
              <button 
                onClick={() => setOpen(!open)} 
                className="hidden sm:flex items-center gap-1.5 font-pixel text-[9px] px-3 py-1.5 bg-neutral-900 border border-white/10 text-neutral-200 rounded-sm hover:border-crimson-400/50 transition-all uppercase tracking-wide cursor-pointer"
              >
                Mode <ChevronDown size={10} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-36 bg-neutral-950/95 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden shadow-2xl z-50">
                  <button onClick={() => selectMode('plain')} className={`w-full text-left font-pixel text-[9px] px-3 py-2.5 hover:bg-white/5 transition-colors ${mode === 'plain' ? 'text-crimson-DEFAULT' : 'text-neutral-400'}`}>
                    ⚙️ Plain
                  </button>
                  <button onClick={() => selectMode('space')} className={`w-full text-left font-pixel text-[9px] px-3 py-2.5 hover:bg-white/5 transition-colors ${mode === 'space' ? 'text-crimson-DEFAULT' : 'text-neutral-400'}`}>
                    🚀 Space
                  </button>
                </div>
              )}
            </div>

            <a 
              href="#contact" 
              className="hidden sm:inline-block font-pixel text-[9px] bg-crimson-DEFAULT hover:bg-crimson-600 px-3 py-1.5 text-white rounded-sm transition-all uppercase tracking-wider"
            >
              Hire Me ✦
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="font-pixel text-base text-neutral-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-white/5 my-2" />
            <div className="flex justify-between items-center font-pixel">
               <span className="text-[10px] text-neutral-500 uppercase">Theme</span>
               <div className="flex gap-2">
                  <button onClick={() => selectMode('plain')} className={`text-[9px] px-2 py-1 rounded-sm border ${mode === 'plain' ? 'border-crimson-DEFAULT text-crimson-DEFAULT' : 'border-white/10 text-neutral-400'}`}>Plain</button>
                  <button onClick={() => selectMode('space')} className={`text-[9px] px-2 py-1 rounded-sm border ${mode === 'space' ? 'border-crimson-DEFAULT text-crimson-DEFAULT' : 'border-white/10 text-neutral-400'}`}>Space</button>
               </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hidden Messages Logs Modal (Easter Egg) */}
      {showLogsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 font-pixel select-text">
          <div className="w-full max-w-2xl border-4 border-double border-green-500 bg-neutral-950 p-6 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)] relative overflow-hidden">
            {/* Retro green scanlines style */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 6px 100%'
              }}
            />

            <div className="flex justify-between items-center border-b-2 border-green-500 pb-3 mb-4">
              <h3 className="text-xs md:text-sm font-bold animate-pulse flex items-center gap-2">
                📟 SYSTEM MESSAGES LOG v1.0.0
              </h3>
              <button 
                onClick={() => setShowLogsModal(false)}
                className="border-2 border-green-500 px-2 py-1 text-[10px] hover:bg-green-500 hover:text-black transition-all cursor-pointer animate-pulse"
              >
                [X] CLOSE
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2 text-left">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-xs text-green-600 animate-pulse">
                  *** NO INCOMING TRANSMISSIONS FOUND ***
                  <br /><br />
                  GO TO CONTACT FORM TO TRANSMIT A DATA MESSAGE.
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className="border border-green-900 p-4 bg-green-950/10 space-y-2 text-[10px] relative">
                    <span className="absolute top-2 right-2 text-[9px] text-green-700">INDEX #{idx + 1}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-green-400">
                      <div><span className="text-green-600 font-bold">FROM:</span> {msg.name}</div>
                      <div><span className="text-green-600 font-bold">EMAIL:</span> {msg.email}</div>
                    </div>
                    <div className="text-[9px] text-green-600"><span className="font-bold">DATE:</span> {msg.timestamp}</div>
                    <div className="border-t border-green-900/50 pt-2 mt-2 whitespace-pre-wrap text-green-300">
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-green-500/50 flex flex-wrap gap-3 justify-between items-center text-[10px] text-green-600">
              <span>STATUS: SECURE TERMINAL CONNECTION ACTIVE</span>
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("ARE YOU SURE YOU WANT TO FORMAT THE DATA? (THIS WIPE IS PERMANENT)")) {
                      clearMessages();
                    }
                  }}
                  className="border border-red-500 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-black transition-all cursor-pointer"
                >
                  [FORMAT LOGS]
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
