import { brandMonthlySpend, brandRoas } from "../../data/dashboard";
import { formatMoney } from "../../data/creators";

export default function BrandAnalytics() {
  const max = Math.max(...brandMonthlySpend.map((d) => d.v));
  const spend = brandRoas.reduce((n, r) => n + r.spend, 0);
  const sales = brandRoas.reduce((n, r) => n + r.sales, 0);

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Performance</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Analytics</h1>
      <p className="mt-3 max-w-xl text-sm text-stone">
        Closed house campaigns this fiscal. Numbers are attributed to Vela talent only.
      </p>

      <div className="mt-8 grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Talent spend", n: formatMoney(spend) },
          { l: "Attributed sales", n: formatMoney(sales) },
          { l: "Blended ROAS", n: `${(sales / spend).toFixed(1)}×` },
          { l: "Avg. ER", n: "5.4%" },
        ].map((k) => (
          <div key={k.l} className="bg-ink px-5 py-6">
            <p className="text-[11px] tracking-[0.16em] uppercase text-stone">{k.l}</p>
            <p className="mt-2 font-display text-4xl">{k.n}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-white/8 bg-ink-2 p-6">
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Monthly spend ($k)</p>
        <div className="mt-8 flex h-44 items-end gap-2">
          {brandMonthlySpend.map((d) => (
            <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full bg-gold/30 hover:bg-gold" style={{ height: `${(d.v / max) * 100}%` }} />
              <span className="text-[9px] text-stone">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-x-auto border border-white/8">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-white/8 text-[10px] tracking-[0.16em] uppercase text-stone">
            <tr>
              <th className="px-4 py-3 font-normal">Campaign</th>
              <th className="px-4 py-3 font-normal">Spend</th>
              <th className="px-4 py-3 font-normal">Sales</th>
              <th className="px-4 py-3 font-normal">ROAS</th>
              <th className="px-4 py-3 font-normal">Impressions</th>
            </tr>
          </thead>
          <tbody>
            {brandRoas.map((r) => (
              <tr key={r.campaign} className="border-b border-white/6">
                <td className="px-4 py-4">{r.campaign}</td>
                <td className="px-4 py-4 text-stone">{formatMoney(r.spend)}</td>
                <td className="px-4 py-4">{formatMoney(r.sales)}</td>
                <td className="px-4 py-4 text-gold">{r.roas.toFixed(1)}×</td>
                <td className="px-4 py-4 text-stone">{r.impress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
