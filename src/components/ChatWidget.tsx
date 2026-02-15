import { useState, useRef, useEffect } from 'preact/hooks';

// ─── Inline Styles (injected on mount) ───────────────────────────────
const CHAT_STYLES = `
/* ── Chat Widget Container ── */
.chat-widget{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;font-family:'Orbito','Inter',system-ui,sans-serif}

/* ── Mascot Toggle Button ── */
.chat-toggle-btn{
  width:110px;height:110px;border-radius:50%;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;padding:0;
  background:#050505;
  box-shadow:0 12px 48px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.1),0 0 30px rgba(245,158,11,0.15);
  transition:all .4s cubic-bezier(.16,1,.3,1);
  position:relative;
}
.chat-toggle-btn img{width:90px;height:90px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(245,158,11,0.4));transition:transform .4s cubic-bezier(.16,1,.3,1)}
.chat-toggle-btn:hover{transform:scale(1.1) translateY(-6px);box-shadow:0 18px 60px rgba(0,0,0,0.8),0 0 0 2px rgba(245,158,11,0.4),0 0 40px rgba(245,158,11,0.2)}
.chat-toggle-btn:hover img{transform:scale(1.05) rotate(5deg)}
.chat-toggle-btn.open{background:#111;box-shadow:0 6px 20px rgba(0,0,0,0.4);width:85px;height:85px}
.chat-toggle-btn.open .close-x{display:flex}
.chat-toggle-btn.open img{display:none}
.close-x{display:none;color:#f59e0b;font-size:2.5rem;width:100%;height:100%;align-items:center;justify-content:center}

/* ── Notification Popup ── */
.chat-notification{
  position:absolute;bottom:106px;right:0;
  background:rgba(15,15,15,0.92);backdrop-filter:blur(20px);
  color:#fff;padding:1.4rem 1.6rem;
  border-radius:28px 28px 4px 28px;
  box-shadow:0 25px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(245,158,11,0.3);
  min-width:300px;max-width:360px;
  animation:notifIn .6s cubic-bezier(.34,1.56,.64,1) both;
  cursor:pointer;transition:all .4s cubic-bezier(.16,1,.3,1);
  border:1px solid rgba(245,158,11,0.2);
}
.chat-notification:hover{transform:translateY(-5px) scale(1.02);box-shadow:0 30px 100px rgba(0,0,0,0.8),0 0 0 1px rgba(245,158,11,0.5)}
.chat-notification-header{display:flex;align-items:center;gap:.8rem;margin-bottom:.7rem}
.chat-notification-header img{width:36px;height:36px;border-radius:50%;border:2px solid #22c55e;background:#000;padding:2px;box-shadow:0 0 15px rgba(34,197,94,0.4)}
.chat-notification-header span{font-family:'Motivate',sans-serif;font-weight:700;font-size:1.15rem;color:#f59e0b;letter-spacing:0.8px;text-transform:uppercase}
.chat-notification p{margin:0;font-size:.95rem;line-height:1.65;color:rgba(255,255,255,0.9)}
.chat-notification-close{position:absolute;top:12px;right:16px;background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:1.2rem;transition:all .2s;z-index:2}
@keyframes notifIn{
  0%{opacity:0;transform:translateY(30px) scale(0.8) rotate(-2deg)}
  70%{transform:translateY(-10px) scale(1.05) rotate(1deg)}
  100%{opacity:1;transform:translateY(0) scale(1) rotate(0)}
}

/* ── Unread Badge (The Sign) ── */
.unread-badge{
  position:absolute;top:-10px;right:-10px;
  width:44px;height:44px;
  background:linear-gradient(135deg,#f59e0b,#ea580c);
  border-radius:50%;display:flex;align-items:center;justify-content:center;
  color:#000;border:4px solid #050505;
  box-shadow:0 0 25px rgba(245,158,11,0.7);
  z-index:10;
  animation:badgePop .5s cubic-bezier(.34,1.56,.64,1) both, badgePulse 2s infinite;
}
@keyframes badgePulse{0%,100%{transform:scale(1);box-shadow:0 0 15px rgba(245,158,11,0.4)}50%{transform:scale(1.2);box-shadow:0 0 30px rgba(245,158,11,0.9)}}
@keyframes badgePop{0%{opacity:0;transform:scale(0) translate(20px,-20px)}100%{opacity:1;transform:scale(1) translate(0,0)}}

/* ── Chat Window ── */
.chat-window{
  position:absolute;bottom:106px;right:0;
  width:440px;height:680px;max-height:85vh;
  background:#050505;border-radius:32px;
  box-shadow:0 40px 150px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.06);
  display:flex;flex-direction:column;overflow:hidden;
  animation:winIn .4s cubic-bezier(.16,1,.3,1);
}
@keyframes winIn{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}

/* ── Header ── */
.chat-header{
  padding:1.6rem 2rem;
  background:rgba(20,20,20,0.85);backdrop-filter:blur(15px);
  border-bottom:1px solid rgba(255,255,255,0.08);
  display:flex;align-items:center;justify-content:space-between;
}
.chat-header-info{display:flex;align-items:center;gap:1.4rem}
.chat-avatar{width:64px;height:64px;border-radius:20px;overflow:hidden;background:#050505;padding:5px;border:2px solid #22c55e}
.chat-avatar img{width:100%;height:100%;object-fit:contain;border-radius:15px}
.chat-header h3{margin:0;font-family:'Motivate',sans-serif;font-size:1.75rem;font-weight:700;color:#fff;letter-spacing:1.5px;text-transform:uppercase}
.status-indicator{font-size:.75rem;font-weight:600;color:#22c55e;display:flex;align-items:center;gap:6px;margin-top:2px}
.status-indicator::before{content:'';width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 10px #22c55e;animation:pulseStatus 2s infinite}
@keyframes pulseStatus{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}

/* ── Messages ── */
.chat-messages{flex:1;padding:1.5rem;overflow-y:auto;display:flex;flex-direction:column;gap:.8rem;background:#050505}
.chat-messages::-webkit-scrollbar{width:4px}
.chat-messages::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:10px}

.message{max-width:82%;padding:.8rem 1.2rem;border-radius:20px;font-size:.95rem;line-height:1.6;letter-spacing:0.2px}
.message.bot{
  align-self:flex-start;background:rgba(255,255,255,0.04);color:#e5e5e5;
  border:1px solid rgba(255,255,255,0.06);border-bottom-left-radius:4px;
  animation:botIn .35s ease-out both;
}
.message.user{
  align-self:flex-end;
  background:linear-gradient(135deg,#f59e0b 0%,#f97316 50%,#ea580c 100%);
  color:#000;font-weight:700;border-bottom-right-radius:4px;
  box-shadow:0 4px 15px rgba(245,158,11,0.25);
  animation:userIn .35s ease-out both;
}

.message.loading{background:rgba(255,255,255,0.04);min-width:60px;display:flex;gap:6px;justify-content:center}
.message.loading span{width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:dotBounce 1.4s infinite ease-in-out both}

/* ── Input ── */
.chat-input-area{padding:1.2rem 1.4rem;background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:.8rem}
.chat-input-area input{
  flex:1;padding:.8rem 1.4rem;border:1px solid rgba(255,255,255,0.1);border-radius:30px;
  background:rgba(255,255,255,0.03);color:#fff;font-family:inherit;font-size:.95rem;transition:all .3s;
}
.chat-input-area input:focus{border-color:#f59e0b;background:rgba(255,255,255,0.06);box-shadow:0 0 15px rgba(245,158,11,0.1)}
.chat-input-area button[type=submit]{
  background:linear-gradient(135deg,#f59e0b,#ea580c);color:#000;border:none;
  width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .3s;
}
.chat-input-area button[type=submit]:hover:not(:disabled){transform:scale(1.1);box-shadow:0 5px 15px rgba(245,158,11,0.4)}

/* ── Footer ── */
.chat-footer{text-align:center;font-size:0.65rem;color:rgba(255,255,255,0.2);padding:0.6rem 0;background:#050505;letter-spacing:2px;text-transform:uppercase;font-weight:700}

/* ── Mobile & Scaling ── */
@media(max-width:480px){
  .chat-widget{bottom:1rem;right:1rem}
  .chat-window{width:calc(100vw - 2rem);height:75vh;right:0;bottom:90px;border-radius:24px}
  .chat-toggle-btn{width:75px;height:75px}
  .chat-toggle-btn.open{width:65px;height:65px}
  .chat-toggle-btn img{width:60px;height:60px}
  .unread-badge{width:32px;height:32px;top:-8px;right:-8px}
  .chat-header{padding:1rem 1.25rem}
  .chat-avatar{width:48px;height:48px}
  .chat-header h3{font-size:1.3rem}
  .chat-notification{min-width:180px;max-width:240px;bottom:90px}
}
`;

function injectStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('chat-widget-styles')) return;
    const s = document.createElement('style');
    s.id = 'chat-widget-styles';
    s.textContent = CHAT_STYLES;
    document.head.appendChild(s);
}

// ─── AI Config ────────────────────────────────────────────────────────
interface Message { text: string; isBot: boolean; }

const SYSTEM_PROMPT = `Your name is Roboto. You are the AI Assistant for Omar Abdelfattah's Creative Studio (OmarCreatives), an Egypt-based creative agency specializing in:
- Web Design & Development (React, Astro, Modern UI/UX)
- AI Content Creation (Generative Art, Copywriting)
- Brand Identity & Logo Design
- Mobile App Development
- UI/UX Design
- Social Media Design & Graphics

Your Role:
- Answer questions about available services.
- Explain Omar's expertise (AI Specialist + Creative Developer with 5+ years experience).
- Encourage users to start a project.
- CRITICAL: If a user wants to start a project or get a quote, direct them to contact Omar on WhatsApp: https://wa.me/201234567890 or the contact page at /contact.

Tone:
- Professional, creative, enthusiastic, and helpful.
- Keep responses concise (2-3 sentences max for chat).
- Use emojis sparingly.`;

async function askAI(msg: string, history: Message[]): Promise<string> {
    const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.slice(1).map(m => ({ role: m.isBot ? 'assistant' as const : 'user' as const, content: m.text })),
        { role: 'user' as const, content: msg },
    ];
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
    });
    if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error || `Error ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";
}

// ─── Component ────────────────────────────────────────────────────────
export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [notifDismissed, setNotifDismissed] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hi there! 👋 I'm Omar's AI assistant. Ask me about our services, pricing, or how to start a project!", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    // Inject styles + show notification after delay
    useEffect(() => {
        injectStyles();
        const timer = setTimeout(() => {
            if (!notifDismissed && !isOpen) setShowNotif(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

    const openChat = () => { setIsOpen(true); setShowNotif(false); setNotifDismissed(true); };
    const closeChat = () => setIsOpen(false);
    const dismissNotif = (e: Event) => { e.stopPropagation(); setShowNotif(false); setNotifDismissed(true); };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMsg = input.trim();
        const updated = [...messages, { text: userMsg, isBot: false }];
        setMessages(updated);
        setInput("");
        setIsLoading(true);
        try {
            const reply = await askAI(userMsg, updated);
            setMessages(prev => [...prev, { text: reply, isBot: true }]);
        } catch (err: any) {
            setMessages(prev => [...prev, { text: `⚠️ ${err.message}\n\nReach Omar on WhatsApp: https://wa.me/201234567890`, isBot: true }]);
        } finally { setIsLoading(false); }
    };

    return (
        <div className="chat-widget">
            {/* Notification Popup */}
            {showNotif && !isOpen && (
                <div className="chat-notification" onClick={openChat}>
                    <button className="chat-notification-close" onClick={dismissNotif}>×</button>
                    <div className="chat-notification-header">
                        <img src="/images/robot.png" alt="" />
                        <span>Roboto</span>
                    </div>
                    <p>Hey! 👋 Looking for creative services? Let's chat — I can help!</p>
                </div>
            )}

            {/* Mascot Toggle */}
            <button className={`chat-toggle-btn ${isOpen ? 'open' : ''}`} onClick={isOpen ? closeChat : openChat} aria-label="Chat">
                <img src="/images/robot.png" alt="Chat with us" />
                <span className="close-x">✕</span>
                {showNotif && !isOpen && (
                    <span className="unread-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <span className="chat-avatar"><img src="/images/robot.png" alt="" /></span>
                            <div>
                                <h3>Roboto</h3>
                                <span className="status-indicator">Online</span>
                            </div>
                        </div>
                        <button className="hdr-close" onClick={closeChat}>✕</button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.isBot ? 'bot' : 'user'}`}>{m.text}</div>
                        ))}
                        {isLoading && <div className="message bot loading"><span /><span /><span /></div>}
                        <div ref={endRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="chat-input-area">
                        <input type="text" value={input} onInput={(e) => setInput((e.target as HTMLInputElement).value)} placeholder="Type a message..." disabled={isLoading} />
                        <button type="submit" disabled={isLoading || !input.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                        </button>
                    </form>
                    <div className="chat-footer">Powered by AI</div>
                </div>
            )}
        </div>
    );
}
