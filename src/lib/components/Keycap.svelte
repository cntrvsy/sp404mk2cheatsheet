<script lang="ts">
	interface Props {
		label: string;
		active?: boolean;
		onclick?: () => void;
	}

	let { label, active = false, onclick }: Props = $props();

	const isEncoder = $derived.by(() => {
		const upper = label.toUpperCase();
		return upper.includes('VALUE') || upper.includes('CTRL') || upper.includes('VOLUME');
	});
</script>

{#if onclick}
	<button
		type="button"
		class="keycap keycap--interactive"
		class:keycap--encoder={isEncoder}
		class:keycap--active={active}
		{onclick}
		aria-pressed={active}
	>
		{label}
	</button>
{:else}
	<kbd class="keycap" class:keycap--encoder={isEncoder} class:keycap--active={active}>
		{label}
	</kbd>
{/if}

<style>
	.keycap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.22rem 0.52rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.2;
		border-radius: 0.3rem;
		background: #1e222b;
		color: #f1f5f9;
		border: 1px solid #363e4d;
		box-shadow: 0 2px 0 #0b0d12;
		max-inline-size: 100%;
		text-align: center;
		margin: 0;
	}

	.keycap--encoder {
		border-radius: 999px;
		padding-inline: 0.6rem;
		background: #1a1e26;
		border-color: #475569;
	}

	.keycap--interactive {
		cursor: pointer;
		transition:
			transform 0.1s ease,
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	.keycap--interactive:hover:not(:disabled) {
		border-color: #94a3b8;
		transform: translateY(-1px);
	}

	/* Active/selected state is the ONLY place bright orange appears on keycaps */
	.keycap--active {
		background: #ea580c;
		color: #ffffff;
		border-color: #fdba74;
		box-shadow: 0 0 0.5rem rgba(249, 115, 22, 0.45);
	}

	@media (pointer: coarse) {
		.keycap--interactive {
			min-block-size: 2rem;
			padding-inline: 0.65rem;
		}
	}

	@media print {
		.keycap {
			background: #f1f5f9 !important;
			color: #0f172a !important;
			border: 1px solid #475569 !important;
			box-shadow: none !important;
		}
	}
</style>
