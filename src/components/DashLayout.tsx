import { useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  CalendarRange,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Sparkles,
  UserRound,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useStore } from "../lib/store";
import { getCreator } from "../data/creators";
import { brandUser } from "../data/dashboard";

const brandNav = [
  { to: "/brand", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/brand/campaigns", label: "Campaigns", icon: Briefcase },
  { to: "/brand/casting", label: "Casting", icon: Users },
  { to: "/brand/inbox", label: "Inbox", icon: Inbox },
  { to: "/brand/analytics", label: "Analytics", icon: BarChart3 },
];

const creatorNav = [
  { to: "/creator", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/creator/bookings", label: "Bookings", icon: CalendarRange },
  { to: "/creator/opportunities", label: "Opportunities", icon: Sparkles },
  { to: "/creator/inbox", label: "Inbox", icon: Inbox },
  { to: "/creator/earnings", label: "Earnings", icon: Wallet },
  { to: "/creator/profile", label: "Profile", icon: UserRound },
];

export default function DashLayout({ side }: { side: "brand" | "creator" }) {
  const { role, setRole, conversations } = useStore();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  if (role !== side) {
    return <Navigate to={`/enter?as=${side}&next=${encodeURIComponent(loc.pathname)}`} replace />;
  }

  const nav = side === "brand" ? brandNav : creatorNav;
  const me = side === "brand" ? brandUser : getCreator("maya-chen");
  const unread = conversations.reduce((n, c) => {
    if (side === "creator" && c.creatorId !== "maya-chen") return n;
    return n + c.unread;
  }, 0);

  return (
    <div className="min-h-screen bg-ink text-cream">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-white/8 bg-ink-2 lg:flex">
        <Link to="/" className="flex items-center gap-2.5 px-6 py-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/40">
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
          <span className="font-display text-[20px] tracking-[0.22em]">VELA</span>
        </Link>
        <p className="px-6 text-[10px] tracking-[0.22em] uppercase text-gold">
          {side === "brand" ? "House desk" : "Talent desk"}
        </p>
        <nav className="mt-6 flex-1 space-y-0.5 px-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-[13px] tracking-wide transition ${
                  isActive ? "bg-gold/15 text-gold" : "text-stone hover:bg-white/4 hover:text-cream"
                }`
              }
            >
              <item.icon size={15} />
              {item.label}
              {item.label === "Inbox" && unread > 0 && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] text-ink">
                  {unread}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        {side === "brand" && (
          <div className="px-3 pb-3">
            <Link
              to="/brand/campaigns/new"
              className="flex items-center justify-center gap-2 bg-gold py-2.5 text-[11px] tracking-[0.16em] uppercase text-ink hover:bg-gold-2"
            >
              <Plus size={13} /> New brief
            </Link>
          </div>
        )}
        <div className="border-t border-white/8 p-4">
          <div className="flex items-center gap-3">
            <img src={me?.image} alt="" className="h-9 w-9 object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm">{me?.name}</p>
              <p className="truncate text-[11px] text-stone">
                {side === "brand" ? brandUser.title : "Maya Chen · Talent"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setRole("guest")}
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-stone hover:text-gold"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/8 bg-ink/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={18} />
            </button>
            <p className="hidden text-[12px] tracking-[0.16em] uppercase text-stone sm:block">
              {side === "brand" ? "Lumen Atelier" : "Maya Chen"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {side === "brand" && (
              <Link
                to="/brand/casting"
                className="hidden items-center gap-1.5 border border-white/10 px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase text-stone hover:border-gold/40 hover:text-gold sm:inline-flex"
              >
                <Search size={12} /> Roster
              </Link>
            )}
            {side === "creator" && (
              <Link
                to="/creator/opportunities"
                className="hidden items-center gap-1.5 border border-white/10 px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase text-stone hover:border-gold/40 hover:text-gold sm:inline-flex"
              >
                <Sparkles size={12} /> Briefs
              </Link>
            )}
            <Link
              to="/"
              className="text-[11px] tracking-[0.14em] uppercase text-stone hover:text-cream"
            >
              Public site
            </Link>
          </div>
        </header>

        <main className="min-h-[calc(100svh-56px)]">
          <Outlet />
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-ink/70" onClick={() => setOpen(false)} aria-label="Close" />
          <div className="absolute inset-y-0 left-0 w-[260px] border-r border-white/8 bg-ink-2 p-4">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display tracking-[0.22em]">VELA</span>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <nav className="space-y-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm ${
                      isActive ? "text-gold" : "text-stone"
                    }`
                  }
                >
                  <item.icon size={15} /> {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
