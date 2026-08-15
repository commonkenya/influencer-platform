import { Link } from "react-router-dom";
import { ArrowUpRight, Heart } from "lucide-react";
import { useStore } from "../lib/store";
import { creators, formatMoney, getCreator } from "../data/creators";
import { getCampaign } from "../data/campaigns";
import CreatorCard from "../components/CreatorCard";

const kpis = [
  { l: "Active briefs", n: "6", s: "+2 this month" },
  { l: "Talent shortlisted", n: "", s: "across open casts" },
  { l: "In conversation", n: "5", s: "3 awaiting reply" },
  { l: "Booked YTD", n: "$428k", s: "18 campaigns" },
];

const pipeline = [
  { brand: "Lumen Atelier", title: "Autumn Atelier", stage: "Treatment", spend: 24000, pct: 70 },
  { brand: "Solace Skin", title: "Dew Protocol", stage: "Casting", spend: 18600, pct: 45 },
  { brand: "Volt Athletics", title: "Forge Collection", stage: "In production", spend: 15200, pct: 82 },
  { brand: "Wander Club", title: "House Residencies", stage: "Contract", spend: 31000, pct: 30 },
  { brand: "Pulse Labs", title: "The Desk System", stage: "Brief live", spend: 9800, pct: 18 },
];

const weekly = [42, 55, 48, 71, 63, 88, 76, 94, 81, 110, 98, 124];

export default function Studio() {
  const { shortlist, applications, conversations } = useStore();
  const saved = shortlist.map((id) => getCreator(id)).filter(Boolean);
  const unread = conversations.reduce((n, c) => n + c.unread, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">Brand desk</p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">Studio</h1>
          <p className="mt-3 max-w-xl text-stone">
            Signed in as Lumen Atelier. Pipeline, shortlist, and applications for the season.
          </p>
        </div>
        <Link
          to="/discover"
          className="border border-gold/50 px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-gold hover:bg-gold hover:text-ink"
        >
          Cast new talent
        </Link>
      </div>

      <div className="mt-10 grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="bg-ink px-5 py-6">
            <p className="text-[11px] tracking-[0.16em] uppercase text-stone">{k.l}</p>
            <p className="mt-2 font-display text-4xl">
              {k.l === "Talent shortlisted" ? shortlist.length : k.n}
            </p>
            <p className="mt-1 text-[12px] text-stone">
              {k.l === "Talent shortlisted" ? "across open casts" : k.s}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="border border-white/8 bg-ink-2 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Pipeline</p>
            <span className="text-[11px] text-stone">Season spend</span>
          </div>
          <ul className="mt-6 space-y-5">
            {pipeline.map((p) => (
              <li key={p.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-sm text-cream">{p.title}</p>
                    <p className="text-[12px] text-stone">
                      {p.brand} · {p.stage}
                    </p>
                  </div>
                  <p className="font-display text-xl">{formatMoney(p.spend)}</p>
                </div>
                <div className="mt-2 h-[2px] bg-white/10">
                  <div className="h-full bg-gold" style={{ width: `${p.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-white/8 p-6">
          <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Impressions, last 12 weeks</p>
          <p className="mt-3 font-display text-4xl">18.4M</p>
          <p className="text-[12px] text-stone">Across booked talent · +22% vs prior</p>
          <div className="mt-8 flex h-36 items-end gap-1.5">
            {weekly.map((v, i) => (
              <div key={i} className="flex-1 bg-gold/25 hover:bg-gold" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="border border-white/8 p-3">
              <p className="text-stone">Avg. ER</p>
              <p className="font-display text-2xl">5.8%</p>
            </div>
            <div className="border border-white/8 p-3">
              <p className="text-stone">Inbox</p>
              <p className="font-display text-2xl">{unread} new</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Shortlist</p>
            <h2 className="mt-2 font-display text-4xl">On the board</h2>
          </div>
          <Link to="/discover" className="text-[12px] tracking-[0.16em] uppercase text-gold">
            Add more
          </Link>
        </div>
        {saved.length === 0 ? (
          <div className="mt-6 border border-dashed border-white/15 px-6 py-14 text-center">
            <Heart className="mx-auto text-stone" size={22} />
            <p className="mt-3 text-stone">No one shortlisted yet.</p>
            <Link to="/discover" className="mt-4 inline-block text-gold">
              Open the roster
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {saved.map((c) => c && <CreatorCard key={c.id} creator={c} />)}
          </div>
        )}
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="border border-white/8 p-6">
          <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Applications</p>
          <h2 className="mt-2 font-display text-3xl">Your briefs</h2>
          {applications.length === 0 ? (
            <p className="mt-6 text-sm text-stone">You have not applied to a brief yet.</p>
          ) : (
            <ul className="mt-6 divide-y divide-white/8">
              {applications.map((a) => {
                const camp = getCampaign(a.campaignId);
                if (!camp) return null;
                return (
                  <li key={a.campaignId} className="flex items-start justify-between gap-4 py-4">
                    <div>
                      <Link to={`/campaigns/${camp.id}`} className="text-cream hover:text-gold">
                        {camp.title}
                      </Link>
                      <p className="mt-1 text-[12px] text-stone">
                        {camp.brand} · {a.date} · ${a.rate || "—"}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-stone">{a.pitch}</p>
                    </div>
                    <span
                      className={`shrink-0 border px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase ${
                        a.status === "accepted"
                          ? "border-gold text-gold"
                          : a.status === "shortlisted"
                            ? "border-rose/50 text-rose"
                            : "border-white/15 text-stone"
                      }`}
                    >
                      {a.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border border-white/8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Inbox</p>
              <h2 className="mt-2 font-display text-3xl">Live threads</h2>
            </div>
            <Link to="/inbox" className="inline-flex items-center gap-1 text-[12px] uppercase tracking-wider text-gold">
              Open <ArrowUpRight size={12} />
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-white/8">
            {conversations.map((c) => {
              const cr = getCreator(c.creatorId);
              return (
                <li key={c.id} className="flex items-center gap-3 py-3">
                  <img src={cr?.image} alt="" className="h-11 w-11 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      {cr?.name} · {c.campaignTitle}
                    </p>
                    <p className="truncate text-[12px] text-stone">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-ink">
                      {c.unread}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Recommended next</p>
        <h2 className="mt-2 font-display text-3xl">Talent adjacent to your board</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {creators
            .filter((c) => !shortlist.includes(c.id))
            .slice(0, 4)
            .map((c) => (
              <div key={c.id} className="relative">
                <CreatorCard creator={c} />
              </div>
            ))}
        </div>
      </section>

    </div>
  );
}
