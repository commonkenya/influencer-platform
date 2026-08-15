import { useStore } from "../../lib/store";
import { formatMoney } from "../../data/creators";
import { creatorMonthly } from "../../data/dashboard";

export default function CreatorEarnings() {
  const { payouts } = useStore();
  const paid = payouts.filter((p) => p.status === "paid").reduce((n, p) => n + p.amount, 0);
  const scheduled = payouts.filter((p) => p.status === "scheduled").reduce((n, p) => n + p.amount, 0);
  const processing = payouts.filter((p) => p.status === "processing").reduce((n, p) => n + p.amount, 0);
  const max = Math.max(...creatorMonthly.map((d) => d.v));
  const year = creatorMonthly.reduce((n, d) => n + d.v, 0);

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-gold">The ledger</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Earnings</h1>
      <p className="mt-3 max-w-xl text-sm text-stone">
        House fee is taken at booking. What you see here is yours.
      </p>

      <div className="mt-8 grid gap-px bg-white/8 sm:grid-cols-3">
        {[
          { l: "Settled", n: formatMoney(paid) },
          { l: "Processing", n: formatMoney(processing) },
          { l: "Scheduled", n: formatMoney(scheduled) },
        ].map((k) => (
          <div key={k.l} className="bg-ink px-5 py-6">
            <p className="text-[11px] tracking-[0.16em] uppercase text-stone">{k.l}</p>
            <p className="mt-2 font-display text-4xl">{k.n}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-white/8 bg-ink-2 p-6">
        <div className="flex items-end justify-between">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Twelve-month take</p>
          <p className="font-display text-3xl">{formatMoney(year)}</p>
        </div>
        <div className="mt-8 flex h-40 items-end gap-2">
          {creatorMonthly.map((d) => (
            <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full bg-gold/30 hover:bg-gold" style={{ height: `${(d.v / max) * 100}%` }} />
              <span className="text-[9px] text-stone">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-x-auto border border-white/8">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/8 text-[10px] tracking-[0.16em] uppercase text-stone">
            <tr>
              <th className="px-4 py-3 font-normal">Campaign</th>
              <th className="px-4 py-3 font-normal">Date</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} className="border-b border-white/6">
                <td className="px-4 py-4">{p.campaign}</td>
                <td className="px-4 py-4 text-stone">{p.date}</td>
                <td className="px-4 py-4">
                  <span className="text-[10px] uppercase tracking-wider text-gold">{p.status}</span>
                </td>
                <td className="px-4 py-4 text-right font-display text-xl">{formatMoney(p.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
