import { useCallback, useEffect, useState } from 'react';

import { PAGES, WA_NUMBER } from '@/constants';
import { waLink } from '@/utils';
import { useCart, useWishlist, useCloseOnEscape } from '@/hooks';
import { NotifProvider } from '@/context/NotifContext';
import type { CartItem, PageKey, Spice } from '@/types';

import { Cursor } from '@/components/common';
import { Navbar, Footer } from '@/components/layout';
import { CartDrawer } from '@/components/cart';
import { SearchOverlay } from '@/components/search';

import {
	HomePage,
	ShopPage,
	HampersPage,
	AboutPage,
	WishlistPage,
} from '@/pages';

// ─── Inner app — has access to NotifProvider context ─────
function AppInner() {
	// ── Routing ───────────────────────────────────────────
	const [page, setPage] = useState<PageKey>(PAGES.home);

	const navigate = useCallback((p: PageKey) => {
		setPage(p);
		setCartOpen(false);
		setSearchOpen(false);
		window.scrollTo({ top: 0, behavior: 'instant' });
	}, []);

	// ── Overlays ──────────────────────────────────────────
	const [cartOpen, setCartOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	// Close search on Escape
	useCloseOnEscape(() => setSearchOpen(false));

	// Cmd/Ctrl+K opens search
	useEffect(() => {
		const fn = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				setSearchOpen(true);
			}
		};
		window.addEventListener('keydown', fn);
		return () => window.removeEventListener('keydown', fn);
	}, []);

	// ── Cart ─────────────────────────────────────────────
	const cart = useCart();

	const handleAddSpice = useCallback(
		(spice: Spice, size: '50g' | '100g') => {
			cart.addSpice(spice, size);
			setCartOpen(true);
		},
		[cart],
	);

	const handleAddHamper = useCallback(
		(item: Omit<CartItem, '_key' | 'qty'>) => {
			cart.addHamper(item);
			setCartOpen(true);
		},
		[cart],
	);

	// ── Wishlist ──────────────────────────────────────────
	const { wished, toggle: toggleWish } = useWishlist();

	// ── Copied promo code ─────────────────────────────────
	const [copied, setCopied] = useState<string | null>(null);

	const handleCopy = useCallback((code: string) => {
		navigator.clipboard?.writeText(code).catch(() => {});
		setCopied(code);
		setTimeout(() => setCopied(null), 2600);
	}, []);

	// ── Shared prop bundles ───────────────────────────────
	const shopProps = {
		onAdd: handleAddSpice,
		wished,
		onWish: toggleWish,
		navigate,
	} as const;

	const dealProps = {
		onCopy: handleCopy,
		copied,
		navigate,
	} as const;

	return (
		<div className='min-h-screen'>
			{/* ── Utilities ──────────────────────────────────── */}
			<Cursor />

			{/* ── Overlays ───────────────────────────────────── */}
			<SearchOverlay
				open={searchOpen}
				onClose={() => setSearchOpen(false)}
				onAddToCart={handleAddSpice}
			/>

			<CartDrawer
				open={cartOpen}
				onClose={() => setCartOpen(false)}
				items={cart.items}
				onRemove={cart.remove}
				onQty={cart.setQty}
				subtotal={cart.subtotal}
				discount={cart.discount}
				total={cart.total}
				count={cart.count}
				appliedCode={cart.promo}
				onApplyCode={cart.setPromo}
			/>

			{/* ── Navigation ─────────────────────────────────── */}
			<Navbar
				cartCount={cart.count}
				onCart={() => setCartOpen(true)}
				onSearch={() => setSearchOpen(true)}
				navigate={navigate}
				page={page}
			/>

			{/* ── Pages ──────────────────────────────────────── */}
			<main>
				{page === PAGES.home && (
					<HomePage {...shopProps} {...dealProps} />
				)}
				{page === PAGES.shop && <ShopPage {...shopProps} />}
				{page === PAGES.hampers && (
					<HampersPage onAdd={handleAddHamper} navigate={navigate} />
				)}
				{page === PAGES.about && <AboutPage navigate={navigate} />}
				{page === PAGES.wishlist && (
					<WishlistPage
						wished={wished}
						onWish={toggleWish}
						onAdd={handleAddSpice}
						navigate={navigate}
					/>
				)}
			</main>

			{/* ── Footer ─────────────────────────────────────── */}
			<Footer navigate={navigate} />

			{/* ── Floating WhatsApp button ───────────────────── */}
			<a
				href={waLink(
					"Hello Guru Spices! I'd like to place an order.",
					WA_NUMBER,
				)}
				target='_blank'
				rel='noreferrer'
				className='wa-float'
				aria-label='Chat on WhatsApp'
			>
				<img
					src='/whatsapp.svg'
					alt='WhatsApp'
					width='24'
					height='24'
				/>
			</a>
		</div>
	);
}

// ─── Root — wraps everything in providers ────────────────
export default function App() {
	return (
		<NotifProvider>
			<AppInner />
		</NotifProvider>
	);
}
