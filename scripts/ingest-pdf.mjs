import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Repeatable PDF-to-Markdown Reference Ingestion Pipeline
 *
 * Usage:
 *   npm run docs:ingest -- --pdf /path/to/manual.pdf --slug roland-v550 --title "Roland SP-404MKII Reference Manual v5.50"
 *   npm run docs:ingest -- --text /tmp/extracted.txt --slug roland-v550 --title "Roland SP-404MKII Reference Manual v5.50"
 */

function parseArgs(argv) {
	const args = {};
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg.startsWith('--')) {
			const key = arg.slice(2);
			const next = argv[i + 1];
			if (next && !next.startsWith('--')) {
				args[key] = next;
				i++;
			} else {
				args[key] = 'true';
			}
		}
	}
	return args;
}

const ROLAND_V550_CHAPTERS = [
	{
		file: '01-introduction-and-panel.md',
		title: 'Introduction & Panel Descriptions',
		startPage: 5,
		endPage: 18
	},
	{
		file: '02-playing-back-samples.md',
		title: 'Playing Back Samples (SAMPLE MODE)',
		startPage: 19,
		endPage: 29
	},
	{
		file: '03-using-effects.md',
		title: 'Using the Effects (BUS FX & MFX)',
		startPage: 30,
		endPage: 35
	},
	{
		file: '04-sampling-looper-soundgen.md',
		title: 'Sampling, Skip-Back, Looper & Sound Generator',
		startPage: 36,
		endPage: 47
	},
	{
		file: '05-editing-samples.md',
		title: 'Editing a Sample (SAMPLE EDIT & CHOP)',
		startPage: 48,
		endPage: 63
	},
	{
		file: '06-pattern-sequencer.md',
		title: 'Pattern Sequencer & TR-REC',
		startPage: 64,
		endPage: 88
	},
	{
		file: '07-tempo-and-dj-mode.md',
		title: 'Setting Tempo & DJ Mode',
		startPage: 89,
		endPage: 100
	},
	{
		file: '08-monitoring-inputs-projects.md',
		title: 'Cue Monitoring, External Inputs, USB & Projects',
		startPage: 101,
		endPage: 110
	},
	{
		file: '09-utility-and-sd-card.md',
		title: 'Utility Settings & SD Card Import/Export',
		startPage: 111,
		endPage: 134
	},
	{
		file: '10-appendix-parameters-mfx.md',
		title: 'Appendix: Parameter Guide & MFX List',
		startPage: 135,
		endPage: 159
	},
	{
		file: '11-appendix-shortcut-keys.md',
		title: 'Appendix: List of Shortcut Keys',
		startPage: 160,
		endPage: 164
	},
	{
		file: '12-appendix-specs-midi.md',
		title: 'Appendix: Error Messages, Diagram, Specs & MIDI',
		startPage: 165,
		endPage: 175
	}
];

function cleanPageText(rawPage) {
	return rawPage
		.replace(/\r\n/g, '\n')
		.split('\n')
		.map((line) => line.replace(/\s+$/g, ''))
		.join('\n')
		.replace(/\n{4,}/g, '\n\n\n')
		.trim();
}

function siphonShortcutsAndMemos(pages) {
	const findings = [];
	const comboRegex =
		/(\[(?:SHIFT|REMAIN|VALUE|DEL|COPY|MFX|REC|RESAMPLE|PATTERN SELECT|PATTERN EDIT|RECORD SETTING|START\/END|PITCH\/SPEED|MARK|BPM SYNC|GATE|LOOP|REVERSE|ROLL|EXIT|BUS FX|HOLD|EXT SOURCE|SUB PAD)[^\]]*\]\s*\+\s*(?:\[[^\]]+\]|pad\s*\[\d+\]|pads\s*\[1\]–\[16\]))/i;

	pages.forEach((rawPage, idx) => {
		const pageNum = idx + 1;
		const lines = cleanPageText(rawPage).split('\n');
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;

			if (/^(MEMO|NOTE)\b/.test(line)) {
				const snippet = lines
					.slice(i, Math.min(lines.length, i + 5))
					.map((l) => l.trim())
					.filter(Boolean)
					.join(' ');
				findings.push({ page: pageNum, type: RegExp.$1, text: snippet });
			} else if (comboRegex.test(line)) {
				const snippet = lines
					.slice(i, Math.min(lines.length, i + 3))
					.map((l) => l.trim())
					.filter(Boolean)
					.join(' ');
				findings.push({ page: pageNum, type: 'COMBO', text: snippet });
			}
		}
	});

	return findings;
}

