import { Link } from "react-router-dom";
import { Calendar, Users } from "lucide-react";
import type { Campaign } from "../data/types";

const statusTone: Record<Campaign["status"], string> = {
  open: "text-gold border-gold/40",
  reviewing: "text-cream-2 border-white/20",
  live: "text-rose border-rose/40",
  completed: "text-stone border-white/10",
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link
      to={`/campaigns/${campaign.id}`}
      className="group flex flex-col overflow-hidden border border-white/8 bg-ink-2 transition hover:border-gold/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span
          className={`absolute left-3 top-3 border bg-ink/60 px-2 py-0.5 text-[9px] tracking-[0.16em] uppercase backdrop-blur ${statusTone[campaign.status]}`}
        >
          {campaign.status}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold">{campaign.brand}</p>
          <h3 className="font-display text-[28px] leading-none text-cream">{campaign.title}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-[13px] leading-relaxed text-stone">{campaign.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {campaign.niches.map((n) => (
            <span
              key={n}
              className="border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase text-stone"
            >
              {n}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-white/8 pt-3">
          <div>
            <p className="font-display text-xl text-cream">{campaign.budget}</p>
            <p className="text-[10px] tracking-[0.12em] uppercase text-stone">Talent budget</p>
          </div>
          <div className="text-right text-[11px] text-stone">
            <p className="inline-flex items-center gap-1">
              <Users size={11} /> {campaign.applicants} applied · {campaign.spots} seats
            </p>
            <p className="mt-1 inline-flex items-center gap-1">
              <Calendar size={11} /> Due {campaign.deadline}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
