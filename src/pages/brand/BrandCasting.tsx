import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import { creators, formatFollowers, formatMoney, niches } from "../../data/creators";
import type { Niche } from "../../data/types";
import { useStore } from "../../lib/store";

export default function BrandCasting() {
  const { shortlist, toggleShortlist, isShortlisted } = useStore();
  const [q, setQ] = useState("");
  const [niche, setNiche] = useState<Niche | "All">("All");
  const [onlySaved, setOnlySaved] = useState(false);

  const list = useMemo(() => {
    return creators.filter((c) => {
      if (onlySaved && !shortlist.includes(c.id)) return false;
      if (niche !== "All" && !c.niches.includes(niche)) return false;
      const hay = `${c.name} ${c.handle} ${c.city} ${c.niches.join(" ")}`.toLowerCase();
      if (q && !hay.includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, niche, onlySaved, shortlist]);

  const boardCost = shortlist
    .map((id) => creators.find((c) => c.id === id)?.rate.reel ?? 0)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Casting</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">The board</h1>
          <p className="mt-2 text-sm text-stone">
            {shortlist.length} shortlisted · {formatMoney(boardCost)} combined reel card
          </p>
        </div>
        <Link to="/discover" className="text-[11px] tracking-[0.16em] uppercase text-gold">
          Open public roster
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the book…"
            className="field pl-9"
          />
        </div>
        <button
          onClick={() => setOnlySaved((v) => !v)}
          className={`border px-4 py-2 text-[11px] tracking-[0.14em] uppercase ${
            onlySaved ? "border-gold bg-gold text-ink" : "border-white/10 text-stone"
          }`}
        >
          Shortlist only
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["All", ...niches] as const).map((n) => (
          <button
            key={n}
            onClick={() => setNiche(n)}
            className={`border px-2.5 py-1 text-[11px] uppercase tracking-wider ${
              niche === n ? "border-gold text-gold" : "border-white/10 text-stone"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto border border-white/8">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-white/8 text-[10px] tracking-[0.16em] uppercase text-stone">
            <tr>
              <th className="px-4 py-3 font-normal">Talent</th>
              <th className="px-4 py-3 font-normal">Reach</th>
              <th className="px-4 py-3 font-normal">ER</th>
              <th className="px-4 py-3 font-normal">Reel</th>
              <th className="px-4 py-3 font-normal">City</th>
              <th className="px-4 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => {
              const saved = isShortlisted(c.id);
              return (
                <tr key={c.id} className="border-b border-white/6 hover:bg-white/3">
                  <td className="px-4 py-3">
                    <Link to={`/creators/${c.id}`} className="flex items-center gap-3">
                      <img src={c.image} alt="" className="h-11 w-11 object-cover" />
                      <div>
                        <p className="hover:text-gold">{c.name}</p>
                        <p className="text-[11px] text-stone">{c.niches.join(" · ")}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">{formatFollowers(c.totalFollowers)}</td>
                  <td className="px-4 py-3">{c.avgEngagement}%</td>
                  <td className="px-4 py-3">{formatMoney(c.rate.reel)}</td>
                  <td className="px-4 py-3 text-stone">{c.city}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleShortlist(c.id)}
                      className={`inline-flex items-center gap-1 border px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                        saved ? "border-gold bg-gold text-ink" : "border-white/15 text-stone"
                      }`}
                    >
                      <Heart size={11} fill={saved ? "currentColor" : "none"} />
                      {saved ? "On board" : "Add"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
