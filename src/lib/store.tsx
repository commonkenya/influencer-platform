import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Application,
  ApplicationStatus,
  Booking,
  Conversation,
  NewCampaignInput,
  Payout,
  Role,
} from "../data/types";
import { seedConversations } from "../data/messages";
import { seedApplications, seedBookings, seedPayouts, creatorUserId } from "../data/dashboard";
import { campaigns as seedCampaigns } from "../data/campaigns";
import type { Campaign } from "../data/types";

interface Store {
  role: Role;
  setRole: (r: Role) => void;
  shortlist: string[];
  toggleShortlist: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  applications: Application[];
  apply: (app: Omit<Application, "id" | "creatorId" | "date" | "status"> & { creatorId?: string }) => void;
  hasApplied: (campaignId: string, creatorId?: string) => boolean;
  setApplicationStatus: (id: string, status: ApplicationStatus) => void;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  markRead: (conversationId: string) => void;
  bookings: Booking[];
  toggleDeliverable: (bookingId: string, itemId: string) => void;
  payouts: Payout[];
  extraCampaigns: Campaign[];
  createCampaign: (input: NewCampaignInput) => Campaign;
  allCampaigns: Campaign[];
  getCampaignById: (id: string) => Campaign | undefined;
  creatorId: string;
}

const StoreContext = createContext<Store | null>(null);

function formatBudget(min: number, max: number) {
  const f = (n: number) =>
    n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
  return `${f(min)} – ${f(max)}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("guest");
  const [shortlist, setShortlist] = useState<string[]>(["maya-chen", "hana-mori", "sofia-reyes"]);
  const [applications, setApplications] = useState<Application[]>(seedApplications);
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations);
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [payouts] = useState<Payout[]>(seedPayouts);
  const [extraCampaigns, setExtraCampaigns] = useState<Campaign[]>([]);

  const allCampaigns = useMemo(
    () => [...extraCampaigns, ...seedCampaigns],
    [extraCampaigns]
  );

  const getCampaignById = useCallback(
    (id: string) => allCampaigns.find((c) => c.id === id),
    [allCampaigns]
  );

  const toggleShortlist = useCallback((id: string) => {
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isShortlisted = useCallback(
    (id: string) => shortlist.includes(id),
    [shortlist]
  );

  const apply = useCallback(
    (app: Omit<Application, "id" | "creatorId" | "date" | "status"> & { creatorId?: string }) => {
      const creatorId = app.creatorId ?? creatorUserId;
      setApplications((prev) => {
        if (prev.some((a) => a.campaignId === app.campaignId && a.creatorId === creatorId)) {
          return prev;
        }
        const next: Application = {
          id: `app-${Date.now()}`,
          campaignId: app.campaignId,
          creatorId,
          pitch: app.pitch,
          rate: app.rate,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          status: "pending",
        };
        return [next, ...prev];
      });
    },
    []
  );

  const hasApplied = useCallback(
    (campaignId: string, creatorId = creatorUserId) =>
      applications.some((a) => a.campaignId === campaignId && a.creatorId === creatorId),
    [applications]
  );

  const setApplicationStatus = useCallback((id: string, status: ApplicationStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const sendMessage = useCallback(
    (conversationId: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const from = role === "creator" ? ("creator" as const) : ("brand" as const);
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          const msg = {
            id: `n-${Date.now()}`,
            from,
            text: trimmed,
            time: "Just now",
          };
          return {
            ...c,
            lastMessage: trimmed,
            time: "Just now",
            unread: from === "creator" && role !== "creator" ? c.unread + 1 : c.unread,
            messages: [...c.messages, msg],
          };
        })
      );
    },
    [role]
  );

  const markRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
    );
  }, []);

  const toggleDeliverable = useCallback((bookingId: string, itemId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          deliverables: b.deliverables.map((d) =>
            d.id === itemId ? { ...d, done: !d.done } : d
          ),
        };
      })
    );
  }, []);

  const createCampaign = useCallback((input: NewCampaignInput) => {
    const id = `lumen-${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`;
    const campaign: Campaign = {
      id,
      brand: "Lumen Atelier",
      brandImage: "/images/brands/atelier.jpg",
      image: "/images/campaigns/lumen.jpg",
      title: input.title,
      tagline: input.tagline,
      brief: input.brief,
      niches: input.niches,
      budget: formatBudget(input.budgetMin, input.budgetMax),
      budgetMin: input.budgetMin,
      budgetMax: input.budgetMax,
      deliverables: input.deliverables.filter(Boolean),
      deadline: input.deadline,
      startDate: input.startDate,
      status: "open",
      applicants: 0,
      spots: input.spots,
      platforms: input.platforms,
      location: input.location,
      brandAbout:
        "Lumen Atelier is a house of considered clothes — cut in small runs, shown like cinema. Founded in 2014, now in twelve cities.",
    };
    setExtraCampaigns((prev) => [campaign, ...prev]);
    return campaign;
  }, []);

  const value = useMemo(
    () => ({
      role,
      setRole,
      shortlist,
      toggleShortlist,
      isShortlisted,
      applications,
      apply,
      hasApplied,
      setApplicationStatus,
      conversations,
      sendMessage,
      markRead,
      bookings,
      toggleDeliverable,
      payouts,
      extraCampaigns,
      createCampaign,
      allCampaigns,
      getCampaignById,
      creatorId: creatorUserId,
    }),
    [
      role,
      shortlist,
      toggleShortlist,
      isShortlisted,
      applications,
      apply,
      hasApplied,
      setApplicationStatus,
      conversations,
      sendMessage,
      markRead,
      bookings,
      toggleDeliverable,
      payouts,
      extraCampaigns,
      createCampaign,
      allCampaigns,
      getCampaignById,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
