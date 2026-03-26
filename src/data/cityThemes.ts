export interface CityTheme {
  id: string;
  name: string;
  flag: string;
  activeIcon: string;
  cssClass: string;
  heading: string;
  subtitle: string;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    darkBg: string;
    fieldBg: string;
    fieldBorder: string;
    labelColor: string;
  };
  nav: { bg: string };
  gradient: { from: string; to: string };
  headingColor: string;
}

export const CITY_THEMES: CityTheme[] = [
  {
    id: "london",
    name: "London",
    flag: "🇬🇧",
    activeIcon: "🚇",
    cssClass: "city-london",
    heading: "Next Stop: Your Dream Destination",
    subtitle: "All aboard — mind the gap between you and your next adventure",
    colors: {
      primary: "#E32017",
      primaryDark: "#c41a12",
      accent: "#FFD300",
      darkBg: "#1a1a2e",
      fieldBg: "#e8f4fd",
      fieldBorder: "#1a1a2e",
      labelColor: "#E32017",
    },
    nav: { bg: "#003688" },
    gradient: { from: "#E32017", to: "#9B0056" },
    headingColor: "#E32017",
  },
  {
    id: "paris",
    name: "Paris",
    flag: "🇫🇷",
    activeIcon: "🗼",
    cssClass: "city-paris",
    heading: "Trouvez Votre Vol de Rêve",
    subtitle:
      "L'aventure vous attend — from the City of Light to the world",
    colors: {
      primary: "#003CA6",
      primaryDark: "#002d80",
      accent: "#D4AF37",
      darkBg: "#1a1a2e",
      fieldBg: "#f0f4ff",
      fieldBorder: "#003CA6",
      labelColor: "#003CA6",
    },
    nav: { bg: "#003CA6" },
    gradient: { from: "#003CA6", to: "#6A1B9A" },
    headingColor: "#003CA6",
  },
  {
    id: "rome",
    name: "Rome",
    flag: "🇮🇹",
    activeIcon: "🛵",
    cssClass: "city-rome",
    heading: "Tutti i Voli Portano a Roma",
    subtitle: "All flights lead to Rome — and beyond. Andiamo!",
    colors: {
      primary: "#2E8B57",
      primaryDark: "#236B43",
      accent: "#CE2B37",
      darkBg: "#1e1e2e",
      fieldBg: "#f5fff8",
      fieldBorder: "#2E8B57",
      labelColor: "#CE2B37",
    },
    nav: { bg: "#2E8B57" },
    gradient: { from: "#2E8B57", to: "#CE2B37" },
    headingColor: "#CE2B37",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    flag: "🇯🇵",
    activeIcon: "🚅",
    cssClass: "city-tokyo",
    heading: "次の冒険へ出発",
    subtitle:
      "Your next adventure departs now — from Tokyo to the world",
    colors: {
      primary: "#FFFFFF",
      primaryDark: "#e0e0e0",
      accent: "#E60012",
      darkBg: "#1a1a2e",
      fieldBg: "#fff5f5",
      fieldBorder: "#E60012",
      labelColor: "#E60012",
    },
    nav: { bg: "#C9002E" },
    gradient: { from: "#C9002E", to: "#8B0000" },
    headingColor: "#C9002E",
  },
  {
    id: "newyork",
    name: "New York",
    flag: "🇺🇸",
    activeIcon: "🚕",
    cssClass: "city-newyork",
    heading: "Hail Your Next Flight",
    subtitle:
      "The city that never sleeps sends you anywhere. Let's go!",
    colors: {
      primary: "#FFD300",
      primaryDark: "#e6be00",
      accent: "#1C1C1C",
      darkBg: "#1a1a2e",
      fieldBg: "#fffef0",
      fieldBorder: "#1C1C1C",
      labelColor: "#1C1C1C",
    },
    nav: { bg: "#1C1C1C" },
    gradient: { from: "#FFD300", to: "#FF8C00" },
    headingColor: "#FFD300",
  },
];

export const STORAGE_KEY = "skybound-city-theme";

export function getThemeById(id: string): CityTheme | null {
  return CITY_THEMES.find((t) => t.id === id) ?? null;
}
