<script lang="ts">
	import {
		Heart,
		Star,
		Printer,
		Download,
		Check,
		Wifi,
		WifiOff,
		Laptop,
		Smartphone,
		Radio,
		Zap,
		Layers,
		Share2,
		X
	} from '@lucide/svelte';
	import { asset, resolve } from '$app/paths';
	import { browser } from '$app/env';
	import { pinnedStore } from '#lib/stores/pinned.svelte.js';
	import { uiStore } from '#lib/stores/ui.svelte.js';
	import { pwaStore } from '#lib/stores/pwa.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	$effect(() => {
		if (browser) {
			pwaStore.init();
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register(`${resolve('/')}service-worker.js`).catch(() => {
					// Service worker registration error handled silently
				});
			}
		}
	});

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Roland SP-404MKII Interactive Cheat Sheet',
		alternateName: 'SP-404MKII Shortcuts & Button Reference',
		applicationCategory: 'MusicApplication',
		operatingSystem: 'All',
		browserRequirements: 'Requires JavaScript',
		description:
			'Fast interactive lookup table, 1:1 hardware faceplate filter, and desk cheat sheet builder for Roland SP-404MKII shortcuts (v5.50).',
		author: {
			'@type': 'Organization',
			name: 'frstudios',
			url: 'https://frstudios.co.ke'
		},
		license: 'https://github.com/cntrvsy/sp404mk2cheatsheet/blob/main/LICENSE'
	});
</script>

<svelte:head>
	<link rel="icon" href={asset('icon.svg')} type="image/svg+xml" />
	<link rel="manifest" href={asset('manifest.webmanifest')} />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<link rel="apple-touch-icon" href={asset('icon-192.png')} />
	<title>Roland SP-404MKII Interactive Cheat Sheet & Button Lookup</title>
	<meta
		name="description"
		content="Fast interactive shortcut finder and hardware button filter for Roland SP-404MKII shortcuts, hidden combos, and workflow tips. 100% verified against Roland v5.50 Reference Manual."
	/>
	<meta
		name="keywords"
		content="Roland SP-404MKII, SP-404, SP-404MK2, cheat sheet, shortcuts, sampler, beatmaking, lo-fi, Roland manual, frstudios"
	/>
	<meta name="author" content="frstudios" />
	<meta name="theme-color" content="#0d0f13" />

	<!-- Open Graph / Facebook / Discord -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Roland SP-404MKII Interactive Cheat Sheet & Button Lookup" />
	<meta
		property="og:description"
		content="Fast interactive shortcut finder and 1:1 hardware faceplate filter for Roland SP-404MKII. 101 shortcuts verified against Roland v5.50 Reference Manual."
	/>
	<meta property="og:site_name" content="SP-404MKII Cheat Sheet" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Roland SP-404MKII Interactive Cheat Sheet" />
	<meta
		name="twitter:description"
		content="Fast interactive shortcut finder and 1:1 hardware faceplate filter for Roland SP-404MKII. 101 shortcuts verified against Roland v5.50 Reference Manual."
	/>

	<!-- Structured Data -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html '<' + 'script type="application/ld+json">' + jsonLd + '<' + '/script>'}
</svelte:head>

<a href="#main-content" class="skip-link visually-hidden">Skip to shortcuts</a>

