import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { creators, formatFollowers } from "../data/creators";
import { campaigns } from "../data/campaigns";
import CreatorCard from "../components/CreatorCard";

const houses = [
  "Lumen Atelier",
  "Solace Skin",
  "Volt Athletics",
  "Wander Club",
  "Harvest Table",
  "Pulse Labs",
  "Noir Parfum",
  "Terra Cloth",
];

const stats = [
  { n: "2,400+", l: "Vetted creators" },
  { n: "47", l: "Counties" },
  { n: "4.8×", l: "Median ROAS" },
  { n: "KSh 186K", l: "Median booking" },
];

export default function Home() {
  const featured = creators.filter((c) => c.featured).slice(0, 4);
  const open = campaigns.filter((c) => c.status === "open").slice(0, 3);

  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-studio.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.32em] uppercase text-gold"
          >
            Nairobi influencer atelier · est. 2019
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-4xl font-display text-[56px] leading-[0.9] text-cream md:text-[92px]"
          >
            Cast culture,
            <br />
            not inventory.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream-2/80 md:text-lg"
          >
            Vela is Kenya’s private marketplace where houses brief campaigns and a
            curated roster answers — all priced in Kenyan shillings. Fewer
            creators. Better rooms. Work that still looks like work.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/enter?as=brand"
              className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-ink transition hover:bg-gold-2"
            >
              Brand studio <ArrowRight size={14} />
            </Link>
            <Link
              to="/enter?as=creator"
              className="inline-flex items-center gap-2 border border-cream/30 px-6 py-3 text-[12px] tracking-[0.2em] uppercase text-cream hover:border-gold hover:text-gold"
            >
              Talent desk
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/8 bg-ink-2 py-4">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...houses, ...houses].map((h, i) => (
            <span
              key={i}
              className="text-[12px] tracking-[0.28em] uppercase text-stone"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">The house</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] md:text-6xl">
              A roster, not a database.
            </h2>
          </div>
          <p className="max-w-lg text-[15px] leading-relaxed text-stone">
            Every creator on Vela is reviewed for craft, audience quality, and
            how they behave in a brief. We decline more talent than we accept.
            Brands come when they are tired of marketplaces that treat people
            like SKUs.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-px bg-white/8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-ink px-5 py-8 md:px-8">
              <p className="font-display text-4xl text-cream md:text-5xl">{s.n}</p>
              <p className="mt-2 text-[11px] tracking-[0.18em] uppercase text-stone">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-2 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold">On the book</p>
              <h2 className="mt-3 font-display text-5xl">Featured talent</h2>
            </div>
            <Link
              to="/discover"
              className="hidden items-center gap-1 text-[12px] tracking-[0.18em] uppercase text-gold md:inline-flex"
            >
              Full roster <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => (
              <CreatorCard key={c.id} creator={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">Now casting</p>
            <h2 className="mt-3 font-display text-5xl">Open campaigns</h2>
          </div>
          <Link
            to="/campaigns"
            className="hidden items-center gap-1 text-[12px] tracking-[0.18em] uppercase text-gold md:inline-flex"
          >
            All briefs <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {open.map((c) => (
            <Link
              key={c.id}
              to={`/campaigns/${c.id}`}
              className="group relative min-h-[360px] overflow-hidden border border-white/8"
            >
              <img
                src={c.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-gold">{c.brand}</p>
                <h3 className="mt-1 font-display text-4xl">{c.title}</h3>
                <p className="mt-2 text-sm text-cream-2/80">{c.tagline}</p>
                <p className="mt-4 text-[12px] tracking-wide text-stone">
                  {c.budget} · {c.spots} seats
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/8">
        <img
          src="/images/about-team.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">How it works</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95]">
              Brief. Cast.
              <br />
              Ship the film.
            </h2>
          </div>
          <ol className="space-y-8">
            {[
              {
                n: "01",
                t: "Write the brief",
                d: "Budget, deliverables, the feeling. We keep it as short as a good treatment.",
              },
              {
                n: "02",
                t: "Cast from the roster",
                d: "Filter by niche, audience, rate, and city. Shortlist. Invite. Or let talent apply.",
              },
              {
                n: "03",
                t: "Contract in the studio",
                d: "Rates, usage, and timelines live in one room. Inbox stays attached to the campaign.",
              },
            ].map((s) => (
              <li key={s.n} className="flex gap-5 border-b border-white/10 pb-8 last:border-0">
                <span className="font-display text-3xl text-gold">{s.n}</span>
                <div>
                  <p className="text-lg text-cream">{s.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            {creators.slice(0, 4).map((c) => (
              <Link key={c.id} to={`/creators/${c.id}`} className="relative aspect-[3/4] overflow-hidden">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <span className="absolute bottom-3 left-3 text-sm text-cream">{c.name}</span>
              </Link>
            ))}
          </div>
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">For talent</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95]">
              Membership, not a feed of briefs.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-stone">
              Accepted creators see a smaller, better slate. Rates stay yours.
              We take a house fee only when a campaign books — never to sit on
              the roster.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-cream-2">
              <li>— Median booking {formatFollowers(8400)} last quarter</li>
              <li>— Direct brand inbox, no agency middle</li>
              <li>— Usage and exclusivity written in plain language</li>
            </ul>
            <Link
              to="/enter?as=creator"
              className="mt-8 inline-flex items-center gap-2 border border-gold/50 px-5 py-3 text-[12px] tracking-[0.18em] uppercase text-gold hover:bg-gold hover:text-ink"
            >
              Open talent desk <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-ink-2">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          <Link
            to="/enter?as=brand"
            className="group border-b border-white/8 px-5 py-16 md:border-b-0 md:border-r md:px-8 md:py-20"
          >
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Houses</p>
            <h2 className="mt-3 font-display text-4xl">Brand studio</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
              Write briefs, cast from the roster, review treatments, and watch spend against ROAS.
            </p>
            <span className="mt-6 inline-flex items-center gap-1 text-[12px] tracking-[0.16em] uppercase text-gold">
              Enter as Lumen <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
          <Link to="/enter?as=creator" className="group px-5 py-16 md:px-8 md:py-20">
            <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Talent</p>
            <h2 className="mt-3 font-display text-4xl">Creator desk</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
              Bookings, deliverables, applications, and the ledger — signed in as Maya Chen.
            </p>
            <span className="mt-6 inline-flex items-center gap-1 text-[12px] tracking-[0.16em] uppercase text-gold">
              Enter as Maya <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
