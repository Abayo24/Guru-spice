import type { Deal } from "@/types";

export const DEALS: Deal[] = [
  {
    id: 1,
    title: "Weekend Flash Sale",
    discount: "20% OFF",
    code: "GURU20",
    hot: true,
    color: "#BF4E2A",
    expiry: "Ends Sunday midnight",
    desc: "All 100g spice jars this weekend only. Quote the code when ordering on WhatsApp.",
    image: "./spice0.jpg",
  },
  {
    id: 2,
    title: "Buy 3, Get 1 Free",
    discount: "FREE JAR",
    code: "BUY3G1",
    hot: false,
    color: "#C9960D",
    expiry: "Ongoing — while stocks last",
    desc: "Add any 4 spice jars to your order — the cheapest one is completely on us.",
    image: "./spice.jpg",
  },
];
