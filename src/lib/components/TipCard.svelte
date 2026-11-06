<script lang="ts">
	import { isComboTokenActive, type Tip } from '#lib/types.js';
	import Keycap from './Keycap.svelte';

	interface Props {
		tip: Tip;
		isPinned: boolean;
		isSelected?: boolean;
		activeButtons: string[];
		hideCategoryBadge?: boolean;
		onTogglePin: (id: string) => void;
		onSelectCategory: (category: Tip['category']) => void;
		onSelectTip?: (id: string) => void;
	}

	let {
		tip,
		isPinned,
		isSelected = false,
		activeButtons,
		hideCategoryBadge = false,
		onTogglePin,
		onSelectCategory,
		onSelectTip
	}: Props = $props();

	function isComboPartActive(part: string): boolean {
		return isSelected || isComboTokenActive(part, activeButtons);
	}

	function handleCardClick(e: MouseEvent) {
		const target = e.target as HTMLElement | null;
		if (target?.closest('button, details, summary, a')) return;
		onSelectTip?.(tip.id);
	}

	function handleCardKeydown(e: KeyboardEvent) {
		if (e.target !== e.currentTarget) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSelectTip?.(tip.id);
		}
	}
</script>

<div class="tip-card-container">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<article
		class="tip-card"
		class:tip-card--pinned={isPinned}
		class:tip-card--selected={isSelected}
		tabindex="0"
		aria-label="{tip.action} — click to highlight buttons on faceplate"
		onclick={handleCardClick}
		onkeydown={handleCardKeydown}
	>
		<header class="tip-card__header">
			<div class="tip-card__combo" aria-label="Button combination">
				{#each tip.combo as part, idx (idx)}
					{#if idx > 0}
						<span class="combo-plus" aria-hidden="true">+</span>
					{/if}
					<Keycap label={part} active={isComboPartActive(part)} />
				{/each}
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

		<h3 class="tip-card__action">{tip.action}</h3>

		<p class="tip-card__goal">{tip.goal}</p>

		{#if tip.caveat && isSelected}
			<p class="tip-card__caveat">
				<span class="tip-card__caveat-icon" aria-hidden="true">⚠️</span>
				<span>{tip.caveat}</span>
			</p>
		{/if}

		<div class="tip-card__meta">
			{#if !hideCategoryBadge}
				<button type="button" class="category-badge" onclick={() => onSelectCategory(tip.category)}>
					{tip.category}
				</button>
			{/if}
			<span class="manual-ref-badge" title={tip.citation.quote}>
				Roland v5.50 · p. {tip.citation.page}
			</span>
			{#if tip.caveat && !isSelected}
				<span class="caveat-indicator" title={tip.caveat}>⚠️ Note</span>
			{/if}
			{#if tip.context}
				<span class="context-tag">{tip.context}</span>
			{/if}
		</div>

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
		gap: 0.5rem;
		padding: 0.9rem 0.95rem;
		margin: 0;
		background: #14171e;
		border: 1px solid #242934;
		border-radius: 0.6rem;
		content-visibility: auto;
		contain-intrinsic-block-size: auto 10.5rem;
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease,
			background-color 0.15s ease;
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
		border-color: #384152;
	}

	.tip-card--pinned {
		border-color: #9a3412;
		background: #171920;
	}

	.tip-card--selected {
		border-color: #f97316;
		background: #191d26;
		box-shadow:
			0 0 0 1px rgba(249, 115, 22, 0.45),
			0 6px 18px rgba(234, 88, 12, 0.14);
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

	.tip-card__combo {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
		min-inline-size: 0;
	}

	.combo-plus {
		color: #64748b;
		font-weight: 700;
		font-size: 0.8rem;
	}

	.pin-btn {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		gap: 0.25rem;
		padding: 0.18rem 0.45rem;
		font-size: 0.72rem;
		font-weight: 600;
		color: #64748b;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 0.35rem;
		cursor: pointer;
		margin: 0;
		width: auto;
	}

	.pin-btn:hover:not(:disabled) {
		color: #e2e8f0;
		background: #1e232d;
		border-color: #334155;
	}

	.pin-btn--active {
		color: #fdba74;
		background: rgba(234, 88, 12, 0.16);
		border-color: #ea580c;
	}

	.tip-card__action {
		margin: 0.1rem 0 0;
		font-size: 0.98rem;
		font-weight: 700;
		line-height: 1.35;
		color: #f8fafc;
	}

	.tip-card__goal {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.45;
		color: #94a3b8;
	}

	.tip-card__caveat {
		display: flex;
		align-items: flex-start;
		gap: 0.35rem;
		margin: 0.05rem 0 0;
		padding: 0.35rem 0.5rem;
		font-size: 0.76rem;
		line-height: 1.38;
		color: #fde68a;
		background: rgba(245, 158, 11, 0.08);
		border-inline-start: 2px solid #f59e0b;
		border-radius: 0.25rem;
	}

	.tip-card__caveat-icon {
		flex-shrink: 0;
		font-size: 0.74rem;
		line-height: 1.35;
	}

	.tip-card__meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
		margin-top: 0.15rem;
	}

	.caveat-indicator {
		padding: 0.1rem 0.4rem;
		font-size: 0.64rem;
		font-weight: 600;
		color: #cbd5e1;
		background: #1a1e26;
		border: 1px solid #2e3543;
		border-radius: 0.25rem;
	}

	.manual-ref-badge {
		padding: 0.1rem 0.4rem;
		font-size: 0.65rem;
		font-weight: 600;
		color: #64748b;
		background: #101319;
		border: 1px solid #222731;
		border-radius: 0.25rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
	}

	.category-badge {
		padding: 0.12rem 0.45rem;
		font-size: 0.68rem;
		font-weight: 600;
		color: #94a3b8;
		background: #1b1f28;
		border: 1px solid #2b3240;
		border-radius: 0.25rem;
		cursor: pointer;
		margin: 0;
		width: auto;
	}

	.category-badge:hover:not(:disabled) {
		color: #e2e8f0;
		border-color: #475569;
	}

	.context-tag {
		font-size: 0.72rem;
		color: #64748b;
	}

	.tip-card__steps {
		margin-block-start: auto;
		padding-top: 0.45rem;
		border-top: 1px solid #1f2430;
		font-size: 0.8rem;
	}

	.tip-card__steps summary {
		font-weight: 600;
		color: #94a3b8;
		cursor: pointer;
		margin-bottom: 0.25rem;
	}

	.tip-card__steps summary:hover {
		color: #e2e8f0;
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
