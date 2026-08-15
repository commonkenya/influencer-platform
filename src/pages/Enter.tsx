import { FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useStore } from "../lib/store";
import { getCreator } from "../data/creators";
import { brandUser } from "../data/dashboard";

export default function Enter() {
  const { setRole } = useStore();
  const [params] = useSearchParams();
  const pref = params.get("as");
  const next = params.get("next");
  const nav = useNavigate();
  const [tab, setTab] = useState<"brand" | "creator">(pref === "creator" ? "creator" : "brand");
  const [name, setName] = useState(pref === "creator" ? "Maya Chen" : "Aria Voss");
  const maya = getCreator("maya-chen");

  const go = (e: FormEvent) => {
    e.preventDefault();
    if (tab === "brand") {
      setRole("brand");
      nav(next && next.startsWith("/brand") ? next : "/brand");
    } else {
      setRole("creator");
      nav(next && next.startsWith("/creator") ? next : "/creator");
    }
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      <img
        src={tab === "brand" ? "/images/brands/atelier.jpg" : maya?.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col px-5 py-8 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 5L12 21L20 5" stroke="#C4A574" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-[22px] tracking-[0.22em]">VELA</span>
        </Link>

        <div className="my-auto grid max-w-5xl gap-16 py-16 md:grid-cols-2">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">Enter the house</p>
            <h1 className="mt-3 font-display text-5xl leading-[0.95] md:text-6xl">
              Two desks.
              <br />
              One roster.
            </h1>
            <p className="mt-5 max-w-md text-stone">
              Sign in as a house to cast and run campaigns, or as talent to manage bookings, apply to briefs, and collect.
            </p>
          </div>

          <div className="border border-white/10 bg-ink/70 p-6 backdrop-blur md:p-8">
            <div className="grid grid-cols-2 border border-white/10">
              <button
                onClick={() => {
                  setTab("brand");
                  setName("Aria Voss");
                }}
                className={`py-2.5 text-[11px] tracking-[0.16em] uppercase ${
                  tab === "brand" ? "bg-gold text-ink" : "text-stone"
                }`}
              >
                Brand
              </button>
              <button
                onClick={() => {
                  setTab("creator");
                  setName("Maya Chen");
                }}
                className={`py-2.5 text-[11px] tracking-[0.16em] uppercase ${
                  tab === "creator" ? "bg-gold text-ink" : "text-stone"
                }`}
              >
                Creator
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <img
                src={tab === "brand" ? brandUser.image : maya?.image}
                alt=""
                className="h-14 w-14 object-cover"
              />
              <div>
                <p className="text-lg">{tab === "brand" ? brandUser.name : maya?.name}</p>
                <p className="text-[12px] text-stone">
                  {tab === "brand" ? "Lumen Atelier · Partnerships" : "Fashion · Los Angeles"}
                </p>
              </div>
            </div>

            <form onSubmit={go} className="mt-6 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-white/10 bg-ink px-3 py-3 text-sm outline-none focus:border-gold/40"
              />
              <input
                type="password"
                defaultValue="atelier"
                className="w-full border border-white/10 bg-ink px-3 py-3 text-sm outline-none focus:border-gold/40"
              />
              <p className="text-[11px] text-stone">Demo desk — any password opens the door.</p>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-[12px] tracking-[0.2em] uppercase text-ink hover:bg-gold-2"
              >
                Enter {tab === "brand" ? "studio" : "talent desk"} <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
