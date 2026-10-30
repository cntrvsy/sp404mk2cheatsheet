<script lang="ts">
	import '@picocss/pico/css/pico.min.css';
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
		--pico-font-size: 100%;
		--pico-background-color: #0d0f13;
		--pico-card-background-color: #161920;
		--pico-primary: #f97316;
		--pico-primary-hover: #ea580c;
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
			--pico-background-color: #ffffff;
		}

		:global(body) {
			background: #ffffff !important;
			color: #000000 !important;
		}
	}
</style>
