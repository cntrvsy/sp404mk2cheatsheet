# Roland SP-404MKII Interactive Cheat Sheet

A fast, visual, interactive shortcut finder and workflow companion for the **Roland SP-404MKII** (Official Firmware v5.50).

> **Philosophy:** This site is **not** meant to replace the 175-page Roland Reference Manual. Instead, it bridges the gap between YouTube tutorials and the official documentation—giving you a single, scannable source of foundational controls, hidden sub-mode shortcuts, and critical hardware `NOTE`/`MEMO` caveats, 100% verified against the official Roland SP-404MKII Reference Manual (v5.50).

---

## Key Features

- **Bidirectional Hardware Faceplate ↔ Card Highlighting:**
  - **Hardware → Cards:** Click any knob, FX button, function button, bank, or pad on the interactive SP-404MKII faceplate to filter the cheat sheet down to every shortcut that uses that control (sorted from single-button fundamentals to multi-button combos).
  - **Card → Hardware:** Click any shortcut card to light up its exact button combination on the faceplate and preview the combo inside the circular OLED display without losing your current card list.
- **1:1 Hardware Muscle Memory + Mobile Thumb Zoom:** Preserves the exact 1:1 physical row/column geometry of the SP-404MKII across desktop and mobile screens (including iPhone SE), with an instant `🔍 Thumb Zoom` toggle for expanded touch targets.
- **Essentials vs. Deep Dive Filtering & `⚠️ Caveat` Callouts:** Filter between everyday foundational controls (`Essentials`) and B-tier sub-mode workflows (`Deep Dive`), with inline `⚠️` warnings highlighting destructive actions, voice-stealing costs, and Bus FX routing behavior.
- **Goal & Slang Search (MiniSearch):** Search by what you are _trying to accomplish_ (e.g., _"stems"_, _"choke group"_, _"16 levels"_, _"lazy chop"_, _"sound generator"_, _"silent select"_) even if you don't know Roland's official menu terminology.
- **My Sheet & Print View:** Pin your personal go-to shortcuts into a persistent `localStorage` sheet and print a clean 1-page physical studio sheet.

---

## Committed Reference Corpus (`docs/reference/roland-v550/`)

To avoid unverified hearsay or custom-ROM drift, public crowd-sourced submissions are retired. Every shortcut in the app is backed by the committed Markdown extraction of the **[Official Roland SP-404MKII Reference Manual (v5.50)](./docs/reference/roland-v550/INDEX.md)**:

- Extracted into 12 chapter Markdown files with `<!-- [Page N] -->` anchors preserved on every page boundary.
- Includes the complete **[List of Shortcut Keys (Pages 160–164)](./docs/reference/roland-v550/11-appendix-shortcut-keys.md)** and **[Auto-Extracted Shortcuts & MEMO Blocks](./docs/reference/roland-v550/EXTRACTED_SHORTCUTS.md)**.

---

## Ingesting a New PDF Document (`npm run docs:ingest`)

Whenever a new official manual or reference PDF is released (e.g., a future Roland Firmware v6.0 Reference Manual), run the ingestion pipeline to extract it into its own dedicated folder under `docs/reference/<slug>/`:

```sh
npm run docs:ingest -- --pdf /path/to/SP-404mk2_v600_reference.pdf --slug roland-v600 --title "Roland SP-404MKII Reference Manual v6.00"
```

What [`scripts/ingest-pdf.mjs`](./scripts/ingest-pdf.mjs) generates in `docs/reference/<slug>/`:

- `INDEX.md` — Source filename, page count, SHA-256 hash, and chapter index.
- Chapter `.md` files with `<!-- [Page N] -->` markers for exact page citations.
- `EXTRACTED_SHORTCUTS.md` — Auto-siphoned `MEMO`, `NOTE`, and bracketed `[BUTTON] + [BUTTON]` combinations so you can easily `diff` shortcut changes between firmware versions.

---

## Closed-Loop Tip Verification (`scripts/validate-tips.mjs`)

Every tip in [`src/lib/data/tips.json`](./src/lib/data/tips.json) is checked automatically by [`scripts/validate-tips.mjs`](./scripts/validate-tips.mjs) on `npm run check` and in GitHub Actions CI:

1. **Strict 1-to-1 `combo` ↔ `buttons` Matching:** `tip.buttons` must match the exact canonical hardware button IDs represented in `tip.combo`—preventing false-positive highlights on the faceplate.
2. **Verbatim Quote Verification:** Every tip requires a `citation` object (`{ doc, page, quote }`). The validator opens `citation.doc`, locates `<!-- [Page N] -->`, and verifies that `citation.quote` **literally exists verbatim on that page**. Any hallucinated or unverified shortcut immediately fails the build.

---

## Local Development

```sh
# Install dependencies
npm install

# Start local dev server (includes Svelte Inspector via Alt+X)
npm run dev

# Validate tips.json (schema + 1:1 buttons + verbatim quotes) & run svelte-check
npm run check

# Check formatting and ESLint rules
npm run lint

# Build static production site into ./build
npm run build
```

---

## Deployment (GitHub Pages)

Automated deployment is configured in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. In your GitHub repository, navigate to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`. GitHub Actions will run `npm run check` (executing the verbatim tip validator and `svelte-check`), build the static site with `BASE_PATH` configured in [`vite.config.ts`](./vite.config.ts), and publish to GitHub Pages.
