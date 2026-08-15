export type Niche =
  | "Fashion"
  | "Beauty"
  | "Fitness"
  | "Travel"
  | "Food"
  | "Tech"
  | "Lifestyle"
  | "Gaming"
  | "Music"
  | "Parenting"
  | "Wellness";

export type PlatformName = "Instagram" | "TikTok" | "YouTube" | "Pinterest";

export interface PlatformStat {
  name: PlatformName;
  handle: string;
  followers: number;
  engagement: number;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  image: string;
  niches: Niche[];
  location: string;
  city: string;
  bio: string;
  longBio: string;
  platforms: PlatformStat[];
  totalFollowers: number;
  avgEngagement: number;
  rate: { post: number; story: number; reel: number };
  languages: string[];
  verified: boolean;
  featured: boolean;
  responseTime: string;
  rating: number;
  campaignsCompleted: number;
  audience: {
    female: number;
    male: number;
    topCountries: { name: string; pct: number }[];
    ages: { range: string; pct: number }[];
  };
  recentWork: { brand: string; title: string; metric: string }[];
}

export type CampaignStatus = "open" | "reviewing" | "live" | "completed";

export interface Campaign {
  id: string;
  brand: string;
  brandImage: string;
  image: string;
  title: string;
  tagline: string;
  brief: string;
  niches: Niche[];
  budget: string;
  budgetMin: number;
  budgetMax: number;
  deliverables: string[];
  deadline: string;
  startDate: string;
  status: CampaignStatus;
  applicants: number;
  spots: number;
  platforms: PlatformName[];
  location: string;
  brandAbout: string;
}

export interface Message {
  id: string;
  from: "brand" | "creator";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  creatorId: string;
  campaignTitle: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

export type Role = "guest" | "brand" | "creator";

export type ApplicationStatus = "pending" | "shortlisted" | "accepted" | "declined";

export interface Application {
  id: string;
  campaignId: string;
  creatorId: string;
  pitch: string;
  rate: string;
  date: string;
  status: ApplicationStatus;
}

export type BookingStatus = "contracted" | "production" | "review" | "delivered" | "paid";

export interface DeliverableItem {
  id: string;
  label: string;
  done: boolean;
  due: string;
}

export interface Booking {
  id: string;
  campaignId: string;
  creatorId: string;
  brand: string;
  title: string;
  fee: number;
  status: BookingStatus;
  due: string;
  deliverables: DeliverableItem[];
}

export interface Payout {
  id: string;
  bookingId: string;
  campaign: string;
  amount: number;
  date: string;
  status: "scheduled" | "processing" | "paid";
}

export interface BrandAccount {
  id: string;
  name: string;
  role: string;
  image: string;
  city: string;
}

export interface NewCampaignInput {
  title: string;
  tagline: string;
  brief: string;
  niches: Niche[];
  budgetMin: number;
  budgetMax: number;
  deliverables: string[];
  deadline: string;
  startDate: string;
  platforms: PlatformName[];
  location: string;
  spots: number;
}
