export interface Perk {
  id: string;
  title: string;
  description: string;
  category: PerkCategory;
  icon: string;
  originalPrice: number;
  discountPercent: number;
  tags: string[];
  badge?: string;
}

export type PerkCategory =
  | "transfers"
  | "insurance"
  | "parking"
  | "lounge"
  | "connectivity"
  | "comfort"
  | "luggage";

export interface TripDetails {
  destination: string;
  departureDate: string;
  returnDate: string;
  travellers: number;
}

const perksCatalogue: Perk[] = [
  {
    id: "transfer-private",
    title: "Private Airport Transfer",
    description:
      "Door-to-door private car service between the airport and your accommodation.",
    category: "transfers",
    icon: "🚘",
    originalPrice: 45,
    discountPercent: 25,
    tags: ["airport", "transfer", "luxury", "city"],
  },
  {
    id: "transfer-shared",
    title: "Shared Airport Shuttle",
    description:
      "Affordable shared shuttle service with convenient pick-up points.",
    category: "transfers",
    icon: "🚐",
    originalPrice: 15,
    discountPercent: 15,
    tags: ["airport", "transfer", "budget"],
  },
  {
    id: "insurance-standard",
    title: "Standard Travel Insurance",
    description:
      "Essential cover for medical emergencies, cancellations, and lost luggage.",
    category: "insurance",
    icon: "🛡️",
    originalPrice: 30,
    discountPercent: 20,
    tags: ["insurance", "standard"],
  },
  {
    id: "insurance-premium",
    title: "Premium Travel Insurance",
    description:
      "Comprehensive family cover including adventure activities and higher limits.",
    category: "insurance",
    icon: "🛡️",
    originalPrice: 65,
    discountPercent: 15,
    tags: ["insurance", "premium", "family", "beach"],
  },
  {
    id: "parking-standard",
    title: "Airport Parking (7 days)",
    description:
      "Secure long-stay parking with free shuttle to the terminal.",
    category: "parking",
    icon: "🅿️",
    originalPrice: 55,
    discountPercent: 30,
    tags: ["parking", "airport", "long-stay"],
  },
  {
    id: "parking-valet",
    title: "Valet Airport Parking",
    description:
      "Drop your car at the terminal door — we park it for you.",
    category: "parking",
    icon: "🚗",
    originalPrice: 95,
    discountPercent: 20,
    tags: ["parking", "airport", "luxury"],
  },
  {
    id: "lounge-access",
    title: "Airport Lounge Access",
    description:
      "Relax before your flight with complimentary food, drinks, and Wi-Fi.",
    category: "lounge",
    icon: "✈️",
    originalPrice: 35,
    discountPercent: 25,
    tags: ["lounge", "comfort", "luxury", "city"],
  },
  {
    id: "wifi-package",
    title: "Destination Wi-Fi Package",
    description:
      "Stay connected abroad with a portable hotspot delivered to your hotel.",
    category: "connectivity",
    icon: "📶",
    originalPrice: 20,
    discountPercent: 40,
    tags: ["wifi", "connectivity", "beach"],
  },
  {
    id: "priority-boarding",
    title: "Priority Boarding",
    description:
      "Board first and secure overhead bin space — skip the queue.",
    category: "comfort",
    icon: "⚡",
    originalPrice: 15,
    discountPercent: 20,
    tags: ["boarding", "comfort"],
  },
  {
    id: "extra-luggage",
    title: "Extra Luggage Allowance",
    description:
      "Add an extra 23kg checked bag to your booking at a discounted rate.",
    category: "luggage",
    icon: "🧳",
    originalPrice: 40,
    discountPercent: 15,
    tags: ["luggage", "baggage"],
  },
  {
    id: "fast-track",
    title: "Fast Track Security",
    description:
      "Breeze through airport security in the express lane.",
    category: "comfort",
    icon: "🏃",
    originalPrice: 10,
    discountPercent: 30,
    tags: ["airport", "comfort", "speed"],
  },
  {
    id: "meal-upgrade",
    title: "In-Flight Meal Upgrade",
    description:
      "Upgrade to a premium meal with a glass of wine on your flight.",
    category: "comfort",
    icon: "🍽️",
    originalPrice: 25,
    discountPercent: 20,
    tags: ["food", "comfort", "luxury"],
  },
];

