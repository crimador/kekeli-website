'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sun } from 'lucide-react';

const NAVY   = '#1E1D3D';
const ORANGE = '#FF7E00';
const GOLD   = '#FAC731';

type Msg = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'Quels services proposez-vous ?',
  'Comment créer mon entreprise ?',
  'Faites-vous de la comptabilité ?',
  'Où êtes-vous situés ?',
];

const WELCOME: Msg = {
  role: 'assistant',
  content:
    "Bonjour 👋 Je suis l'assistant virtuel de KEKELI GROUP. Comment puis-je vous aider aujourd'hui ?",
};

export default function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const newMessages: Msg[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      const reply = data.reply
        ?? "Désolé, je rencontre un souci. Contactez-nous directement sur WhatsApp au +228 92 68 11 00.";
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            "Désolé, je suis momentanément indisponible. Écrivez-nous sur WhatsApp au +228 92 68 11 00 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Bouton d'ouverture ───────────────────────────────────────── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le chat"
          className="fixed bottom-24 right-5 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}
        >
          <MessageCircle size={26} className="text-white" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      )}

      {/* ── Fenêtre de chat ──────────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-x-2 bottom-2 sm:inset-x-auto sm:right-5 sm:bottom-5 z-[60] sm:w-96 max-w-[calc(100vw-16px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white"
             style={{ height: 'min(600px, calc(100dvh - 24px))' }}>

          {/* En-tête */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0"
               style={{ background: NAVY }}>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full flex items-center justify-center"
                   style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
                <Sun size={18} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold text-white">Assistant KEKELI</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  En ligne
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fermer" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: '#FAFAF9' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    m.role === 'user'
                      ? { background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})`, color: '#fff', borderBottomRightRadius: 4 }
                      : { background: '#fff', color: NAVY, border: '1px solid #eee', borderBottomLeftRadius: 4 }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Indicateur "en train d'écrire" */}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-white border" style={{ borderBottomLeftRadius: 4 }}>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="h-2 w-2 rounded-full animate-bounce"
                            style={{ background: ORANGE, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions (seulement au début) */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => sendMessage(s)}
                          className="text-xs px-3 py-1.5 rounded-full border bg-white hover:border-orange-300 hover:text-orange-500 transition-colors text-gray-600">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saisie */}
          <div className="p-3 border-t bg-white shrink-0">
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 min-w-0 rounded-xl border px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-orange-400 transition-colors"
                style={{ borderColor: '#E5E7EB' }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Envoyer"
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0 disabled:opacity-40 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}
              >
                <Send size={16} />
              </button>
            </form>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Assistant IA — pour un conseil personnalisé, contactez-nous sur WhatsApp
            </p>
          </div>
        </div>
      )}
    </>
  );
}
