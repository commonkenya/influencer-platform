import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../lib/store";
import { niches } from "../../data/creators";
import type { Niche } from "../../data/types";

export default function CreatorOpportunities() {
  const { allCampaigns, applications, apply, hasApplied, creatorId } = useStore();
  const [niche, setNiche] = useState<Niche | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [pitch, setPitch] = useState("");
  const [rate, setRate] = useState("");

  const mine = applications.filter((a) => a.creatorId === creatorId);
  const open = useMemo(
    () =>
      allCampaigns.filter((c) => {
        if (c.status !== "open" && c.status !== "reviewing") return false;
        if (niche !== "All" && !c.niches.includes(niche)) return false;
        return true;
      }),
    [allCampaigns, niche]
  );

  const submit = (e: FormEvent, campaignId: string) => {
    e.preventDefault();
    if (!pitch.trim()) return;
    apply({ campaignId, pitch: pitch.trim(), rate });
    setPitch("");
    setRate("");
    setOpenId(null);
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-gold">The slate</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Opportunities</h1>
      <p className="mt-3 max-w-xl text-sm text-stone">
        Open briefs that fit the book. Apply with a treatment — the house sees it the same hour.
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {(["All", ...niches] as const).map((n) => (
          <button
            key={n}
            onClick={() => setNiche(n)}
            className={`border px-2.5 py-1 text-[11px] uppercase tracking-wider ${
              niche === n ? "border-gold bg-gold text-ink" : "border-white/10 text-stone"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {mine.length > 0 && (
        <div className="mt-8 border border-white/8 p-5">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Your applications</p>
          <ul className="mt-3 divide-y divide-white/8">
            {mine.map((a) => {
              const c = allCampaigns.find((x) => x.id === a.campaignId);
              return (
                <li key={a.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span>
                    {c?.title} <span className="text-stone">· {c?.brand}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gold">{a.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {open.map((c) => {
          const applied = hasApplied(c.id);
          return (
            <article key={c.id} className="flex flex-col border border-white/8 bg-ink-2">
              <div className="relative h-40 overflow-hidden">
                <img src={c.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent" />
                <p className="absolute bottom-3 left-4 text-[11px] uppercase tracking-wider text-gold">
                  {c.brand}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-3xl">{c.title}</h2>
                <p className="mt-2 text-sm text-stone">{c.tagline}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream-2">{c.brief}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.niches.map((n) => (
                    <span key={n} className="border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-stone">
                      {n}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="font-display text-xl">{c.budget}</p>
                    <p className="text-[11px] text-stone">Due {c.deadline}</p>
                  </div>
                  <Link to={`/campaigns/${c.id}`} className="text-[11px] uppercase tracking-wider text-gold">
                    Full brief
                  </Link>
                </div>
                {applied ? (
                  <p className="mt-4 border border-gold/30 bg-gold/10 py-2 text-center text-[11px] uppercase tracking-wider text-gold">
                    Application in
                  </p>
                ) : openId === c.id ? (
                  <form onSubmit={(e) => submit(e, c.id)} className="mt-4 space-y-2">
                    <textarea
                      required
                      rows={3}
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      placeholder="How you would shoot this."
                      className="field"
                    />
                    <input
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="Your rate (KSh)"
                      className="field"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-gold py-2 text-[11px] uppercase tracking-wider text-ink">
                        Submit
                      </button>
                      <button type="button" onClick={() => setOpenId(null)} className="px-3 text-[11px] uppercase text-stone">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      setOpenId(c.id);
                      setPitch("");
                      setRate("");
                    }}
                    className="mt-4 border border-gold/40 py-2 text-[11px] uppercase tracking-[0.16em] text-gold hover:bg-gold hover:text-ink"
                  >
                    Apply
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