const CITY_KEYWORDS = [
  "london",
  "paris",
  "rome",
  "new york",
  "tokyo",
  "barcelona",
  "berlin",
  "amsterdam",
  "dubai",
  "singapore",
];

const BEACH_KEYWORDS = [
  "bali",
  "cancun",
  "maldives",
  "caribbean",
  "phuket",
  "ibiza",
  "hawaii",
  "tenerife",
  "majorca",
  "crete",
];

function getTripDays(departure: string, returnDate: string): number {
  const d = new Date(departure);
  const r = new Date(returnDate);
  const diff = (r.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.round(diff));
}

export function getPersonalisedPerks(trip: TripDetails): Perk[] {
  const dest = trip.destination.toLowerCase();
  const days = getTripDays(trip.departureDate, trip.returnDate);
  const isCity = CITY_KEYWORDS.some((kw) => dest.includes(kw));
  const isBeach = BEACH_KEYWORDS.some((kw) => dest.includes(kw));
  const isFamily = trip.travellers >= 3;
  const isSolo = trip.travellers === 1;
  const isLongTrip = days >= 7;
  const isShortTrip = days <= 3;

  const scored = perksCatalogue.map((perk) => {
    const p = { ...perk, badge: undefined as string | undefined };
    let score = 0;

    // Destination-based scoring
    if (isCity && (perk.category === "lounge" || perk.category === "transfers")) {
      score += 3;
    }
    if (isBeach && (perk.tags.includes("beach") || perk.category === "insurance" || perk.category === "connectivity")) {
      score += 3;
    }

    // Trip length scoring
    if (isLongTrip && perk.category === "parking") {
      score += 2;
    }
    if (isLongTrip && perk.category === "insurance") {
      score += 2;
      if (!p.badge) p.badge = "Recommended";
    }
    if (isShortTrip && perk.id === "fast-track") {
      score += 3;
      if (!p.badge) p.badge = "Perfect for Short Trips";
    }
    if (isShortTrip && perk.category === "parking") {
      score -= 5;
    }

    // Traveller count scoring
    if (isFamily && perk.id === "insurance-premium") {
      score += 4;
      p.badge = "Best Value for Families";
    }
    if (isFamily && perk.category === "luggage") {
      score += 2;
    }
    if (isSolo && perk.id === "lounge-access") {
      score += 4;
      p.badge = "Just for You";
    }

    // Boost high discounts
    score += perk.discountPercent / 10;

    // Top picks badge for highest-scored unbadged perks
    if (isCity && perk.id === "transfer-private" && !p.badge) {
      p.badge = "City Essential";
    }
    if (isBeach && perk.id === "wifi-package" && !p.badge) {
      p.badge = "Beach Essential";
    }

    return { perk: p, score };
  });

  // Filter out perks with negative scores (e.g. parking on short trips)
  return scored
    .filter((s) => s.score > -3)
    .sort((a, b) => {
      // Badged perks first
      const aBadge = a.perk.badge ? 1 : 0;
      const bBadge = b.perk.badge ? 1 : 0;
      if (bBadge !== aBadge) return bBadge - aBadge;
      return b.score - a.score;
    })
    .map((s) => s.perk);
}

export const categories: { value: string; label: string }[] = [
  { value: "all", label: "All Perks" },
  { value: "transfers", label: "Transfers" },
  { value: "insurance", label: "Insurance" },
  { value: "parking", label: "Parking" },
  { value: "lounge", label: "Lounge" },
  { value: "connectivity", label: "Wi-Fi" },
  { value: "comfort", label: "Comfort" },
  { value: "luggage", label: "Luggage" },
];
