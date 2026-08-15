import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useStore } from "../lib/store";
import { getCreator } from "../data/creators";

export default function Inbox() {
  const { conversations, sendMessage, markRead } = useStore();
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? conversations[0],
    [conversations, activeId]
  );

  useEffect(() => {
    if (active) markRead(active.id);
  }, [active, markRead]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages.length]);

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    if (!active || !draft.trim()) return;
    sendMessage(active.id, draft);
    setDraft("");
  };

  if (!active) {
    return (
      <div className="px-5 py-24 text-center text-stone">No conversations yet.</div>
    );
  }

  const creator = getCreator(active.creatorId);

  return (
    <div className="mx-auto flex h-[calc(100svh-64px)] max-w-[1400px] flex-col md:h-[calc(100svh-72px)] md:flex-row">
      <aside className="border-b border-white/8 md:w-[340px] md:border-b-0 md:border-r">
        <div className="px-5 py-5">
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Inbox</p>
          <h1 className="mt-1 font-display text-3xl">Threads</h1>
        </div>
        <ul className="max-h-[28vh] overflow-y-auto scrollbar-thin md:max-h-none">
          {conversations.map((c) => {
            const cr = getCreator(c.creatorId);
            const on = c.id === active.id;
            return (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={`flex w-full items-start gap-3 px-5 py-4 text-left transition ${
                    on ? "bg-ink-2" : "hover:bg-white/3"
                  }`}
                >
                  <img src={cr?.image} alt="" className="h-11 w-11 object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm text-cream">{cr?.name}</p>
                      <span className="text-[10px] text-stone">{c.time}</span>
                    </div>
                    <p className="truncate text-[11px] text-gold">{c.campaignTitle}</p>
                    <p className="mt-0.5 truncate text-[12px] text-stone">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="mt-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold text-[10px] text-ink">
                      {c.unread}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="flex min-h-0 flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-white/8 px-5 py-4">
          <img src={creator?.image} alt="" className="h-12 w-12 object-cover" />
          <div>
            <p className="text-cream">{creator?.name}</p>
            <p className="text-[12px] text-stone">
              {creator?.handle} · {active.campaignTitle}
            </p>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6 scrollbar-thin">
          {active.messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "brand" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] px-4 py-3 ${
                  m.from === "brand"
                    ? "bg-gold text-ink"
                    : "border border-white/10 bg-ink-2 text-cream"
                }`}
              >
                <p className="text-sm leading-relaxed">{m.text}</p>
                <p
                  className={`mt-2 text-[10px] tracking-wide ${
                    m.from === "brand" ? "text-ink/60" : "text-stone"
                  }`}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={onSend} className="flex gap-2 border-t border-white/8 p-4">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message ${creator?.name.split(" ")[0] ?? "talent"}…`}
            className="flex-1 border border-white/10 bg-ink-2 px-4 py-3 text-sm text-cream outline-none placeholder:text-stone/50 focus:border-gold/40"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-gold px-5 text-[12px] tracking-[0.16em] uppercase text-ink hover:bg-gold-2"
          >
            <Send size={14} /> Send
          </button>
        </form>
      </section>
    </div>
  );
}