function buildAutoChapters(totalPages, slug) {
	if (slug === 'roland-v550' && totalPages >= 170) {
		return ROLAND_V550_CHAPTERS;
	}
	if (totalPages <= 30) {
		return [
			{
				file: `${slug}.md`,
				title: 'Complete Reference Document',
				startPage: 1,
				endPage: totalPages
			}
		];
	}
	const chunkSize = 20;
	const chapters = [];
	let part = 1;
	for (let start = 1; start <= totalPages; start += chunkSize) {
		const end = Math.min(totalPages, start + chunkSize - 1);
		const num = String(part).padStart(2, '0');
		chapters.push({
			file: `${num}-pages-${start}-to-${end}.md`,
			title: `Pages ${start}–${end}`,
			startPage: start,
			endPage: end
		});
		part++;
	}
	return chapters;
}

function main() {
	const args = parseArgs(process.argv.slice(2));
	const slug = args.slug;
	const pdfPath = args.pdf;
	const textPath = args.text;
	const title = args.title || `Reference Document (${slug})`;
	const outFilename = args.outfile;

	if (!slug || (!pdfPath && !textPath)) {
		console.error(
			'Usage: node scripts/ingest-pdf.mjs --slug <folder-name> (--pdf <file.pdf> | --text <extracted.txt>) [--title "Title"] [--outfile <name.md>]'
		);
		process.exit(1);
	}

	let rawText;
	let sourceLabel;
	let sha256;

	if (pdfPath) {
		const resolvedPdf = path.resolve(pdfPath);
		const buf = fs.readFileSync(resolvedPdf);
		sha256 = crypto.createHash('sha256').update(buf).digest('hex');
		sourceLabel = path.basename(resolvedPdf);
		rawText = execFileSync('pdftotext', ['-layout', resolvedPdf, '-'], {
			encoding: 'utf8',
			maxBuffer: 50 * 1024 * 1024
		});
	} else {
		const resolvedTxt = path.resolve(textPath);
		const buf = fs.readFileSync(resolvedTxt);
		sha256 = crypto.createHash('sha256').update(buf).digest('hex');
		sourceLabel = args.sourceName || path.basename(resolvedTxt);
		rawText = buf.toString('utf8');
	}

	const rawPages = rawText.split('\f');
	// Remove trailing empty form-feed page if present
	while (rawPages.length > 0 && rawPages[rawPages.length - 1].trim() === '') {
		rawPages.pop();
	}

	const outDir = path.resolve('docs/reference', slug);
	fs.mkdirSync(outDir, { recursive: true });

	const chapters = outFilename
		? [
				{
					file: outFilename,
					title,
					startPage: 1,
					endPage: rawPages.length
				}
			]
		: buildAutoChapters(rawPages.length, slug);

	for (const ch of chapters) {
		const lines = [
			`# ${ch.title}`,
			'',
			`> **Source**: ${title} (Pages ${ch.startPage}–${ch.endPage})`,
			''
		];

		for (let p = ch.startPage; p <= Math.min(ch.endPage, rawPages.length); p++) {
			const cleaned = cleanPageText(rawPages[p - 1] || '');
			lines.push(`<!-- [Page ${p}] -->`);
			lines.push(`## Page ${p}`);
			lines.push('');
			lines.push('```text');
			lines.push(cleaned);
			lines.push('```');
			lines.push('');
		}

		fs.writeFileSync(path.join(outDir, ch.file), lines.join('\n'));
	}

	const findings = siphonShortcutsAndMemos(rawPages);
	const shortcutLines = [
		`# Auto-Extracted Shortcuts & MEMO Blocks — ${title}`,
		'',
		`> Automatically siphoned ${findings.length} candidate entries from ${rawPages.length} pages.`,
		''
	];

	for (const item of findings) {
		shortcutLines.push(`- **[Page ${item.page}] (${item.type})**: ${item.text}`);
	}
	shortcutLines.push('');

	fs.writeFileSync(path.join(outDir, 'EXTRACTED_SHORTCUTS.md'), shortcutLines.join('\n'));

	if (!outFilename) {
		const indexLines = [
			`# ${title}`,
			'',
			`- **Slug**: \`${slug}\``,
			`- **Source File**: \`${sourceLabel}\``,
			`- **Total Pages**: ${rawPages.length}`,
			`- **Text SHA-256**: \`${sha256.slice(0, 16)}...\``,
			'',
			'## Chapters',
			'',
			...chapters.map(
				(ch) => `- [${ch.title}](./${ch.file}) (Pages ${ch.startPage}–${ch.endPage})`
			),
			`- [Auto-Extracted Shortcuts & MEMO Blocks](./EXTRACTED_SHORTCUTS.md) (${findings.length} items)`,
			''
		];
		fs.writeFileSync(path.join(outDir, 'INDEX.md'), indexLines.join('\n'));
	}

	console.log(
		`✔ Ingested "${title}" (${rawPages.length} pages) into docs/reference/${slug}/ (${chapters.length} chapter files, ${findings.length} siphoned shortcuts/memos).`
	);
}

main();
