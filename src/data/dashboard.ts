import type { Application, Booking, BrandAccount, Payout } from "./types";

export const brandAccount: BrandAccount = {
  id: "lumen",
  name: "Lumen Atelier",
  role: "Head of Partnerships",
  image: "/images/team/aria.jpg",
  city: "New York",
};

export const brandUser = {
  name: "Aria Voss",
  title: "Head of Partnerships",
  image: "/images/team/aria.jpg",
};

export const creatorUserId = "maya-chen";

export const seedApplications: Application[] = [
  {
    id: "app-hana-lumen",
    campaignId: "lumen-autumn",
    creatorId: "hana-mori",
    pitch:
      "Skin × silk. I would shoot the collection as a vanity ritual — fabric over glass, north light, no talking head.",
    rate: "11000",
    date: "Mar 14, 2026",
    status: "pending",
  },
  {
    id: "app-nico-lumen",
    campaignId: "lumen-autumn",
    creatorId: "nico-park",
    pitch:
      "Night cut in Seoul. One take down Hannam, wool moving, no logo until the last four frames.",
    rate: "9800",
    date: "Mar 15, 2026",
    status: "shortlisted",
  },
  {
    id: "app-marcus-lumen",
    campaignId: "lumen-autumn",
    creatorId: "marcus-ade",
    pitch:
      "Lagos dusk, tailoring as architecture. I want the jacket to read like a building at golden hour.",
    rate: "5600",
    date: "Mar 16, 2026",
    status: "pending",
  },
  {
    id: "app-zara-lumen",
    campaignId: "lumen-autumn",
    creatorId: "zara-wells",
    pitch:
      "Interior stills — Sunday light, a table, the coat on a chair. The clothes as a life, not a look.",
    rate: "5800",
    date: "Mar 12, 2026",
    status: "accepted",
  },
  {
    id: "app-sofia-lumen",
    campaignId: "lumen-autumn",
    creatorId: "sofia-reyes",
    pitch:
      "Resort linen in Oaxaca if the window slips, or a city terrace if it does not. Atmosphere first.",
    rate: "10500",
    date: "Mar 18, 2026",
    status: "pending",
  },
  {
    id: "app-maya-solace",
    campaignId: "solace-dew",
    creatorId: "maya-chen",
    pitch: "I would film Dew Protocol as a 7-day north-light diary. Texture, not testimonial.",
    rate: "7800",
    date: "Mar 12, 2026",
    status: "shortlisted",
  },
  {
    id: "app-maya-wander",
    campaignId: "wander-residencies",
    creatorId: "maya-chen",
    pitch: "A fashion reading of the Oaxaca house — linen, dusk, the table after dinner.",
    rate: "14000",
    date: "Mar 8, 2026",
    status: "pending",
  },
  {
    id: "app-maya-terra",
    campaignId: "terra-house",
    creatorId: "maya-chen",
    pitch: "House & garden as a lookbook. Natural light only.",
    rate: "6200",
    date: "Feb 20, 2026",
    status: "declined",
  },
  {
    id: "app-amara-lumen",
    campaignId: "lumen-nightcut",
    creatorId: "amara-lin",
    pitch: "Fragrance-adjacent stills for the night cut — skin, wool, a dark room.",
    rate: "8400",
    date: "Mar 2, 2026",
    status: "accepted",
  },
  {
    id: "app-priya-lumen",
    campaignId: "lumen-workwear",
    creatorId: "priya-shah",
    pitch: "The workwear capsule as a real Tuesday. Desk, commute, one evening.",
    rate: "5200",
    date: "Jan 22, 2026",
    status: "accepted",
  },
];

