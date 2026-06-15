import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'plain' | 'space';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  accentColor: string;
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'timestamp'>) => void;
  clearMessages: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('plain');
  const [fadeState, setFadeState] = useState<'idle' | 'out' | 'in'>('idle');

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('contactMessages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const setMode = (newMode: ThemeMode) => {
    if (newMode === mode) return;
    setFadeState('out');
    setTimeout(() => {
      setModeState(newMode);
      try {
        localStorage.setItem('bgMode', newMode);
      } catch (e) {
        console.error('Failed to save theme mode to localStorage', e);
      }
      // Dispatch custom event for non-react components if any
      window.dispatchEvent(new CustomEvent('bgModeChange', { detail: newMode }));
      setFadeState('in');
      setTimeout(() => {
        setFadeState('idle');
      }, 400);
    }, 400);
  };

  const addMessage = (msg: Omit<ContactMessage, 'timestamp'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      timestamp: new Date().toLocaleString(),
    };
    setMessages((prev) => {
      const updated = [...prev, newMsg];
      try {
        localStorage.setItem('contactMessages', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save messages to localStorage', e);
      }
      return updated;
    });
  };

  const clearMessages = () => {
    setMessages([]);
    try {
      localStorage.removeItem('contactMessages');
    } catch (e) {
      console.error('Failed to clear messages from localStorage', e);
    }
  };

  useEffect(() => {
    // Handle storage changes from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'bgMode' && e.newValue) {
        setModeState(e.newValue as ThemeMode);
      }
      if (e.key === 'contactMessages' && e.newValue) {
        try {
          setMessages(JSON.parse(e.newValue));
        } catch {}
      }
    };

    const handleClear = () => {
      setMessages([]);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('clearMessages', handleClear);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('clearMessages', handleClear);
    };
  }, []);

  // Sync accent color with theme mode
  const accentColor = mode === 'space' ? '#fb7185' : '#c41230';

  return (
    <ThemeContext.Provider value={{ mode, setMode, accentColor, messages, addMessage, clearMessages }}>
      {children}
      <div 
        className={`fixed inset-0 bg-black z-[999999] transition-opacity duration-400 pointer-events-none ${
          fadeState === 'out' ? 'opacity-100 pointer-events-auto' : 'opacity-0'
        }`}
        style={{ transitionProperty: 'opacity' }}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
