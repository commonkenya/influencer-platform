import { FormEvent, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Check, MapPin, Users } from "lucide-react";
import { creators } from "../data/creators";
import CreatorCard from "../components/CreatorCard";
import { useStore } from "../lib/store";

export default function CampaignDetail() {
  const { id } = useParams();
  const { hasApplied, apply, getCampaignById, role } = useStore();
  const campaign = id ? getCampaignById(id) : undefined;
  const nav = useNavigate();
  const [pitch, setPitch] = useState("");
  const [rate, setRate] = useState("");
  const [done, setDone] = useState(false);

  if (!campaign) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <p className="font-display text-4xl">Brief not found.</p>
        <Link to="/campaigns" className="mt-6 inline-block text-gold">
          All campaigns
        </Link>
      </div>
    );
  }

  const applied = hasApplied(campaign.id) || done;
  const suggested = creators
    .filter((c) => c.niches.some((n) => campaign.niches.includes(n)))
    .slice(0, 3);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pitch.trim()) return;
    apply({
      campaignId: campaign.id,
      pitch: pitch.trim(),
      rate: rate || String(campaign.budgetMin),
    });
    setDone(true);
  };

  return (
    <div>
      <div className="relative h-[48vh] min-h-[320px] overflow-hidden">
        <img src={campaign.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-10 md:px-8">
          <button
            onClick={() => nav(-1)}
            className="mb-6 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-cream/70 hover:text-gold"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <p className="text-[12px] tracking-[0.22em] uppercase text-gold">{campaign.brand}</p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl">{campaign.title}</h1>
          <p className="mt-3 max-w-xl text-cream-2/80">{campaign.tagline}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">The brief</p>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-cream-2">{campaign.brief}</p>

          <div className="mt-10">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Deliverables</p>
            <ul className="mt-4 space-y-3">
              {campaign.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 border-b border-white/8 pb-3 text-sm">
                  <Check size={14} className="mt-0.5 text-gold" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Meta icon={<Calendar size={14} />} k="Apply by" v={campaign.deadline} />
            <Meta icon={<Calendar size={14} />} k="Shoot window" v={campaign.startDate} />
            <Meta icon={<MapPin size={14} />} k="Location" v={campaign.location} />
            <Meta
              icon={<Users size={14} />}
              k="Cast"
              v={`${campaign.spots} seats · ${campaign.applicants} applied`}
            />
          </div>

          <div className="mt-10 border border-white/8 p-6">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">The house</p>
            <div className="mt-4 flex gap-4">
              <img src={campaign.brandImage} alt="" className="h-20 w-20 object-cover" />
              <div>
                <p className="text-lg">{campaign.brand}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone">{campaign.brandAbout}</p>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Suggested cast</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {suggested.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          </div>
        </div>

        <aside className="md:sticky md:top-24 md:self-start">
          <div className="border border-white/8 bg-ink-2 p-6">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Talent budget</p>
            <p className="mt-2 font-display text-4xl">{campaign.budget}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {campaign.niches.map((n) => (
                <span key={n} className="border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase text-stone">
                  {n}
                </span>
              ))}
              {campaign.platforms.map((p) => (
                <span key={p} className="border border-gold/30 px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase text-gold">
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[12px] uppercase tracking-wider text-stone">Status · {campaign.status}</p>

            {campaign.status === "open" || campaign.status === "reviewing" ? (
              applied ? (
                <div className="mt-8 border border-gold/40 bg-gold/10 p-5 text-center">
                  <p className="font-display text-2xl text-gold">Application in.</p>
                  <p className="mt-2 text-sm text-stone">The house will reply in studio inbox.</p>
                  <Link
                    to={role === "creator" ? "/creator/opportunities" : "/enter?as=creator"}
                    className="mt-4 inline-block text-[11px] tracking-[0.16em] uppercase text-gold"
                  >
                    View on your desk
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-4">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Apply as talent</p>
                  <textarea
                    required
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    rows={5}
                    placeholder="A short treatment — how you would shoot this."
                    className="w-full border border-white/10 bg-ink px-3 py-3 text-sm text-cream outline-none placeholder:text-stone/50 focus:border-gold/40"
                  />
                  <input
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="Your rate for the full brief (KSh)"
                    className="w-full border border-white/10 bg-ink px-3 py-3 text-sm text-cream outline-none placeholder:text-stone/50 focus:border-gold/40"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gold py-3 text-[12px] tracking-[0.2em] uppercase text-ink hover:bg-gold-2"
                  >
                    Submit application
                  </button>
                </form>
              )
            ) : (
              <p className="mt-8 text-sm text-stone">This brief is no longer accepting applications.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Meta({ icon, k, v }: { icon: ReactNode; k: string; v: string }) {
  return (
    <div className="border border-white/8 p-4">
      <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-gold">
        {icon} {k}
      </p>
      <p className="mt-2 text-sm text-cream">{v}</p>
    </div>
  );
}
