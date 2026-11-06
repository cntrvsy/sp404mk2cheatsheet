<script lang="ts">
	/**
	 * @file Faceplate.svelte
	 * @description Interactive Hardware Faceplate Controller & Visualizer
	 *
	 * This component renders the physical instrument chassis and manages the bidirectional
	 * hardware interaction:
	 * 1. Hardware -> Cards (Active Filter): Clicking any knob, button, bank, or pad toggles
	 *    its ID in `activeButtons`. The cards list filters in real-time to shortcuts that use it.
	 * 2. Card -> Hardware (Inspector Highlight): Clicking a shortcut card sets `selectedTip`.
	 *    The faceplate lights up the exact button combination and displays the combo in the
	 *    circular OLED display.
	 * 3. Spatial Muscle Memory: The faceplate maintains a 1:1 physical layout across all screen
	 *    sizes (including phone viewports), with an optional `Thumb Zoom` toggle for thumb tapping.
	 *
	 * Adapting for Another Hardware Sampler (e.g. SP-303 or SP-404SX):
	 * - Update the button data arrays (`topKnobs`, `leftFx`, `rightFx`, `fnRow1`, `pads`, etc.)
	 *   to match the physical buttons and labels of the target machine.
	 * - Update the pad grid dimensions (e.g. 2x4 for SP-303, 3x4 for SP-404SX, 4x4 for MKII).
	 * - Replace or restyle the circular OLED display with the target device's screen (e.g. vintage
	 *   orange 3-digit 7-segment LED for SP-303/404SX).
	 */
	import type { Tip } from '#lib/types.js';

	interface Props {
		activeButtons: string[];
		selectedTip?: Tip | null;
		matchCount: number;
		onToggleButton: (buttonId: string) => void;
		onClearButtons: () => void;
		onClearSelectedTip?: () => void;
	}

	let {
		activeButtons,
		selectedTip = null,
		matchCount,
		onToggleButton,
		onClearButtons,
		onClearSelectedTip
	}: Props = $props();

	const highlightedButtons = $derived(selectedTip ? selectedTip.buttons : activeButtons);

	const isShiftActive = $derived(highlightedButtons.includes('SHIFT'));
	const isAnyPadActive = $derived(highlightedButtons.includes('PAD'));
	const isDjModeActive = $derived(
		highlightedButtons.includes('BANK D/I') && highlightedButtons.includes('BANK E/J')
	);

	let isThumbZoom = $state(false);

	// Zone 1 (Top): 4 Rotary Knobs (VOLUME, CTRL 1, CTRL 2, CTRL 3)
	const topKnobs = [
		{ id: 'VOLUME', label: 'VOLUME', sub: 'MIN / MAX' },
		{ id: 'CTRL 1', label: 'CTRL 1', sub: 'CUTOFF' },
		{ id: 'CTRL 2', label: 'CTRL 2', sub: 'RESONANCE' },
		{ id: 'CTRL 3', label: 'CTRL 3', sub: 'DRIVE' }
	];

	// Zone 2 (Upper-Mid): 6 Direct FX Buttons flanking the Circular Display
	const leftFx = [
		{ id: 'FILTER+DRIVE', label: 'FILTER +DRIVE', pos: 'top' },
		{ id: 'RESONATOR', label: 'RESONATOR', pos: 'mid' },
		{ id: 'DELAY', label: 'DELAY', pos: 'bot' }
	];

	const rightFx = [
		{ id: 'ISOLATOR', label: 'ISOLATOR', pos: 'top' },
		{ id: 'DJFX LOOPER', label: 'DJFX LOOPER', pos: 'mid' },
		{ id: 'MFX', label: 'MFX', pos: 'bot' }
	];

	// Zone 3 (Middle): 3 Function Rows + VALUE (PUSH ENTER) Encoder
	const patternSeqGroup = [
		{ id: 'PATTERN SELECT', label: 'PATTERN SELECT', sub: 'UNDO' },
		{ id: 'PATTERN EDIT', label: 'PATTERN EDIT', sub: 'MICROSCOPE' },
		{ id: 'RECORD SETTING', label: 'RECORD SETTING', sub: 'SOUND GEN' }
	];

	const sampleEditGroup = [
		{ id: 'START/END', label: 'START/ END', sub: 'CHOP' },
		{ id: 'PITCH/SPEED', label: 'PITCH/ SPEED', sub: 'ENVELOPE' },
		{ id: 'MARK', label: 'MARK', sub: 'SAVE EFX' }
	];

	const row2Sampling = [
		{ id: 'DEL', label: 'DEL', sub: 'ERASE' },
		{ id: 'REC', label: 'REC', sub: 'TR-REC' },
		{ id: 'RESAMPLE', label: 'RESAMPLE', sub: 'MERGE' }
	];

	const row2SampleMode = [
		{ id: 'BPM SYNC', label: 'BPM SYNC', sub: 'SYNC ALL' },
		{ id: 'GATE', label: 'GATE', sub: 'ALL GATE' },
		{ id: 'LOOP', label: 'LOOP', sub: 'PING-PONG' },
		{ id: 'REVERSE', label: 'REVERSE', sub: 'PAD MUTE' },
		{ id: 'ROLL', label: 'ROLL', sub: 'ROLL SET' }
	];

	const row3Left = [
		{ id: 'EXIT', label: 'EXIT', sub: 'STOP ALL' },
		{ id: 'COPY', label: 'COPY', sub: 'PROTECT' },
		{ id: 'REMAIN', label: 'REMAIN', sub: 'LIVE MODE' }
	];

	const bankButtons = [
		{ id: 'BANK A/F', label: 'A/F', dj: false },
		{ id: 'BANK B/G', label: 'B/G', dj: false },
		{ id: 'BANK C/H', label: 'C/H', dj: false },
		{ id: 'BANK D/I', label: 'D/I', dj: true },
		{ id: 'BANK E/J', label: 'E/J', dj: true }
	];

	// Zone 4 (Bottom): 4x4 Performance Pads + Right Vertical 4-Button Column
	const pads = [
		{ id: 'PAD 1', num: '1', dj: 'BEND+', shift: 'FIXED VELOCITY' },
		{ id: 'PAD 2', num: '2', dj: 'BPM+', shift: '16 VELOCITY' },
		{ id: 'PAD 3', num: '3', dj: 'BEND+', shift: 'CUE' },
		{ id: 'PAD 4', num: '4', dj: 'BPM+', shift: 'CHROMATIC' },
		{ id: 'PAD 5', num: '5', dj: 'BEND-', shift: 'EXCHANGE' },
		{ id: 'PAD 6', num: '6', dj: 'BPM-', shift: 'INIT PARAM' },
		{ id: 'PAD 7', num: '7', dj: 'BEND-', shift: 'PAD LINK' },
		{ id: 'PAD 8', num: '8', dj: 'BPM-', shift: 'MUTE GROUPS' },
		{ id: 'PAD 9', num: '9', dj: '|<<', shift: 'METRONOME' },
		{ id: 'PAD 10', num: '10', dj: 'SYNC', shift: 'COUNT-IN' },
		{ id: 'PAD 11', num: '11', dj: '|<<', shift: 'TAP TEMPO' },
		{ id: 'PAD 12', num: '12', dj: 'SYNC', shift: 'GAIN' },
		{ id: 'PAD 13', num: '13', dj: '▶/⏸', shift: 'UTILITY' },
		{ id: 'PAD 14', num: '14', dj: 'CUE', shift: 'IMPORT/EXPORT' },
		{ id: 'PAD 15', num: '15', dj: '▶/⏸', shift: 'PAD SETTING' },
		{ id: 'PAD 16', num: '16', dj: 'CUE', shift: 'EFX SETTING' }
	];

	const rightPadColumn = [
		{ id: 'BUS FX', label: 'BUS FX', sub: 'MUTE BUS' },
		{ id: 'HOLD', label: 'HOLD', sub: 'PAUSE' },
		{ id: 'EXT SOURCE', label: 'EXT SOURCE', sub: 'INPUT SETTING' },
		{ id: 'SUB PAD', label: 'SUB PAD', sub: 'PROJECT' }
	];

	function isSelected(id: string): boolean {
		if (highlightedButtons.includes(id)) return true;
		if (id.startsWith('BANK ') && highlightedButtons.includes('BANK')) return true;
		return false;
	}
