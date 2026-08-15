import type { Conversation } from "./types";

export const seedConversations: Conversation[] = [
  {
    id: "c-maya",
    creatorId: "maya-chen",
    campaignTitle: "Autumn Atelier",
    lastMessage: "I can shoot the dusk sequence in Griffith on the 6th.",
    time: "12m",
    unread: 2,
    messages: [
      {
        id: "m1",
        from: "brand",
        text: "Maya — we loved the Lumen stills from last season. Would you take a look at Autumn Atelier?",
        time: "Mon 09:14",
      },
      {
        id: "m2",
        from: "creator",
        text: "I already sketched a treatment. Editorial, no talking head. Two locations: interior gold hour and Griffith dusk.",
        time: "Mon 11:02",
      },
      {
        id: "m3",
        from: "brand",
        text: "That’s exactly the register. Budget is $14k for the reel + stills, 6-month usage. Does that land?",
        time: "Mon 14:40",
      },
      {
        id: "m4",
        from: "creator",
        text: "Yes, if we keep exclusivity to fashion houses only. I’ll send a one-pager tonight.",
        time: "Tue 08:21",
      },
      {
        id: "m5",
        from: "creator",
        text: "I can shoot the dusk sequence in Griffith on the 6th.",
        time: "12m",
      },
    ],
  },
  {
    id: "c-hana",
    creatorId: "hana-mori",
    campaignTitle: "Dew Protocol",
    lastMessage: "Texture film is uploaded to the portal.",
    time: "2h",
    unread: 0,
    messages: [
      {
        id: "h1",
        from: "brand",
        text: "Hana, Dew Protocol ships to you Friday. We’d love a 7-day diary and one texture film.",
        time: "Mar 2",
      },
      {
        id: "h2",
        from: "creator",
        text: "Received. I’ll film texture in north light — no filters. Diary starts Monday.",
        time: "Mar 4",
      },
      {
        id: "h3",
        from: "creator",
        text: "Texture film is uploaded to the portal.",
        time: "2h",
      },
    ],
  },
  {
    id: "c-jordan",
    creatorId: "jordan-vale",
    campaignTitle: "Forge Collection",
    lastMessage: "Week two notes attached — the short is holding up.",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "j1",
        from: "brand",
        text: "Jordan, we’d like you on the four-week Forge wear test. Real sessions only.",
        time: "Feb 18",
      },
      {
        id: "j2",
        from: "creator",
        text: "I’m in a hypertrophy block through April. Perfect timing. Send the kit in L.",
        time: "Feb 18",
      },
      {
        id: "j3",
        from: "creator",
        text: "Week two notes attached — the short is holding up.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "c-sofia",
    creatorId: "sofia-reyes",
    campaignTitle: "House Residencies",
    lastMessage: "Oaxaca dates work. I’ll fly the 8th.",
    time: "3d",
    unread: 1,
    messages: [
      {
        id: "s1",
        from: "brand",
        text: "Sofia — we have a week in the Oaxaca house in June. No itinerary. Just the place.",
        time: "Mar 1",
      },
      {
        id: "s2",
        from: "creator",
        text: "Oaxaca dates work. I’ll fly the 8th.",
        time: "3d",
      },
    ],
  },
  {
    id: "c-amara",
    creatorId: "amara-lin",
    campaignTitle: "Night Ritual",
    lastMessage: "Treatment v2 in your inbox. Darker cut.",
    time: "1w",
    unread: 0,
    messages: [
      {
        id: "a1",
        from: "brand",
        text: "Amara, Night Ritual needs a film that feels like skin, not a bottle. Interested?",
        time: "Feb 22",
      },
      {
        id: "a2",
        from: "creator",
        text: "Yes. I’ll write it as a ritual, not a spot.",
        time: "Feb 23",
      },
      {
        id: "a3",
        from: "creator",
        text: "Treatment v2 in your inbox. Darker cut.",
        time: "1w",
      },
    ],
  },
];
