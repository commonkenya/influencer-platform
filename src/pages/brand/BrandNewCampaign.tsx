import { FormEvent, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";
import { niches } from "../../data/creators";
import type { Niche, PlatformName } from "../../data/types";

const platforms: PlatformName[] = ["Instagram", "TikTok", "YouTube", "Pinterest"];

export default function BrandNewCampaign() {
  const { createCampaign } = useStore();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [brief, setBrief] = useState("");
  const [selected, setSelected] = useState<Niche[]>(["Fashion"]);
  const [plats, setPlats] = useState<PlatformName[]>(["Instagram"]);
  const [budgetMin, setBudgetMin] = useState(12000);
  const [budgetMax, setBudgetMax] = useState(28000);
  const [spots, setSpots] = useState(4);
  const [deadline, setDeadline] = useState("2026-05-01");
  const [startDate, setStartDate] = useState("2026-05-18");
  const [location, setLocation] = useState("Los Angeles · Paris");
  const [deliverables, setDeliverables] = useState(
    "1 × 20–30s hero reel\n4 feed stills\n6 stories with product tags"
  );

  const toggle = <T,>(list: T[], item: T, set: (v: T[]) => void) => {
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !brief.trim() || selected.length === 0) return;
    const campaign = createCampaign({
      title: title.trim(),
      tagline: tagline.trim() || "A new house brief.",
      brief: brief.trim(),
      niches: selected,
      budgetMin,
      budgetMax,
      deliverables: deliverables.split("\n").map((s) => s.trim()).filter(Boolean),
      deadline: new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      startDate: new Date(startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      platforms: plats,
      location,
      spots,
    });
    nav(`/brand/campaigns/${campaign.id}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Write the brief</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">New campaign</h1>
      <p className="mt-3 text-sm text-stone">
        Keep it as short as a good treatment. Talent will see this on the public slate.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <Field label="Title">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Summer Atelier"
            className="field"
          />
        </Field>
        <Field label="Tagline">
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="One line the house would print"
            className="field"
          />
        </Field>
        <Field label="Brief">
          <textarea
            required
            rows={6}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="The feeling, the clothes, what you will not accept."
            className="field"
          />
        </Field>
        <Field label="Disciplines">
          <div className="flex flex-wrap gap-1.5">
            {niches.map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => toggle(selected, n, setSelected)}
                className={`border px-2.5 py-1 text-[11px] tracking-[0.12em] uppercase ${
                  selected.includes(n) ? "border-gold bg-gold text-ink" : "border-white/10 text-stone"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Platforms">
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => toggle(plats, p, setPlats)}
                className={`border px-2.5 py-1 text-[11px] tracking-[0.12em] uppercase ${
                  plats.includes(p) ? "border-gold bg-gold text-ink" : "border-white/10 text-stone"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={`Budget min · $${budgetMin.toLocaleString()}`}>
            <input
              type="range"
              min={2000}
              max={40000}
              step={500}
              value={budgetMin}
              onChange={(e) => setBudgetMin(Number(e.target.value))}
              className="w-full"
            />
          </Field>
          <Field label={`Budget max · $${budgetMax.toLocaleString()}`}>
            <input
              type="range"
              min={4000}
              max={80000}
              step={500}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Math.max(budgetMin, Number(e.target.value)))}
              className="w-full"
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Seats">
            <input
              type="number"
              min={1}
              max={20}
              value={spots}
              onChange={(e) => setSpots(Number(e.target.value))}
              className="field"
            />
          </Field>
          <Field label="Apply by">
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="field" />
          </Field>
          <Field label="Shoot from">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="field" />
          </Field>
        </div>
        <Field label="Location">
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="field" />
        </Field>
        <Field label="Deliverables (one per line)">
          <textarea
            rows={4}
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            className="field"
          />
        </Field>
        <button type="submit" className="bg-gold px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-ink hover:bg-gold-2">
          Publish brief
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.18em] uppercase text-gold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
