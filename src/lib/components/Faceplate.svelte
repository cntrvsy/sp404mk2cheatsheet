<script lang="ts">
	interface Props {
		activeButtons: string[];
		matchCount: number;
		onToggleButton: (buttonId: string) => void;
		onClearButtons: () => void;
	}

	let { activeButtons, matchCount, onToggleButton, onClearButtons }: Props = $props();

	const isShiftActive = $derived(activeButtons.includes('SHIFT'));

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
		{ id: 'RECORD SETTING', label: 'RECORD SETTING', sub: 'COLOR / BPM' }
	];

	const sampleEditGroup = [
		{ id: 'START/END', label: 'START/END', sub: 'CHOP' },
		{ id: 'PITCH/SPEED', label: 'PITCH/SPEED', sub: 'ENVELOPE' },
		{ id: 'MARK', label: 'MARK', sub: 'SAVE EFX' }
	];

	const row2Sampling = [
		{ id: 'DEL', label: 'DEL', sub: 'ERASE', accent: 'danger' },
		{ id: 'REC', label: 'REC', sub: 'REHEARSAL', accent: 'rec' },
		{ id: 'RESAMPLE', label: 'RESAMPLE', sub: 'MULTI PAD', accent: 'default' }
	];

	const row2SampleMode = [
		{ id: 'BPM SYNC', label: 'BPM SYNC' },
		{ id: 'GATE', label: 'GATE', sub: 'ALL GATE' },
		{ id: 'LOOP', label: 'LOOP', sub: 'PING-PONG' },
		{ id: 'REVERSE', label: 'REVERSE', sub: 'PAD MUTE' },
		{ id: 'ROLL', label: 'ROLL', sub: 'ROLL SET' }
	];

	const row3Left = [
		{ id: 'EXIT', label: 'EXIT', sub: 'STOP ALL', accent: 'default' },
		{ id: 'COPY', label: 'COPY', sub: 'PROTECT', accent: 'default' },
		{ id: 'REMAIN', label: 'REMAIN', sub: 'BUS ROUTE', accent: 'remain' }
	];

	const bankButtons = [
		{ id: 'BANK A/F', label: 'A/F' },
		{ id: 'BANK B/G', label: 'B/G' },
		{ id: 'BANK C/H', label: 'C/H' },
		{ id: 'BANK D/I', label: 'D/I' },
		{ id: 'BANK E/J', label: 'E/J' }
	];

	// Zone 4 (Bottom): 4x4 Performance Pads + Right Vertical 4-Button Column
	const pads = [
		{ id: 'PAD 1', num: '1', dj: 'BEND+', shift: 'FIXED VEL' },
		{ id: 'PAD 2', num: '2', dj: 'BPM+', shift: '16 VEL' },
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
		if (activeButtons.includes(id)) return true;
		if (id.startsWith('BANK ') && activeButtons.includes('BANK')) return true;
		return false;
	}
</script>

<section
	class="faceplate"
	class:faceplate--shift={isShiftActive}
	aria-label="Interactive SP-404MKII Hardware Panel"
