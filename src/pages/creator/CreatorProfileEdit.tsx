import { FormEvent, useState } from "react";
import { getCreator, formatFollowers, formatMoney } from "../../data/creators";
import { useStore } from "../../lib/store";

export default function CreatorProfileEdit() {
  const { creatorId } = useStore();
  const me = getCreator(creatorId);
  const [bio, setBio] = useState(me?.longBio ?? "");
  const [post, setPost] = useState(me?.rate.post ?? 0);
  const [story, setStory] = useState(me?.rate.story ?? 0);
  const [reel, setReel] = useState(me?.rate.reel ?? 0);
  const [saved, setSaved] = useState(false);

  if (!me) return null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-gold">Public dossier</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Your profile</h1>
      <p className="mt-3 max-w-xl text-sm text-stone">
        Houses see this when they open your card. Rates stay yours.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <img src={me.image} alt="" className="aspect-[3/4] w-full object-cover" />
          <div className="border border-white/8 p-4">
            <p className="font-display text-2xl">{me.name}</p>
            <p className="text-gold">{me.handle}</p>
            <p className="mt-3 text-sm text-stone">
              {formatFollowers(me.totalFollowers)} · {me.avgEngagement}% ER
            </p>
            <p className="mt-1 text-sm text-stone">{me.location}</p>
          </div>
        </aside>

        <form onSubmit={onSubmit} className="space-y-6">
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-gold">Long bio</span>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={7} className="field mt-2" />
          </label>
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Rate card (KSh)</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="text-[11px] text-stone">Feed post · {formatMoney(post)}</span>
                <input
                  type="number"
                  value={post}
                  onChange={(e) => setPost(Number(e.target.value))}
                  className="field mt-2"
                />
              </label>
              <label className="block">
                <span className="text-[11px] text-stone">Story suite · {formatMoney(story)}</span>
                <input
                  type="number"
                  value={story}
                  onChange={(e) => setStory(Number(e.target.value))}
                  className="field mt-2"
                />
              </label>
              <label className="block">
                <span className="text-[11px] text-stone">Reel / film · {formatMoney(reel)}</span>
                <input
                  type="number"
                  value={reel}
                  onChange={(e) => setReel(Number(e.target.value))}
                  className="field mt-2"
                />
              </label>
            </div>
          </div>
          <div className="border border-white/8 p-5">
            <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Platforms</p>
            <ul className="mt-3 space-y-2 text-sm">
              {me.platforms.map((p) => (
                <li key={p.name} className="flex justify-between border-b border-white/8 pb-2">
                  <span>
                    {p.name} <span className="text-stone">{p.handle}</span>
                  </span>
                  <span className="text-gold">
                    {formatFollowers(p.followers)} · {p.engagement}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="bg-gold px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ink">
            {saved ? "Saved to dossier" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
