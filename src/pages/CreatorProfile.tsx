import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, MessageSquare, Star } from "lucide-react";
import { getCreator, formatFollowers, formatMoney } from "../data/creators";
import { campaigns } from "../data/campaigns";
import { useStore } from "../lib/store";

export default function CreatorProfile() {
  const { id } = useParams();
  const creator = id ? getCreator(id) : undefined;
  const { isShortlisted, toggleShortlist } = useStore();
  const nav = useNavigate();

  if (!creator) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <p className="font-display text-4xl">Not on the book.</p>
        <Link to="/discover" className="mt-6 inline-block text-gold">
          Return to roster
        </Link>
      </div>
    );
  }

  const saved = isShortlisted(creator.id);
  const matches = campaigns.filter(
    (c) => c.status === "open" && c.niches.some((n) => creator.niches.includes(n))
  );

  return (
    <div>
      <div className="relative h-[52vh] min-h-[380px] overflow-hidden md:h-[62vh]">
        <img src={creator.image} alt="" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-10 md:px-8">
          <button
            onClick={() => nav(-1)}
            className="mb-6 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-cream/70 hover:text-gold"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap gap-2">
                {creator.featured && (
                  <span className="bg-gold px-2 py-0.5 text-[9px] tracking-[0.16em] uppercase text-ink">
                    Featured
                  </span>
                )}
                {creator.verified && (
                  <span className="border border-white/30 px-2 py-0.5 text-[9px] tracking-[0.16em] uppercase">
                    Verified
                  </span>
                )}
              </div>
              <h1 className="mt-3 font-display text-6xl leading-none md:text-7xl">{creator.name}</h1>
              <p className="mt-2 text-gold">{creator.handle}</p>
              <p className="mt-3 flex items-center gap-3 text-sm text-stone">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} /> {creator.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star size={13} className="text-gold" fill="#C4A574" /> {creator.rating} ·{" "}
                  {creator.campaignsCompleted} campaigns
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/inbox"
                className="inline-flex items-center gap-2 bg-gold px-5 py-3 text-[12px] tracking-[0.16em] uppercase text-ink"
              >
                <MessageSquare size={14} /> Open inbox
              </Link>
              <button
                onClick={() => toggleShortlist(creator.id)}
                className={`inline-flex items-center gap-2 border px-5 py-3 text-[12px] tracking-[0.16em] uppercase ${
                  saved ? "border-gold bg-gold/10 text-gold" : "border-white/20 text-cream"
                }`}
              >
                <Heart size={14} fill={saved ? "currentColor" : "none"} />
                {saved ? "Shortlisted" : "Shortlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Dossier</p>
          <p className="mt-4 max-w-2xl font-display text-3xl leading-snug text-cream-2">
            {creator.longBio}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {creator.niches.map((n) => (
              <span key={n} className="border border-white/10 px-3 py-1 text-[11px] tracking-[0.16em] uppercase text-stone">
                {n}
              </span>
            ))}
            {creator.languages.map((l) => (
              <span key={l} className="border border-gold/30 px-3 py-1 text-[11px] tracking-[0.16em] uppercase text-gold">
                {l}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Platforms</p>
            <div className="mt-4 divide-y divide-white/8 border border-white/8">
              {creator.platforms.map((p) => (
                <div key={p.name} className="grid grid-cols-3 items-center px-4 py-4 text-sm md:grid-cols-4">
                  <span className="text-cream">{p.name}</span>
                  <span className="text-stone">{p.handle}</span>
                  <span className="text-cream">{formatFollowers(p.followers)}</span>
                  <span className="hidden text-gold md:block">{p.engagement}% ER</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Audience</p>
              <div className="mt-4 space-y-3">
                <Bar label="Female" value={creator.audience.female} />
                <Bar label="Male" value={creator.audience.male} />
              </div>
              <div className="mt-6 space-y-2">
                {creator.audience.ages.map((a) => (
                  <Bar key={a.range} label={a.range} value={a.pct} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Top markets</p>
              <ul className="mt-4 space-y-3">
                {creator.audience.topCountries.map((c) => (
                  <li key={c.name} className="flex justify-between border-b border-white/8 pb-2 text-sm">
                    <span>{c.name}</span>
                    <span className="text-gold">{c.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Recent work</p>
            <div className="mt-4 grid gap-3">
              {creator.recentWork.map((w) => (
                <div key={w.title} className="border border-white/8 p-4">
                  <p className="text-[11px] tracking-[0.16em] uppercase text-gold">{w.brand}</p>
                  <p className="mt-1 text-lg">{w.title}</p>
                  <p className="mt-1 text-sm text-stone">{w.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="border border-white/8 bg-ink-2 p-6">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Rate card</p>
            <ul className="mt-5 space-y-4">
              <li className="flex justify-between border-b border-white/8 pb-3">
                <span className="text-stone">Feed post</span>
                <span className="font-display text-2xl">{formatMoney(creator.rate.post)}</span>
              </li>
              <li className="flex justify-between border-b border-white/8 pb-3">
                <span className="text-stone">Story suite</span>
                <span className="font-display text-2xl">{formatMoney(creator.rate.story)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-stone">Reel / film</span>
                <span className="font-display text-2xl">{formatMoney(creator.rate.reel)}</span>
              </li>
            </ul>
            <p className="mt-5 text-[12px] text-stone">
              Responds {creator.responseTime} · usage negotiated per brief
            </p>
          </div>

          <div className="border border-white/8 p-6">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Snapshot</p>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-stone">Total reach</dt>
                <dd className="font-display text-2xl">{formatFollowers(creator.totalFollowers)}</dd>
              </div>
              <div>
                <dt className="text-stone">Avg. ER</dt>
                <dd className="font-display text-2xl">{creator.avgEngagement}%</dd>
              </div>
            </dl>
          </div>

          {matches.length > 0 && (
            <div className="border border-white/8 p-6">
              <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Matching briefs</p>
              <ul className="mt-4 space-y-3">
                {matches.slice(0, 3).map((c) => (
                  <li key={c.id}>
                    <Link to={`/campaigns/${c.id}`} className="group block">
                      <p className="text-sm text-cream group-hover:text-gold">{c.title}</p>
                      <p className="text-[12px] text-stone">
                        {c.brand} · {c.budget}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[12px]">
        <span className="text-stone">{label}</span>
        <span className="text-cream">{value}%</span>
      </div>
      <div className="h-[2px] bg-white/10">
        <div className="h-full bg-gold" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
