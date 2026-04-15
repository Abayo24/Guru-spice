// ─── Navigation / routing ────────────────────────────────
export type PageKey = "home" | "shop" | "hampers" | "about" | "wishlist";

// ─── Domain models ───────────────────────────────────────
export interface Spice {
  id:         number;
  name:       string;
  tag:        string;
  cat:        string;
  emoji:      string;
  image:      string;
  desc:       string;
  longDesc:   string;
  uses:       string[];
  p50:        number;
  p100:       number;
  rating:     number;
  reviewCount:number;
  inStock:    boolean;
  bestseller: boolean;
}

export interface Deal {
  id:       number;
  title:    string;
  discount: string;
  code:     string;
  desc:     string;
  expiry:   string;
  color:    string;
  hot:      boolean;
  image:    string;
}

export interface Hamper {
  id:         number;
  name:       string;
  badge:      string;
  badgeColor: string;
  emoji:      string;
  price:      number;
  original:   number;
  spices:     string[];
  size:       string;
  desc:       string;
  image:      string;
}

export interface Review {
  quote:    string;
  author:   string;
  role:     string;
  stars:    number;
  verified: boolean;
}

// ─── Cart ─────────────────────────────────────────────────
export type CartItemType = "spice" | "hamper" | "custom";

export interface CartItem {
  _key:      string;
  type:      CartItemType;
  name:      string;
  image?:    string;
  emoji?:    string;
  size:      string;
  unitPrice: number;
  qty:       number;
}

// ─── Shared page prop shapes ─────────────────────────────
export interface ShopProps {
  onAdd:     (spice: Spice, size: "50g" | "100g") => void;
  wished:    Set<number>;
  onWish:    (id: number) => void;
  navigate:  (page: PageKey) => void;
}

export interface DealProps {
  onCopy:   (code: string) => void;
  copied:   string | null;
  navigate: (page: PageKey) => void;
}

// ─── Notification ─────────────────────────────────────────
export interface Notification {
  id:  number;
  msg: string;
}
