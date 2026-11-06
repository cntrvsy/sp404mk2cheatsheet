/**
 * @file types.ts
 * @description Central Data Contract & Hardware Mapping Schema
 *
 * This file defines the core interfaces and constants that connect:
 * 1. The official documentation citations (doc, page, quote).
 * 2. The cheat sheet tip entries (tips.json).
 * 3. The colloquial search aliases (aliases.json).
 * 4. The interactive hardware faceplate SVG/HTML components (Faceplate.svelte).
 *
 * If you are adapting this engine for another hardware sampler (e.g. Roland SP-303,
 * SP-404SX, or an MPC/Elektron device):
 * - Adjust `Category` and `CATEGORIES` to match the target device's workflow sections.
 * - Adjust `BANK_BUTTON_IDS` and `DIRECT_FX_IDS` to match the target device's physical buttons.
 * - Update `matchesTipButton()` and `isComboTokenActive()` for the target machine's button names.
 */

export type Category =
	| 'Sample Playback'
	| 'Pattern Sequencer'
	| 'Sample Edit & Chop'
	| 'Pitch, Speed & Env'
	| 'FX & Routing'
	| 'Banks & Projects'
	| 'Pad Modes (SHIFT + Pad)';

export const CATEGORIES: Category[] = [
	'Sample Playback',
	'Pattern Sequencer',
	'Sample Edit & Chop',
	'Pitch, Speed & Env',
	'FX & Routing',
	'Banks & Projects',
	'Pad Modes (SHIFT + Pad)'
];

export type TipTier = 'essential' | 'deep-dive';

export interface TipCitation {
	doc: string;
	page: number;
	quote: string;
}

export interface Tip {
	id: string;
	category: Category;
	tier: TipTier;
	combo: string[];
	buttons: string[];
	action: string;
	context?: string;
	goal: string;
	caveat?: string;
	steps?: string[];
	citation: TipCitation;
}

export type TipAliasesMap = Record<string, string[]>;

export type HardwareZone =
	'top-knobs' | 'fx-display' | 'fn-row-1' | 'fn-row-2' | 'fn-row-3' | 'pads' | 'pad-side-col';

export interface HardwareButton {
	id: string;
	label: string;
	shiftLabel?: string;
	zone: HardwareZone;
	accent?: 'danger' | 'rec' | 'remain' | 'shift' | 'default';
}

export const BANK_BUTTON_IDS = [
	'BANK A/F',
	'BANK B/G',
	'BANK C/H',
	'BANK D/I',
	'BANK E/J'
] as const;

export const DIRECT_FX_IDS = [
	'FILTER+DRIVE',
	'RESONATOR',
	'DELAY',
	'ISOLATOR',
	'DJFX LOOPER',
	'MFX'
] as const;

export function isBankButtonId(btnId: string): boolean {
	return btnId === 'BANK' || (BANK_BUTTON_IDS as readonly string[]).includes(btnId);
}

/**
 * Checks whether a tip's `buttons` list matches a selected hardware button ID,
 * accounting for Bank button aliases (`BANK A/F`..`BANK E/J` <-> `BANK`).
 */
export function matchesTipButton(tipButtons: string[], selectedBtn: string): boolean {
	if (tipButtons.includes(selectedBtn)) {
		return true;
	}

	// Any of the 5 physical bank buttons matches generic "BANK" tips
	if (isBankButtonId(selectedBtn)) {
		if (tipButtons.includes('BANK')) {
			return true;
		}
		if (selectedBtn === 'BANK' && tipButtons.some((b) => isBankButtonId(b))) {
			return true;
		}
	}

	return false;
}

function escapeRegExp(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Boundary-aware check for whether a visible `<Keycap>` combo part should be
 * highlighted as active given the currently selected hardware buttons.
 * Prevents substring collisions like:
 * - `REC` matching `RECORD SETTING` or `TR-REC`
 * - `PAD` matching `SUB PAD`
 * - `PAD 1` matching `PAD 10`..`PAD 16`
 */
export function isComboTokenActive(comboPart: string, activeButtons: string[]): boolean {
	if (activeButtons.length === 0) return false;
	const upperPart = comboPart.toUpperCase().trim();

	for (const rawBtn of activeButtons) {
		const btn = rawBtn.toUpperCase().trim();

		if (upperPart === btn) {
			return true;
		}

		// Bank buttons: highlight generic "BANK" / "BANK (x2)" / "PAD / BANK", or specific "BANK A/F".."E/J"
		if (isBankButtonId(btn)) {
			const shortBank = btn.replace(/^BANK\s+/, '');
			const hasSpecificBank = /\b(?:A\/F|B\/G|C\/H|D\/I|E\/J)\b/.test(upperPart);
			if (hasSpecificBank) {
				if (btn === 'BANK' || upperPart.includes(shortBank)) {
					return true;
				}
			} else if (/\bBANK\b/.test(upperPart)) {
				return true;
			}
			continue;
		}

		// Direct FX buttons also highlight generic "Any FX" keycaps
		if ((DIRECT_FX_IDS as readonly string[]).includes(btn) && /\bANY FX\b/.test(upperPart)) {
			return true;
		}

		// CTRL 1 / CTRL 2 / CTRL 3 also highlight shorthand "Turn CTRL 1/2/3"
		if (
			(btn === 'CTRL 1' || btn === 'CTRL 2' || btn === 'CTRL 3') &&
			upperPart.includes('CTRL 1/2/3')
		) {
			return true;
		}

		// General "PAD" button: highlight "PAD", "Hold PAD", "PAD / BANK", etc., but NOT "SUB PAD" or "PAD 1..16"
		if (btn === 'PAD') {
			const withoutSubPad = upperPart.replace(/\bSUB PAD\b/g, '');
			if (/\bPAD\b(?!\s*\d)/.test(withoutSubPad)) {
				return true;
			}
			continue;
		}

		// Specific "REC" button: must not match "RECORD SETTING" or "TR-REC"
		if (btn === 'REC') {
			const cleaned = upperPart.replace(/\bTR-REC\b/g, '').replace(/\bRECORD SETTING\b/g, '');
			if (/\bREC\b/.test(cleaned)) {
				return true;
			}
			continue;
		}

		// Exact token/phrase boundary match (handles "PAD 1" vs "PAD 10", "VALUE" in "Push VALUE", etc.)
		const pattern = new RegExp(`(?:^|[^A-Z0-9-])${escapeRegExp(btn)}(?=$|[^A-Z0-9-])`);
		if (pattern.test(upperPart)) {
			return true;
		}
	}

	return false;
}
