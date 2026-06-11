import { useEffect, useState } from 'react';
import { X, Trash2, RefreshCw, Mail, User, Clock } from 'lucide-react';
import { supabase, ContactMessage } from '../lib/supabase';

interface Props {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setMessages(data as ContactMessage[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const deleteMessage = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (!error) setMessages(prev => prev.filter(m => m.id !== id));
    setDeleting(null);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-background-secondary border-2 border-crimson-400/40 rounded-sm shadow-2xl flex flex-col max-h-[85vh] animate-slide-up">
        {/* Pixel corner accents */}
        <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-crimson-400" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-crimson-400" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-crimson-400" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-crimson-400" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-crimson-DEFAULT/20 border-2 border-crimson-400 flex items-center justify-center">
              <span className="text-sm">🔒</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm font-pixel">Admin Panel</p>
              <p className="text-neutral-500 text-xs">Contact Messages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-sm transition-all duration-200"
              title="Refresh"
              aria-label="Refresh"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-sm transition-all duration-200"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-2.5 border-b border-white/5 flex items-center gap-4 flex-shrink-0">
          <span className="font-pixel text-xs text-neutral-400">
            ✦ {messages.length} {messages.length === 1 ? 'message' : 'messages'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-pixel">Live</span>
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3">
              <RefreshCw size={18} className="text-crimson-400 animate-spin" />
              <span className="text-neutral-400 text-sm font-pixel">Loading...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-sm bg-white/5 border-2 border-white/10 flex items-center justify-center">
                <Mail size={20} className="text-neutral-600" />
              </div>
              <p className="text-neutral-500 text-sm font-pixel">No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="glass rounded-sm border-2 border-white/8 hover:border-white/15 p-4 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-sm bg-crimson-DEFAULT/15 border border-crimson-400/30 flex items-center justify-center flex-shrink-0">
                      <User size={12} className="text-crimson-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{msg.name}</p>
                      <a href={`mailto:${msg.email}`} className="text-crimson-400 text-xs hover:underline truncate block">
                        {msg.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-neutral-600 text-xs">
                      <Clock size={10} />
                      <span className="whitespace-nowrap text-xs">{formatDate(msg.created_at)}</span>
                    </div>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      disabled={deleting === msg.id}
                      className="p-1.5 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-all duration-200 disabled:opacity-40 opacity-0 group-hover:opacity-100"
                      aria-label="Delete"
                    >
                      <Trash2 size={13} className={deleting === msg.id ? 'animate-pulse' : ''} />
                    </button>
                  </div>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed pl-9 border-l-2 border-white/8 ml-3.5">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t-2 border-white/8 flex-shrink-0">
          <p className="text-neutral-600 text-xs font-pixel text-center">🔒 Secret Admin Panel — Press ESC to close</p>
        </div>
      </div>
    </div>
  );
}
