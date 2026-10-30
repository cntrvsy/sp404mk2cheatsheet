import fs from 'node:fs';
import path from 'node:path';

const TIPS_PATH = path.resolve('src/lib/data/tips.json');

const VALID_CATEGORIES = new Set([
	'Sample Playback',
	'Pattern Sequencer',
	'Sample Edit & Chop',
	'Pitch, Speed & Env',
	'FX & Routing',
	'Banks & Projects',
	'Pad Modes (SHIFT + Pad)'
]);

const VALID_SOURCES = new Set(["C-Dub's Cheat Sheet", 'r/SP404 Community', 'Roland Manual']);

const VALID_BUTTON_IDS = new Set([
	// Top Knobs
	'VOLUME',
	'CTRL 1',
	'CTRL 2',
	'CTRL 3',
	// Direct FX
	'FILTER+DRIVE',
	'RESONATOR',
	'DELAY',
	'ISOLATOR',
	'DJFX LOOPER',
	'MFX',
	// Function Row 1
	'PATTERN SELECT',
	'PATTERN EDIT',
	'RECORD SETTING',
	'START/END',
	'PITCH/SPEED',
	'MARK',
	'VALUE',
	// Function Row 2
	'DEL',
	'REC',
	'RESAMPLE',
	'BPM SYNC',
	'GATE',
	'LOOP',
	'REVERSE',
	'ROLL',
	// Function Row 3
	'EXIT',
	'COPY',
	'REMAIN',
	'BANK',
	'BANK A/F',
	'BANK B/G',
	'BANK C/H',
	'BANK D/I',
	'BANK E/J',
	'SHIFT',
	// Pads & Right Column
	'PAD',
	...Array.from({ length: 16 }, (_, i) => `PAD ${i + 1}`),
	'BUS FX',
	'HOLD',
	'EXT SOURCE',
	'SUB PAD'
]);

const raw = fs.readFileSync(TIPS_PATH, 'utf8');
const tips = JSON.parse(raw);

if (!Array.isArray(tips) || tips.length === 0) {
	console.error('❌ tips.json must be a non-empty array.');
	process.exit(1);
}

const seenIds = new Set();
const errors = [];

for (const [index, tip] of tips.entries()) {
	const prefix = `Tip #${index + 1} (${tip.id ?? 'missing-id'})`;

	if (typeof tip.id !== 'string' || !/^[a-z0-9-]+$/.test(tip.id)) {
		errors.push(`${prefix}: "id" must be a non-empty kebab-case string.`);
	} else if (seenIds.has(tip.id)) {
		errors.push(`${prefix}: Duplicate tip id "${tip.id}".`);
	} else {
		seenIds.add(tip.id);
	}

	if (!VALID_CATEGORIES.has(tip.category)) {
		errors.push(`${prefix}: Invalid category "${tip.category}".`);
	}

	if (!Array.isArray(tip.combo) || tip.combo.length === 0) {
		errors.push(`${prefix}: "combo" must be a non-empty string array.`);
	}

	if (!Array.isArray(tip.buttons) || tip.buttons.length === 0) {
		errors.push(`${prefix}: "buttons" must be a non-empty array of hardware button IDs.`);
	} else {
		for (const btn of tip.buttons) {
			if (!VALID_BUTTON_IDS.has(btn)) {
				errors.push(`${prefix}: Unknown hardware button ID "${btn}" in "buttons".`);
			}
		}
	}

	if (typeof tip.action !== 'string' || tip.action.trim().length < 5) {
		errors.push(`${prefix}: "action" must be a descriptive string.`);
	}

	if (typeof tip.goal !== 'string' || tip.goal.trim().length < 10) {
		errors.push(`${prefix}: "goal" must explain why/when the shortcut is useful.`);
	}

	if (!Array.isArray(tip.aliases) || tip.aliases.length === 0) {
		errors.push(`${prefix}: "aliases" must be a non-empty array of search terms.`);
	}

	if (!Array.isArray(tip.sources) || tip.sources.length === 0) {
		errors.push(
			`${prefix}: "sources" is required to prevent unverified tips (allowed: ${[...VALID_SOURCES].join(', ')}).`
		);
	} else {
		for (const src of tip.sources) {
			if (!VALID_SOURCES.has(src)) {
				errors.push(
					`${prefix}: Unrecognized source "${src}". Allowed: ${[...VALID_SOURCES].join(', ')}.`
				);
			}
		}
	}
}

if (errors.length > 0) {
	console.error('❌ tips.json validation failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
	process.exit(1);
}

console.log(
	`✔ Validated ${tips.length} SP-404MKII tips (hardware IDs, schema, and verified sources).`
);
