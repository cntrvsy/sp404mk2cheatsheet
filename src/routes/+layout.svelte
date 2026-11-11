<script lang="ts">
	import {
		Heart,
		Star,
		Printer,
		Download,
		WifiOff,
		Laptop,
		Smartphone,
		Radio,
		Zap,
		Layers,
		Share2,
		X,
		Menu,
		ExternalLink
	} from '@lucide/svelte';
	import { asset, resolve } from '$app/paths';
	import { browser, dev } from '$app/env';
	import { pinnedStore } from '#lib/stores/pinned.svelte.js';
	import { uiStore } from '#lib/stores/ui.svelte.js';
	import { pwaStore } from '#lib/stores/pwa.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	let showAboutModal = $state(false);

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (showAboutModal) showAboutModal = false;
			if (pwaStore.showInstallModal) pwaStore.closeInstallModal();
		}
	}

	$effect(() => {
		if (browser) {
			pwaStore.init();
			if ('serviceWorker' in navigator) {
				if (dev) {
					// In local development, automatically unregister any service worker so
					// localhost:5173 is never hijacked or poisoned for other projects.
					navigator.serviceWorker.getRegistrations().then((registrations) => {
						for (const registration of registrations) {
							registration.unregister();
						}
					});
				} else {
					navigator.serviceWorker.register(`${resolve('/')}service-worker.js`).catch(() => {
						// Service worker registration error handled silently
					});
				}
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

<svelte:window onkeydown={handleKeydown} />

<a href="#main-content" class="skip-link visually-hidden">Skip to shortcuts</a>

<header class="site-header">
	<div class="container header-inner">
		<!-- Left: Instrument Identity -->
		<div class="brand-group">
			<a href={resolve('/')} class="brand-badge" aria-label="Roland SP-404MKII Cheat Sheet home">
				<img src={asset('icon.svg')} alt="404" width="24" height="24" />
			</a>
			<div class="brand-text">
				<div class="brand-title-row">
					<span class="brand-model">SP-404MKII</span>
					<span class="version-tag">v5.50</span>
				</div>
			</div>
		</div>

		<!-- Center: Recessed Hardware Segmented Control -->
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
				<span>All</span>
				<span class="view-tab__count">101</span>
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
					size={12}
					class={uiStore.viewMode === 'pinned' || pinnedStore.ids.length > 0
						? 'star-icon star-icon--filled'
						: 'star-icon'}
				/>
				<span>My Sheet</span>
				{#if pinnedStore.ids.length > 0}
					<span class="view-tab__count view-tab__count--active">{pinnedStore.ids.length}</span>
				{/if}
			</button>
		</div>

		<!-- Right: Unified Studio Utilities & Status -->
		<div class="header-utilities">
			<!-- Passive offline indicator: only appears if disconnected -->
			{#if !pwaStore.isOnline}
				<div class="status-offline-pill" role="status" aria-label="Offline Mode">
					<WifiOff size={13} />
					<span>Offline</span>
				</div>
			{/if}

			<!-- Studio Hamburger Menu & About Button -->
			<button
				type="button"
				class="studio-tool-btn studio-menu-btn"
				onclick={() => (showAboutModal = true)}
				aria-label="Open Studio Menu and About"
				title="Menu & About"
			>
				<Menu size={16} />
				<span class="btn-label-desktop">Menu</span>
			</button>
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
			<button type="button" class="footer-about-btn" onclick={() => (showAboutModal = true)}>
				About & AI Disclosure
			</button>
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

{#if showAboutModal}
	<div
		class="about-modal-backdrop"
		onclick={(e) => {
			if (e.target === e.currentTarget) showAboutModal = false;
		}}
		role="presentation"
	>
		<div
			class="about-modal-box"
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="about-modal-title"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="about-modal-header">
				<div class="about-modal-title-group">
					<img src={asset('icon.svg')} alt="404" width="28" height="28" class="about-modal-icon" />
					<div>
						<div class="about-modal-title-row">
							<h2 id="about-modal-title" class="about-modal-title">SP-404MKII Companion</h2>
							<span class="about-version-badge">v5.50</span>
						</div>
						<p class="about-modal-subtitle">Interactive Studio Reference & Cheat Sheet</p>
					</div>
				</div>
				<button
					type="button"
					class="about-modal-close"
					onclick={() => (showAboutModal = false)}
					aria-label="Close dialog"
				>
					<X size={18} />
				</button>
			</div>

			<div class="about-modal-body">
				<!-- Studio Utilities -->
				<div class="about-section">
					<h3 class="about-section-heading">Studio Utilities</h3>
					<div class="about-actions-grid">
						<button
							type="button"
							class="about-action-btn"
							onclick={() => {
								showAboutModal = false;
								uiStore.openPrintModal();
							}}
						>
							<Printer size={18} class="about-action-icon" />
							<div class="about-action-text">
								<span class="about-action-title">Print / Export PDF</span>
								<span class="about-action-desc"
									>High-density ink-friendly 1–2 page studio desk reference</span
								>
							</div>
						</button>

						{#if !pwaStore.isInstalled}
							<button
								type="button"
								class="about-action-btn"
								onclick={() => {
									showAboutModal = false;
									pwaStore.promptInstall();
								}}
							>
								<Download size={18} class="about-action-icon" />
								<div class="about-action-text">
									<span class="about-action-title">Install Offline App</span>
									<span class="about-action-desc"
										>Works 100% offline on desktop & mobile for stage gigs</span
									>
								</div>
							</button>
						{/if}
					</div>
				</div>

				<!-- About Project -->
				<div class="about-section">
					<h3 class="about-section-heading">About This Tool</h3>
					<p class="about-text">
						Built for beatmakers and live performers. Preserves 1:1 hardware faceplate muscle memory
						with 101 shortcuts strictly verified with verbatim citations against the official Roland
						SP-404MKII Reference Manual.
					</p>
					<p class="about-text">
						Crafted with <Heart size={13} class="inline-heart" /> by
						<a
							href="https://frstudios.co.ke"
							target="_blank"
							rel="noopener noreferrer"
							class="about-link"
						>
							frstudios
						</a>.
					</p>
				</div>

				<!-- AI Usage Disclosure -->
				<div class="about-section about-section--disclosure">
					<div class="disclosure-header">
						<a
							href="https://0rwx.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="disclosure-badge-link"
							aria-label="0rwx Open AI Disclosure standard"
							title="0rwx.com Open AI Disclosure"
						>
							<img
								src={asset('AI-W-light.svg')}
								alt="0rwx AI Disclosure Badge"
								width="32"
								height="32"
								class="disclosure-badge-img"
							/>
						</a>
						<div class="disclosure-body">
							<div class="disclosure-title-row">
								<h3 class="about-section-heading disclosure-title">AI Usage Disclosure</h3>
								<a
									href="https://0rwx.com/"
									target="_blank"
									rel="noopener noreferrer"
									class="disclosure-sublink"
								>
									<span>0rwx.com</span>
									<ExternalLink size={12} />
								</a>
							</div>
							<p class="about-text disclosure-desc">
								This project adheres to the <strong>0rwx</strong> open disclosure specification. AI coding
								assistants were utilized for architecture design, document ingestion scripts, and CI validation
								pipelines, paired with manual verification against the official Roland v5.50 Reference
								Manual.
							</p>
						</div>
					</div>
				</div>

				<!-- Links & Legal -->
				<div class="about-footer-row">
					<div class="about-links">
						<a
							href="https://github.com/cntrvsy/sp404mk2cheatsheet"
							target="_blank"
							rel="noopener noreferrer"
							class="about-sublink"
						>
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path
									d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
								/>
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
							<span>GitHub Repository</span>
						</a>
						<span class="about-dot">·</span>
						<a
							href="https://github.com/cntrvsy/sp404mk2cheatsheet/blob/main/LICENSE"
							target="_blank"
							rel="noopener noreferrer"
							class="about-sublink"
						>
							MIT License
						</a>
					</div>
					<p class="about-disclaimer">
						Roland and SP-404MKII are registered trademarks of Roland Corporation. This project is
						an independent educational tool not affiliated with or endorsed by Roland.
					</p>
				</div>
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

	/* Top Header Layout & Pro Studio Hardware Bar */
	.site-header {
		background: #0d0f14;
		border-bottom: 1px solid #1c222e;
		padding-block: 0.5rem;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-height: 2.25rem;
	}

	/* Brand & Model Identity */
	.brand-group {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		text-decoration: none;
	}

	.brand-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.85rem;
		height: 1.85rem;
		flex-shrink: 0;
		border-radius: 0.35rem;
		background: #141820;
		border: 1px solid #2a3344;
		text-decoration: none;
		transition: border-color 0.15s ease;
	}

	.brand-badge:hover {
		border-color: #ea580c;
	}
	.brand-title-row {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
	}

	.brand-model {
		font-size: 0.88rem;
		font-weight: 900;
		color: #f1f5f9;
		letter-spacing: 0.04em;
		line-height: 1;
	}

	.version-tag {
		font-size: 0.62rem;
		font-weight: 700;
		color: #94a3b8;
		background: #161b24;
		border: 1px solid #252e3d;
		padding: 0.1rem 0.35rem;
		border-radius: 999px;
		letter-spacing: 0.02em;
		line-height: 1;
	}

	/* Recessed Segmented Hardware Switcher */
	.view-tablist {
		display: inline-flex;
		align-items: center;
		background: #090b0f;
		border: 1px solid #1c222e;
		border-radius: 999px;
		padding: 0.15rem;
		gap: 0.15rem;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.view-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.28rem 0.65rem;
		font-size: 0.74rem;
		font-weight: 700;
		color: #94a3b8;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 999px;
		cursor: pointer;
		line-height: 1;
		transition: all 0.12s ease;
	}

	.view-tab:hover:not(.view-tab--active) {
		color: #e2e8f0;
		background: rgba(255, 255, 255, 0.03);
	}

	.view-tab--active {
		color: #ffffff;
		background: #1c222d;
		border-color: #2e3849;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.view-tab__count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.08rem 0.35rem;
		font-size: 0.64rem;
		font-weight: 800;
		border-radius: 999px;
		background: #12151c;
		color: #94a3b8;
		line-height: 1;
	}

	.view-tab--active .view-tab__count {
		background: #0d0f14;
		color: #cbd5e1;
	}

	.view-tab__count--active {
		background: #ea580c !important;
		color: #ffffff !important;
	}

	/* Studio Utilities */
	.header-utilities {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.status-offline-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.22rem 0.45rem;
		font-size: 0.68rem;
		font-weight: 700;
		border-radius: 999px;
		background: rgba(239, 68, 68, 0.15);
		border: 1px solid rgba(239, 68, 68, 0.4);
		color: #f87171;
		line-height: 1;
	}

	.studio-tool-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.32rem;
		height: 1.95rem;
		padding: 0 0.55rem;
		font-size: 0.74rem;
		font-weight: 700;
		color: #94a3b8;
		background: #13171f;
		border: 1px solid #242c3b;
		border-radius: 0.38rem;
		cursor: pointer;
		text-decoration: none;
		line-height: 1;
		transition: all 0.12s ease;
	}

	.studio-tool-btn:hover {
		color: #ffffff;
		background: #1c222d;
		border-color: #3b4559;
	}

	@media (max-width: 640px) {
		.brand-model {
			display: none;
		}

		.btn-label-desktop {
			display: none;
		}

		.studio-tool-btn {
			width: 1.95rem;
			padding: 0;
		}

		.view-tab {
			padding: 0.26rem 0.5rem;
			font-size: 0.7rem;
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

	.footer-about-btn {
		background: none;
		border: none;
		padding: 0;
		color: #f97316;
		font: inherit;
		cursor: pointer;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.footer-about-btn:hover {
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

	/* About & Studio Menu Modal */
	.about-modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.78);
		backdrop-filter: blur(5px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		z-index: 1000;
	}

	.about-modal-box {
		background: #12151c;
		border: 1px solid #273142;
		border-radius: 0.85rem;
		max-width: 520px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		padding: 1.5rem;
		box-shadow: 0 20px 45px rgba(0, 0, 0, 0.65);
		color: #e2e8f0;
	}

	.about-modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #222938;
	}

	.about-modal-title-group {
		display: flex;
		gap: 0.85rem;
		align-items: center;
	}

	.about-modal-icon {
		flex-shrink: 0;
		border-radius: 0.35rem;
	}

	.about-modal-title-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.about-modal-title {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 800;
		color: #f8fafc;
	}

	.about-version-badge {
		font-size: 0.7rem;
		font-weight: 800;
		color: #ea580c;
		background: rgba(234, 88, 12, 0.12);
		border: 1px solid rgba(234, 88, 12, 0.35);
		padding: 0.12rem 0.45rem;
		border-radius: 0.3rem;
		letter-spacing: 0.04em;
	}

	.about-modal-subtitle {
		margin: 0.2rem 0 0 0;
		font-size: 0.78rem;
		color: #94a3b8;
	}

	.about-modal-close {
		background: transparent;
		border: none;
		color: #94a3b8;
		cursor: pointer;
		padding: 0.3rem;
		border-radius: 0.35rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
	}

	.about-modal-close:hover {
		color: #ffffff;
		background: #1c222e;
	}

	.about-modal-body {
		padding-top: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
	}

	.about-section {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.about-section-heading {
		margin: 0;
		font-size: 0.78rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #fdba74;
	}

	.about-actions-grid {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.about-action-btn {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		background: #171b24;
		border: 1px solid #283344;
		border-radius: 0.55rem;
		padding: 0.75rem 1rem;
		color: #f1f5f9;
		cursor: pointer;
		text-align: left;
		transition: all 0.15s ease;
	}

	.about-action-btn:hover {
		background: #1e2432;
		border-color: #ea580c;
		transform: translateY(-1px);
	}

	:global(.about-action-icon) {
		color: #ea580c;
		flex-shrink: 0;
	}

	.about-action-text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.about-action-title {
		font-size: 0.86rem;
		font-weight: 700;
		color: #ffffff;
	}

	.about-action-desc {
		font-size: 0.74rem;
		color: #94a3b8;
	}

	.about-text {
		margin: 0;
		font-size: 0.82rem;
		line-height: 1.5;
		color: #cbd5e1;
	}

	.about-link {
		color: #f97316;
		text-decoration: underline;
		font-weight: 600;
	}

	.about-link:hover {
		color: #fb923c;
	}

	:global(.inline-heart) {
		display: inline-block;
		vertical-align: middle;
		color: #ef4444;
		fill: #ef4444;
	}

	/* AI Disclosure Card inside modal */
	.about-section--disclosure {
		background: #151922;
		border: 1px solid #252e3e;
		border-radius: 0.6rem;
		padding: 0.9rem 1rem;
	}

	.disclosure-header {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.disclosure-badge-link {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		padding: 0.2rem;
		border-radius: 0.4rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.15s ease;
	}

	.disclosure-badge-link:hover {
		border-color: #ea580c;
		transform: scale(1.05);
	}

	.disclosure-badge-img {
		display: block;
		width: 32px;
		height: 32px;
	}

	.disclosure-body {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.disclosure-title-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.disclosure-title {
		margin: 0;
	}

	.disclosure-sublink {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.72rem;
		color: #f97316;
		text-transform: none;
		letter-spacing: normal;
		text-decoration: none;
		font-weight: 600;
	}

	.disclosure-sublink:hover {
		text-decoration: underline;
	}

	.disclosure-desc {
		font-size: 0.78rem;
		color: #94a3b8;
		line-height: 1.45;
	}

	.about-footer-row {
		border-top: 1px solid #222938;
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.about-links {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.8rem;
	}

	.about-sublink {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: #cbd5e1;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.15s ease;
	}

	.about-sublink:hover {
		color: #ffffff;
		text-decoration: underline;
	}

	.about-dot {
		color: #475569;
	}

	.about-disclaimer {
		margin: 0;
		font-size: 0.72rem;
		color: #64748b;
		line-height: 1.4;
	}

	@media print {
		.site-header,
		.pwa-modal-backdrop,
		.about-modal-backdrop {
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
