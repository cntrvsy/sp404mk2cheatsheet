<script lang="ts">
	import { tick } from 'svelte';
	import MiniSearch from 'minisearch';
	import rawTips from '#lib/data/tips.json';
	import rawAliases from '#lib/data/aliases.json';
	import {
		CATEGORIES,
		matchesTipButton,
		type Category,
		type Tip,
		type TipAliasesMap,
		type TipTier
	} from '#lib/types.js';
	import Faceplate from '#lib/components/Faceplate.svelte';
	import TipCard from '#lib/components/TipCard.svelte';
	import Keycap from '#lib/components/Keycap.svelte';
	import { pinnedStore } from '#lib/stores/pinned.svelte.js';
	import { uiStore } from '#lib/stores/ui.svelte.js';
	import { Star, Printer, SlidersHorizontal } from '@lucide/svelte';

	const tips = rawTips as Tip[];
	const aliasesMap = rawAliases as TipAliasesMap;

	interface IndexedTip extends Tip {
		aliasesText: string;
		comboText: string;
	}

	const miniSearch = new MiniSearch<IndexedTip>({
		fields: ['action', 'aliasesText', 'comboText', 'goal'],
		storeFields: ['id'],
		searchOptions: {
			combineWith: 'AND',
			boost: {
				action: 4,
				aliasesText: 3.5,
				comboText: 3,
				goal: 1
			},
			prefix: (term) => term.length >= 2,
			fuzzy: (term) => (term.length >= 4 ? 0.2 : false)
		}
	});

	miniSearch.addAll(
		tips.map((t) => ({
			...t,
			aliasesText: (aliasesMap[t.id] ?? []).join(' '),
			comboText: t.combo.join(' ')
		}))
	);

	let searchQuery = $state('');
	let selectedCategory = $state<Category | 'ALL'>('ALL');
	let selectedTier = $state<TipTier | 'ALL'>('ALL');
	let activeButtons = $state<string[]>([]);
	let selectedTipId = $state<string | null>(null);

	const isPinnedView = $derived(uiStore.viewMode === 'pinned');

	const selectedTip = $derived(
		selectedTipId ? (tips.find((t) => t.id === selectedTipId) ?? null) : null
	);

	const filteredTips = $derived.by(() => {
		let list = tips;

		// 1. Search query via MiniSearch (with relative score cutoff to suppress weak prose noise)
		const q = searchQuery.trim();
		if (q.length > 0) {
			const rawResults = miniSearch.search(q);
			const topScore = rawResults[0]?.score ?? 0;
			const results = rawResults.filter((r) => r.score >= topScore * 0.3);
			const matchedIds = new Map(results.map((r, index) => [r.id as string, index]));
			list = list
				.filter((t) => matchedIds.has(t.id))
				.sort((a, b) => (matchedIds.get(a.id) ?? 0) - (matchedIds.get(b.id) ?? 0));
		}

		// 2. Category filter
		if (selectedCategory !== 'ALL') {
			list = list.filter((t) => t.category === selectedCategory);
		}

		// 3. Tier filter (Essentials vs Deep Dive)
		if (selectedTier !== 'ALL') {
			list = list.filter((t) => t.tier === selectedTier);
		}

		// 4. Hardware Faceplate button filter (AND logic across selected buttons, sorted by fewest buttons first)
		if (activeButtons.length > 0) {
			list = list.filter((tip) =>
				activeButtons.every((selectedBtn) => matchesTipButton(tip.buttons, selectedBtn))
			);
			if (q.length === 0) {
				list = [...list].sort((a, b) => a.buttons.length - b.buttons.length);
			}
		}

		// 5. Pinned ("My Sheet") filter
		if (isPinnedView) {
			list = list.filter((t) => pinnedStore.has(t.id));
		}

		return list;
	});

	const isGroupedByCategory = $derived(
		selectedCategory === 'ALL' &&
			searchQuery.trim().length === 0 &&
			activeButtons.length === 0 &&
			!isPinnedView
	);

	const groupedSections = $derived.by(() => {
		return CATEGORIES.map((category) => ({
			category,
			items: filteredTips.filter((t) => t.category === category)
		})).filter((group) => group.items.length > 0);
	});

	function toggleHardwareButton(btnId: string) {
		selectedTipId = null;
		if (activeButtons.includes(btnId)) {
			activeButtons = activeButtons.filter((b) => b !== btnId);
		} else {
			activeButtons = [...activeButtons, btnId];
		}
	}

	function toggleSelectTip(tipId: string) {
		if (selectedTipId === tipId) {
			selectedTipId = null;
		} else {
			selectedTipId = tipId;
			uiStore.showFaceplate = true;
		}
	}

	function clearAllFilters() {
		searchQuery = '';
		selectedCategory = 'ALL';
		selectedTier = 'ALL';
		activeButtons = [];
		selectedTipId = null;
		uiStore.setViewMode('all');
	}

	async function printMySheet() {
		uiStore.closePrintModal();
		uiStore.setViewMode('pinned');
		searchQuery = '';
		activeButtons = [];
		selectedCategory = 'ALL';
		selectedTier = 'ALL';
		await tick();
		executePrint();
	}

	async function printCurrentView() {
		uiStore.closePrintModal();
		await tick();
		executePrint();
	}

	function executePrint() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}

	function handleClearPinned() {
		if (typeof window !== 'undefined' && pinnedStore.ids.length > 0) {
			const ok = window.confirm(
				`Remove all ${pinnedStore.ids.length} shortcuts from your custom sheet?`
			);
			if (ok) {
				pinnedStore.clear();
			}
		}
	}

	const hasActiveFilters = $derived(
		searchQuery.trim().length > 0 ||
			selectedCategory !== 'ALL' ||
			selectedTier !== 'ALL' ||
			activeButtons.length > 0 ||
			isPinnedView
	);
