# Roland SP-404MKII Interactive Cheat Sheet

A fast, visual shortcut finder and hardware companion for the **Roland SP-404MKII** (Firmware v5.50), built with SvelteKit and TypeScript.

🔗 **Live Tool:** [SP-404MKII Cheat Sheet](https://cntrvsy.github.io/sp404mk2cheatsheet/)

---

## Features

- **Bidirectional Hardware Highlighting:** Click knobs, pads, or buttons on the virtual faceplate to filter matching shortcuts. Click any card to preview the button combo and OLED screen state.
- **Physical Muscle-Memory Layout:** Preserves 1:1 hardware geometry across mobile and desktop, with a thumb-zoom toggle for touch targets.
- **Cross-Gear DAW / Slang Search:** Search using MPC, Ableton, FL Studio, or community terms (_"choke group"_, _"one shot"_, _"16 levels"_, _"lazy chop"_, _"resample bounce"_) via [`src/lib/data/aliases.json`](./src/lib/data/aliases.json).
- **Curated Studio Sheet & PDF:** Pin go-to shortcuts into a custom sheet and export a high-density, ink-friendly 1–2 page reference table.
- **Strict Verification:** 101 shortcuts with verbatim citations checked against the official Roland Reference Manual on every build.

---

## Verification Pipeline

To eliminate hearsay and firmware drift, all data is verified against the manual:

- **Reference Corpus ([`docs/reference/roland-v550/`](./docs/reference/roland-v550/)):** Roland v5.50 manual chapters extracted with page anchors (`<!-- [Page N] -->`).
- **Closed-Loop CI Validator ([`scripts/validate-tips.mjs`](./scripts/validate-tips.mjs)):** Runs during `npm run check` to ensure:
  1. Tip `buttons` exactly match the hardware IDs in `combo`.
  2. Each tip's `citation.quote` exists verbatim on the referenced manual page.
  3. Search aliases in `aliases.json` maintain 1:1 coverage without keyword bloat.
- **PDF Ingestion ([`scripts/ingest-pdf.mjs`](./scripts/ingest-pdf.mjs)):** Parses new manuals into chapter markdown files with auto-extracted shortcuts:
  ```sh
  npm run docs:ingest -- --pdf /path/to/manual.pdf --slug roland-v600 --title "Roland SP-404MKII Manual v6.00"
  ```

---

## Porting to Other Samplers (SP-303, SP-404SX, etc.)

The engine is modular and can be adapted for any hardware device:

1. **Ingest Manual:** Run `npm run docs:ingest -- --pdf <file.pdf> --slug <id> --title "<title>"` to generate anchored chapter markdown.
2. **Define Hardware Types ([`src/lib/types.ts`](./src/lib/types.ts)):** Update `Category`, `CATEGORIES`, and button IDs (e.g. 8 pads for SP-303, 12 for SP-404SX).
3. **Update Validator ([`scripts/validate-tips.mjs`](./scripts/validate-tips.mjs)):** Align `VALID_CATEGORIES` and `comboTokenToButtons()` with your machine's conventions.
4. **Author Tips & Slang:** Populate [`src/lib/data/tips.json`](./src/lib/data/tips.json) with verbatim quotes and map colloquial terms in [`src/lib/data/aliases.json`](./src/lib/data/aliases.json).
5. **Adapt Faceplate ([`src/lib/components/Faceplate.svelte`](./src/lib/components/Faceplate.svelte)):** Adjust the SVG layout and control arrays (`topKnobs`, `fxButtons`, `pads`) to match the hardware's front panel.

---

## Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Run tip citation validator and Svelte type-checking
npm run check

# Check code formatting and ESLint rules
npm run lint

# Build static production site (./build)
npm run build
```

---

## License & Attribution

- Built with ❤️ by **[frstudios](https://frstudios.co.ke)**
- Repository: **[github.com/cntrvsy/sp404mk2cheatsheet](https://github.com/cntrvsy/sp404mk2cheatsheet)**
- Licensed under the **[MIT License](./LICENSE)**
- _Disclaimer:_ Roland and SP-404MKII are registered trademarks of Roland Corporation. This project is an independent educational tool.
