import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useStore } from "../lib/store";

const nav = [
  { to: "/discover", label: "Roster" },
  { to: "/campaigns", label: "Campaigns" },
  { to: "/studio", label: "Studio" },
  { to: "/inbox", label: "Inbox" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { conversations, shortlist } = useStore();
  const unread = conversations.reduce((n, c) => n + c.unread, 0);
  const loc = useLocation();
  const isHome = loc.pathname === "/";

  return (
    <div className="min-h-screen bg-ink text-cream">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          isHome ? "bg-transparent" : "bg-ink/85 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/40 bg-ink-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 5L12 21L20 5"
                  stroke="#C4A574"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-display text-[22px] tracking-[0.22em] text-cream">
              VELA
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-[13px] tracking-[0.16em] uppercase transition-colors ${
                    isActive ? "text-gold" : "text-stone hover:text-cream"
                  }`
                }
              >
                {item.label}
                {item.to === "/inbox" && unread > 0 && (
                  <span className="absolute -right-3.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-ink">
                    {unread}
                  </span>
                )}
                {item.to === "/studio" && shortlist.length > 0 && (
                  <span className="sr-only">{shortlist.length} shortlisted</span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/discover"
              className="border border-gold/50 px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-gold transition hover:bg-gold hover:text-ink"
            >
              Brief a campaign
            </Link>
          </div>

          <button
            className="md:hidden text-cream"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/5 bg-ink px-5 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm tracking-[0.18em] uppercase ${
                      isActive ? "text-gold" : "text-stone"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/discover"
                onClick={() => setOpen(false)}
                className="mt-2 border border-gold/50 px-4 py-3 text-center text-[11px] tracking-[0.2em] uppercase text-gold"
              >
                Brief a campaign
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className={isHome ? "" : "pt-16 md:pt-[72px]"}>
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-ink">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
          <div>
            <div className="font-display text-2xl tracking-[0.22em]">VELA</div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
              A private roster of creators for houses that still believe a campaign
              can feel like culture.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">House</p>
            <ul className="mt-4 space-y-2 text-sm text-stone">
              <li>
                <Link to="/discover" className="hover:text-cream">
                  Roster
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-cream">
                  Open campaigns
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-cream">
                  Studio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">For talent</p>
            <ul className="mt-4 space-y-2 text-sm text-stone">
              <li>
                <Link to="/campaigns" className="hover:text-cream">
                  Apply to briefs
                </Link>
              </li>
              <li>
                <Link to="/inbox" className="hover:text-cream">
                  Inbox
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-cream">
                  Membership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Atelier</p>
            <p className="mt-4 text-sm text-stone">
              18 Mercer Street
              <br />
              New York, NY 10013
            </p>
            <p className="mt-3 text-sm text-stone">desk@vela.studio</p>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-5 text-[11px] tracking-wider text-stone/70 md:flex-row md:justify-between md:px-8">
            <span>© 2026 Vela Atelier. All rights reserved.</span>
            <span>New York · Paris · Seoul</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
