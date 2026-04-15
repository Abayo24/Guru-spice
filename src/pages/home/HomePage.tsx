import { useEffect, useState } from 'react';
import {
	Check,
	ChevronLeft,
	ChevronRight,
	Copy,
	Flame,
	MessageCircle,
	Leaf,
	Package,
	Truck,
	Award,
} from 'lucide-react';
import { SPICES, DEALS, HAMPERS, REVIEWS } from '@/data';
import { PAGES, WA_NUMBER } from '@/constants';
import { useReveal } from '@/hooks';
import { Button, SectionHeader, Stars, Badge } from '@/components/ui';
import { Ticker, NewsletterStrip } from '@/components/common';
import { ProductCard } from '@/components/product';
import { fmt, waLink } from '@/utils';
import type { DealProps, ShopProps } from '@/types';

type HomePageProps = ShopProps & DealProps;

const PARTICLE_COLORS = ['#E5B03A', '#BF4E2A', '#C9960D', '#F5C040', '#903A18'];

export default function HomePage({
	onAdd,
	wished,
	onWish,
	onCopy,
	copied,
	navigate,
}: HomePageProps) {
	useReveal();

	const [dealIdx, setDealIdx] = useState(0);
	const deal = DEALS[dealIdx];
	useEffect(() => {
		const t = setInterval(
			() => setDealIdx((i) => (i + 1) % DEALS.length),
			6000,
		);
		return () => clearInterval(t);
	}, []);

	const featured = SPICES.filter((s) => s.bestseller);
	const particles = Array.from({ length: 26 }, (_, i) => ({
		id: i,
		size: Math.random() * 5 + 2,
		left: `${Math.random() * 100}%`,
		bottom: `${Math.random() * 14}%`,
		dur: `${6 + Math.random() * 9}s`,
		delay: `${Math.random() * 7}s`,
		color: PARTICLE_COLORS[~~(Math.random() * PARTICLE_COLORS.length)],
	}));

	return (
		<div className='page-enter'>
			{/* ── HERO ────────────────────────────────────────── */}
			<section className='relative h-screen min-h-[580px] flex items-center justify-center overflow-hidden bg-spice'>
				<div className='absolute inset-0 bg-hero-radial animate-bg-glow' />
				<div
					className='absolute inset-0 bg-cover bg-center opacity-[0.16]'
					// style={{
					// 	backgroundImage: 'url(./spice1.jpg)',
					// }}
				/>
				{particles.map((p) => (
					<div
						key={p.id}
						className='particle'
						style={{
							width: p.size,
							height: p.size,
							background: p.color,
							left: p.left,
							bottom: p.bottom,
							['--dur' as string]: p.dur,
							['--delay' as string]: p.delay,
						}}
					/>
				))}

				<div className='relative z-10 text-center px-5 max-w-4xl'>
					<p className='animate-fade-up [animation-delay:0.15s] text-[0.625rem] tracking-[0.38em] uppercase text-turmeric mb-5'>
						Nairobi · Kenya · Est. 2024
					</p>
					<h1
						className='font-display font-black text-paper leading-[0.88] mb-7 animate-fade-up [animation-delay:0.45s]'
						style={{ fontSize: 'clamp(3.625rem, 12vw, 9.25rem)' }}
					>
						Guru
						<em
							className='block not-italic font-light text-turmeric'
							style={{ fontSize: '0.58em' }}
						>
							Spices
						</em>
					</h1>
					<p className='animate-fade-up [animation-delay:0.72s] text-sm text-paper/50 max-w-xs mx-auto mb-10 leading-[1.95] tracking-wide'>
						Pure. Bold. Aromatic. Twelve handpicked spices in 50g &
						100g.
					</p>
					<div className='animate-fade-up [animation-delay:0.95s] flex gap-3 justify-center flex-wrap'>
						<Button
							variant='primary'
							size='lg'
							onClick={() => {
								navigate(PAGES.shop);
								window.scrollTo(0, 0);
							}}
						>
							Explore Spices
						</Button>
						<Button
							variant='outline-light'
							size='lg'
							onClick={() => {
								navigate(PAGES.deals);
								window.scrollTo(0, 0);
							}}
						>
							Today's Deals
						</Button>
					</div>
				</div>

				{/* Scroll cue */}
				<div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up [animation-delay:1.3s]'>
					<div className='animate-scroll-bar w-px h-[50px] bg-gradient-to-b from-turmeric to-transparent' />
					<span className='text-[0.5625rem] tracking-[0.22em] uppercase text-paper/26'>
						Scroll
					</span>
				</div>
			</section>

			{/* ── DEALS BANNER ────────────────────────────────── */}
			<section className='bg-spice'>
				{/* Label strip */}
				<div className='border-b border-paper/[0.06]'>
					<div className='max-w-site mx-auto px-12 max-md:px-5 py-3.5 flex items-center justify-between flex-wrap gap-2.5'>
						<div className='flex items-center gap-2.5'>
							<Flame
								size={12}
								className='text-turmeric fill-turmeric'
							/>
							<span className='text-[0.625rem] tracking-[0.28em] uppercase text-turmeric font-semibold'>
								Limited Offers · Today's Deals
							</span>
						</div>
					</div>
				</div>

				{/* Deal panel */}
				<div
					key={deal.id}
					className='animate-slide-in grid grid-cols-2 min-h-[400px] max-md:grid-cols-1'
				>
					{/* Image */}
					<div className='relative overflow-hidden max-md:hidden'>
						<img
							src={deal.image}
							alt={deal.title}
							className='absolute inset-0 w-full h-full object-cover brightness-[0.52] saturate-[1.3]'
							onError={(e) =>
								((e.target as HTMLImageElement).style.display =
									'none')
							}
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-transparent to-spice/88' />
						<div className='absolute bottom-6 left-6 flex gap-2 flex-wrap'>
							{['Turmeric', 'Paprika', 'Cardamom', 'Cumin'].map(
								(s) => (
									<span
										key={s}
										className='bg-turmeric/12 border border-turmeric/28 text-turmeric text-[0.5625rem] tracking-[0.1em] px-2.5 py-1'
									>
										{s}
									</span>
								),
							)}
						</div>
					</div>

					{/* Info */}
					<div
						className='px-12 py-14 flex flex-col justify-center max-md:px-5 max-md:py-10'
						style={{
							background: `linear-gradient(135deg, rgba(24,15,6,1) 0%, ${deal.color}15 100%)`,
						}}
					>
						{deal.hot && (
							<span
								className='inline-flex items-center gap-1.5 bg-rust text-white text-[0.5625rem] font-bold
                               tracking-[0.13em] uppercase px-3 py-1.5 w-fit mb-4 animate-hot-pulse'
							>
								<Flame size={9} /> HOT DEAL
							</span>
						)}
						<p
							className='font-display font-black leading-[0.9] mb-3'
							style={{
								fontSize: 'clamp(2.75rem,7vw,5.5rem)',
								color: deal.color,
							}}
						>
							{deal.discount}
						</p>
						<h2
							className='font-display font-semibold text-paper mb-3 leading-tight'
							style={{
								fontSize: 'clamp(1.1875rem,3vw,1.8125rem)',
							}}
						>
							{deal.title}
						</h2>
						<p className='text-[0.8125rem] leading-[1.85] text-paper/50 mb-7 max-w-sm'>
							{deal.desc}
						</p>

						{/* Code */}
						<div className='mb-4'>
							<p className='text-[0.5625rem] tracking-[0.18em] uppercase text-paper/34 mb-2'>
								Promo Code
							</p>
							<div className='flex w-fit max-w-full'>
								<div className='bg-paper/7 border border-paper/12 border-r-0 px-5 py-3 text-[0.9375rem] font-bold tracking-[0.12em] text-paper'>
									{deal.code}
								</div>
								<button
									onClick={() => onCopy(deal.code)}
									className='flex items-center gap-1.5 px-4 py-3 text-[0.5625rem] font-semibold tracking-[0.1em]
                             uppercase text-white border-none transition-opacity hover:opacity-80 whitespace-nowrap'
									style={{ background: deal.color }}
								>
									{copied === deal.code ? (
										<>
											<Check size={12} /> Copied!
										</>
									) : (
										<>
											<Copy size={12} /> Copy
										</>
									)}
								</button>
							</div>
						</div>
						<p className='text-[0.625rem] text-paper/26 tracking-wide mb-8'>
							{deal.expiry}
						</p>

						{/* Navigation */}
						<div className='flex items-center gap-2'>
							<button
								onClick={() =>
									setDealIdx(
										(i) =>
											(i - 1 + DEALS.length) %
											DEALS.length,
									)
								}
								className='flex items-center justify-center w-10 h-10 bg-paper/7 border border-paper/10
                           text-paper/50 hover:text-white transition-colors'
								onMouseEnter={(e) =>
									(e.currentTarget.style.background =
										deal.color)
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.background =
										'rgba(253,250,242,0.07)')
								}
							>
								<ChevronLeft size={15} />
							</button>
							<button
								onClick={() =>
									setDealIdx((i) => (i + 1) % DEALS.length)
								}
								className='flex items-center justify-center w-10 h-10 border-none text-white transition-opacity hover:opacity-80'
								style={{ background: deal.color }}
							>
								<ChevronRight size={15} />
							</button>
							<span className='text-[0.6875rem] text-paper/28 ml-1.5'>
								{dealIdx + 1} / {DEALS.length}
							</span>
						</div>
					</div>
				</div>
			</section>

			<Ticker />

			{/* ── FEATURED SPICES ─────────────────────────────── */}
			<section className='bg-cream py-20 px-12 max-md:px-5'>
				<div className='max-w-site mx-auto'>
					<div className='reveal flex items-end justify-between mb-10 flex-wrap gap-4'>
						<SectionHeader
							label='Best Sellers'
							title='Our Most Loved Spices'
						/>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => {
								navigate(PAGES.shop);
								window.scrollTo(0, 0);
							}}
						>
							View All 12 →
						</Button>
					</div>
					<div className='grid gap-2.5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
						{featured.map((s, i) => (
							<div
								key={s.id}
								className={`reveal ${i === 1 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : i === 3 ? 'reveal-delay-3' : ''}`}
							>
								<ProductCard
									spice={s}
									onAdd={onAdd}
									wished={wished.has(s.id)}
									onWish={onWish}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── ABOUT SNIPPET ───────────────────────────────── */}
			<section className='py-20 px-12 max-md:px-5'>
				<div className='max-w-site mx-auto grid grid-cols-2 gap-16 items-center max-[860px]:grid-cols-1 max-[860px]:gap-8'>
					<div className='reveal'>
						<SectionHeader
							label='Our Story'
							title={
								<>
									Pure spices. Real flavour.{' '}
									<em
										className='font-display text-rust not-italic'
										style={{ fontStyle: 'italic' }}
									>
										Always.
									</em>
								</>
							}
						/>
						<div className='w-10 h-0.5 bg-rust my-4' />
						<p className='text-sm leading-[1.95] text-muted mb-3'>
							We source only the finest spices and grind them
							fresh — no fillers, no additives, no shortcuts. Just
							pure, vibrant flavour that transforms your everyday
							cooking.
						</p>
						<p className='text-sm leading-[1.95] text-muted mb-7'>
							Based in Nairobi, we deliver across the city so your
							kitchen is never without great spice.
						</p>
						<div className='flex gap-2.5 flex-wrap'>
							<Button
								variant='primary'
								size='md'
								onClick={() => {
									navigate(PAGES.about);
									window.scrollTo(0, 0);
								}}
							>
								Our Full Story
							</Button>
							
							<Button
								variant='whatsapp'
								size='md'
								href={waLink(
									"Hello Guru Spices! I'd like to learn more.",
									WA_NUMBER,
								)}
								target='_blank'
								rel='noreferrer'
							>
								<MessageCircle size={13} /> Chat with Us
							</Button>
						</div>
					</div>
					<div className='reveal reveal-delay-2 relative overflow-hidden min-h-[380px]'>
						<img
							src='./spice1.jpg'
							alt='Spices'
							className='w-full h-full object-cover min-h-[380px] rounded-full'
						/>
						<div className='absolute inset-0 bg-gradient-to-br from-rust/22 to-transparent' />
						<div className='absolute bottom-20 left-40 bg-spice/82 px-4 py-3.5 backdrop-blur-sm'>
							<p className='font-display font-semibold text-paper text-base mb-1'>
								Fresh. Pure. Aromatic.
							</p>
							<p className='text-[0.6875rem] text-paper/50 tracking-wide'>
								Sourced from the finest origins
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── HAMPERS TEASER ──────────────────────────────── */}
			<section className='bg-spice py-20 px-12 max-md:px-5'>
				<div className='max-w-site mx-auto'>
					<div className='text-center mb-12'>
						<SectionHeader
							dark
							center
							label='Gift Collections'
							title={
								<>
									Give the gift of{' '}
									<em
										className='font-display italic text-turmeric'
										style={{ fontStyle: 'italic' }}
									>
										great flavour.
									</em>
								</>
							}
							subtitle='Curated hampers for every occasion — or build a bespoke set of your own.'
							className='mb-8'
						/>
						<div className='flex gap-2.5 justify-center flex-wrap'>
							<Button
								variant='primary'
								size='md'
								onClick={() => {
									navigate(PAGES.hampers);
									window.scrollTo(0, 0);
								}}
							>
								Shop Hampers
							</Button>
							<Button
								variant='whatsapp'
								size='md'
								href={waLink(
									"Hello! I'd like to order a gift hamper.",
									WA_NUMBER,
								)}
								target='_blank'
								rel='noreferrer'
							>
								<MessageCircle size={13} /> Order via WhatsApp
							</Button>
						</div>
					</div>
					<div className='grid grid-cols-4 gap-0.5 max-[960px]:grid-cols-2 max-[480px]:grid-cols-1'>
						{HAMPERS.map((h, i) => (
							<div
								key={h.id}
								onClick={() => {
									navigate(PAGES.hampers);
									window.scrollTo(0, 0);
								}}
								className={`reveal ${i === 1 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : i === 3 ? 'reveal-delay-3' : ''}
                  bg-paper/[0.04] p-6 border-t-2 cursor-none transition-all hover:bg-paper/[0.08] hover:-translate-y-1`}
								style={{ borderTopColor: h.badgeColor }}
							>
								<span className='text-[2rem] block mb-3'>
									{h.emoji}
								</span>
								<h3 className='font-display font-semibold text-paper text-lg mb-1.5 leading-tight'>
									{h.name}
								</h3>
								<p className='text-[0.6875rem] text-paper/[0.42] mb-3'>
									{h.size}
								</p>
								<div className='flex items-baseline gap-2'>
									<span className='text-lg font-semibold text-paper'>
										{fmt(h.price)}
									</span>
									<span className='text-[0.6875rem] text-paper/[0.3] line-through'>
										{fmt(h.original)}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── BENEFITS ────────────────────────────────────── */}
			<section className='py-0'>
				<div className='max-w-site mx-auto grid grid-cols-4 gap-0.5 max-[960px]:grid-cols-2 max-[480px]:grid-cols-1'>
					{[
						{
							icon: <Leaf size={24} className='text-rust' />,
							t: '100% Natural',
							d: 'No additives or preservatives. Every jar is pure ground spice.',
						},
						{
							icon: <Package size={24} className='text-rust' />,
							t: 'Perfect Portions',
							d: '50g for variety, 100g for everyday staples. Always the right size.',
						},
						{
							icon: <Truck size={24} className='text-rust' />,
							t: 'Fast Delivery',
							d: 'Same-day delivery within Nairobi. Fresh to your kitchen in hours.',
						},
						{
							icon: <Award size={24} className='text-rust' />,
							t: 'Premium Quality',
							d: 'Every batch quality-checked for vibrant colour and bold flavour.',
						},
					].map((b, i) => (
						<div
							key={b.t}
							className={`reveal ${i === 1 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : i === 3 ? 'reveal-delay-3' : ''}
                p-10 bg-paper border-b-[3px] border-transparent
                transition-all hover:border-rust hover:-translate-y-1 max-md:p-7`}
						>
							<span className='block mb-4'>{b.icon}</span>
							<h3 className='font-display font-semibold text-ink text-[1.1875rem] mb-2.5'>
								{b.t}
							</h3>
							<p className='text-[0.8125rem] leading-[1.85] text-muted'>
								{b.d}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* ── REVIEWS SNIPPET ─────────────────────────────── */}
			<section className='bg-spice py-20 px-12 max-md:px-5 relative overflow-hidden'>
				<div
					className='absolute top-[-7.5rem] left-0 font-display text-paper/[0.022] pointer-events-none select-none'
					style={{
						fontSize: 'clamp(13.75rem, 35vw, 31.25rem)',
						lineHeight: 1,
					}}
				>
					"
				</div>
				<div className='max-w-site mx-auto'>
					<p className='reveal text-[0.625rem] tracking-[0.28em] uppercase text-turmeric font-semibold mb-10'>
						Customer Reviews
					</p>
					<div className='grid grid-cols-3 gap-0.5 max-[860px]:grid-cols-2 max-[500px]:grid-cols-1'>
						{REVIEWS.slice(0, 3).map((r, i) => (
							<div
								key={i}
								className={`reveal ${i === 1 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : ''}
                  p-8 bg-paper/[0.03] border-t border-paper/[0.07]`}
							>
								<div className='flex items-center justify-between mb-3.5'>
									<Stars rating={r.stars} />
									{r.verified && (
										<Badge variant='sage'>✓ Verified</Badge>
									)}
								</div>
								<p className='font-display italic text-[1rem] text-paper/[0.70] leading-[1.7] mb-5'>
									"{r.quote}"
								</p>
								<p className='text-[0.625rem] tracking-[0.12em] uppercase text-turmeric'>
									{r.author}
								</p>
								<p className='text-[0.6875rem] text-paper/[0.30] mt-0.5'>
									{r.role}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<NewsletterStrip />
		</div>
	);
}
