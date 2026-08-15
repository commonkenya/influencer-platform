import { useMemo, useState } from "react";
import { campaigns } from "../data/campaigns";
import { niches } from "../data/creators";
import type { CampaignStatus, Niche } from "../data/types";
import CampaignCard from "../components/CampaignCard";

const statuses: (CampaignStatus | "all")[] = ["all", "open", "reviewing", "live", "completed"];

export default function Campaigns() {
  const [niche, setNiche] = useState<Niche | "All">("All");
  const [status, setStatus] = useState<CampaignStatus | "all">("all");

  const list = useMemo(() => {
    return campaigns.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (niche !== "All" && !c.niches.includes(niche)) return false;
      return true;
    });
  }, [niche, status]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-14">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-[0.28em] uppercase text-gold">The slate</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Open campaigns</h1>
        <p className="mt-4 text-stone">
          Briefs from the house this season. Apply as talent, or cast from the roster if you sit on the brand side.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`border px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase ${
              status === s ? "border-gold bg-gold text-ink" : "border-white/10 text-stone"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["All", ...niches] as const).map((n) => (
          <button
            key={n}
            onClick={() => setNiche(n)}
            className={`px-2.5 py-1 text-[11px] tracking-[0.12em] uppercase border ${
              niche === n ? "border-gold/60 text-gold" : "border-white/8 text-stone"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <p className="mt-8 text-[12px] tracking-[0.16em] uppercase text-stone">
        {list.length} campaign{list.length === 1 ? "" : "s"}
      </p>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="py-16 text-center text-stone">Nothing on this filter.</p>
      )}
    </div>
  );
}