export const seedBookings: Booking[] = [
  {
    id: "bk-lumen",
    campaignId: "lumen-autumn",
    creatorId: "maya-chen",
    brand: "Lumen Atelier",
    title: "Autumn Atelier — hero film",
    fee: 14000,
    status: "production",
    due: "May 6, 2026",
    deliverables: [
      { id: "d1", label: "Treatment / shot list", done: true, due: "Mar 28" },
      { id: "d2", label: "Interior gold-hour stills (4)", done: true, due: "Apr 12" },
      { id: "d3", label: "Griffith dusk reel 20–30s", done: false, due: "May 6" },
      { id: "d4", label: "Story suite with tags (6)", done: false, due: "May 8" },
    ],
  },
  {
    id: "bk-noir",
    campaignId: "noir-night",
    creatorId: "maya-chen",
    brand: "Noir Parfum",
    title: "Night Ritual — brand film",
    fee: 18500,
    status: "review",
    due: "Apr 2, 2026",
    deliverables: [
      { id: "n1", label: "Treatment v2", done: true, due: "Mar 1" },
      { id: "n2", label: "Hero film 30–45s", done: true, due: "Mar 22" },
      { id: "n3", label: "Three stills", done: true, due: "Mar 22" },
      { id: "n4", label: "Launch-day stories", done: false, due: "Apr 2" },
    ],
  },
  {
    id: "bk-solace",
    campaignId: "solace-dew",
    creatorId: "maya-chen",
    brand: "Solace Skin",
    title: "Dew Protocol diary",
    fee: 7800,
    status: "contracted",
    due: "Apr 30, 2026",
    deliverables: [
      { id: "s1", label: "Contract + usage", done: true, due: "Mar 20" },
      { id: "s2", label: "Day 1–3 stories", done: false, due: "Apr 24" },
      { id: "s3", label: "Texture film", done: false, due: "Apr 26" },
      { id: "s4", label: "Static review post", done: false, due: "Apr 30" },
    ],
  },
  {
    id: "bk-pulse",
    campaignId: "pulse-desk",
    creatorId: "maya-chen",
    brand: "Pulse Labs",
    title: "Desk system stills",
    fee: 4200,
    status: "paid",
    due: "Feb 14, 2026",
    deliverables: [
      { id: "p1", label: "Desk tour reel", done: true, due: "Feb 8" },
      { id: "p2", label: "Three product stills", done: true, due: "Feb 10" },
    ],
  },
];

export const seedPayouts: Payout[] = [
  {
    id: "po-1",
    bookingId: "bk-pulse",
    campaign: "Pulse Labs · Desk system",
    amount: 4200,
    date: "Feb 18, 2026",
    status: "paid",
  },
  {
    id: "po-2",
    bookingId: "bk-noir",
    campaign: "Noir Parfum · Night Ritual",
    amount: 9250,
    date: "Mar 24, 2026",
    status: "paid",
  },
  {
    id: "po-3",
    bookingId: "bk-noir",
    campaign: "Noir Parfum · Night Ritual (balance)",
    amount: 9250,
    date: "Apr 8, 2026",
    status: "scheduled",
  },
  {
    id: "po-4",
    bookingId: "bk-lumen",
    campaign: "Lumen Atelier · Autumn Atelier",
    amount: 7000,
    date: "Apr 15, 2026",
    status: "processing",
  },
  {
    id: "po-5",
    bookingId: "bk-lumen",
    campaign: "Lumen Atelier · Autumn Atelier (balance)",
    amount: 7000,
    date: "May 20, 2026",
    status: "scheduled",
  },
  {
    id: "po-6",
    bookingId: "bk-solace",
    campaign: "Solace Skin · Dew Protocol",
    amount: 7800,
    date: "May 6, 2026",
    status: "scheduled",
  },
];

export const creatorMonthly = [
  { m: "Apr", v: 6200 },
  { m: "May", v: 8400 },
  { m: "Jun", v: 4100 },
  { m: "Jul", v: 12800 },
  { m: "Aug", v: 9600 },
  { m: "Sep", v: 15200 },
  { m: "Oct", v: 11400 },
  { m: "Nov", v: 18900 },
  { m: "Dec", v: 7200 },
  { m: "Jan", v: 13400 },
  { m: "Feb", v: 4200 },
  { m: "Mar", v: 16450 },
];

export const creatorReach = [1.1, 1.4, 1.2, 1.8, 2.1, 1.9, 2.4, 2.8, 2.2, 3.1, 2.6, 3.4];

export const brandMonthlySpend = [
  { m: "Apr", v: 18 },
  { m: "May", v: 24 },
  { m: "Jun", v: 12 },
  { m: "Jul", v: 31 },
  { m: "Aug", v: 22 },
  { m: "Sep", v: 44 },
  { m: "Oct", v: 28 },
  { m: "Nov", v: 52 },
  { m: "Dec", v: 16 },
  { m: "Jan", v: 38 },
  { m: "Feb", v: 21 },
  { m: "Mar", v: 46 },
];

export const brandRoas = [
  { campaign: "Autumn Atelier", spend: 24000, sales: 118000, roas: 4.9, impress: "3.4M" },
  { campaign: "Night Cut", spend: 18600, sales: 74200, roas: 4.0, impress: "8.2M" },
  { campaign: "Workwear capsule", spend: 15200, sales: 91000, roas: 6.0, impress: "2.4M" },
  { campaign: "Resort linen", spend: 21000, sales: 63000, roas: 3.0, impress: "2.7M" },
  { campaign: "Skin × silk", spend: 9800, sales: 44100, roas: 4.5, impress: "1.1M" },
];
