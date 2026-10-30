<script lang="ts">
	interface Props {
		label: string;
		active?: boolean;
		onclick?: () => void;
	}

	let { label, active = false, onclick }: Props = $props();

	const variant = $derived.by(() => {
		const upper = label.toUpperCase();
		if (upper.includes('SHIFT')) return 'shift';
		if (upper.includes('REMAIN')) return 'remain';
		if (
			/\bDEL\b/.test(upper) ||
			(/\bREC\b/.test(upper) && !upper.includes('RECORD SETTING') && !upper.includes('TR-REC'))
		) {
			return 'rec';
		}
		if (upper.includes('VALUE') || upper.includes('CTRL') || upper.includes('VOLUME')) {
			return 'encoder';
		}
		if (/\bPAD\b/.test(upper) && !upper.includes('SUB PAD')) return 'pad';
		return 'default';
	});
</script>

{#if onclick}
	<button
		type="button"
		class="keycap keycap--interactive keycap--{variant}"
		class:keycap--active={active}
		{onclick}
		aria-pressed={active}
	>
		{label}
	</button>
{:else}
	<kbd class="keycap keycap--{variant}" class:keycap--active={active}>
		{label}
	</kbd>
{/if}

<style>
	.keycap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem 0.5rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		line-height: 1.2;
		border-radius: 0.28rem;
		background: #23262d;
		color: #f1f5f9;
		border: 1px solid #475569;
		box-shadow: 0 2px 0 #0f172a;
		max-inline-size: 100%;
		text-align: center;
		margin: 0;
	}

	@media (pointer: coarse) {
		.keycap--interactive {
			min-block-size: 2rem;
			padding-inline: 0.65rem;
		}
	}

	.keycap--interactive {
		cursor: pointer;
		transition:
			transform 0.1s ease,
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	.keycap--interactive:hover:not(:disabled) {
		border-color: #f97316;
		transform: translateY(-1px);
	}

	.keycap--shift {
		background: #3b2f13;
		color: #fbbf24;
		border-color: #d97706;
	}

	.keycap--remain {
		background: #2e2336;
		color: #f3e8ff;
		border-color: #a855f7;
	}

	.keycap--rec {
		background: #3b1c1c;
		color: #fecaca;
		border-color: #ef4444;
	}

	.keycap--encoder {
		background: #1e293b;
		color: #38bdf8;
		border-color: #0284c7;
		border-radius: 999px;
	}

	.keycap--pad {
		background: #2c221e;
		color: #fed7aa;
		border-color: #ea580c;
	}

	.keycap--active {
		background: #ea580c;
		color: #ffffff;
		border-color: #fdba74;
		box-shadow: 0 0 0.5rem rgba(249, 115, 22, 0.5);
	}
</style>