</script>

<main id="main-content" class="container main-layout" tabindex="-1">
	<!-- Dedicated "My Studio Sheet" Builder Banner when in Pinned Mode -->
	{#if isPinnedView}
		<section class="mysheet-banner" aria-labelledby="mysheet-banner-title">
			<div class="mysheet-banner__content">
				<div class="mysheet-banner__header">
					<Star size={24} class="mysheet-banner__badge star-icon--filled" />
					<div>
						<h2 id="mysheet-banner-title" class="mysheet-banner__title">
							My Custom Studio Sheet ({pinnedStore.ids.length}
							{pinnedStore.ids.length === 1 ? 'shortcut' : 'shortcuts'})
						</h2>
						<p class="mysheet-banner__subtitle">
							Your curated studio desk reference. Click <strong>Pinned</strong> on any card to remove
							it, or print a clean 1–2 page PDF for your gear setup.
						</p>
					</div>
				</div>

				<div class="mysheet-banner__actions">
					<button
						type="button"
						class="mysheet-btn mysheet-btn--primary"
						disabled={pinnedStore.ids.length === 0}
						onclick={executePrint}
					>
						<Printer size={15} />
						<span>Print / Save as PDF</span>
					</button>

					{#if pinnedStore.ids.length > 0}
						<button
							type="button"
							class="mysheet-btn mysheet-btn--danger"
							onclick={handleClearPinned}
						>
							Clear All
						</button>
					{/if}

					<button
						type="button"
						class="mysheet-btn mysheet-btn--secondary"
						onclick={() => uiStore.setViewMode('all')}
					>
						← Back to All 101 Shortcuts
					</button>
				</div>
			</div>
		</section>
	{/if}

	<!-- Search & Category Tabs Bar -->
	<search class="search-panel" aria-label="Filter shortcuts by intent, category, or button">
		<div class="search-input-row">
			<label for="shortcut-search" class="visually-hidden">
				Search shortcuts by goal, button, or community slang
			</label>
			<input
				id="shortcut-search"
				type="search"
				placeholder="Search shortcuts (e.g. 'stems', 'choke', 'one shot', 'tr-rec', 'dj mode')..."
				bind:value={searchQuery}
				autocomplete="off"
			/>
			{#if hasActiveFilters}
				<button type="button" class="reset-btn" onclick={clearAllFilters}> Reset Filters </button>
			{/if}

			<button
				type="button"
				class="faceplate-toggle-btn"
				class:faceplate-toggle-btn--active={uiStore.showFaceplate}
				onclick={() => uiStore.toggleFaceplate()}
				aria-pressed={uiStore.showFaceplate}
				aria-label={uiStore.showFaceplate ? 'Hide hardware faceplate' : 'Show hardware faceplate'}
			>
				<SlidersHorizontal size={14} />
				<span>{uiStore.showFaceplate ? 'Hide Faceplate' : 'Show Faceplate'}</span>
			</button>
		</div>

		<!-- Category Filter Tabs -->
		<div class="category-bar" role="group" aria-label="Filter by workflow category">
			<button
				type="button"
				class="cat-pill"
				class:cat-pill--active={selectedCategory === 'ALL'}
				aria-pressed={selectedCategory === 'ALL'}
				onclick={() => (selectedCategory = 'ALL')}
			>
				All ({tips.length})
			</button>
			{#each CATEGORIES as cat (cat)}
				<button
					type="button"
					class="cat-pill"
					class:cat-pill--active={selectedCategory === cat}
					aria-pressed={selectedCategory === cat}
					onclick={() => (selectedCategory = selectedCategory === cat ? 'ALL' : cat)}
				>
					{cat}
				</button>
			{/each}
		</div>

		<!-- Active Hardware Button Filter Bar -->
		{#if activeButtons.length > 0}
			<div class="active-hw-bar">
				<span class="active-hw-bar__label">Hardware filter:</span>
				<div class="active-hw-bar__chips">
					{#each activeButtons as btn (btn)}
						<Keycap label="{btn} ✕" active={true} onclick={() => toggleHardwareButton(btn)} />
					{/each}
				</div>
				<button type="button" class="clear-hw-link" onclick={() => (activeButtons = [])}>
					Clear buttons
				</button>
			</div>
		{/if}
	</search>

	<!-- Dedicated Print-Only Sheet Header -->
	<div class="print-sheet-header" aria-hidden="true">
		<h1 class="print-sheet-header__title">
			{#if isPinnedView}
				ROLAND SP-404MKII — CUSTOM STUDIO CHEAT SHEET
			{:else if selectedCategory !== 'ALL'}
				ROLAND SP-404MKII — {selectedCategory} CHEAT SHEET
			{:else}
				ROLAND SP-404MKII — MASTER WORKFLOW CHEAT SHEET
			{/if}
		</h1>
		<div class="print-sheet-header__meta">
			<span>Firmware v5.50</span>
			<span>•</span>
			<span>{filteredTips.length} Shortcuts</span>
			<span>•</span>
			<span>Verified Roland Hardware Spec</span>
			<span>•</span>
			<span>frstudios.co.ke</span>
		</div>
	</div>

	<!-- Dedicated Studio Paper Quick Reference Table (Print Only) -->
	<div class="print-sheet-table" aria-hidden="true">
		<table class="studio-paper-table">
			<thead>
				<tr>
					<th scope="col" class="paper-col-combo">Hardware Keys</th>
					<th scope="col" class="paper-col-action">Action & Purpose</th>
					<th scope="col" class="paper-col-note">Hardware Note / Caveat</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredTips as tip (tip.id)}
					<tr>
						<td class="paper-cell-combo">
							<span class="paper-combo-text">{tip.combo.join(' + ')}</span>
						</td>
						<td class="paper-cell-action">
							<div class="paper-action-title">{tip.action}</div>
							<div class="paper-action-goal">{tip.goal}</div>
						</td>
						<td class="paper-cell-note">
							{#if tip.caveat}
								<div class="paper-note-text">
									<strong>NOTE:</strong>
									{tip.caveat}
								</div>
							{:else}
								<span class="paper-note-empty">—</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Workspace Split: Interactive Faceplate + Shortcut Cards (Web View) -->
	<div class="workspace" class:workspace--with-panel={uiStore.showFaceplate}>
		{#if uiStore.showFaceplate}
			<aside class="workspace__panel" aria-label="SP-404MKII Hardware Controller Filter">
				<Faceplate
					{activeButtons}
					{selectedTip}
					matchCount={filteredTips.length}
					onToggleButton={toggleHardwareButton}
					onClearButtons={() => (activeButtons = [])}
					onClearSelectedTip={() => (selectedTipId = null)}
				/>
				<div class="mobile-panel-bar">
					<a href="#results-heading" class="mobile-jump-link">
						View {filteredTips.length}
						{filteredTips.length === 1 ? 'Shortcut' : 'Shortcuts'} ↓
					</a>
					<button
						type="button"
						class="mobile-hide-btn"
						onclick={() => (uiStore.showFaceplate = false)}
					>
						Hide Faceplate
					</button>
				</div>
			</aside>
		{/if}

		<section class="workspace__results" aria-labelledby="results-heading">
			<div class="results-header">
				<h2 id="results-heading" class="results-title">
					{#if isPinnedView}
						My Pinned Cheat Sheet ({filteredTips.length})
					{:else if selectedCategory !== 'ALL'}
						{selectedCategory} ({filteredTips.length})
					{:else if hasActiveFilters}
						Matching Shortcuts ({filteredTips.length})
					{:else}
						All Workflows ({filteredTips.length} shortcuts)
					{/if}
				</h2>

				<div class="results-header__controls">
					<div class="tier-segmented" role="group" aria-label="Filter by shortcut depth">
						<button
							type="button"
							class="tier-seg-btn"
							class:tier-seg-btn--active={selectedTier === 'ALL'}
							aria-pressed={selectedTier === 'ALL'}
							onclick={() => (selectedTier = 'ALL')}
						>
							All
						</button>
						<button
							type="button"
							class="tier-seg-btn"
							class:tier-seg-btn--active={selectedTier === 'essential'}
							aria-pressed={selectedTier === 'essential'}
							onclick={() => (selectedTier = 'essential')}
						>
							Essentials
						</button>
						<button
							type="button"
							class="tier-seg-btn"
							class:tier-seg-btn--active={selectedTier === 'deep-dive'}
							aria-pressed={selectedTier === 'deep-dive'}
							onclick={() => (selectedTier = 'deep-dive')}
						>
							Deep Dive
						</button>
					</div>

					{#if isPinnedView && pinnedStore.ids.length > 0}
						<button type="button" class="unpin-all-btn" onclick={handleClearPinned}>
							Clear Pinned
						</button>
					{/if}
				</div>
			</div>

			{#if filteredTips.length === 0}
				<div class="empty-state">
					<h3>No matching shortcuts found</h3>
					<p>
						{#if isPinnedView && pinnedStore.ids.length === 0}
							Your studio sheet is currently empty. Click the <strong>Pin</strong> button on any card
							in the cheat sheet to pin your favorite shortcuts here, then print or export a clean 1-page
							PDF for your desk!
						{:else}
							Try removing one of the selected faceplate buttons or broadening your search term.
						{/if}
					</p>
					{#if isPinnedView && pinnedStore.ids.length === 0}
						<button
							type="button"
							class="tool-btn tool-btn--accent"
							onclick={() => uiStore.setViewMode('all')}
						>
							Browse All 101 Shortcuts
						</button>
					{:else}
						<button type="button" class="tool-btn" onclick={clearAllFilters}>
							Reset Filters
						</button>
					{/if}
				</div>
			{:else if isGroupedByCategory}
				<div class="category-sections">
					{#each groupedSections as section (section.category)}
						<section class="category-group" aria-labelledby="cat-{section.category}">
							<div class="category-group__header">
								<h3 id="cat-{section.category}" class="category-group__title">
									{section.category}
								</h3>
								<span class="category-group__count">{section.items.length}</span>
							</div>
							<ul class="tips-grid" role="list">
								{#each section.items as tip (tip.id)}
									<li>
										<TipCard
											{tip}
											isPinned={pinnedStore.has(tip.id)}
											isSelected={selectedTipId === tip.id}
											{activeButtons}
											hideCategoryBadge={true}
											onTogglePin={(id) => pinnedStore.toggle(id)}
											onSelectTip={toggleSelectTip}
											onSelectCategory={(cat) => {
												selectedCategory = selectedCategory === cat ? 'ALL' : cat;
											}}
										/>
									</li>
								{/each}
							</ul>
						</section>
					{/each}
				</div>
			{:else}
				<ul class="tips-grid" role="list">
					{#each filteredTips as tip (tip.id)}
						<li>
							<TipCard
								{tip}
								isPinned={pinnedStore.has(tip.id)}
								isSelected={selectedTipId === tip.id}
								{activeButtons}
								hideCategoryBadge={selectedCategory !== 'ALL'}
								onTogglePin={(id) => pinnedStore.toggle(id)}
								onSelectTip={toggleSelectTip}
								onSelectCategory={(cat) => {
									selectedCategory = selectedCategory === cat ? 'ALL' : cat;
								}}
							/>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</div>
</main>

{#if uiStore.showPrintModal}
	<div
		class="modal-backdrop"
		onclick={() => uiStore.closePrintModal()}
		onkeydown={(e) => e.key === 'Escape' && uiStore.closePrintModal()}
		role="presentation"
	>
		<div
			class="modal-box"
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="print-modal-title"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<h3 id="print-modal-title" class="modal-title">Print / Export to PDF</h3>
			<p class="modal-desc">
				You have <strong>{pinnedStore.ids.length}</strong> shortcuts pinned to your custom studio sheet.
				Which view would you like to print?
			</p>

			<div class="modal-actions">
				<button type="button" class="modal-btn modal-btn--primary" onclick={printMySheet}>
					<span class="modal-btn__main">
						<Star size={16} class="star-icon--filled" />
						<span>Print My Pinned Sheet ({pinnedStore.ids.length} shortcuts)</span>
					</span>
					<span class="modal-btn__sub">Recommended: Clean 1–2 page studio desk reference</span>
				</button>

				<button type="button" class="modal-btn modal-btn--secondary" onclick={printCurrentView}>
					<span class="modal-btn__main">
						<Printer size={16} />
						<span>Print Current View ({filteredTips.length} shortcuts)</span>
					</span>
					<span class="modal-btn__sub">Prints all matching cards in your current filter</span>
				</button>

				<button type="button" class="modal-cancel-btn" onclick={() => uiStore.closePrintModal()}>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.faceplate-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.52rem 0.85rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #cbd5e1;
		background: #171b22;
		border: 1px solid #2e3748;
		border-radius: 0.45rem;
		cursor: pointer;
		white-space: nowrap;
		transition: all 0.15s ease;
	}

	.faceplate-toggle-btn:hover {
		color: #ffffff;
		background: #1e2430;
		border-color: #475569;
	}

	.faceplate-toggle-btn--active {
		background: rgba(234, 88, 12, 0.14);
		border-color: #ea580c;
		color: #fdba74;
	}

	.main-layout {
		padding-block: 1rem 3rem;
	}

	/* Search & Category Tabs Section */
	.search-panel {
		container-type: inline-size;
		container-name: search-panel;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		padding: clamp(0.75rem, 2vw, 0.95rem);
		margin-bottom: 1.25rem;
		background: #13161c;
		border: 1px solid #222731;
		border-radius: 0.7rem;
	}

	.search-input-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: safe center;
	}

	.search-input-row input[type='search'] {
		margin: 0;
		flex: 1 1 200px;
		min-inline-size: 0;
		padding: 0.62rem 0.9rem;
		background: #0b0d12;
		border: 1px solid #2b3240;
		border-radius: 0.45rem;
		color: #f8fafc;
		font-size: 0.92rem;
	}

	.search-input-row input[type='search']::placeholder {
		color: #64748b;
	}

	.reset-btn {
		padding: 0.48rem 0.85rem;
		font-size: 0.78rem;
		font-weight: 700;
		background: #1e232d;
		border: 1px solid #384152;
		color: #f8fafc;
		border-radius: 0.38rem;
		cursor: pointer;
		margin: 0;
		width: auto;
		white-space: nowrap;
	}

	.category-bar {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scrollbar-width: thin;
		gap: 0.38rem;
		padding-bottom: 0.15rem;
	}

	.cat-pill {
		flex-shrink: 0;
		padding: 0.28rem 0.65rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #94a3b8;
		background: #181c24;
		border: 1px solid #262c38;
		border-radius: 0.35rem;
		cursor: pointer;
		margin: 0;
		width: auto;
		white-space: nowrap;
	}

	.cat-pill:hover:not(:disabled) {
		color: #f1f5f9;
		border-color: #475569;
	}

	.cat-pill--active {
		color: #ffffff;
		background: #ea580c;
		border-color: #fb923c;
	}

	/* Fallback media query for wider screens */
	@media (min-width: 640px) {
		.category-bar {
			flex-wrap: wrap;
			overflow-x: visible;
			padding-bottom: 0;
		}
	}

	/* Size-aware container query override */
	@supports (container-type: inline-size) {
		@media (min-width: 640px) {
			.category-bar {
				flex-wrap: nowrap;
				overflow-x: auto;
			}
		}

		@container search-panel (min-width: 560px) {
			.category-bar {
				flex-wrap: wrap;
				overflow-x: visible;
				padding-bottom: 0;
			}
		}
	}

	.active-hw-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: safe center;
		gap: 0.5rem;
		padding: 0.45rem 0.7rem;
		background: rgba(234, 88, 12, 0.08);
		border: 1px solid rgba(234, 88, 12, 0.3);
		border-radius: 0.42rem;
	}

	.active-hw-bar__label {
		font-size: 0.75rem;
		font-weight: 700;
		color: #fdba74;
	}

	.active-hw-bar__chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		min-inline-size: 0;
	}

	.clear-hw-link {
		margin-inline-start: auto;
		padding: 0.15rem 0.5rem;
		font-size: 0.72rem;
		font-weight: 600;
		background: transparent;
		border: 1px solid #ea580c;
		color: #fdba74;
		border-radius: 0.3rem;
		cursor: pointer;
		width: auto;
	}

	/* Split Workspace */
	.workspace {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.5rem;
		align-items: start;
	}

	.workspace__panel,
	.workspace__results {
		min-inline-size: 0;
	}

	.mobile-panel-bar {
		display: flex;
		align-items: safe center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 0.65rem;
		padding: 0.55rem 0.75rem;
		background: #13161c;
		border: 1px solid #262c38;
		border-radius: 0.55rem;
	}

	.mobile-jump-link {
		font-size: 0.78rem;
		font-weight: 700;
		color: #fdba74;
		text-decoration: none;
	}

	.mobile-jump-link:hover {
		text-decoration: underline;
	}

	.mobile-hide-btn {
		padding: 0.25rem 0.65rem;
		font-size: 0.74rem;
		font-weight: 600;
		color: #cbd5e1;
		background: #1c2029;
		border: 1px solid #2e3543;
		border-radius: 0.35rem;
		cursor: pointer;
		margin: 0;
		width: auto;
	}

	@media (min-width: 860px) {
		.workspace--with-panel {
			grid-template-columns: minmax(340px, 390px) minmax(0, 1fr);
		}

		.workspace__panel {
			position: sticky;
			top: 4.5rem;
		}

		.mobile-panel-bar {
			display: none;
		}
	}

	@media (min-width: 1120px) {
		.workspace--with-panel {
			grid-template-columns: 430px minmax(0, 1fr);
		}
	}

	.results-header {
		display: flex;
		flex-wrap: wrap;
		align-items: safe center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.85rem;
		scroll-margin-top: 5rem;
	}

	.results-title {
		margin: 0;
		font-size: 1rem;
		font-weight: 800;
		color: #cbd5e1;
	}

	.results-header__controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.tier-segmented {
		display: inline-flex;
		align-items: center;
		padding: 0.14rem;
		background: #13161c;
		border: 1px solid #262c38;
		border-radius: 0.42rem;
		gap: 0.12rem;
	}

	.tier-seg-btn {
		padding: 0.18rem 0.55rem;
		font-size: 0.72rem;
		font-weight: 700;
		color: #94a3b8;
		background: transparent;
		border: 0;
		border-radius: 0.3rem;
		cursor: pointer;
		margin: 0;
		transition:
			color 0.12s ease,
			background-color 0.12s ease;
	}

	.tier-seg-btn:hover:not(:disabled) {
		color: #e2e8f0;
	}

	.tier-seg-btn--active {
		background: #232834;
		color: #fdba74;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
	}

	.unpin-all-btn {
		padding: 0.2rem 0.6rem;
		font-size: 0.74rem;
		background: transparent;
		border: 1px solid #384152;
		color: #94a3b8;
		border-radius: 0.3rem;
		cursor: pointer;
		margin: 0;
		width: auto;
	}

	/* Categorized Sections for Unfiltered Default View */
	.category-sections {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.category-group {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.category-group__header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid #1f2430;
	}

	.category-group__title {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		color: #f1f5f9;
	}

	.category-group__count {
		font-size: 0.7rem;
		font-weight: 700;
		color: #94a3b8;
		background: #181c24;
		border: 1px solid #262c38;
		padding: 0.08rem 0.45rem;
		border-radius: 999px;
	}

	.tips-grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
		gap: 0.8rem;
	}

	.tips-grid li {
		list-style: none;
		margin: 0;
		display: grid;
	}

	.empty-state {
		text-align: center;
		padding: 2.5rem 1.25rem;
		background: #13161c;
		border: 1px dashed #2e3543;
		border-radius: 0.7rem;
	}

	.empty-state h3 {
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		color: #94a3b8;
		max-width: 45ch;
		margin-inline: auto;
	}

	@media (pointer: coarse) {
		.tool-btn {
			min-block-size: 2.35rem;
			padding-inline: 0.75rem;
		}

		.cat-pill {
			min-block-size: 2.15rem;
			padding-inline: 0.75rem;
		}

		.reset-btn,
		.clear-hw-link,
		.mobile-hide-btn {
			min-block-size: 2.25rem;
		}
	}

	/* Print & Paper Studio Sheet Styles */
	@media print {
		.search-panel,
		.workspace,
		.unpin-all-btn,
		.results-header,
		.mysheet-banner,
		.modal-backdrop,
		.empty-state {
			display: none !important;
		}

		.print-sheet-header {
			display: block !important;
			padding-bottom: 0.6rem;
			margin-bottom: 0.8rem;
			border-bottom: 2px solid #000;
		}

		.print-sheet-header__title {
			font-size: 1.2rem;
			font-weight: 900;
			color: #000;
			text-transform: uppercase;
			letter-spacing: -0.01em;
			margin-bottom: 0.2rem;
		}

		.print-sheet-header__meta {
			display: flex;
			gap: 0.5rem;
			font-size: 0.76rem;
			color: #333;
		}

		.print-sheet-table {
			display: block !important;
			width: 100% !important;
		}

		.studio-paper-table {
			width: 100% !important;
			border-collapse: collapse !important;
			font-size: 0.74rem !important;
			color: #000 !important;
			line-height: 1.35 !important;
		}

		.studio-paper-table th {
			background: #e2e8f0 !important;
			color: #0f172a !important;
			font-weight: 800 !important;
			text-transform: uppercase !important;
			font-size: 0.68rem !important;
			letter-spacing: 0.04em !important;
			padding: 0.35rem 0.5rem !important;
			border: 1px solid #94a3b8 !important;
			text-align: left !important;
		}

		.studio-paper-table td {
			padding: 0.38rem 0.5rem !important;
			border: 1px solid #cbd5e1 !important;
			vertical-align: top !important;
		}

		.studio-paper-table tr {
			break-inside: avoid !important;
			page-break-inside: avoid !important;
		}

		.studio-paper-table tr:nth-child(even) {
			background: #f8fafc !important;
		}

		.paper-col-combo {
			width: 25% !important;
		}

		.paper-col-action {
			width: 45% !important;
		}

		.paper-col-note {
			width: 30% !important;
		}

		.paper-combo-text {
			font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace !important;
			font-weight: 800 !important;
			font-size: 0.76rem !important;
			color: #000 !important;
			display: inline-block !important;
		}

		.paper-action-title {
			font-weight: 700 !important;
			color: #000 !important;
			margin-bottom: 0.1rem !important;
		}

		.paper-action-goal {
			color: #334155 !important;
			font-size: 0.72rem !important;
		}

		.paper-note-text {
			font-size: 0.7rem !important;
			color: #451a03 !important;
			background: #fffbeb !important;
			padding: 0.15rem 0.35rem !important;
			border-radius: 0.2rem !important;
			border-left: 2px solid #b45309 !important;
		}

		.paper-note-empty {
			color: #94a3b8 !important;
		}
	}

	.print-sheet-header,
	.print-sheet-table {
		display: none;
	}

	/* My Studio Sheet Builder Banner */
	.mysheet-banner {
		background: linear-gradient(135deg, rgba(234, 88, 12, 0.12), rgba(30, 41, 59, 0.5));
		border: 1px solid rgba(234, 88, 12, 0.35);
		border-radius: 0.75rem;
		padding: 1.15rem 1.35rem;
		margin-bottom: 1.25rem;
	}

	.mysheet-banner__content {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.mysheet-banner__header {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
	}

	:global(.mysheet-banner__badge) {
		color: #f97316;
		flex-shrink: 0;
	}

	.mysheet-banner__title {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
		font-weight: 800;
		color: #f8fafc;
	}

	.mysheet-banner__subtitle {
		margin: 0;
		font-size: 0.82rem;
		color: #cbd5e1;
		line-height: 1.45;
	}

	.mysheet-banner__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
		padding-top: 0.25rem;
	}

	.mysheet-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.45rem 0.9rem;
		font-size: 0.82rem;
		font-weight: 600;
		border-radius: 0.45rem;
		cursor: pointer;
		text-decoration: none;
		border: 1px solid transparent;
		transition: all 0.15s ease;
	}

	.mysheet-btn--primary {
		background: #ea580c;
		border-color: #f97316;
		color: #ffffff;
		font-weight: 700;
	}

	.mysheet-btn--primary:hover:not(:disabled) {
		background: #f97316;
	}

	.mysheet-btn--primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.mysheet-btn--danger {
		background: rgba(239, 68, 68, 0.12);
		border-color: rgba(239, 68, 68, 0.3);
		color: #fca5a5;
	}

	.mysheet-btn--danger:hover {
		background: rgba(239, 68, 68, 0.25);
		color: #fecaca;
	}

	.mysheet-btn--secondary {
		background: #171b22;
		border-color: #334155;
		color: #cbd5e1;
	}

	.mysheet-btn--secondary:hover {
		background: #1e2430;
		color: #f8fafc;
	}

	/* Print Choice Modal */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.modal-box {
		background: #13171f;
		border: 1px solid #2e384d;
		border-radius: 0.85rem;
		max-width: 480px;
		width: 100%;
		padding: 1.5rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
	}

	.modal-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.15rem;
		font-weight: 800;
		color: #f8fafc;
	}

	.modal-desc {
		margin: 0 0 1.25rem 0;
		font-size: 0.85rem;
		color: #94a3b8;
		line-height: 1.45;
	}

	.modal-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.modal-btn {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		padding: 0.75rem 1rem;
		border-radius: 0.55rem;
		cursor: pointer;
		border: 1px solid transparent;
		transition: all 0.15s ease;
	}

	.modal-btn__main {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.modal-btn__sub {
		font-size: 0.75rem;
		opacity: 0.8;
		margin-top: 0.15rem;
	}

	.modal-btn--primary {
		background: rgba(234, 88, 12, 0.15);
		border-color: #ea580c;
		color: #ffedd5;
	}

	.modal-btn--primary:hover {
		background: rgba(234, 88, 12, 0.25);
		border-color: #f97316;
	}

	.modal-btn--secondary {
		background: #1a202c;
		border-color: #334155;
		color: #e2e8f0;
	}

	.modal-btn--secondary:hover {
		background: #222b3b;
		border-color: #475569;
	}

	.modal-cancel-btn {
		background: transparent;
		border: none;
		color: #64748b;
		font-size: 0.8rem;
		cursor: pointer;
		padding: 0.4rem;
		align-self: center;
		margin-top: 0.25rem;
	}

	.modal-cancel-btn:hover {
		color: #94a3b8;
		text-decoration: underline;
	}
</style>
