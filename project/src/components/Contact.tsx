import { useState } from 'react';
import { Send, CheckCircle, FileText } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { addMessage } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSending(true);
    setError('');

    // Save message locally (Easter Egg storage)
    addMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: supabaseError } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              message: formData.message,
            },
          ]);

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        setSent(true);
        resetForm();

        setTimeout(() => {
          setSent(false);
        }, 5000);

        return;
      }

      const endpoint =
        import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to send message.');
      }

      setSent(true);
      resetForm();

      setTimeout(() => {
        setSent(false);
      }, 5000);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 border-b border-white/5 bg-black/10"
    >
      <div className="container-max px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-pixel text-white">
            Get In <span className="text-crimson-DEFAULT">Touch</span>
          </h2>

          <p className="text-neutral-400 mt-3 max-w-md mx-auto">
            Have an open opportunity, a project proposal, or just want to chat?
            Drop a message!
          </p>
        </ScrollReveal>

        <div className="max-w-xl mx-auto">
          <ScrollReveal className="glass rounded-sm border-2 border-white/10 p-6 sm:p-8 relative overflow-hidden">
            <div>
              {sent ? (
                <div className="text-center py-8 space-y-3 animate-fade-in">
                  <CheckCircle
                    size={48}
                    className="text-emerald-400 mx-auto"
                  />

                  <h3 className="text-xl font-bold text-white">
                    Message Transmitted!
                  </h3>

                  <p className="text-neutral-400 text-sm">
                    Thank you for reaching out. I will get back to you as soon
                    as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-pixel text-neutral-400 mb-2"
                    >
                      NAME
                    </label>

                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Your Name"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-crimson-DEFAULT/60 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-pixel text-neutral-400 mb-2"
                    >
                      EMAIL ADDRESS
                    </label>

                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-crimson-DEFAULT/60 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-pixel text-neutral-400 mb-2"
                    >
                      MESSAGE
                    </label>

                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-crimson-DEFAULT/60 transition-all duration-200 resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs font-mono">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="pixel-btn bg-crimson-DEFAULT text-white px-6 py-2.5 rounded-sm font-bold flex-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-crimson-600 transition-colors"
                    >
                      <Send size={14} />

                      {sending ? 'Sending...' : 'Send Message'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          '/documents/Ciceron,_Keith_Czimonne_Anderson_RESUME_(3).pdf',
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                      className="pixel-btn border border-white/20 bg-transparent text-white px-4 py-2.5 rounded-sm hover:bg-white/5 transition-colors flex items-center justify-center"
                      title="View Resume"
                    >
                      <FileText size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}