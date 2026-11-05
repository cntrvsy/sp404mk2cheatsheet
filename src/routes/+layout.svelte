<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SP-404MKII Interactive Cheat Sheet & Button Lookup</title>
	<meta
		name="description"
		content="Fast interactive lookup table and hardware button filter for Roland SP-404MKII shortcuts, hidden combos, and workflow tips."
	/>
</svelte:head>

<a href="#main-content" class="skip-link visually-hidden">Skip to shortcuts</a>

{@render children()}

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

	@media print {
		:global(:root) {
			color-scheme: light;
		}

		:global(body) {
			background: #ffffff !important;
			color: #000000 !important;
		}
	}
</style>