>
	<div class="faceplate__branding">
		<span class="brand-roland">Roland</span>
		<span class="brand-model">SP-404MKII</span>
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
					<span>OLED // LOOKUP</span>
					<span>{matchCount} {matchCount === 1 ? 'TIP' : 'TIPS'}</span>
				</div>
				<div class="oled-screen__main">
					{#if activeButtons.length > 0}
						<div class="oled-combo">
							{activeButtons.join(' + ')}
						</div>
					{:else}
						<div class="oled-idle">TAP HARDWARE TO FILTER</div>
					{/if}
				</div>
				<div class="oled-screen__footer">
					{#if activeButtons.length > 0}
						<button type="button" class="oled-clear-btn" onclick={onClearButtons}>
							[RESET FILTER]
						</button>
					{:else}
						<span>SHIFT HIGHLIGHTS SUB-LABELS</span>
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
						<circle cx="24" cy="24" r="5" class="dial-center" />
					</svg>
					<span class="hw-knob__label">VALUE</span>
				</button>
			</div>
		</div>

		<!-- Row 2: DEL + SAMPLING (REC, RESAMPLE) | BPM SYNC, GATE, LOOP, REVERSE, ROLL (SAMPLE MODE) -->
		<div class="fn-row-2">
			<div class="fn-group">
				<span class="fn-group__title">SAMPLING</span>
				<div class="fn-group__grid fn-group__grid--3">
					{#each row2Sampling as btn (btn.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect hw-btn--{btn.accent}"
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
				<span class="fn-group__title">UTILITY</span>
				<div class="fn-group__grid fn-group__grid--3">
					{#each row3Left as btn (btn.id)}
						<button
							type="button"
							class="hw-btn hw-btn--rect hw-btn--{btn.accent}"
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
				<span class="fn-group__title">BANK (SHIFT: VOLUME)</span>
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
						class="hw-btn hw-btn--rect hw-btn--shift"
						class:hw-btn--active={isSelected('SHIFT')}
						aria-pressed={isSelected('SHIFT')}
						onclick={() => onToggleButton('SHIFT')}
					>
						<span class="hw-btn__label">SHIFT</span>
						<span class="hw-btn__shift">MOD</span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Zone 4 (Bottom): 4x4 Performance Pads + Right Vertical Column (BUS FX, HOLD, EXT SOURCE, SUB PAD) -->
	<div class="zone-pads-header-bar">
		<div class="dj-channel-brackets" aria-hidden="true">
			<span class="dj-bracket">┌── CH1 ──┐</span>
			<span class="dj-bracket">┌── CH2 ──┐</span>
		</div>
		<button
			type="button"
			class="any-pad-btn"
			class:any-pad-btn--active={isSelected('PAD')}
			aria-pressed={isSelected('PAD')}
			onclick={() => onToggleButton('PAD')}
		>
			Filter General [PAD] Combos
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
					aria-pressed={isSelected(pad.id)}
					onclick={() => onToggleButton(pad.id)}
				>
					<div class="hw-pad__top">
						<span class="hw-pad__dj">{pad.dj}</span>
						<span class="hw-pad__num">{pad.num}</span>
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
		gap: 0.65rem;
		padding: clamp(0.7rem, 2.5vw, 1rem);
		background: #14161b;
		border: 2px solid #2b303c;
		border-radius: 1rem;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.06),
			0 12px 28px rgba(0, 0, 0, 0.45);
		user-select: none;
	}

	@supports (font-size: 1cqi) {
		.faceplate {
			padding: clamp(0.65rem, 2.8cqi, 1rem);
		}
	}

	.faceplate__branding {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.35rem 0.5rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid #262b36;
	}

	.brand-roland {
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: #cbd5e1;
		text-transform: uppercase;
	}

	.brand-model {
		font-size: 0.92rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		color: #f97316;
	}

	/* Zone 1 (Top): 4 Knobs (VOLUME, CTRL 1, CTRL 2, CTRL 3) */
	.zone-knobs {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.35rem;
		padding: 0.4rem 0.45rem;
		background: #101217;
		border-radius: 0.55rem;
		border: 1px solid #222630;
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
		color: #e2e8f0;
		min-inline-size: 0;
	}

	.hw-knob:hover:not(:disabled) {
		background: #1b1f28;
		border-color: #3b4252;
	}

	.hw-knob--active {
		background: rgba(249, 115, 22, 0.15);
		border-color: #f97316;
	}

	.hw-knob__dial {
		width: clamp(1.85rem, 5.5vw, 2.3rem);
		height: clamp(1.85rem, 5.5vw, 2.3rem);
	}

	.hw-knob__dial--encoder {
		width: clamp(1.75rem, 5vw, 2.15rem);
		height: clamp(1.75rem, 5vw, 2.15rem);
	}

	@supports (font-size: 1cqi) {
		.hw-knob__dial {
			width: clamp(1.85rem, 6cqi, 2.3rem);
			height: clamp(1.85rem, 6cqi, 2.3rem);
		}

		.hw-knob__dial--encoder {
			width: clamp(1.75rem, 5.4cqi, 2.15rem);
			height: clamp(1.75rem, 5.4cqi, 2.15rem);
		}
	}

	.dial-outer {
		fill: #1e232d;
		stroke: #475569;
		stroke-width: 2;
	}

	.hw-knob--encoder .dial-outer {
		stroke: #38bdf8;
		stroke-dasharray: 3 2;
	}

	.hw-knob--active .dial-outer {
		stroke: #f97316;
		fill: #2c1d11;
	}

	.dial-inner {
		fill: #0f1319;
		stroke: #334155;
		stroke-width: 1.5;
	}

	.dial-pointer {
		stroke: #f8fafc;
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.dial-center {
		fill: #38bdf8;
	}

	.hw-knob__label {
		font-size: 0.64rem;
		font-weight: 800;
		color: #f1f5f9;
		line-height: 1.1;
	}

	.hw-knob__sub {
		font-size: 0.52rem;
		color: #94a3b8;
		text-align: center;
		line-height: 1.1;
	}

	/* Zone 2 (Upper-Mid): Direct FX + Circular OLED Display Bezel */
	.zone-fx-display {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.45rem;
		align-items: center;
	}

	.fx-column {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.35rem;
		min-inline-size: 0;
	}

	.oled-bezel {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.55rem;
		background: radial-gradient(circle, #181c24 0%, #0e1015 100%);
		border: 2px solid #282e3b;
		border-radius: 1.25rem;
		box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.6);
	}

	.oled-screen {
		inline-size: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.45rem 0.55rem;
		background: #05070a;
		border: 2px solid #334155;
		border-radius: 0.45rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
		color: #f8fafc;
		box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.08);
	}

	.oled-screen__topbar {
		display: flex;
		justify-content: space-between;
		font-size: 0.6rem;
		font-weight: 700;
		color: #38bdf8;
		border-bottom: 1px solid #1e293b;
		padding-bottom: 0.18rem;
	}

	.oled-screen__main {
		display: flex;
		align-items: safe center;
		justify-content: center;
		text-align: center;
		min-block-size: 2.15rem;
		padding-block: 0.2rem;
	}

	.oled-combo {
		font-size: 0.74rem;
		font-weight: 800;
		color: #fbbf24;
		letter-spacing: 0.03em;
		overflow-wrap: anywhere;
	}

	.oled-idle {
		font-size: 0.66rem;
		color: #94a3b8;
	}

	.oled-screen__footer {
		display: flex;
		justify-content: center;
		font-size: 0.56rem;
		color: #64748b;
		border-top: 1px solid #1e293b;
		padding-top: 0.18rem;
	}

	.oled-clear-btn {
		padding: 0.12rem 0.45rem;
		font-family: inherit;
		font-size: 0.62rem;
		font-weight: 700;
		color: #f97316;
		background: rgba(249, 115, 22, 0.14);
		border: 1px solid #f97316;
		border-radius: 0.2rem;
		cursor: pointer;
		margin: 0;
		width: auto;
	}

	/* Zone 3 (Middle): 3 Function Rows + VALUE Encoder */
	.zone-functions {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding-top: 0.2rem;
		border-top: 1px solid #232834;
	}

	.fn-row-1,
	.fn-row-2,
	.fn-row-3 {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.35rem;
		align-items: end;
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
		font-size: 0.52rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		color: #94a3b8;
		padding-inline: 0.1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fn-group__title--right {
		text-align: right;
	}

	.fn-group__grid {
		display: grid;
		gap: 0.3rem;
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

	/* Shared Hardware Button Styles */
	.hw-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.3rem 0.18rem;
		margin: 0;
		background: #222631;
		color: #f1f5f9;
		border: 1px solid #3b4252;
		border-radius: 0.32rem;
		box-shadow: 0 2px 0 #0b0d12;
		cursor: pointer;
		text-align: center;
		min-block-size: 2.25rem;
		min-inline-size: 0;
		transition:
			transform 0.08s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	.hw-btn:hover:not(:disabled) {
		border-color: #94a3b8;
		background: #2a303d;
	}

	.hw-btn--fx {
		flex-direction: row;
		gap: 0.25rem;
		min-block-size: 1.95rem;
		border-radius: 999px;
		padding-inline: 0.4rem;
	}

	.hw-btn__led {
		width: 0.38rem;
		height: 0.38rem;
		border-radius: 50%;
		background: #475569;
		flex-shrink: 0;
	}

	.hw-btn--active .hw-btn__led {
		background: #f97316;
		box-shadow: 0 0 6px #f97316;
	}

	.hw-btn__label {
		font-size: clamp(0.52rem, 1.6vw, 0.62rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: 0.01em;
	}

	@supports (font-size: 1cqi) {
		.hw-btn__label {
			font-size: clamp(0.52rem, 1.55cqi, 0.62rem);
		}
	}

	.hw-btn__shift {
		margin-top: 0.12rem;
		font-size: 0.48rem;
		font-weight: 700;
		color: #d97706;
		background: rgba(217, 119, 6, 0.12);
		padding: 0.04rem 0.18rem;
		border-radius: 0.16rem;
		line-height: 1.05;
		max-inline-size: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.faceplate--shift .hw-btn__shift,
	.faceplate--shift .hw-pad__shift {
		color: #111827;
		background: #fbbf24;
		box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);
	}

	.hw-btn--shift {
		background: #3b2d12;
		border-color: #d97706;
		color: #fbbf24;
	}

	.hw-btn--remain {
		background: #2b2135;
		border-color: #9333ea;
	}

	.hw-btn--rec {
		background: #3a1b1b;
		border-color: #dc2626;
	}

	.hw-btn--danger {
		border-color: #64748b;
	}

	.hw-btn--bank {
		background: #1c2029;
	}

	/* Zone 4 (Bottom): 4x4 Pads + Right Vertical Column (BUS FX, HOLD, EXT SOURCE, SUB PAD) */
	.zone-pads-header-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: safe center;
		justify-content: space-between;
		gap: 0.4rem;
		padding-top: 0.25rem;
		border-top: 1px solid #262b36;
	}

	.dj-channel-brackets {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
		font-size: 0.6rem;
		font-weight: 800;
		color: #94a3b8;
		letter-spacing: 0.04em;
	}

	.any-pad-btn {
		padding: 0.18rem 0.55rem;
		font-size: 0.62rem;
		font-weight: 700;
		color: #fed7aa;
		background: #28201c;
		border: 1px solid #c2410c;
		border-radius: 999px;
		cursor: pointer;
		margin: 0;
		width: auto;
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
		border-inline-start: 1px solid #262b36;
	}

	.hw-btn--side {
		block-size: 100%;
		min-block-size: 2.8rem;
		padding: 0.3rem 0.2rem;
		background: #1b1f29;
		border: 1.5px solid #384152;
		border-radius: 0.38rem;
	}

	.hw-pad {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-between;
		padding: clamp(0.28rem, 1.2vw, 0.42rem);
		margin: 0;
		aspect-ratio: 1.12 / 1;
		background: #1e2129;
		border: 2px solid #384152;
		border-radius: 0.42rem;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
		cursor: pointer;
		min-inline-size: 0;
		transition:
			border-color 0.12s ease,
			background-color 0.12s ease,
			transform 0.08s ease;
	}

	.hw-pad:hover:not(:disabled) {
		border-color: #f97316;
		background: #262934;
	}

	.hw-pad__top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.15rem;
		width: 100%;
	}

	.hw-pad__dj {
		font-size: 0.46rem;
		font-weight: 700;
		color: #94a3b8;
		background: #13161c;
		border: 1px solid #2b3240;
		padding: 0.04rem 0.18rem;
		border-radius: 0.16rem;
		line-height: 1.1;
		white-space: nowrap;
	}

	.hw-pad__num {
		font-size: clamp(0.74rem, 2.3vw, 0.9rem);
		font-weight: 900;
		color: #f8fafc;
		line-height: 1;
	}

	.hw-pad__shift {
		align-self: stretch;
		text-align: center;
		font-size: clamp(0.45rem, 1.4vw, 0.54rem);
		font-weight: 800;
		color: #fbbf24;
		background: rgba(217, 119, 6, 0.16);
		padding: 0.1rem 0.15rem;
		border-radius: 0.2rem;
		letter-spacing: 0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@supports (font-size: 1cqi) {
		.hw-pad {
			padding: clamp(0.28rem, 1.25cqi, 0.44rem);
		}

		.hw-pad__num {
			font-size: clamp(0.74rem, 2.25cqi, 0.9rem);
		}

		.hw-pad__shift {
			font-size: clamp(0.45rem, 1.35cqi, 0.54rem);
		}
	}

	.hw-btn--active,
	.hw-pad--active {
		background: #ea580c !important;
		color: #ffffff !important;
		border-color: #fdba74 !important;
		box-shadow: 0 0 12px rgba(249, 115, 22, 0.55) !important;
		transform: translateY(1px);
	}

	.hw-btn--active .hw-btn__shift,
	.hw-pad--active .hw-pad__shift,
	.hw-pad--active .hw-pad__dj {
		background: rgba(0, 0, 0, 0.45);
		color: #fde68a;
		border-color: transparent;
	}

	/* Fallback media query for wider viewports */
	@media (min-width: 540px) {
		.zone-fx-display {
			grid-template-columns: 1fr 1.45fr 1fr;
		}

		.fx-column {
			display: flex;
			flex-direction: column;
		}

		.oled-bezel {
			border-radius: 999px;
			aspect-ratio: 1 / 1;
			padding: 0.85rem;
		}

		.fn-row-1 {
			grid-template-columns: 3fr 3fr 1.25fr;
		}

		.fn-row-2 {
			grid-template-columns: 3fr 5fr;
		}

		.fn-row-3 {
			grid-template-columns: 3fr 6fr;
		}
	}

	/* Size-aware container query rules */
	@supports (container-type: inline-size) {
		@media (min-width: 540px) {
			.zone-fx-display {
				grid-template-columns: 1fr;
			}

			.fx-column {
				display: grid;
				grid-template-columns: repeat(3, minmax(0, 1fr));
			}

			.oled-bezel {
				border-radius: 1.25rem;
				aspect-ratio: auto;
				padding: 0.55rem;
			}

			.fn-row-1,
			.fn-row-2,
			.fn-row-3 {
				grid-template-columns: 1fr;
			}
		}

		@container faceplate (min-width: 355px) {
			.zone-fx-display {
				grid-template-columns: 1fr 1.4fr 1fr;
			}

			.fx-column {
				display: flex;
				flex-direction: column;
			}

			.fx-column--left .hw-btn--fx-top,
			.fx-column--left .hw-btn--fx-bot {
				margin-inline-end: -0.2rem;
			}

			.fx-column--right .hw-btn--fx-top,
			.fx-column--right .hw-btn--fx-bot {
				margin-inline-start: -0.2rem;
			}

			.oled-bezel {
				border-radius: 999px;
				aspect-ratio: 1.05 / 1;
				padding: 0.65rem;
			}

			.fn-row-1 {
				grid-template-columns: 3fr 3fr 1.25fr;
			}

			.fn-row-2 {
				grid-template-columns: 3fr 5fr;
			}

			.fn-row-3 {
				grid-template-columns: 3fr 6fr;
			}
		}
	}

	@media (pointer: coarse) {
		.hw-btn {
			min-block-size: 2.55rem;
		}

		.hw-btn--fx {
			min-block-size: 2.2rem;
		}

		.any-pad-btn,
		.oled-clear-btn {
			min-block-size: 2rem;
			padding-inline: 0.65rem;
		}
	}
</style>
