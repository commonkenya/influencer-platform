import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Application, Conversation } from "../data/types";
import { seedConversations } from "../data/messages";

interface Store {
  shortlist: string[];
  toggleShortlist: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  applications: Application[];
  apply: (app: Application) => void;
  hasApplied: (campaignId: string) => boolean;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  markRead: (conversationId: string) => void;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [shortlist, setShortlist] = useState<string[]>(["maya-chen", "hana-mori"]);
  const [applications, setApplications] = useState<Application[]>([
    {
      campaignId: "solace-dew",
      pitch: "I would film Dew Protocol as a 7-day north-light diary.",
      rate: "7800",
      date: "Mar 12, 2026",
      status: "shortlisted",
    },
  ]);
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations);

  const toggleShortlist = useCallback((id: string) => {
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isShortlisted = useCallback(
    (id: string) => shortlist.includes(id),
    [shortlist]
  );

  const apply = useCallback((app: Application) => {
    setApplications((prev) => {
      if (prev.some((a) => a.campaignId === app.campaignId)) return prev;
      return [app, ...prev];
    });
  }, []);

  const hasApplied = useCallback(
    (campaignId: string) => applications.some((a) => a.campaignId === campaignId),
    [applications]
  );

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        const msg = {
          id: `n-${Date.now()}`,
          from: "brand" as const,
          text: trimmed,
          time: "Just now",
        };
        return {
          ...c,
          lastMessage: trimmed,
          time: "Just now",
          messages: [...c.messages, msg],
        };
      })
    );
  }, []);

  const markRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
    );
  }, []);

  const value = useMemo(
    () => ({
      shortlist,
      toggleShortlist,
      isShortlisted,
      applications,
      apply,
      hasApplied,
      conversations,
      sendMessage,
      markRead,
    }),
    [
      shortlist,
      toggleShortlist,
      isShortlisted,
      applications,
      apply,
      hasApplied,
      conversations,
      sendMessage,
      markRead,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
