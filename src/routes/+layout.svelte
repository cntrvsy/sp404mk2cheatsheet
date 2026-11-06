<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { Heart, Star, Printer } from '@lucide/svelte';
	import { pinnedStore } from '#lib/stores/pinned.svelte.js';
	import { uiStore } from '#lib/stores/ui.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

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
	<link rel="icon" href={favicon} />
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

	@media print {
		.site-header {
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
