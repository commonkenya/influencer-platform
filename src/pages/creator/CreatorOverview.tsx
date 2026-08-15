import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useStore } from "../../lib/store";
import { formatMoney, getCreator } from "../../data/creators";
import { creatorMonthly, creatorReach } from "../../data/dashboard";

const statusNote: Record<string, string> = {
  contracted: "Contract",
  production: "In production",
  review: "In review",
  delivered: "Delivered",
  paid: "Paid",
};

export default function CreatorOverview() {
  const { bookings, applications, payouts, creatorId, allCampaigns } = useStore();
  const me = getCreator(creatorId);
  const mineApps = applications.filter((a) => a.creatorId === creatorId);
  const upcoming = bookings.filter((b) => b.status !== "paid");
  const earned = payouts.filter((p) => p.status === "paid").reduce((n, p) => n + p.amount, 0);
  const pendingPay = payouts.filter((p) => p.status !== "paid").reduce((n, p) => n + p.amount, 0);
  const maxE = Math.max(...creatorMonthly.map((d) => d.v));
  const maxR = Math.max(...creatorReach);

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={me?.image} alt="" className="h-16 w-16 object-cover" />
          <div>
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Talent desk</p>
            <h1 className="font-display text-4xl md:text-5xl">{me?.name}</h1>
            <p className="text-sm text-stone">{me?.handle} · {me?.location}</p>
          </div>
        </div>
        <Link
          to="/creator/opportunities"
          className="border border-gold/50 px-4 py-2.5 text-[11px] tracking-[0.16em] uppercase text-gold hover:bg-gold hover:text-ink"
        >
          Browse briefs
        </Link>
      </div>

      <div className="mt-8 grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Active bookings", n: String(upcoming.length), s: "in production or contract" },
          { l: "Earned YTD", n: formatMoney(earned), s: "settled to your account" },
          { l: "Scheduled", n: formatMoney(pendingPay), s: "invoices in flight" },
          { l: "Open applications", n: String(mineApps.filter((a) => a.status === "pending" || a.status === "shortlisted").length), s: "awaiting the house" },
        ].map((k) => (
          <div key={k.l} className="bg-ink px-5 py-6">
            <p className="text-[11px] tracking-[0.16em] uppercase text-stone">{k.l}</p>
            <p className="mt-2 font-display text-4xl">{k.n}</p>
            <p className="mt-1 text-[12px] text-stone">{k.s}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-white/8 bg-ink-2 p-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Earnings, 12 months</p>
          <p className="mt-2 font-display text-4xl">
            {formatMoney(creatorMonthly.reduce((n, d) => n + d.v, 0))}
          </p>
          <div className="mt-6 flex h-36 items-end gap-1.5">
            {creatorMonthly.map((d) => (
              <div key={d.m} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="w-full bg-gold/30 hover:bg-gold" style={{ height: `${(d.v / maxE) * 100}%` }} />
                <span className="text-[8px] text-stone">{d.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-white/8 p-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Sponsored reach (M)</p>
          <p className="mt-2 font-display text-4xl">26.9M</p>
          <p className="text-[12px] text-stone">Impressions on booked work</p>
          <div className="mt-6 flex h-36 items-end gap-1.5">
            {creatorReach.map((v, i) => (
              <div key={i} className="flex-1 bg-cream/20 hover:bg-cream/50" style={{ height: `${(v / maxR) * 100}%` }} />
            ))}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">On the floor</p>
            <h2 className="mt-1 font-display text-3xl">Current work</h2>
          </div>
          <Link to="/creator/bookings" className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-gold">
            All bookings <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {upcoming.map((b) => {
            const done = b.deliverables.filter((d) => d.done).length;
            return (
              <Link key={b.id} to="/creator/bookings" className="border border-white/8 p-5 hover:border-gold/30">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gold">{b.brand}</p>
                    <p className="mt-1 text-lg">{b.title}</p>
                  </div>
                  <span className="border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-stone">
                    {statusNote[b.status]}
                  </span>
                </div>
                <p className="mt-3 font-display text-2xl">{formatMoney(b.fee)}</p>
                <div className="mt-4 h-[2px] bg-white/10">
                  <div
                    className="h-full bg-gold"
                    style={{ width: `${(done / b.deliverables.length) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-[12px] text-stone">
                  {done}/{b.deliverables.length} deliverables · due {b.due}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="border border-white/8 p-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Applications</p>
          <ul className="mt-4 divide-y divide-white/8">
            {mineApps.slice(0, 4).map((a) => {
              const camp = allCampaigns.find((c) => c.id === a.campaignId);
              return (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm">{camp?.title}</p>
                    <p className="text-[12px] text-stone">{camp?.brand} · {a.date}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gold">{a.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border border-white/8 p-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Next payouts</p>
          <ul className="mt-4 divide-y divide-white/8">
            {payouts
              .filter((p) => p.status !== "paid")
              .map((p) => (
                <li key={p.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm">{p.campaign}</p>
                    <p className="text-[12px] text-stone">{p.date} · {p.status}</p>
                  </div>
                  <p className="font-display text-xl">{formatMoney(p.amount)}</p>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
