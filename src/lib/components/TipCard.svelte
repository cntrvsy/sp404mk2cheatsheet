<script lang="ts">
	import { isComboTokenActive, type Tip } from '#lib/types.js';
	import Keycap from './Keycap.svelte';

	interface Props {
		tip: Tip;
		isPinned: boolean;
		activeButtons: string[];
		onTogglePin: (id: string) => void;
		onSelectCategory: (category: Tip['category']) => void;
	}

	let { tip, isPinned, activeButtons, onTogglePin, onSelectCategory }: Props = $props();

	function isComboPartActive(part: string): boolean {
		return isComboTokenActive(part, activeButtons);
	}
</script>

<div class="tip-card-container">
	<article class="tip-card" class:tip-card--pinned={isPinned}>
		<header class="tip-card__header">
			<div class="tip-card__meta">
				<button type="button" class="category-badge" onclick={() => onSelectCategory(tip.category)}>
					{tip.category}
				</button>
				{#if tip.context}
					<span class="context-tag">{tip.context}</span>
				{/if}
			</div>

			<button
				type="button"
				class="pin-btn"
				class:pin-btn--active={isPinned}
				aria-pressed={isPinned}
				aria-label="Pin {tip.action} to My Sheet"
				onclick={() => onTogglePin(tip.id)}
			>
				<span aria-hidden="true">{isPinned ? '★' : '☆'}</span>
				<span class="pin-btn__text">{isPinned ? 'Pinned' : 'Pin'}</span>
			</button>
		</header>

		<div class="tip-card__combo" aria-label="Button combination">
			{#each tip.combo as part, idx (idx)}
				{#if idx > 0}
					<span class="combo-plus" aria-hidden="true">+</span>
				{/if}
				<Keycap label={part} active={isComboPartActive(part)} />
			{/each}
		</div>

		<h3 class="tip-card__action">{tip.action}</h3>

		<p class="tip-card__goal">{tip.goal}</p>

		{#if tip.steps && tip.steps.length > 0}
			<details class="tip-card__steps">
				<summary>Step-by-step ({tip.steps.length} steps)</summary>
				<ol>
					{#each tip.steps as step, sIdx (sIdx)}
						<li>{step}</li>
					{/each}
				</ol>
			</details>
		{/if}
	</article>
</div>

<style>
	.tip-card-container {
		container-type: inline-size;
		container-name: tip-card;
		block-size: 100%;
	}

	.tip-card {
		display: flex;
		flex-direction: column;
		block-size: 100%;
		gap: 0.55rem;
		padding: 0.9rem 0.95rem;
		margin: 0;
		background: #161920;
		border: 1px solid #2a303c;
		border-radius: 0.6rem;
		content-visibility: auto;
		contain-intrinsic-block-size: auto 11rem;
		transition: border-color 0.15s ease;
	}

	@media (min-width: 600px) {
		.tip-card {
			padding: 1rem 1.1rem;
		}
	}

	@supports (container-type: inline-size) {
		@media (min-width: 600px) {
			.tip-card {
				padding: 0.9rem 0.95rem;
			}
		}

		@container tip-card (min-width: 310px) {
			.tip-card {
				padding: 1rem 1.1rem;
			}
		}

		@container tip-card (max-width: 280px) {
			.pin-btn__text {
				display: none;
			}
		}
	}

	.tip-card:hover {
		border-color: #475569;
	}

	.tip-card--pinned {
		border-color: #d97706;
		background: linear-gradient(180deg, rgba(217, 119, 6, 0.08) 0%, #161920 100%);
	}

	.tip-card__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		background: transparent;
		border: 0;
	}

	.tip-card__meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
	}

	.category-badge {
		padding: 0.15rem 0.5rem;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #fdba74;
		background: rgba(234, 88, 12, 0.15);
		border: 1px solid rgba(234, 88, 12, 0.4);
		border-radius: 999px;
		cursor: pointer;
		margin: 0;
		width: auto;
	}

	.category-badge:hover:not(:disabled) {
		background: rgba(234, 88, 12, 0.3);
	}

	.context-tag {
		font-size: 0.73rem;
		color: #94a3b8;
		background: #1e232d;
		padding: 0.12rem 0.45rem;
		border-radius: 0.25rem;
		border: 1px solid #334155;
	}

	.pin-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.2rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #94a3b8;
		background: #1e232d;
		border: 1px solid #334155;
		border-radius: 0.35rem;
		cursor: pointer;
		margin: 0;
		width: auto;
		min-block-size: 1.75rem;
	}

	.pin-btn:hover:not(:disabled) {
		color: #fbbf24;
		border-color: #fbbf24;
	}

	.pin-btn--active {
		color: #fbbf24;
		background: rgba(217, 119, 6, 0.2);
		border-color: #f59e0b;
	}

	.tip-card__combo {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
		margin-block: 0.15rem;
	}

	.combo-plus {
		color: #64748b;
		font-weight: 700;
		font-size: 0.85rem;
	}

	.tip-card__action {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.35;
		color: #f8fafc;
	}

	.tip-card__goal {
		margin: 0;
		font-size: 0.86rem;
		line-height: 1.45;
		color: #cbd5e1;
	}

	.tip-card__steps {
		margin-block-start: auto;
		padding-top: 0.45rem;
		border-top: 1px dashed #2e3646;
		font-size: 0.82rem;
	}

	.tip-card__steps summary {
		font-weight: 600;
		color: #38bdf8;
		cursor: pointer;
		margin-bottom: 0.3rem;
	}

	.tip-card__steps ol {
		margin: 0.35rem 0 0;
		padding-inline-start: 1.25rem;
		color: #cbd5e1;
	}

	.tip-card__steps li {
		margin-bottom: 0.2rem;
	}

	@media (pointer: coarse) {
		.category-badge {
			min-block-size: 1.9rem;
			padding-inline: 0.65rem;
		}

		.pin-btn {
			min-block-size: 2.15rem;
			padding-inline: 0.65rem;
		}
	}

	@media print {
		.tip-card {
			background: #ffffff !important;
			color: #000000 !important;
			border: 1px solid #94a3b8 !important;
			break-inside: avoid;
			padding: 0.6rem !important;
			gap: 0.3rem !important;
		}

		.tip-card__action,
		.tip-card__goal,
		.tip-card__steps ol {
			color: #000000 !important;
		}

		.pin-btn {
			display: none !important;
		}
	}
</style>