<header class="site-header">
	<div class="container header-inner">
		<div class="brand-group">
			<div class="brand-badge" aria-hidden="true">404</div>
			<div>
				<h1 class="site-title">SP-404MKII Cheat Sheet</h1>
				<p class="site-subtitle">Official Firmware v5.50 · 101 Verified Shortcuts</p>
			</div>
		</div>

		<!-- Primary View Mode: Semantic Tablist (W3C Accessible) -->
		<div class="view-tablist" role="tablist" aria-label="Cheat Sheet View Selection">
			<button
				type="button"
				role="tab"
				id="tab-all-shortcuts"
				class="view-tab"
				class:view-tab--active={uiStore.viewMode === 'all'}
				aria-selected={uiStore.viewMode === 'all'}
				aria-controls="main-content"
				onclick={() => uiStore.setViewMode('all')}
			>
				All Shortcuts
			</button>

			<button
				type="button"
				role="tab"
				id="tab-my-sheet"
				class="view-tab"
				class:view-tab--active={uiStore.viewMode === 'pinned'}
				aria-selected={uiStore.viewMode === 'pinned'}
				aria-controls="main-content"
				onclick={() => uiStore.setViewMode('pinned')}
			>
				<Star
					size={13}
					class={uiStore.viewMode === 'pinned' || pinnedStore.ids.length > 0
						? 'star-icon star-icon--filled'
						: 'star-icon'}
				/>
				<span>My Sheet</span>
				<span class="view-tab__count">{pinnedStore.ids.length}</span>
			</button>
		</div>

		<!-- Global Utility Actions -->
		<div class="header-utilities">
			<!-- Offline / Studio Connection Indicator -->
			{#if !pwaStore.isOnline}
				<div class="status-pill status-pill--offline" title="Operating offline without network">
					<WifiOff size={13} />
					<span>Offline</span>
				</div>
			{:else}
				<div class="status-pill status-pill--ready" title="Installed and 100% available offline">
					<Wifi size={13} />
					<span>Offline Ready</span>
				</div>
			{/if}

			{#if !pwaStore.isInstalled}
				<button
					type="button"
					class="header-action-btn header-action-btn--install"
					onclick={() => pwaStore.promptInstall()}
					aria-label="Install offline app for desktop or mobile"
					title="Install as standalone offline app"
				>
					<Download size={14} />
					<span>Get App</span>
				</button>
			{:else}
				<div class="header-action-badge" title="Running as installed app">
					<Check size={13} />
					<span>Installed</span>
				</div>
			{/if}

			<button
				type="button"
				class="header-action-btn header-action-btn--primary"
				onclick={() => uiStore.openPrintModal()}
				aria-label="Print or Export cheat sheet to PDF"
			>
				<Printer size={14} />
				<span>Print / PDF</span>
			</button>

			<a
				href="https://github.com/cntrvsy/sp404mk2cheatsheet"
				target="_blank"
				rel="noopener noreferrer"
				class="header-github-link"
				aria-label="View SP-404MKII Cheat Sheet on GitHub"
			>
				GitHub
			</a>
		</div>
	</div>
</header>

{@render children()}

<footer class="site-footer">
	<div class="container footer-inner">
		<div class="footer-attribution">
			<span>
				Made with <Heart size={14} class="heart-icon heart-icon--filled" /> by
				<a href="https://frstudios.co.ke" target="_blank" rel="noopener noreferrer">frstudios</a>
			</span>
			<span class="footer-dot" aria-hidden="true">·</span>
			<a
				href="https://github.com/cntrvsy/sp404mk2cheatsheet"
				target="_blank"
				rel="noopener noreferrer"
				class="footer-link"
			>
				GitHub
			</a>
			<span class="footer-dot" aria-hidden="true">·</span>
			<a
				href="https://github.com/cntrvsy/sp404mk2cheatsheet/blob/main/LICENSE"
				target="_blank"
				rel="noopener noreferrer"
				class="footer-link"
			>
				MIT License
			</a>
		</div>
		<p class="footer-disclaimer">
			Roland and SP-404MKII are registered trademarks of Roland Corporation. This project is an
			independent educational cheatsheet verified against the official Roland v5.50 Reference
			Manual.
		</p>
	</div>
</footer>

{#if pwaStore.showInstallModal}
	<div
		class="pwa-modal-backdrop"
		onclick={() => pwaStore.closeInstallModal()}
		onkeydown={(e) => e.key === 'Escape' && pwaStore.closeInstallModal()}
		role="presentation"
	>
		<div
			class="pwa-modal-box"
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="pwa-modal-title"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="pwa-modal-header">
				<div class="pwa-modal-title-group">
					<Download size={20} class="pwa-modal-icon" />
					<div>
						<h2 id="pwa-modal-title" class="pwa-modal-title">
							Install SP-404MKII Offline Companion
						</h2>
						<p class="pwa-modal-subtitle">
							Fast, standalone studio reference that works 100% without internet
						</p>
					</div>
				</div>
				<button
					type="button"
					class="pwa-modal-close"
					onclick={() => pwaStore.closeInstallModal()}
					aria-label="Close install instructions"
				>
					<X size={18} />
				</button>
			</div>

			<div class="pwa-features-grid">
				<div class="pwa-feature-item">
					<Zap size={16} class="pwa-feature-icon" />
					<div>
						<strong>Zero Internet Required</strong>
						<p>Take it on planes, trains, gigs, or off-grid studios without Wi-Fi.</p>
					</div>
				</div>
				<div class="pwa-feature-item">
					<Layers size={16} class="pwa-feature-icon" />
					<div>
						<strong>Standalone Window</strong>
						<p>Runs in its own window without browser toolbars, tabs, or address bars.</p>
					</div>
				</div>
				<div class="pwa-feature-item">
					<Star size={16} class="pwa-feature-icon" />
					<div>
						<strong>Saved Studio Sheets</strong>
						<p>Custom pinned shortcuts and print layouts persist locally on your machine.</p>
					</div>
				</div>
			</div>

			<div class="pwa-platform-guide">
				<h3 class="pwa-guide-heading">How to Install on Your Device:</h3>

				<div class="pwa-platform-card">
					<div class="platform-card-header">
						<Laptop size={16} />
						<span>Mac, Windows, or Linux (Chrome, Edge, Brave)</span>
					</div>
					<p>
						Click the <strong>Install</strong> icon in your browser address bar (top right), or
						click
						<strong>Install to Device</strong> below.
					</p>
				</div>

				<div class="pwa-platform-card">
					<div class="platform-card-header">
						<Smartphone size={16} />
						<span>iPhone & iPad (Safari)</span>
					</div>
					<p>
						Tap the <strong>Share</strong> button <Share2 size={13} class="inline-icon" /> at the bottom
						of Safari, then choose <strong>Add to Home Screen</strong>.
					</p>
				</div>

				<div class="pwa-platform-card">
					<div class="platform-card-header">
						<Radio size={16} />
						<span>Android (Chrome)</span>
					</div>
					<p>
						Tap the <strong>three dots menu</strong> (⋮) in the top-right corner and choose
						<strong>Install App</strong> or <strong>Add to Home screen</strong>.
					</p>
				</div>
			</div>

			<div class="pwa-modal-actions">
				{#if pwaStore.canInstall}
					<button
						type="button"
						class="pwa-btn pwa-btn--primary"
						onclick={() => pwaStore.promptInstall()}
					>
						<Download size={15} />
						<span>Install to Device</span>
					</button>
				{/if}
				<button
					type="button"
					class="pwa-btn pwa-btn--secondary"
					onclick={() => pwaStore.closeInstallModal()}
				>
					Got It
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(:root) {
		color-scheme: dark;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		background-color: #0d0f13;
		color: #e2e8f0;
		font-family:
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			Ubuntu,
			Cantarell,
			'Noto Sans',
			sans-serif;
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}

	:global(button, input, select, textarea) {
		font: inherit;
		color: inherit;
	}

	:global(.container) {
		width: 100%;
		max-width: 1360px;
		margin-inline: auto;
		padding-inline: clamp(0.45rem, 2.5vw, 2rem);
	}

	:global(.visually-hidden:where(:not(:focus-within, :active))) {
		position: absolute !important;
		clip-path: inset(50%) !important;
		overflow: hidden !important;
		width: 1px !important;
		height: 1px !important;
		margin: -1px !important;
		padding: 0 !important;
		border: 0 !important;
		white-space: nowrap !important;
	}

	.skip-link:focus-visible {
		position: fixed;
		top: 0.75rem;
		left: 0.75rem;
		z-index: 9999;
		padding: 0.5rem 1rem;
		background: #f97316;
		color: #0f172a;
		font-weight: 700;
		border-radius: 0.35rem;
	}

	:global(:where(a:any-link, button, input, summary):focus-visible) {
		outline: 2px solid #f97316;
		outline-offset: 2px;
	}

	/* Top Header Layout & Web Standards */
	.site-header {
		background: #0f1218;
		border-bottom: 1px solid #1e2430;
		padding-block: 0.65rem;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.header-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem 1rem;
	}

	.brand-group {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		min-inline-size: 0;
	}

	.brand-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		flex-shrink: 0;
		border-radius: 0.45rem;
		background: #1c2029;
		border: 1px solid #363e4d;
		color: #f8fafc;
		font-weight: 900;
		font-size: 0.82rem;
		letter-spacing: -0.02em;
	}

	.site-title {
		margin: 0;
		font-size: clamp(1rem, 2.2vw, 1.15rem);
		font-weight: 800;
		color: #f8fafc;
		line-height: 1.2;
	}

	.site-subtitle {
		margin: 0;
		font-size: 0.74rem;
		color: #94a3b8;
	}

	/* Semantic View Tablist (W3C Tab Pattern) */
	.view-tablist {
		display: inline-flex;
		align-items: center;
		background: #151820;
		border: 1px solid #28303f;
		border-radius: 0.5rem;
		padding: 0.18rem;
		gap: 0.2rem;
	}

	.view-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.75rem;
		font-size: 0.78rem;
		font-weight: 600;
		color: #94a3b8;
		background: transparent;
		border: none;
		border-radius: 0.38rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.view-tab:hover:not(.view-tab--active) {
		color: #e2e8f0;
		background: rgba(255, 255, 255, 0.04);
	}

	.view-tab--active {
		color: #ffffff;
		background: #252c3a;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.view-tab__count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.05rem 0.38rem;
		font-size: 0.68rem;
		font-weight: 700;
		border-radius: 999px;
		background: #101319;
		color: #cbd5e1;
	}

	.view-tab--active .view-tab__count {
		background: #ea580c;
		color: #ffffff;
	}

	/* Global Utility Group */
	.header-utilities {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.header-action-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.38rem 0.75rem;
		font-size: 0.78rem;
		font-weight: 700;
		border-radius: 0.4rem;
		cursor: pointer;
		border: 1px solid transparent;
		transition: all 0.15s ease;
	}

	.header-action-btn--primary {
		background: #ea580c;
		border-color: #f97316;
		color: #ffffff;
	}

	.header-action-btn--primary:hover {
		background: #f97316;
	}

	.header-github-link {
		display: inline-flex;
		align-items: center;
		padding: 0.38rem 0.65rem;
		font-size: 0.78rem;
		font-weight: 600;
		color: #94a3b8;
		background: #171b22;
		border: 1px solid #2b3240;
		border-radius: 0.4rem;
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.header-github-link:hover {
		color: #ffffff;
		border-color: #475569;
		background: #1e2430;
	}

	@media (max-width: 640px) {
		.site-subtitle {
			display: none;
		}

		.header-inner {
			justify-content: center;
		}

		.view-tablist {
			order: 3;
			width: 100%;
			justify-content: center;
		}

		.view-tab {
			flex: 1;
			justify-content: center;
		}
	}

	.site-footer {
		margin-top: 4rem;
		border-top: 1px solid #1e2430;
		background: #090b0e;
		padding-block: 2rem 2.5rem;
		font-size: 0.85rem;
		color: #94a3b8;
	}

	.footer-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.75rem;
	}

	.footer-attribution {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.5rem 0.75rem;
		color: #cbd5e1;
		font-weight: 500;
	}

	.footer-attribution span {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	:global(.heart-icon--filled) {
		color: #ef4444;
		fill: #ef4444;
	}

	.footer-attribution a {
		color: #f97316;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.footer-attribution a:hover {
		color: #fb923c;
		text-decoration: underline;
	}

	.footer-dot {
		color: #475569;
	}

	.footer-disclaimer {
		margin: 0;
		max-width: 65ch;
		font-size: 0.75rem;
		color: #64748b;
		line-height: 1.45;
	}

	/* Offline Status Pill & App Install Button */
	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.32rem;
		padding: 0.28rem 0.55rem;
		font-size: 0.72rem;
		font-weight: 700;
		border-radius: 999px;
		line-height: 1;
		user-select: none;
	}

	.status-pill--ready {
		background: rgba(34, 197, 94, 0.12);
		border: 1px solid rgba(34, 197, 94, 0.3);
		color: #4ade80;
	}

	.status-pill--offline {
		background: rgba(239, 68, 68, 0.15);
		border: 1px solid rgba(239, 68, 68, 0.4);
		color: #f87171;
	}

	.header-action-btn--install {
		background: #171c26;
		border-color: #2e3849;
		color: #cbd5e1;
	}

	.header-action-btn--install:hover {
		background: #242c3b;
		border-color: #64748b;
		color: #ffffff;
	}

	.header-action-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.32rem 0.6rem;
		font-size: 0.74rem;
		font-weight: 700;
		color: #4ade80;
		background: rgba(34, 197, 94, 0.08);
		border: 1px solid rgba(34, 197, 94, 0.25);
		border-radius: 0.4rem;
	}

	/* PWA Install Modal */
	.pwa-modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.78);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		z-index: 1000;
	}

	.pwa-modal-box {
		background: #13171f;
		border: 1px solid #2a3344;
		border-radius: 0.75rem;
		max-width: 540px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		padding: 1.5rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
		color: #e2e8f0;
	}

	.pwa-modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #222938;
	}

	.pwa-modal-title-group {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	:global(.pwa-modal-icon) {
		color: #f97316;
		flex-shrink: 0;
	}

	.pwa-modal-title {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 800;
		color: #f8fafc;
	}

	.pwa-modal-subtitle {
		margin: 0.2rem 0 0 0;
		font-size: 0.78rem;
		color: #94a3b8;
	}

	.pwa-modal-close {
		background: transparent;
		border: none;
		color: #94a3b8;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pwa-modal-close:hover {
		color: #ffffff;
		background: #1f2633;
	}

	.pwa-features-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		padding: 1.15rem 0;
		border-bottom: 1px solid #222938;
	}

	.pwa-feature-item {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}

	:global(.pwa-feature-icon) {
		color: #fdba74;
		flex-shrink: 0;
		margin-top: 0.15rem;
	}

	.pwa-feature-item strong {
		display: block;
		font-size: 0.85rem;
		color: #f1f5f9;
	}

	.pwa-feature-item p {
		margin: 0.15rem 0 0 0;
		font-size: 0.76rem;
		color: #94a3b8;
	}

	.pwa-platform-guide {
		padding: 1rem 0;
	}

	.pwa-guide-heading {
		margin: 0 0 0.75rem 0;
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #cbd5e1;
		font-weight: 800;
	}

	.pwa-platform-card {
		background: #181d27;
		border: 1px solid #283142;
		border-radius: 0.5rem;
		padding: 0.75rem 0.85rem;
		margin-bottom: 0.65rem;
	}

	.platform-card-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.82rem;
		font-weight: 700;
		color: #f8fafc;
		margin-bottom: 0.35rem;
	}

	.pwa-platform-card p {
		margin: 0;
		font-size: 0.76rem;
		color: #94a3b8;
		line-height: 1.4;
	}

	:global(.inline-icon) {
		display: inline;
		vertical-align: -0.15em;
		color: #38bdf8;
	}

	.pwa-modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.65rem;
		padding-top: 0.75rem;
	}

	.pwa-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.95rem;
		font-size: 0.82rem;
		font-weight: 700;
		border-radius: 0.4rem;
		cursor: pointer;
		border: 1px solid transparent;
		transition: all 0.12s ease;
	}

	.pwa-btn--primary {
		background: #ea580c;
		border-color: #f97316;
		color: #ffffff;
	}

	.pwa-btn--primary:hover {
		background: #f97316;
	}

	.pwa-btn--secondary {
		background: #1e2430;
		border-color: #333d4f;
		color: #cbd5e1;
	}

	.pwa-btn--secondary:hover {
		background: #2a3344;
		color: #ffffff;
	}

	@media print {
		.site-header,
		.pwa-modal-backdrop {
			display: none !important;
		}

		.site-footer {
			margin-top: 1.5rem;
			padding-block: 1rem;
			border-top: 1px solid #ccc;
			background: transparent !important;
			color: #333 !important;
			font-size: 0.75rem;
		}

		.footer-attribution a {
			color: #000 !important;
			text-decoration: none !important;
		}

		.footer-disclaimer {
			color: #666 !important;
		}

		:global(:root) {
			color-scheme: light;
		}

		:global(body) {
			background: #ffffff !important;
			color: #000000 !important;
		}
	}
</style>
