import type { Hamper } from "@/types";

export const HAMPERS: Hamper[] = [
  {
    id: 1, name: "The Starter Pack", badge: "Best Seller", badgeColor: "#BF4E2A", emoji: "🎁",
    price: 380, original: 425,
    spices: ["Turmeric", "Black Pepper", "Cumin Powder", "Coriander", "Ginger Powder"],
    size: "5 × 50g jars",
    desc: "Hand-picked essentials for everyday cooking — the perfect first set for any kitchen.",
    image: "./hamper1.jpg",
  },
  {
    id: 2, name: "The Curry Master", badge: "Most Popular", badgeColor: "#C9960D", emoji: "🏆",
    price: 920, original: 1020,
    spices: ["Cardamom Powder", "Cinnamon Powder", "Cumin Powder", "Paprika Powder", "Turmeric", "Coriander"],
    size: "6 × 100g jars",
    desc: "Aromatic spices that define East African and South Asian cuisine. A serious cook's dream.",
    image: "./hamper4.jpg",
  },
  {
    id: 3, name: "The Gift of Warmth", badge: "Gift Special", badgeColor: "#7A4520", emoji: "💝",
    price: 750, original: 840,
    spices: ["White Pepper", "Nutmeg", "Cardamom Powder", "Cinnamon Powder", "Ginger Powder", "Fenugreek"],
    size: "6 × 50g + gift box",
    desc: "A beautifully curated set in a premium gift box — perfect for housewarmings and celebrations.",
    image: "./hamper2.jpg",
  },
  {
    id: 4, name: "The Full Collection", badge: "Best Value", badgeColor: "#291808", emoji: "👑",
    price: 960, original: 1080,
    spices: ["All 12 Guru Spices"],
    size: "12 × 50g jars",
    desc: "Every single Guru Spice in one complete set. For the home cook who wants it all.",
    image: "./hamper3.jpg",
  },
];
