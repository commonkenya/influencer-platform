import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { useStore } from "../../lib/store";
import { formatMoney, getCreator } from "../../data/creators";
import { brandMonthlySpend, brandRoas, brandUser } from "../../data/dashboard";

const pipelineStages = ["Brief", "Casting", "Contract", "Production", "Live", "Report"];

export default function BrandOverview() {
  const { allCampaigns, applications, shortlist, conversations } = useStore();
  const mine = allCampaigns.filter((c) => c.brand === "Lumen Atelier");
  const lumenApps = applications.filter((a) =>
    mine.some((c) => c.id === a.campaignId)
  );
  const pending = lumenApps.filter((a) => a.status === "pending").length;
  const unread = conversations
    .filter((c) => ["c-maya", "c-hana", "c-jordan", "c-sofia", "c-amara"].includes(c.id))
    .reduce((n, c) => n + c.unread, 0);
  const maxSpend = Math.max(...brandMonthlySpend.map((d) => d.v));

  const board = [
    { stage: "Brief", items: mine.filter((c) => c.status === "open").slice(0, 2) },
    { stage: "Casting", items: mine.filter((c) => c.status === "reviewing" || c.status === "open").slice(0, 1) },
    { stage: "Live", items: mine.filter((c) => c.status === "live") },
    { stage: "Report", items: mine.filter((c) => c.status === "completed") },
  ];

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Good morning, {brandUser.name.split(" ")[0]}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">House overview</h1>
          <p className="mt-2 max-w-xl text-sm text-stone">
            Lumen Atelier · {mine.length} campaigns on the book · {pending} treatments waiting.
          </p>
        </div>
        <Link
          to="/brand/campaigns/new"
          className="inline-flex items-center gap-2 bg-gold px-4 py-2.5 text-[11px] tracking-[0.16em] uppercase text-ink"
        >
          <Plus size={13} /> New brief
        </Link>
      </div>

      <div className="mt-8 grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Active campaigns", n: String(mine.filter((c) => c.status !== "completed").length), s: "this season" },
          { l: "Treatments in", n: String(lumenApps.length), s: `${pending} unread` },
          { l: "On the board", n: String(shortlist.length), s: "shortlisted talent" },
          { l: "Inbox", n: String(unread), s: "awaiting reply" },
        ].map((k) => (
          <div key={k.l} className="bg-ink px-5 py-6">
            <p className="text-[11px] tracking-[0.16em] uppercase text-stone">{k.l}</p>
            <p className="mt-2 font-display text-4xl">{k.n}</p>
            <p className="mt-1 text-[12px] text-stone">{k.s}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="border border-white/8 bg-ink-2 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Spend, last 12 months</p>
            <span className="text-[12px] text-stone">KSh 892K booked</span>
          </div>
          <div className="mt-8 flex h-40 items-end gap-2">
            {brandMonthlySpend.map((d) => (
              <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full bg-gold/25 hover:bg-gold" style={{ height: `${(d.v / maxSpend) * 100}%` }} />
                <span className="text-[9px] tracking-wider text-stone">{d.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-white/8 p-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Season ROAS</p>
          <p className="mt-3 font-display text-5xl">4.6×</p>
          <p className="text-[12px] text-stone">Blended across five closed films</p>
          <ul className="mt-6 space-y-3">
            {brandRoas.slice(0, 3).map((r) => (
              <li key={r.campaign} className="flex items-baseline justify-between text-sm">
                <span className="text-stone">{r.campaign}</span>
                <span className="text-gold">{r.roas.toFixed(1)}×</span>
              </li>
            ))}
          </ul>
          <Link to="/brand/analytics" className="mt-6 inline-flex items-center gap-1 text-[11px] tracking-[0.16em] uppercase text-gold">
            Full report <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Pipeline</p>
            <h2 className="mt-1 font-display text-3xl">The board</h2>
          </div>
          <p className="hidden text-[11px] text-stone md:block">{pipelineStages.join("  →  ")}</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {board.map((col) => (
            <div key={col.stage} className="border border-white/8 p-3">
              <p className="px-1 text-[10px] tracking-[0.18em] uppercase text-gold">{col.stage}</p>
              <div className="mt-3 space-y-2">
                {col.items.length === 0 && (
                  <p className="px-1 py-6 text-center text-[12px] text-stone">Empty</p>
                )}
                {col.items.map((c) => (
                  <Link
                    key={c.id}
                    to={`/brand/campaigns/${c.id}`}
                    className="block border border-white/8 bg-ink-2 p-3 hover:border-gold/30"
                  >
                    <p className="text-sm">{c.title}</p>
                    <p className="mt-1 text-[11px] text-stone">
                      {c.spots} seats · {c.applicants} in
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="border border-white/8 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Latest treatments</p>
            <Link to="/brand/campaigns" className="text-[11px] uppercase tracking-wider text-gold">
              Review
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-white/8">
            {lumenApps.slice(0, 5).map((a) => {
              const cr = getCreator(a.creatorId);
              const camp = mine.find((c) => c.id === a.campaignId);
              return (
                <li key={a.id} className="flex items-center gap-3 py-3">
                  <img src={cr?.image} alt="" className="h-10 w-10 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{cr?.name}</p>
                    <p className="truncate text-[12px] text-stone">{camp?.title}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gold">{a.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border border-white/8 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Shortlist</p>
            <Link to="/brand/casting" className="text-[11px] uppercase tracking-wider text-gold">
              Cast
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {shortlist.slice(0, 5).map((id) => {
              const cr = getCreator(id);
              if (!cr) return null;
              return (
                <li key={id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={cr.image} alt="" className="h-10 w-10 object-cover" />
                    <div>
                      <p className="text-sm">{cr.name}</p>
                      <p className="text-[12px] text-stone">{cr.niches.join(" · ")}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gold">{formatMoney(cr.rate.reel)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
