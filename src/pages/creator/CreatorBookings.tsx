import { useState } from "react";
import { Check } from "lucide-react";
import { useStore } from "../../lib/store";
import { formatMoney } from "../../data/creators";
import type { BookingStatus } from "../../data/types";

const filters: (BookingStatus | "all")[] = [
  "all",
  "contracted",
  "production",
  "review",
  "delivered",
  "paid",
];

export default function CreatorBookings() {
  const { bookings, toggleDeliverable } = useStore();
  const [status, setStatus] = useState<(typeof filters)[number]>("all");
  const list = status === "all" ? bookings : bookings.filter((b) => b.status === status);

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-gold">The floor</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Bookings</h1>
      <p className="mt-3 max-w-xl text-sm text-stone">
        Contracts, deliverables, and due dates. Tick an item when the house has it.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase ${
              status === s ? "border-gold bg-gold text-ink" : "border-white/10 text-stone"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {list.map((b) => {
          const done = b.deliverables.filter((d) => d.done).length;
          return (
            <article key={b.id} className="border border-white/8 bg-ink-2 p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gold">{b.brand}</p>
                  <h2 className="mt-1 font-display text-3xl">{b.title}</h2>
                  <p className="mt-1 text-sm text-stone">Due {b.due}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl">{formatMoney(b.fee)}</p>
                  <span className="text-[10px] uppercase tracking-wider text-gold">{b.status}</span>
                </div>
              </div>
              <div className="mt-5 h-[2px] bg-white/10">
                <div className="h-full bg-gold" style={{ width: `${(done / b.deliverables.length) * 100}%` }} />
              </div>
              <ul className="mt-5 divide-y divide-white/8">
                {b.deliverables.map((d) => (
                  <li key={d.id}>
                    <button
                      onClick={() => toggleDeliverable(b.id, d.id)}
                      className="flex w-full items-center gap-3 py-3 text-left"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center border ${
                          d.done ? "border-gold bg-gold text-ink" : "border-white/20 text-transparent"
                        }`}
                      >
                        <Check size={12} />
                      </span>
                      <span className={d.done ? "text-stone line-through" : "text-cream"}>{d.label}</span>
                      <span className="ml-auto text-[12px] text-stone">{d.due}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
        {list.length === 0 && <p className="py-12 text-center text-stone">Nothing in this column.</p>}
      </div>
    </div>
  );
}
