import { Link } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";
import type { Creator } from "../data/types";
import { formatFollowers } from "../data/creators";
import { useStore } from "../lib/store";

export default function CreatorCard({ creator }: { creator: Creator }) {
  const { isShortlisted, toggleShortlist } = useStore();
  const saved = isShortlisted(creator.id);

  return (
    <article className="group relative flex flex-col overflow-hidden border border-white/8 bg-ink-2">
      <Link to={`/creators/${creator.id}`} className="relative block aspect-[3/4] overflow-hidden">
        <img
          src={creator.image}
          alt={creator.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {creator.featured && (
            <span className="bg-gold px-2 py-0.5 text-[9px] font-medium tracking-[0.16em] uppercase text-ink">
              Featured
            </span>
          )}
          {creator.verified && (
            <span className="border border-white/20 bg-ink/50 px-2 py-0.5 text-[9px] tracking-[0.16em] uppercase text-cream backdrop-blur">
              Verified
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-[28px] leading-none text-cream">{creator.name}</p>
          <p className="mt-1 text-[12px] tracking-wide text-gold">{creator.handle}</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {creator.niches.map((n) => (
            <span
              key={n}
              className="border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase text-stone"
            >
              {n}
            </span>
          ))}
        </div>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-stone">{creator.bio}</p>
        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/8 pt-3 text-center">
          <div>
            <p className="font-display text-lg text-cream">{formatFollowers(creator.totalFollowers)}</p>
            <p className="text-[9px] tracking-[0.14em] uppercase text-stone">Reach</p>
          </div>
          <div>
            <p className="font-display text-lg text-cream">{creator.avgEngagement}%</p>
            <p className="text-[9px] tracking-[0.14em] uppercase text-stone">ER</p>
          </div>
          <div>
            <p className="font-display text-lg text-cream">${(creator.rate.reel / 1000).toFixed(1)}k</p>
            <p className="text-[9px] tracking-[0.14em] uppercase text-stone">Reel</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-stone">
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} /> {creator.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star size={11} className="text-gold" fill="#C4A574" /> {creator.rating}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/creators/${creator.id}`}
            className="flex-1 border border-gold/40 py-2 text-center text-[11px] tracking-[0.16em] uppercase text-gold transition hover:bg-gold hover:text-ink"
          >
            View dossier
          </Link>
          <button
            onClick={() => toggleShortlist(creator.id)}
            aria-label={saved ? "Remove from shortlist" : "Add to shortlist"}
            className={`flex h-9 w-9 items-center justify-center border transition ${
              saved
                ? "border-gold bg-gold text-ink"
                : "border-white/15 text-stone hover:border-gold hover:text-gold"
            }`}
          >
            <Heart size={14} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
