# Guru Spices

A production-grade React + TypeScript + Tailwind CSS storefront for Guru Spices.

---

## Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

> **Node.js 18+** required.

---

## First Thing to Change

Open `src/constants/index.ts` and set your WhatsApp Business number:

```ts
export const WA_NUMBER = "254712345678";
//                        ↑ country code + number, no + or spaces
```

Every order button, floating chat icon, and contact link uses this value automatically.

---

## Project Structure

```
guru-spices-tw/
├── index.html
├── package.json
├── tailwind.config.ts      ← all custom colours, fonts, animations
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
│
└── src/
    ├── main.tsx             ← ReactDOM entry
    ├── App.tsx              ← root component, providers, routing, state
    ├── index.css            ← Tailwind directives + @layer base/components/utilities
    │
    ├── constants/
    │   └── index.ts         ← WA_NUMBER, PAGES, NAV_LINKS, filters  ← EDIT HERE
    │
    ├── types/
    │   └── index.ts         ← all shared TypeScript interfaces
    │
    ├── utils/
    │   └── index.ts         ← cn(), fmt(), waLink()
    │
    ├── data/                ← content lives here — edit to customise
    │   ├── spices.ts        ← 12 spices with prices, images, descriptions
    │   ├── deals.ts         ← 2 active promo deals
    │   ├── hampers.ts       ← 4 curated gift sets
    │   ├── reviews.ts       ← 6 customer reviews
    │   └── index.ts         ← barrel export
    │
    ├── hooks/
    │   └── index.ts         ← useReveal, useScrolled, useCloseOnEscape,
    │                           useCart, useWishlist
    │
    ├── context/
    │   └── NotifContext.tsx  ← React context for toast notifications
    │
    ├── components/
    │   ├── ui/              ← design system primitives
    │   │   ├── Button.tsx   ← polymorphic (renders as <a> or <button>)
    │   │   ├── Stars.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Breadcrumb.tsx
    │   │   └── SectionHeader.tsx
    │   ├── common/
    │   │   ├── Cursor.tsx
    │   │   ├── Ticker.tsx
    │   │   └── NewsletterStrip.tsx
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   ├── cart/
    │   │   └── CartDrawer.tsx
    │   ├── product/
    │   │   └── ProductCard.tsx
    │   └── search/
    │       └── SearchOverlay.tsx
    │
    └── pages/
        ├── home/HomePage.tsx
        ├── shop/ShopPage.tsx
        ├── deals/DealsPage.tsx
        ├── hampers/HampersPage.tsx
        ├── about/AboutPage.tsx
        ├── wishlist/WishlistPage.tsx
        └── index.ts
```

---

## Tech Stack

| Package          | Version | Purpose                          |
|------------------|---------|----------------------------------|
| React            | 18      | UI framework                     |
| TypeScript       | 5       | Type safety                      |
| Tailwind CSS     | 3       | Utility-first styling            |
| Vite             | 5       | Dev server & bundler             |
| lucide-react     | 0.383   | Icons                            |
| clsx             | 2       | Conditional class names          |
| tailwind-merge   | 2       | Merge Tailwind classes safely    |

---

## Customisation

### Colours

Edit `tailwind.config.ts` → `theme.extend.colors`:

```ts
rust:     { DEFAULT: "#BF4E2A" },  // primary CTAs
turmeric: "#E5B03A",               // accent / gold
cream:    "#F6EDD9",               // warm background
ink:      { DEFAULT: "#291808" },  // dark text
```

### Prices

Edit `src/data/spices.ts` — change `p50` and `p100` (numbers, in KES):

```ts
{ id: 1, name: "White Pepper", p50: 90, p100: 160, ... }
```

### Deals

Edit `src/data/deals.ts`. Add more objects to add more deals.

### Adding a page

1. Create `src/pages/my-page/MyPage.tsx`
2. Export it from `src/pages/index.ts`
3. Add its key to `PAGES` in `src/constants/index.ts`
4. Add a route in `src/App.tsx` inside `<main>`
5. Optionally add it to `NAV_LINKS` in `src/constants/index.ts`

---

## Deployment

```bash
npm run build     # outputs to dist/
```

| Platform         | How to deploy                                        |
|------------------|------------------------------------------------------|
| Vercel           | Connect GitHub repo → build cmd: `npm run build`    |
| Netlify          | Drag `dist/` to dashboard, or connect repo          |
| Cloudflare Pages | Connect repo, build cmd `npm run build`, output `dist` |
| GitHub Pages     | Push `dist/` to `gh-pages` branch                  |

---

## Key Features

| Feature            | Implementation                                          |
|--------------------|---------------------------------------------------------|
| Routing            | In-memory `PageKey` state — no router library needed    |
| Cart               | `useCart` hook — merges duplicates, qty stepper, promos |
| Promo codes        | `GURU20` → 20% off. Add more in `CartDrawer.tsx`        |
| WhatsApp checkout  | Pre-filled order message → `wa.me` deep link            |
| Search             | `Cmd/Ctrl+K` or navbar icon — live spice filtering      |
| Wishlist           | Heart on every card — "Order All" on WhatsApp           |
| Notifications      | `useNotif()` hook — call from any component             |
| Scroll reveal      | `.reveal` class + `IntersectionObserver`               |
| Custom cursor      | Hides automatically on touch devices                   |
| Responsive         | Mobile-first — collapses at all standard breakpoints   |
