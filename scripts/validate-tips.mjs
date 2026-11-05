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

function comboTokenToButtons(token) {
	const t = token.trim();
	if (t === 'TRUNCATE') return [];
	if (t === 'Any FX') {
		return ['FILTER+DRIVE', 'RESONATOR', 'DELAY', 'ISOLATOR', 'DJFX LOOPER', 'MFX'];
	}
	if (t === 'DJFX LOOPER / ISOLATOR') return ['DJFX LOOPER', 'ISOLATOR'];
	if (t === 'PAD / BANK') return ['PAD', 'BANK'];
	if (t === 'Turn CTRL 1/2/3') return ['CTRL 1', 'CTRL 2', 'CTRL 3'];
	if (t === 'Turn CTRL 3') return ['CTRL 3'];
	if (t === 'BANK (x2)') return ['BANK'];
	if (/VALUE/.test(t)) return ['VALUE'];
	if (/MARK/.test(t)) return ['MARK'];
	if (/REMAIN/.test(t)) return ['REMAIN'];
	return [t.replace(/^(Hold|Push|Turn)\s+/i, '').trim()];
}

function normalizeWhitespace(str) {
	return str.replace(/\s+/g, ' ').trim();
}

const docCache = new Map();

function getPageText(docRelPath, pageNum) {
	if (!docCache.has(docRelPath)) {
		const absPath = path.resolve(docRelPath);
		if (!fs.existsSync(absPath)) {
			docCache.set(docRelPath, null);
		} else {
			docCache.set(docRelPath, fs.readFileSync(absPath, 'utf8'));
		}
	}
	const content = docCache.get(docRelPath);
	if (!content) return null;

	const marker = `<!-- [Page ${pageNum}] -->`;
	const startIdx = content.indexOf(marker);
	if (startIdx === -1) return null;

	const nextMarkerIdx = content.indexOf('<!-- [Page ', startIdx + marker.length);
	const slice =
		nextMarkerIdx === -1 ? content.slice(startIdx) : content.slice(startIdx, nextMarkerIdx);
	return normalizeWhitespace(slice);
}

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
		if (Array.isArray(tip.combo)) {
			const expectedButtons = [...new Set(tip.combo.flatMap(comboTokenToButtons))];
			if (JSON.stringify(tip.buttons) !== JSON.stringify(expectedButtons)) {
				errors.push(
					`${prefix}: "buttons" ${JSON.stringify(tip.buttons)} does not match "combo" ${JSON.stringify(expectedButtons)}.`
				);
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

	// Closed-loop Verbatim Quote Verification against docs/reference/
	if (!tip.citation || typeof tip.citation !== 'object') {
		errors.push(`${prefix}: Missing required "citation" ({ doc, page, quote }).`);
	} else {
		const { doc, page, quote } = tip.citation;
		if (typeof doc !== 'string' || !doc.startsWith('docs/reference/')) {
			errors.push(`${prefix}: citation.doc must be a path under "docs/reference/".`);
		} else if (!Number.isInteger(page) || page < 1) {
			errors.push(`${prefix}: citation.page must be a positive integer.`);
		} else if (typeof quote !== 'string' || normalizeWhitespace(quote).length < 12) {
			errors.push(`${prefix}: citation.quote must be at least 12 characters of verbatim text.`);
		} else {
			const pageText = getPageText(doc, page);
			if (pageText === null) {
				errors.push(`${prefix}: Could not find Page ${page} in "${doc}".`);
			} else {
				const normQuote = normalizeWhitespace(quote);
				if (!pageText.includes(normQuote)) {
					errors.push(
						`${prefix}: Verbatim quote "${normQuote}" was NOT found on Page ${page} of "${doc}".`
					);
				}
			}
		}
	}
}

if (errors.length > 0) {
	console.error('❌ tips.json validation failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
	process.exit(1);
}

console.log(
	`✔ Validated ${tips.length} SP-404MKII tips (hardware IDs, 1:1 combo match, and verbatim quotes in docs/reference/).`
);
