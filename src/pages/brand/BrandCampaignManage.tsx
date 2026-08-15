import { Link, useParams } from "react-router-dom";
import { useStore } from "../../lib/store";
import { formatFollowers, formatMoney, getCreator } from "../../data/creators";
import type { ApplicationStatus } from "../../data/types";

const actions: { s: ApplicationStatus; l: string }[] = [
  { s: "shortlisted", l: "Shortlist" },
  { s: "accepted", l: "Book" },
  { s: "declined", l: "Pass" },
];

export default function BrandCampaignManage() {
  const { id } = useParams();
  const { getCampaignById, applications, setApplicationStatus } = useStore();
  const campaign = id ? getCampaignById(id) : undefined;
  const apps = applications.filter((a) => a.campaignId === id);

  if (!campaign) {
    return (
      <div className="px-8 py-20 text-center">
        <p className="font-display text-3xl">Brief not on this desk.</p>
        <Link to="/brand/campaigns" className="mt-4 inline-block text-gold">
          All campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <Link to="/brand/campaigns" className="text-[11px] tracking-[0.16em] uppercase text-stone hover:text-gold">
        ← Campaigns
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">{campaign.status}</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">{campaign.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-stone">{campaign.tagline}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl">{campaign.budget}</p>
          <p className="text-[11px] uppercase tracking-wider text-stone">
            {campaign.spots} seats · due {campaign.deadline}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { l: "Treatments", n: String(apps.length) },
          { l: "Shortlisted", n: String(apps.filter((a) => a.status === "shortlisted").length) },
          { l: "Booked", n: String(apps.filter((a) => a.status === "accepted").length) },
          { l: "Public in", n: String(campaign.applicants) },
        ].map((k) => (
          <div key={k.l} className="border border-white/8 px-4 py-4">
            <p className="text-[10px] tracking-[0.16em] uppercase text-stone">{k.l}</p>
            <p className="mt-1 font-display text-3xl">{k.n}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Casting room</p>
          {apps.length === 0 ? (
            <p className="mt-6 text-sm text-stone">No treatments on this brief yet.</p>
          ) : (
            <ul className="mt-5 space-y-4">
              {apps.map((a) => {
                const cr = getCreator(a.creatorId);
                if (!cr) return null;
                return (
                  <li key={a.id} className="border border-white/8 bg-ink-2 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <img src={cr.image} alt="" className="h-16 w-16 object-cover" />
                        <div>
                          <Link to={`/creators/${cr.id}`} className="text-lg hover:text-gold">
                            {cr.name}
                          </Link>
                          <p className="text-[12px] text-stone">
                            {cr.handle} · {formatFollowers(cr.totalFollowers)} · {cr.avgEngagement}% ER ·{" "}
                            {cr.city}
                          </p>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-2">{a.pitch}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl">{formatMoney(Number(a.rate) || 0)}</p>
                        <p className="text-[11px] uppercase tracking-wider text-gold">{a.status}</p>
                        <p className="text-[11px] text-stone">{a.date}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {actions.map((act) => (
                        <button
                          key={act.s}
                          onClick={() => setApplicationStatus(a.id, act.s)}
                          disabled={a.status === act.s}
                          className={`border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase ${
                            a.status === act.s
                              ? "border-gold bg-gold text-ink"
                              : "border-white/15 text-stone hover:border-gold hover:text-gold"
                          }`}
                        >
                          {act.l}
                        </button>
                      ))}
                      <Link
                        to="/brand/inbox"
                        className="border border-white/15 px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase text-stone hover:text-cream"
                      >
                        Message
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <aside className="space-y-4">
          <div className="border border-white/8 p-5">
            <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Deliverables</p>
            <ul className="mt-3 space-y-2 text-sm text-stone">
              {campaign.deliverables.map((d) => (
                <li key={d}>— {d}</li>
              ))}
            </ul>
          </div>
          <div className="border border-white/8 p-5">
            <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Window</p>
            <p className="mt-3 text-sm">Apply by {campaign.deadline}</p>
            <p className="text-sm text-stone">Shoot {campaign.startDate}</p>
            <p className="mt-2 text-sm text-stone">{campaign.location}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
