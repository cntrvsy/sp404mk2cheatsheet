# Roland SP-404MKII Interactive Cheat Sheet

A fast, visual, interactive shortcut finder and workflow companion for the **Roland SP-404MKII**.

> **Philosophy:** This site is **not** meant to replace the Roland Reference Manual. Instead, it serves as a single, searchable source of practical workflow ideas, hidden button combinations, and muscle-memory shortcuts that beatmakers actually use in a session.

---

## Key Features

- **Interactive SP-404MKII Hardware Faceplate:** Click any knob, FX button, function button, bank, or pad (including `SHIFT` + `PAD 1–16` and DJ Mode `B/G + C/H` combos) to filter the cheat sheet down to every shortcut that uses that control.
- **Goal & Slang Search (MiniSearch):** Search by what you are _trying to accomplish_ (e.g., _"stems"_, _"choke group"_, _"16 levels"_, _"finger drumming"_, _"declick"_) even if you don't know Roland's official menu terminology.
- **Structured Category Sections:** Browse cleanly grouped workflow sections by default, or pin your most-used combos into a persistent **My Sheet** view (`localStorage` + printable layout).
- **Progressive Disclosure UX:** Keeps the faceplate and cards calm by default, revealing `[SHIFT]` and DJ Mode sub-labels contextually when `SHIFT` or DJ banks are active or hovered.

---

## Ground-Truth Sources & Credits

Every tip in [`src/lib/data/tips.json`](./src/lib/data/tips.json) is explicitly attributed via a required `sources` field to community-vetted reference material:

1. **Roland SP404 MK2 Notes (C-Dub's Cheat Sheet)** — 15-page structured reference covering Sample Playback, Pattern Sequencer, TR-REC, Skip Back, Chop Menu, Pitch/Speed/Envelope, MFX/Bus FX, and Pad Modes.
2. **r/SP404 Community Tips & Tricks** — High-value workflow shortcuts curated and verified by SP-404MKII users (selective pattern sample copying, offline pattern-to-pad stem bouncing, Bus 1/2 flip, Bus 3/4 master toggle, Pad Mute latching, Microscope mode, etc.).
3. **Roland SP-404MKII Reference Manual** — Official hardware faceplate legends and mode combinations.

---

## Data Integrity: How We Prevent Bad or "Poisoned" Tips

Because a cheat sheet is only useful if you can trust every button combination on it, several guardrails protect [`src/lib/data/tips.json`](./src/lib/data/tips.json):

1. **No Direct Public Writes:** The site is a static SvelteKit build deployed from `main`. Clicking **+ Suggest a Tip** opens a structured GitHub Issue ([`.github/ISSUE_TEMPLATE/new-tip.yml`](./.github/ISSUE_TEMPLATE/new-tip.yml))—nothing goes live until reviewed and merged via Pull Request.
2. **Mandatory Source Attribution & Hardware Confirmation:**
   - Contributors submitting an issue must cite a verifiable reference (Manual page, Firmware release note, or community reference) and confirm they tested the combo on physical SP-404MKII hardware.
   - In code, every entry in `tips.json` **must** include a non-empty `sources` array (`"C-Dub's Cheat Sheet"`, `"r/SP404 Community"`, or `"Roland Manual"`).
3. **Automated Schema & Hardware Button Validator ([`scripts/validate-tips.mjs`](./scripts/validate-tips.mjs)):**
   - Runs automatically on `npm run check` and in GitHub Actions CI before any build or deployment.
   - Rejects any tip with an unknown hardware button ID in `buttons`, an invalid category, a duplicate `id`, or a missing/unrecognized `sources` citation.

---

## Local Development

```sh
# Install dependencies
npm install

# Start local dev server (includes Svelte Inspector via Alt+X)
npm run dev

# Validate tips.json schema/sources + run Svelte/TypeScript checks
npm run check

# Check formatting and ESLint rules
npm run lint

# Build static production site into ./build
npm run build
```

---

## Deployment (GitHub Pages)

This repository includes an automated GitHub Actions deployment workflow in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. In your GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`. GitHub Actions will run `npm run check` (validating all tips and types), build the static site with `BASE_PATH` configured automatically in [`vite.config.ts`](./vite.config.ts), and publish to GitHub Pages.
