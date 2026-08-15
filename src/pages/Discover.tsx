import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { creators, niches, formatFollowers } from "../data/creators";
import type { Niche, PlatformName } from "../data/types";
import CreatorCard from "../components/CreatorCard";

const platforms: PlatformName[] = ["Instagram", "TikTok", "YouTube", "Pinterest"];
const cities = ["All cities", ...Array.from(new Set(creators.map((c) => c.city))).sort()];

export default function Discover() {
  const [q, setQ] = useState("");
  const [niche, setNiche] = useState<Niche | "All">("All");
  const [platform, setPlatform] = useState<PlatformName | "All">("All");
  const [city, setCity] = useState("All cities");
  const [minFollowers, setMinFollowers] = useState(0);
  const [minEr, setMinEr] = useState(0);
  const [sort, setSort] = useState<"featured" | "reach" | "er" | "rate">("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = creators.filter((c) => {
      const hay = `${c.name} ${c.handle} ${c.bio} ${c.niches.join(" ")} ${c.location}`.toLowerCase();
      if (q && !hay.includes(q.toLowerCase())) return false;
      if (niche !== "All" && !c.niches.includes(niche)) return false;
      if (platform !== "All" && !c.platforms.some((p) => p.name === platform)) return false;
      if (city !== "All cities" && c.city !== city) return false;
      if (c.totalFollowers < minFollowers) return false;
      if (c.avgEngagement < minEr) return false;
      return true;
    });
    list.sort((a, b) => {
      if (sort === "reach") return b.totalFollowers - a.totalFollowers;
      if (sort === "er") return b.avgEngagement - a.avgEngagement;
      if (sort === "rate") return a.rate.reel - b.rate.reel;
      return Number(b.featured) - Number(a.featured) || b.totalFollowers - a.totalFollowers;
    });
    return list;
  }, [q, niche, platform, city, minFollowers, minEr, sort]);

  const reset = () => {
    setQ("");
    setNiche("All");
    setPlatform("All");
    setCity("All cities");
    setMinFollowers(0);
    setMinEr(0);
    setSort("featured");
  };

  const Filters = (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Discipline</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(["All", ...niches] as const).map((n) => (
            <button
              key={n}
              onClick={() => setNiche(n)}
              className={`px-2.5 py-1 text-[11px] tracking-[0.12em] uppercase border ${
                niche === n
                  ? "border-gold bg-gold text-ink"
                  : "border-white/10 text-stone hover:border-gold/40 hover:text-cream"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Platform</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(["All", ...platforms] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-2.5 py-1 text-[11px] tracking-[0.12em] uppercase border ${
                platform === p
                  ? "border-gold bg-gold text-ink"
                  : "border-white/10 text-stone hover:border-gold/40"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">City</p>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-3 w-full border border-white/10 bg-ink px-3 py-2 text-sm text-cream outline-none"
        >
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <div className="flex justify-between text-[11px] tracking-[0.16em] uppercase">
          <span className="text-gold">Min reach</span>
          <span className="text-stone">{formatFollowers(minFollowers)}+</span>
        </div>
        <input
          type="range"
          min={0}
          max={1200000}
          step={50000}
          value={minFollowers}
          onChange={(e) => setMinFollowers(Number(e.target.value))}
          className="mt-3 w-full"
        />
      </div>
      <div>
        <div className="flex justify-between text-[11px] tracking-[0.16em] uppercase">
          <span className="text-gold">Min engagement</span>
          <span className="text-stone">{minEr.toFixed(1)}%+</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={minEr}
          onChange={(e) => setMinEr(Number(e.target.value))}
          className="mt-3 w-full"
        />
      </div>
      <button onClick={reset} className="text-[11px] tracking-[0.16em] uppercase text-stone hover:text-gold">
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-14">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-[0.28em] uppercase text-gold">The roster</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Discover talent</h1>
        <p className="mt-4 text-stone">
          Sixteen names on the public book this season. Filter by craft, city, and the numbers that actually matter.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search names, handles, cities…"
            className="w-full border border-white/10 bg-ink-2 py-3 pl-10 pr-4 text-sm text-cream outline-none placeholder:text-stone/60 focus:border-gold/40"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border border-white/10 bg-ink-2 px-3 py-3 text-sm text-cream outline-none"
          >
            <option value="featured">Featured</option>
            <option value="reach">Highest reach</option>
            <option value="er">Highest ER</option>
            <option value="rate">Rate: low to high</option>
          </select>
          <button
            className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-[11px] tracking-[0.16em] uppercase text-stone lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          <p className="mb-5 text-[12px] tracking-[0.16em] uppercase text-stone">
            {filtered.length} creator{filtered.length === 1 ? "" : "s"}
          </p>
          {filtered.length === 0 ? (
            <div className="border border-white/8 px-8 py-16 text-center">
              <p className="font-display text-3xl">No one matches.</p>
              <p className="mt-2 text-sm text-stone">Widen the brief or reset filters.</p>
              <button
                onClick={reset}
                className="mt-6 border border-gold/40 px-4 py-2 text-[11px] tracking-[0.16em] uppercase text-gold"
              >
                Reset
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto border-t border-white/10 bg-ink-2 p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[12px] tracking-[0.2em] uppercase text-gold">Filters</p>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            {Filters}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full bg-gold py-3 text-[12px] tracking-[0.18em] uppercase text-ink"
            >
              Show {filtered.length} creators
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
