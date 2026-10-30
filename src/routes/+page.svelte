<script lang="ts">
	import MiniSearch from 'minisearch';
	import rawTips from '#lib/data/tips.json';
	import { CATEGORIES, matchesTipButton, type Category, type Tip } from '#lib/types.js';
	import Faceplate from '#lib/components/Faceplate.svelte';
	import TipCard from '#lib/components/TipCard.svelte';
	import Keycap from '#lib/components/Keycap.svelte';
	import { pinnedStore } from '#lib/stores/pinned.svelte.js';

	const tips = rawTips as Tip[];

	interface IndexedTip extends Tip {
		aliasesText: string;
		comboText: string;
	}

	const miniSearch = new MiniSearch<IndexedTip>({
		fields: ['action', 'aliasesText', 'comboText', 'goal', 'context', 'category'],
		storeFields: ['id'],
		searchOptions: {
			boost: {
				action: 3,
				aliasesText: 3,
				comboText: 2.5,
				goal: 1.5,
				context: 1
			},
			prefix: true,
			fuzzy: 0.2
		}
	});

	miniSearch.addAll(
		tips.map((t) => ({
			...t,
			aliasesText: t.aliases.join(' '),
			comboText: t.combo.join(' ')
		}))
	);

	let searchQuery = $state('');
	let selectedCategory = $state<Category | 'ALL'>('ALL');
	let activeButtons = $state<string[]>([]);
	let showOnlyPinned = $state(false);
	let showFaceplate = $state(true);

	const filteredTips = $derived.by(() => {
		let list = tips;

		// 1. Search query via MiniSearch
		const q = searchQuery.trim();
		if (q.length > 0) {
			const results = miniSearch.search(q);
			const matchedIds = new Map(results.map((r, index) => [r.id as string, index]));
			list = list
				.filter((t) => matchedIds.has(t.id))
				.sort((a, b) => (matchedIds.get(a.id) ?? 0) - (matchedIds.get(b.id) ?? 0));
		}

		// 2. Category filter
		if (selectedCategory !== 'ALL') {
			list = list.filter((t) => t.category === selectedCategory);
		}

		// 3. Hardware Faceplate button filter (AND logic across selected buttons)
		if (activeButtons.length > 0) {
			list = list.filter((tip) =>
				activeButtons.every((selectedBtn) => matchesTipButton(tip.buttons, selectedBtn))
			);
		}

		// 4. Pinned ("My Sheet") filter
		if (showOnlyPinned) {
			list = list.filter((t) => pinnedStore.has(t.id));
		}

		return list;
	});

	const isGroupedByCategory = $derived(
		selectedCategory === 'ALL' &&
			searchQuery.trim().length === 0 &&
			activeButtons.length === 0 &&
			!showOnlyPinned
	);

	const groupedSections = $derived.by(() => {
		return CATEGORIES.map((category) => ({
			category,
			items: filteredTips.filter((t) => t.category === category)
		})).filter((group) => group.items.length > 0);
	});

	function toggleHardwareButton(btnId: string) {
		if (activeButtons.includes(btnId)) {
			activeButtons = activeButtons.filter((b) => b !== btnId);
		} else {
			activeButtons = [...activeButtons, btnId];
		}
	}

	function clearAllFilters() {
		searchQuery = '';
		selectedCategory = 'ALL';
		activeButtons = [];
		showOnlyPinned = false;
	}

	function handlePrint() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}

	const hasActiveFilters = $derived(
		searchQuery.trim().length > 0 ||
			selectedCategory !== 'ALL' ||
			activeButtons.length > 0 ||
			showOnlyPinned
	);
</script>

<header class="site-header">
	<div class="container header-inner">
		<div class="brand-group">
			<div class="brand-badge" aria-hidden="true">404</div>
			<div>
				<h1 class="site-title">SP-404MKII Cheat Sheet</h1>
				<p class="site-subtitle">
					Search by goal, pick a workflow tab, or click a button on the hardware to filter
				</p>
			</div>
		</div>

		<nav class="header-actions" aria-label="Sheet tools">
			<button
				type="button"
				class="tool-btn"
				class:tool-btn--active={showFaceplate}
				aria-pressed={showFaceplate}
				onclick={() => (showFaceplate = !showFaceplate)}
			>
				{showFaceplate ? 'Hide Faceplate' : 'Show Faceplate'}
			</button>

			<button
				type="button"
				class="tool-btn"
				class:tool-btn--active={showOnlyPinned}
				aria-pressed={showOnlyPinned}
				onclick={() => (showOnlyPinned = !showOnlyPinned)}
			>
				<span aria-hidden="true">{showOnlyPinned ? '★' : '☆'}</span>
				<span>My Sheet ({pinnedStore.ids.length})</span>
			</button>

			<button type="button" class="tool-btn" onclick={handlePrint}>Print / PDF</button>

			<a
				href="https://github.com/cntrvsy/sp404mk2cheatsheet/issues/new?template=new-tip.yml"
				target="_blank"
				rel="noopener noreferrer"
				class="tool-btn"
			>
				+ Suggest Tip
			</a>
		</nav>
	</div>
