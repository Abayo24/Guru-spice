import type { PageKey } from "@/types";

/** WhatsApp Business number — country code, no + or spaces */
export const WA_NUMBER = "254739515936";

export const PAGES: Record<string, PageKey> = {
  home:     "home",
  shop:     "shop",
  hampers:  "hampers",
  about:    "about",
  wishlist: "wishlist",
} as const;

export const NAV_LINKS: { label: string; page: PageKey }[] = [
  { label: "Shop",    page: "shop"    },
  { label: "Hampers", page: "hampers" },
  { label: "About",   page: "about"   },
];

export const SPICE_FILTERS = ["All", "Pepper", "Aromatic", "Seed", "Root"] as const;
export type SpiceFilter = (typeof SPICE_FILTERS)[number];

export const SORT_OPTIONS = [
  { key: "default",    label: "Featured"        },
  { key: "price_asc",  label: "Price: Low–High" },
  { key: "price_desc", label: "Price: High–Low" },
  { key: "rating",     label: "Top Rated"       },
] as const;
export type SortKey = (typeof SORT_OPTIONS)[number]["key"];
