import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useStore } from "../../lib/store";
import type { CampaignStatus } from "../../data/types";

const statuses: (CampaignStatus | "all")[] = ["all", "open", "reviewing", "live", "completed"];

export default function BrandCampaigns() {
  const { allCampaigns, applications } = useStore();
  const [status, setStatus] = useState<(typeof statuses)[number]>("all");
  const mine = useMemo(
    () => allCampaigns.filter((c) => c.brand === "Lumen Atelier"),
    [allCampaigns]
  );
  const list = status === "all" ? mine : mine.filter((c) => c.status === status);

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">The slate</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Campaigns</h1>
        </div>
        <Link
          to="/brand/campaigns/new"
          className="inline-flex items-center gap-2 bg-gold px-4 py-2.5 text-[11px] tracking-[0.16em] uppercase text-ink"
        >
          <Plus size={13} /> New brief
        </Link>
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

      <div className="mt-6 overflow-x-auto border border-white/8">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/8 text-[10px] tracking-[0.16em] uppercase text-stone">
            <tr>
              <th className="px-4 py-3 font-normal">Campaign</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal">Budget</th>
              <th className="px-4 py-3 font-normal">Seats</th>
              <th className="px-4 py-3 font-normal">In</th>
              <th className="px-4 py-3 font-normal">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => {
              const apps = applications.filter((a) => a.campaignId === c.id);
              return (
                <tr key={c.id} className="border-b border-white/6 hover:bg-white/3">
                  <td className="px-4 py-4">
                    <Link to={`/brand/campaigns/${c.id}`} className="group flex items-center gap-3">
                      <img src={c.image} alt="" className="h-12 w-16 object-cover" />
                      <div>
                        <p className="text-cream group-hover:text-gold">{c.title}</p>
                        <p className="text-[12px] text-stone">{c.niches.join(" · ")}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <span className="border border-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-stone">{c.budget}</td>
                  <td className="px-4 py-4">{c.spots}</td>
                  <td className="px-4 py-4">{Math.max(c.applicants, apps.length)}</td>
                  <td className="px-4 py-4 text-stone">{c.deadline}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
