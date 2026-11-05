---
name: sp404-reference
description: Official Roland SP-404MKII reference manual lookup, PDF ingestion pipeline, and closed-loop tip verification rules for sp404mk2cheatsheet. Use whenever adding, auditing, or modifying tips in src/lib/data/tips.json, updating hardware controls in Faceplate.svelte, or ingesting a new reference PDF.
---

# SP-404MKII Reference & Tip Verification Skill

Never guess, summarize from memory, or invent SP-404MKII button combinations. All shortcuts and hardware labels in this repository are strictly backed by the committed reference corpus in `docs/reference/` and enforced by `scripts/validate-tips.mjs`.

## 1. Where the Ground-Truth Reference Lives

Check `docs/reference/` before answering hardware questions or modifying `src/lib/data/tips.json`:

- **Official Roland Reference Manual (v5.50)**: [`docs/reference/roland-v550/INDEX.md`](../../../docs/reference/roland-v550/INDEX.md)
  - Consolidated Shortcut Appendix (Pages 160–164): [`docs/reference/roland-v550/11-appendix-shortcut-keys.md`](../../../docs/reference/roland-v550/11-appendix-shortcut-keys.md)
  - Auto-siphoned `MEMO`/`NOTE` & `[BUTTON]` combos: [`docs/reference/roland-v550/EXTRACTED_SHORTCUTS.md`](../../../docs/reference/roland-v550/EXTRACTED_SHORTCUTS.md)
- **Curated Community Reference Corpus**: [`docs/reference/community/INDEX.md`](../../../docs/reference/community/INDEX.md)
  - C-Dub's 15-page Cheat Sheet: [`docs/reference/community/c-dub-cheatsheet.md`](../../../docs/reference/community/c-dub-cheatsheet.md)
  - r/SP404 Community Tips: [`docs/reference/community/reddit-sp404-tips.md`](../../../docs/reference/community/reddit-sp404-tips.md)

## 2. Ingesting a New PDF Document (e.g., Future Firmware Manual)

When the user provides a new PDF manual or guide, ingest it into its own dedicated folder under `docs/reference/<slug>/` using `scripts/ingest-pdf.mjs`:

```sh
npm run docs:ingest -- --pdf /path/to/SP-404mk2_v600_reference.pdf --slug roland-v600 --title "Roland SP-404MKII Reference Manual v6.00"
```

This generates:

- `docs/reference/<slug>/INDEX.md`
- Chapter `.md` files with `<!-- [Page N] -->` anchors on every page boundary
- `docs/reference/<slug>/EXTRACTED_SHORTCUTS.md` (which you can `diff` against `docs/reference/roland-v550/EXTRACTED_SHORTCUTS.md` to see newly added firmware shortcuts)

## 3. Rules for Editing `src/lib/data/tips.json`

Every tip in `src/lib/data/tips.json` is validated by `scripts/validate-tips.mjs` during `npm run check`:

1. **1-to-1 `combo` ↔ `buttons` Alignment**:
   - `tip.buttons` must contain **strictly** the canonical hardware button IDs represented in `tip.combo`.
   - Do **not** add `"PAD"` to `buttons` if the shortcut uses `"SUB PAD"` or a specific `"PAD 1"`–`"PAD 16"`.
2. **Mandatory Verbatim `citation`**:
   - Every tip must include:
     ```json
     "citation": {
       "doc": "docs/reference/roland-v550/11-appendix-shortcut-keys.md",
       "page": 161,
       "quote": "Switches to sound generator mode."
     }
     ```
   - `citation.quote` (at least 12 characters) must literally exist on `citation.page` inside `citation.doc`.
3. **Always Run Validation**:
   - Run `npm run validate:tips` (or `npm run check`) after any change to `src/lib/data/tips.json`.