</script>

<section
	class="faceplate"
	class:faceplate--shift={isShiftActive}
	class:faceplate--dj={isDjModeActive}
	class:faceplate--thumb-zoom={isThumbZoom}
	aria-label="Interactive SP-404MKII Hardware Panel"
>
	<div class="faceplate__branding">
		<div class="brand-identity">
			<span class="brand-roland">Roland</span>
			<span class="brand-model">SP-404MKII</span>
		</div>
		<button
			type="button"
			class="layout-mode-btn"
			class:layout-mode-btn--active={isThumbZoom}
			aria-pressed={isThumbZoom}
			onclick={() => (isThumbZoom = !isThumbZoom)}
			title={isThumbZoom
				? 'Return to 1:1 hardware layout'
				: 'Expand middle section for easier thumb tapping'}
		>
			{isThumbZoom ? '1:1 Hardware' : 'Thumbs Mode'}
		</button>
	</div>

	<!-- Zone 1 (Top): 4 Rotary Knobs (VOLUME, CTRL 1, CTRL 2, CTRL 3) -->
	<div class="zone-knobs" role="group" aria-label="Top Parameter Knobs">
		{#each topKnobs as knob (knob.id)}
			<button
				type="button"
				class="hw-knob"
				class:hw-knob--active={isSelected(knob.id)}
				aria-pressed={isSelected(knob.id)}
				onclick={() => onToggleButton(knob.id)}
			>
				<span class="hw-knob__label">{knob.label}</span>
				<svg class="hw-knob__dial" viewBox="0 0 48 48" aria-hidden="true">
					<circle cx="24" cy="24" r="20" class="dial-outer" />
					<circle cx="24" cy="24" r="14" class="dial-inner" />
					<line x1="24" y1="6" x2="24" y2="16" class="dial-pointer" />
				</svg>
				<span class="hw-knob__sub">{knob.sub}</span>
			</button>
		{/each}
	</div>

	<!-- Zone 2 (Upper-Mid): Left FX + Circular OLED Display Bezel + Right FX -->
	<div class="zone-fx-display">
		<div class="fx-column fx-column--left" role="group" aria-label="Left Direct FX">
			{#each leftFx as btn (btn.id)}
				<button
					type="button"
					class="hw-btn hw-btn--fx hw-btn--fx-{btn.pos}"
					class:hw-btn--active={isSelected(btn.id)}
					aria-pressed={isSelected(btn.id)}
					onclick={() => onToggleButton(btn.id)}
				>
					<span class="hw-btn__led" aria-hidden="true"></span>
					<span class="hw-btn__label">{btn.label}</span>
				</button>
			{/each}
		</div>

		<!-- Circular Bezel housing the OLED Screen -->
		<div class="oled-bezel">
			<div class="oled-screen" role="status" aria-live="polite">
				<div class="oled-screen__topbar">
					<span>{selectedTip ? 'CARD PREVIEW' : 'OLED'}</span>
					<span>
						{#if selectedTip}
							{selectedTip.category.toUpperCase()}
						{:else}
							{matchCount} {matchCount === 1 ? 'MATCH' : 'MATCHES'}
						{/if}
					</span>
				</div>
				<div class="oled-screen__main">
					{#if selectedTip}
						<div class="oled-preview">
							<div class="oled-combo">{selectedTip.combo.join(' + ')}</div>
							<div class="oled-action">{selectedTip.action}</div>
						</div>
					{:else if activeButtons.length > 0}
						<div class="oled-combo">
							{activeButtons.join(' + ')}
						</div>
					{:else}
						<div class="oled-idle">CLICK BUTTON OR CARD TO HIGHLIGHT</div>
					{/if}
				</div>
				<div class="oled-screen__footer">
					{#if selectedTip}
						<button type="button" class="oled-clear-btn" onclick={onClearSelectedTip}>
							Clear card preview
						</button>
					{:else if activeButtons.length > 0}
						<button type="button" class="oled-clear-btn" onclick={onClearButtons}>
							Clear selection
						</button>
					{:else}
						<span>CLICK SHIFT TO REVEAL SUB-LABELS</span>
					{/if}
				</div>
			</div>
		</div>

		<div class="fx-column fx-column--right" role="group" aria-label="Right Direct FX">
			{#each rightFx as btn (btn.id)}
				<button
					type="button"
					class="hw-btn hw-btn--fx hw-btn--fx-{btn.pos}"
					class:hw-btn--active={isSelected(btn.id)}
					aria-pressed={isSelected(btn.id)}
					onclick={() => onToggleButton(btn.id)}
				>
					<span class="hw-btn__led" aria-hidden="true"></span>
					<span class="hw-btn__label">{btn.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Zone 3 (Middle): 3 Function Rows + VALUE (PUSH ENTER) Encoder -->
	<div class="zone-functions">
		<!-- Row 1: PATTERN SEQUENCER (3) + SAMPLE EDIT (3) + VALUE Encoder (1) -->
		<div class="fn-row-1">
			<div class="fn-group">
				<span class="fn-group__title">PATTERN SEQUENCER</span>
				<div class="fn-group__grid fn-group__grid--3">
					{#each patternSeqGroup as btn (btn.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect"
							class:hw-btn--active={isSelected(btn.id)}
							aria-pressed={isSelected(btn.id)}
							onclick={() => onToggleButton(btn.id)}
						>
							<span class="hw-btn__label">{btn.label}</span>
							{#if btn.sub}
								<span class="hw-btn__shift">{btn.sub}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="fn-group">
				<span class="fn-group__title">SAMPLE EDIT</span>
				<div class="fn-group__grid fn-group__grid--3">
					{#each sampleEditGroup as btn (btn.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect"
							class:hw-btn--active={isSelected(btn.id)}
							aria-pressed={isSelected(btn.id)}
							onclick={() => onToggleButton(btn.id)}
						>
							<span class="hw-btn__label">{btn.label}</span>
							{#if btn.sub}
								<span class="hw-btn__shift">{btn.sub}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- #6 VALUE (PUSH ENTER) Rotary Encoder on the right of Row 1 -->
			<div class="fn-group fn-group--encoder">
				<span class="fn-group__title">PUSH ENTER</span>
				<button
					type="button"
					class="hw-knob hw-knob--encoder"
					class:hw-knob--active={isSelected('VALUE')}
					aria-pressed={isSelected('VALUE')}
					onclick={() => onToggleButton('VALUE')}
				>
					<svg class="hw-knob__dial hw-knob__dial--encoder" viewBox="0 0 48 48" aria-hidden="true">
						<circle cx="24" cy="24" r="20" class="dial-outer" />
						<circle cx="24" cy="24" r="14" class="dial-inner" />
						<circle cx="24" cy="24" r="4.5" class="dial-center" />
					</svg>
					<span class="hw-knob__label">VALUE</span>
				</button>
			</div>
		</div>

		<!-- Row 2: DEL + SAMPLING (REC, RESAMPLE) | BPM SYNC, GATE, LOOP, REVERSE, ROLL (SAMPLE MODE) -->
		<div class="fn-row-2">
			<div class="fn-group">
				<div class="fn-group__title-split" aria-hidden="true">
					<span></span>
					<span class="fn-group__title fn-group__title--sampling">SAMPLING</span>
				</div>
				<div class="fn-group__grid fn-group__grid--3">
					{#each row2Sampling as btn (btn.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect"
							class:hw-btn--active={isSelected(btn.id)}
							aria-pressed={isSelected(btn.id)}
							onclick={() => onToggleButton(btn.id)}
						>
							<span class="hw-btn__label">{btn.label}</span>
							{#if btn.sub}
								<span class="hw-btn__shift">{btn.sub}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="fn-group">
				<span class="fn-group__title fn-group__title--right">SAMPLE MODE</span>
				<div class="fn-group__grid fn-group__grid--5">
					{#each row2SampleMode as btn (btn.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect"
							class:hw-btn--active={isSelected(btn.id)}
							aria-pressed={isSelected(btn.id)}
							onclick={() => onToggleButton(btn.id)}
						>
							<span class="hw-btn__label">{btn.label}</span>
							{#if btn.sub}
								<span class="hw-btn__shift">{btn.sub}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Row 3: EXIT, COPY, REMAIN | BANK (A/F, B/G, C/H, D/I, E/J) | SHIFT -->
		<div class="fn-row-3">
			<div class="fn-group">
				<span class="fn-group__title" aria-hidden="true">&nbsp;</span>
				<div class="fn-group__grid fn-group__grid--3">
					{#each row3Left as btn (btn.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect"
							class:hw-btn--active={isSelected(btn.id)}
							aria-pressed={isSelected(btn.id)}
							onclick={() => onToggleButton(btn.id)}
						>
							<span class="hw-btn__label">{btn.label}</span>
							{#if btn.sub}
								<span class="hw-btn__shift">{btn.sub}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="fn-group">
				<div class="fn-group__title-bank">
					<span class="fn-group__title">BANK</span>
					<span class="fn-group__dj-tag" class:fn-group__dj-tag--active={isDjModeActive}>
						┌─ DJ (D/I + E/J) ─┐
					</span>
				</div>
				<div class="fn-group__grid fn-group__grid--6">
					{#each bankButtons as bank (bank.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect hw-btn--bank"
							class:hw-btn--active={isSelected(bank.id)}
							aria-pressed={isSelected(bank.id)}
							aria-label="Bank {bank.label}"
							onclick={() => onToggleButton(bank.id)}
						>
							<span class="hw-btn__label">{bank.label}</span>
							<span class="hw-btn__shift">VOL</span>
						</button>
					{/each}

					<button
						type="button"
						class="hw-btn hw-btn--rect hw-btn--shift-key"
						class:hw-btn--active={isSelected('SHIFT')}
						aria-pressed={isSelected('SHIFT')}
						onclick={() => onToggleButton('SHIFT')}
					>
						<span class="hw-btn__label">SHIFT</span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Zone 4 (Bottom): 4x4 Performance Pads + Right Vertical Column (BUS FX, HOLD, EXT SOURCE, SUB PAD) -->
	<div class="zone-bottom-header">
		<div class="dj-channel-brackets" aria-hidden="true">
			<span class="dj-bracket" class:dj-bracket--active={isDjModeActive}>┌──── CH1 ────┐</span>
			<span class="dj-bracket" class:dj-bracket--active={isDjModeActive}>┌──── CH2 ────┐</span>
		</div>
		<button
			type="button"
			class="any-pad-btn"
			class:any-pad-btn--active={isSelected('PAD')}
			aria-pressed={isSelected('PAD')}
			onclick={() => onToggleButton('PAD')}
		>
			Any [PAD]
		</button>
	</div>

	<div class="zone-bottom-matrix">
		<!-- Left: 4x4 Performance Pads [1]–[16] -->
		<div class="zone-pads" role="group" aria-label="Performance Pads 1 to 16">
			{#each pads as pad (pad.id)}
				<button
					type="button"
					class="hw-pad"
					class:hw-pad--active={isSelected(pad.id)}
					class:hw-pad--any-active={isAnyPadActive && !isSelected(pad.id)}
					aria-pressed={isSelected(pad.id)}
					onclick={() => onToggleButton(pad.id)}
				>
					<div class="hw-pad__top">
						<span class="hw-pad__num">{pad.num}</span>
						<span class="hw-pad__dj">{pad.dj}</span>
					</div>
					<span class="hw-pad__shift">{pad.shift}</span>
				</button>
			{/each}
		</div>

		<!-- Right Vertical Column: BUS FX, HOLD, EXT SOURCE, SUB PAD -->
		<div class="zone-pad-side-col" role="group" aria-label="Bus FX, Hold, Ext Source, and Sub Pad">
			{#each rightPadColumn as btn (btn.id)}
				<button
					type="button"
					class="hw-btn hw-btn--side"
					class:hw-btn--active={isSelected(btn.id)}
					aria-pressed={isSelected(btn.id)}
					onclick={() => onToggleButton(btn.id)}
				>
					<span class="hw-btn__label">{btn.label}</span>
					<span class="hw-btn__shift">{btn.sub}</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	.faceplate {
		container-type: inline-size;
		container-name: faceplate;
		inline-size: 100%;
		display: flex;
		flex-direction: column;
		gap: clamp(0.45rem, 1.8vw, 0.65rem);
		padding: clamp(0.45rem, 2.2vw, 1rem);
		background: #13161c;
		border: 1px solid #262b36;
		border-radius: 0.85rem;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
		user-select: none;
	}

	@supports (font-size: 1cqi) {
		.faceplate {
			padding: clamp(0.42rem, 2.4cqi, 1rem);
		}
	}

	.faceplate__branding {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.35rem 0.5rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid #222731;
	}

	.brand-identity {
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
	}

	.brand-roland {
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: #94a3b8;
		text-transform: uppercase;
	}

	.brand-model {
		font-size: 0.86rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		color: #e2e8f0;
	}

	.layout-mode-btn {
		padding: 0.16rem 0.5rem;
		font-size: 0.56rem;
		font-weight: 700;
		color: #94a3b8;
		background: #1a1e26;
		border: 1px solid #2e3543;
		border-radius: 999px;
		cursor: pointer;
		margin: 0;
		line-height: 1.2;
		transition:
			color 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	.layout-mode-btn:hover:not(:disabled) {
		color: #e2e8f0;
		border-color: #64748b;
	}

	.layout-mode-btn--active {
		background: rgba(234, 88, 12, 0.18);
		color: #fdba74;
		border-color: #f97316;
	}

	/* Zone 1 (Top): 4 Knobs (VOLUME, CTRL 1, CTRL 2, CTRL 3) */
	.zone-knobs {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.35rem;
		padding: 0.4rem 0.45rem;
		background: #0f1116;
		border-radius: 0.5rem;
		border: 1px solid #1e222b;
	}

	.hw-knob {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.12rem;
		padding: 0.25rem 0.15rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 0.45rem;
		cursor: pointer;
		margin: 0;
		color: #cbd5e1;
		min-inline-size: 0;
	}

	.hw-knob:hover:not(:disabled) {
		background: #1a1e26;
		border-color: #363e4d;
	}

	.hw-knob--active {
		background: rgba(234, 88, 12, 0.18);
		border-color: #f97316;
		color: #ffffff;
	}

	.hw-knob__dial {
		width: clamp(1.85rem, 5.5vw, 2.25rem);
		height: clamp(1.85rem, 5.5vw, 2.25rem);
	}

	.hw-knob__dial--encoder {
		width: clamp(1.75rem, 5vw, 2.1rem);
		height: clamp(1.75rem, 5vw, 2.1rem);
	}

	@supports (font-size: 1cqi) {
		.hw-knob__dial {
			width: clamp(1.85rem, 5.8cqi, 2.25rem);
			height: clamp(1.85rem, 5.8cqi, 2.25rem);
		}

		.hw-knob__dial--encoder {
			width: clamp(1.75rem, 5.2cqi, 2.1rem);
			height: clamp(1.75rem, 5.2cqi, 2.1rem);
		}
	}

	.dial-outer {
		fill: #1b1f28;
		stroke: #475569;
		stroke-width: 2;
	}

	.hw-knob--encoder .dial-outer {
		stroke: #64748b;
		stroke-dasharray: 3 2;
	}

	.hw-knob--active .dial-outer {
		stroke: #f97316;
		fill: #2c1d11;
	}

	.dial-inner {
		fill: #101318;
		stroke: #2e3644;
		stroke-width: 1.5;
	}

	.dial-pointer {
		stroke: #e2e8f0;
		stroke-width: 2.2;
		stroke-linecap: round;
	}

	.dial-center {
		fill: #94a3b8;
	}

	.hw-knob--active .dial-center {
		fill: #fdba74;
	}

	.hw-knob__label {
		font-size: 0.62rem;
		font-weight: 800;
		color: inherit;
		line-height: 1.1;
	}

	.hw-knob__sub {
		font-size: 0.5rem;
		color: #64748b;
		text-align: center;
		line-height: 1.1;
	}

	/* Zone 2 (Upper-Mid): Direct FX + Circular OLED Display Bezel (1:1 Hardware Geometry by default) */
	.zone-fx-display {
		display: grid;
		grid-template-columns: 1fr 1.38fr 1fr;
		gap: clamp(0.25rem, 1.4cqi, 0.45rem);
		align-items: center;
	}

	.fx-column {
		display: flex;
		flex-direction: column;
		gap: clamp(0.24rem, 1.2cqi, 0.35rem);
		min-inline-size: 0;
	}

	.fx-column--left .hw-btn--fx-top,
	.fx-column--left .hw-btn--fx-bot {
		margin-inline-end: -0.15rem;
	}

	.fx-column--right .hw-btn--fx-top,
	.fx-column--right .hw-btn--fx-bot {
		margin-inline-start: -0.15rem;
	}

	.oled-bezel {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(0.38rem, 2cqi, 0.7rem);
		background: #0f1117;
		border: 1.5px solid #262b36;
		border-radius: 999px;
		aspect-ratio: 1.05 / 1;
	}

	.oled-screen {
		inline-size: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.45rem 0.55rem;
		background: #07090d;
		border: 1px solid #2b3240;
		border-radius: 0.4rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
		color: #f8fafc;
	}

	.oled-screen__topbar {
		display: flex;
		justify-content: space-between;
		font-size: 0.58rem;
		font-weight: 700;
		color: #94a3b8;
		border-bottom: 1px solid #191e28;
		padding-bottom: 0.16rem;
	}

	.oled-screen__main {
		display: flex;
		align-items: safe center;
		justify-content: center;
		text-align: center;
		min-block-size: 2rem;
		padding-block: 0.18rem;
	}

	.oled-preview {
		display: flex;
		flex-direction: column;
		gap: 0.14rem;
		align-items: center;
	}

	.oled-combo {
		font-size: 0.7rem;
		font-weight: 800;
		color: #fdba74;
		letter-spacing: 0.03em;
		overflow-wrap: anywhere;
	}

	.oled-action {
		font-size: 0.54rem;
		font-weight: 600;
		color: #cbd5e1;
		line-height: 1.25;
		max-inline-size: 24ch;
	}

	.oled-idle {
		font-size: 0.62rem;
		color: #64748b;
	}

	.oled-screen__footer {
		display: flex;
		justify-content: center;
		font-size: 0.54rem;
		color: #64748b;
		border-top: 1px solid #191e28;
		padding-top: 0.16rem;
	}

	.oled-clear-btn {
		padding: 0.12rem 0.45rem;
		font-family: inherit;
		font-size: 0.6rem;
		font-weight: 700;
		color: #fdba74;
		background: rgba(234, 88, 12, 0.15);
		border: 1px solid #ea580c;
		border-radius: 0.2rem;
		cursor: pointer;
		margin: 0;
		width: auto;
	}

	/* Zone 3 (Middle): 3 Function Rows + VALUE Encoder (1:1 Hardware Geometry by default) */
	.zone-functions {
		display: flex;
		flex-direction: column;
		gap: clamp(0.32rem, 1.4cqi, 0.45rem);
		padding-top: 0.25rem;
		border-top: 1px solid #1f2430;
	}

	.fn-row-1,
	.fn-row-2,
	.fn-row-3 {
		display: grid;
		gap: clamp(0.2rem, 1.1cqi, 0.35rem);
		align-items: end;
	}

	.fn-row-1 {
		grid-template-columns: 3fr 3fr 1.2fr;
	}

	.fn-row-2 {
		grid-template-columns: 3fr 5fr;
	}

	.fn-row-3 {
		grid-template-columns: 3fr 6fr;
	}

	.fn-group {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-inline-size: 0;
	}

	.fn-group--encoder {
		align-items: center;
		justify-content: flex-end;
	}

	.fn-group__title {
		font-size: 0.5rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: #64748b;
		padding-inline: 0.1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fn-group__title--right {
		text-align: right;
	}

	.fn-group__title-split {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 0.3rem;
		align-items: center;
	}

	.fn-group__title--sampling {
		text-align: center;
		border-bottom: 1px solid #2e3543;
		padding-bottom: 0.05rem;
	}

	.fn-group__title-bank {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.25rem;
	}

	.fn-group__dj-tag {
		font-size: 0.46rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #64748b;
		padding-inline-end: 16%;
	}

	.fn-group__dj-tag--active {
		color: #fdba74;
	}

	.fn-group__grid {
		display: grid;
		gap: clamp(0.16rem, 0.9cqi, 0.3rem);
	}

	.fn-group__grid--3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.fn-group__grid--5 {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}

	.fn-group__grid--6 {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}

	/* Shared Hardware Button Styles (Unified quiet graphite palette) */
	.hw-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: clamp(0.18rem, 0.8cqi, 0.3rem) clamp(0.06rem, 0.5cqi, 0.18rem);
		margin: 0;
		background: #1c2029;
		color: #e2e8f0;
		border: 1px solid #2e3543;
		border-radius: 0.32rem;
		box-shadow: 0 2px 0 #0b0d12;
		cursor: pointer;
		text-align: center;
		min-block-size: 2.15rem;
		min-inline-size: 0;
		transition:
			transform 0.08s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	.hw-btn:hover:not(:disabled) {
		border-color: #64748b;
		background: #242936;
	}

	.hw-btn--fx {
		flex-direction: row;
		gap: clamp(0.14rem, 0.7cqi, 0.25rem);
		min-block-size: 1.9rem;
		border-radius: 999px;
		padding-inline: clamp(0.22rem, 1.1cqi, 0.4rem);
	}

	.hw-btn__led {
		width: 0.32rem;
		height: 0.32rem;
		border-radius: 50%;
		background: #384152;
		flex-shrink: 0;
	}

	.hw-btn--active .hw-btn__led {
		background: #ffffff;
	}

	.hw-btn__label {
		font-size: clamp(0.42rem, 1.55vw, 0.58rem);
		font-weight: 700;
		line-height: 1.08;
		letter-spacing: -0.01em;
		overflow-wrap: break-word;
	}

	@supports (font-size: 1cqi) {
		.hw-btn__label {
			font-size: clamp(0.41rem, 1.5cqi, 0.58rem);
		}
	}

	/* Progressive disclosure: SHIFT sub-labels hidden until SHIFT is active or button is hovered/focused/active */
	.hw-btn__shift {
		display: none;
		margin-top: 0.12rem;
		font-size: 0.46rem;
		font-weight: 700;
		color: #cbd5e1;
		padding: 0.03rem 0.15rem;
		border-radius: 0.15rem;
		line-height: 1.05;
		max-inline-size: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.faceplate--shift .hw-btn__shift,
	.hw-btn:hover .hw-btn__shift,
	.hw-btn:focus-visible .hw-btn__shift,
	.hw-btn--active .hw-btn__shift {
		display: block;
	}

	.faceplate--shift .hw-btn__shift {
		color: #fdba74;
	}

	.hw-btn--shift-key {
		border-color: #475569;
		color: #f8fafc;
	}

	/* Zone 4 (Bottom): 4x4 Pads + Right Vertical Column (BUS FX, HOLD, EXT SOURCE, SUB PAD) */
	.zone-bottom-header {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(66px, 1.05fr);
		gap: 0.45rem;
		align-items: center;
		padding-top: 0.25rem;
		border-top: 1px solid #1f2430;
	}

	.dj-channel-brackets {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.38rem;
		font-size: 0.5rem;
		font-weight: 700;
		color: #64748b;
		letter-spacing: 0.04em;
		text-align: center;
	}

	.dj-bracket--active {
		color: #fdba74;
	}

	.any-pad-btn {
		padding: 0.16rem 0.35rem;
		font-size: 0.56rem;
		font-weight: 700;
		color: #94a3b8;
		background: #1a1e26;
		border: 1px solid #2e3543;
		border-radius: 999px;
		cursor: pointer;
		margin: 0;
		width: 100%;
		text-align: center;
		white-space: nowrap;
	}

	.any-pad-btn:hover:not(:disabled) {
		color: #e2e8f0;
		border-color: #64748b;
	}

	.any-pad-btn--active {
		background: #ea580c;
		color: #ffffff;
		border-color: #fdba74;
	}

	.zone-bottom-matrix {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(66px, 1.05fr);
		gap: 0.45rem;
		align-items: stretch;
	}

	.zone-pads {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.38rem;
	}

	.zone-pad-side-col {
		display: grid;
		grid-template-rows: repeat(4, minmax(0, 1fr));
		gap: 0.38rem;
		padding-inline-start: 0.35rem;
		border-inline-start: 1px solid #1f2430;
	}

	.hw-btn--side {
		block-size: 100%;
		min-block-size: 2.7rem;
		padding: 0.3rem 0.2rem;
	}

	.hw-pad {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-between;
		padding: clamp(0.3rem, 1.2vw, 0.44rem);
		margin: 0;
		aspect-ratio: 1.15 / 1;
		background: #1b1f27;
		border: 1.5px solid #2e3543;
		border-radius: 0.4rem;
		cursor: pointer;
		min-inline-size: 0;
		transition:
			border-color 0.12s ease,
			background-color 0.12s ease,
			transform 0.08s ease;
	}

	.hw-pad:hover:not(:disabled) {
		border-color: #64748b;
		background: #232833;
	}

	.hw-pad__top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.15rem;
		width: 100%;
	}

	.hw-pad__num {
		font-size: clamp(0.76rem, 2.2vw, 0.88rem);
		font-weight: 800;
		color: #e2e8f0;
		line-height: 1;
	}

	/* DJ sub-labels only show when DJ mode banks are selected or pad is hovered/focused */
	.hw-pad__dj {
		display: none;
		font-size: 0.45rem;
		font-weight: 700;
		color: #94a3b8;
		line-height: 1;
		white-space: nowrap;
	}

	.faceplate--dj .hw-pad__dj,
	.hw-pad:hover .hw-pad__dj,
	.hw-pad:focus-visible .hw-pad__dj {
		display: inline;
	}

	/* SHIFT pad sub-labels hidden by default, shown when SHIFT is active or pad is hovered/focused/active */
	.hw-pad__shift {
		display: none;
		align-self: stretch;
		text-align: left;
		font-size: clamp(0.45rem, 1.35vw, 0.52rem);
		font-weight: 700;
		color: #94a3b8;
		letter-spacing: 0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.faceplate--shift .hw-pad__shift,
	.hw-pad:hover .hw-pad__shift,
	.hw-pad:focus-visible .hw-pad__shift,
	.hw-pad--active .hw-pad__shift {
		display: block;
	}

	.faceplate--shift .hw-pad__shift {
		color: #fdba74;
	}

	@supports (font-size: 1cqi) {
		.hw-pad {
			padding: clamp(0.3rem, 1.25cqi, 0.44rem);
		}

		.hw-pad__num {
			font-size: clamp(0.76rem, 2.2cqi, 0.88rem);
		}

		.hw-pad__shift {
			font-size: clamp(0.45rem, 1.3cqi, 0.52rem);
		}
	}

	/* Active/Selected State: The ONLY place bright SP-404 orange appears */
	.hw-btn--active,
	.hw-pad--active {
		background: #ea580c !important;
		color: #ffffff !important;
		border-color: #fdba74 !important;
		box-shadow: 0 0 10px rgba(249, 115, 22, 0.4) !important;
		transform: translateY(1px);
	}

	.hw-btn--active .hw-btn__shift,
	.hw-pad--active .hw-pad__shift,
	.hw-pad--active .hw-pad__dj,
	.hw-pad--active .hw-pad__num {
		color: #ffffff;
	}

	/* Generic "Any [PAD]" highlight across the 4x4 grid when a tip uses 'PAD' */
	.hw-pad--any-active {
		background: rgba(234, 88, 12, 0.16);
		border-color: #f97316;
		border-style: dashed;
		box-shadow: inset 0 0 8px rgba(249, 115, 22, 0.22);
	}

	.hw-pad--any-active .hw-pad__num {
		color: #fdba74;
	}

	/* Optional Thumb Zoom Mode: expands FX and Middle Function rows into full-width thumb-friendly rows */
	.faceplate--thumb-zoom .zone-fx-display {
		grid-template-columns: 1fr;
		gap: 0.45rem;
	}

	.faceplate--thumb-zoom .fx-column {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.35rem;
	}

	.faceplate--thumb-zoom .fx-column--left .hw-btn--fx-top,
	.faceplate--thumb-zoom .fx-column--left .hw-btn--fx-bot,
	.faceplate--thumb-zoom .fx-column--right .hw-btn--fx-top,
	.faceplate--thumb-zoom .fx-column--right .hw-btn--fx-bot {
		margin-inline: 0;
	}

	.faceplate--thumb-zoom .oled-bezel {
		border-radius: 1rem;
		aspect-ratio: auto;
		padding: 0.55rem;
	}

	.faceplate--thumb-zoom .fn-row-1,
	.faceplate--thumb-zoom .fn-row-2,
	.faceplate--thumb-zoom .fn-row-3 {
		grid-template-columns: 1fr;
		gap: 0.4rem;
	}

	.faceplate--thumb-zoom .fn-group__grid {
		gap: 0.32rem;
	}

	.faceplate--thumb-zoom .hw-btn {
		min-block-size: 2.65rem;
		padding: 0.32rem 0.22rem;
	}

	.faceplate--thumb-zoom .hw-btn__label {
		font-size: 0.58rem;
	}

	@media (pointer: coarse) {
		.hw-btn {
			min-block-size: 2.35rem;
		}

		.hw-btn--fx {
			min-block-size: 2.05rem;
		}

		.any-pad-btn,
		.oled-clear-btn,
		.layout-mode-btn {
			min-block-size: 1.9rem;
			padding-inline: 0.6rem;
		}
	}

	/* Compact Vertical Viewport Modes (Laptops & Lower Screen Heights) */
	@media (min-width: 860px) and (max-height: 880px) {
		.faceplate:not(.faceplate--thumb-zoom) {
			gap: 0.35rem;
			padding: 0.45rem 0.65rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .faceplate__branding {
			padding-bottom: 0.2rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .brand-roland {
			font-size: 0.72rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .brand-model {
			font-size: 0.78rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .zone-knobs {
			padding: 0.22rem 0.35rem;
			gap: 0.25rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-knob__dial {
			width: 1.55rem;
			height: 1.55rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-knob__dial--encoder {
			width: 1.45rem;
			height: 1.45rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .oled-bezel {
			padding: 0.28rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .oled-screen {
			min-height: 2.35rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .zone-fn {
			gap: 0.28rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-btn {
			min-block-size: 1.78rem;
			padding: 0.12rem 0.1rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-btn--fx {
			min-block-size: 1.62rem;
			padding-inline: 0.25rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-btn--side {
			min-block-size: 2.15rem;
			padding: 0.15rem 0.1rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .zone-pads {
			gap: 0.26rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .zone-pad-side-col {
			gap: 0.26rem;
			padding-inline-start: 0.25rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-pad {
			aspect-ratio: 1.3 / 1;
			padding: 0.24rem 0.3rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-pad__num {
			font-size: 0.76rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-pad__shift {
			font-size: 0.48rem;
		}
	}

	@media (min-width: 860px) and (max-height: 760px) {
		.faceplate:not(.faceplate--thumb-zoom) {
			gap: 0.25rem;
			padding: 0.35rem 0.5rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-knob__dial {
			width: 1.35rem;
			height: 1.35rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-knob__dial--encoder {
			width: 1.25rem;
			height: 1.25rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .oled-screen {
			min-height: 2.1rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-btn {
			min-block-size: 1.55rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-btn--fx {
			min-block-size: 1.45rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-btn--side {
			min-block-size: 1.85rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-pad {
			aspect-ratio: 1.55 / 1;
			padding: 0.16rem 0.25rem;
		}

		.faceplate:not(.faceplate--thumb-zoom) .hw-pad__num {
			font-size: 0.7rem;
		}
	}
</style>