</header>

<main id="main-content" class="container main-layout" tabindex="-1">
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

	<!-- Workspace Split: Interactive Faceplate + Shortcut Cards -->
	<div class="workspace" class:workspace--with-panel={showFaceplate}>
		{#if showFaceplate}
			<aside class="workspace__panel" aria-label="SP-404MKII Hardware Controller Filter">
				<Faceplate
					{activeButtons}
					matchCount={filteredTips.length}
					onToggleButton={toggleHardwareButton}
					onClearButtons={() => (activeButtons = [])}
				/>
				<div class="mobile-panel-bar">
					<a href="#results-heading" class="mobile-jump-link">
						View {filteredTips.length}
						{filteredTips.length === 1 ? 'Shortcut' : 'Shortcuts'} ↓
					</a>
					<button type="button" class="mobile-hide-btn" onclick={() => (showFaceplate = false)}>
						Hide Faceplate
					</button>
				</div>
			</aside>
		{/if}

		<section class="workspace__results" aria-labelledby="results-heading">
			<div class="results-header">
				<h2 id="results-heading" class="results-title">
					{#if showOnlyPinned}
						My Pinned Cheat Sheet ({filteredTips.length})
					{:else if selectedCategory !== 'ALL'}
						{selectedCategory} ({filteredTips.length})
					{:else if hasActiveFilters}
						Matching Shortcuts ({filteredTips.length})
					{:else}
						All Workflows ({filteredTips.length} shortcuts)
					{/if}
				</h2>

				{#if showOnlyPinned && pinnedStore.ids.length > 0}
					<button type="button" class="unpin-all-btn" onclick={() => pinnedStore.clear()}>
						Clear Pinned
					</button>
				{/if}
			</div>

			{#if filteredTips.length === 0}
				<div class="empty-state">
					<h3>No matching shortcuts found</h3>
					<p>
						{#if showOnlyPinned && pinnedStore.ids.length === 0}
							You haven't pinned any shortcuts yet. Click the <strong>☆ Pin</strong> button on any card
							to build your personal 1-page cheat sheet!
						{:else}
							Try removing one of the selected faceplate buttons or broadening your search term.
						{/if}
					</p>
					<button type="button" class="tool-btn" onclick={clearAllFilters}> Reset Filters </button>
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
											{activeButtons}
											hideCategoryBadge={true}
											onTogglePin={(id) => pinnedStore.toggle(id)}
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
								{activeButtons}
								hideCategoryBadge={selectedCategory !== 'ALL'}
								onTogglePin={(id) => pinnedStore.toggle(id)}
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

<style>
	.site-header {
		container-type: inline-size;
		container-name: site-header;
		background: #0f1218;
		border-bottom: 1px solid #222731;
		padding-block: 0.65rem;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.header-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: safe center;
		justify-content: space-between;
		gap: 0.65rem 1rem;
	}

	.brand-group {
		display: flex;
		align-items: safe center;
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
		font-size: clamp(1rem, 2.5vw, 1.18rem);
		font-weight: 800;
		color: #f8fafc;
		line-height: 1.2;
	}

	@supports (font-size: 1cqi) {
		.site-title {
			font-size: clamp(1rem, 2.1cqi, 1.18rem);
		}
	}

	.site-subtitle {
		margin: 0;
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.header-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: safe center;
		gap: 0.4rem;
	}

	.tool-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.36rem 0.7rem;
		font-size: 0.76rem;
		font-weight: 600;
		color: #cbd5e1;
		background: #171b22;
		border: 1px solid #2b3240;
		border-radius: 0.38rem;
		text-decoration: none;
		cursor: pointer;
		margin: 0;
		width: auto;
		white-space: nowrap;
	}

	.tool-btn:hover:not(:disabled) {
		border-color: #475569;
		color: #f8fafc;
		background: #1e232d;
	}

	.tool-btn--active {
		background: rgba(234, 88, 12, 0.16);
		border-color: #ea580c;
		color: #fdba74;
	}

	@media (max-width: 640px) {
		.site-subtitle {
			display: none;
		}
	}

	@supports (container-type: inline-size) {
		@container site-header (max-width: 620px) {
			.site-subtitle {
				display: none;
			}
		}
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
		background: #0b0d12;
		border-color: #2b3240;
		font-size: 0.92rem;
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

	@media print {
		.site-header,
		.search-panel,
		.workspace__panel,
		.unpin-all-btn {
			display: none !important;
		}

		.workspace {
			display: block !important;
		}

		.tips-grid {
			grid-template-columns: 1fr 1fr !important;
			gap: 0.5rem !important;
		}
	}
</style>
