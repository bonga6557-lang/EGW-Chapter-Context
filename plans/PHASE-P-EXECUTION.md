# PHASE P EXECUTION — Performance, polish, tests, analytics
### Plan: EGW-PROD-READY-2026 · Rubric: A4, A6, A7, A8, B6, D4, D5
### Agent session: 2026-07-13 · Depends: Phase 2 signed off

**Status:** `DONE — local proof passed; Lighthouse/operator sign-off pending`

---

## CP-02 / CP-03 applied

| ID | Change |
|---|---|
| PP-1 | Per-book dynamic `import()` via `src/data/loadBooks.ts` + `book-*.ts` |
| PP-2 | Cultural JPGs archived to `assets/originals/cultural/`, recompressed, `loading="lazy"` |
| PP-3 | Reduced-motion: DustMotes skipped; CSS kills shimmer/breath/transforms |
| PP-4 | Focus-visible rings; search Escape + outside-click; parchment contrast assist |
| PP-5 | `searchBooks()` deep index + match reason/snippet |
| PP-6 | Meta/OG/favicon; per-route `document.title` |
| PP-7 | Vitest: router, quiz score, backup, sync helpers, search |
| PP-8 | `track()` analytics hook + footer “Send feedback” mailto |
| PP-9 | Optional GoatCounter script loader wired through `VITE_GOATCOUNTER_CODE` |
| PP-10 | Loaded-content verification metadata normalized and regression-tested |
| PP-11 | GitHub Actions CI added for install/typecheck/test/build |

---

## CP-04 · Proof

### Bundle size (before → after code-split)

| Asset | Before (Phase 2) | After (Phase P) |
|---|---|---|
| Main JS | `index-CcrgvTRy.js` **1,752 kB** (gzip ~509) | `index-BizRC08e.js` **152.17 kB** (gzip 38.35) |
| STC book chunk | (in main) | **238 kB** |
| GC book chunks | (in main) | shell **16.04 kB** + chapter buckets **26.09-401.55 kB** |
| Preview books | (in main) | ~3–4 kB each |
| Quizzes shared | (in main) | **290 kB** |

Entry shell is ~**91% smaller** raw; book data and vendor/runtime libraries load as separate chunks.

### Tests
```
npm test → 7 files, 12 tests, 0 failures
```

### Typecheck / build
```
npm run typecheck → exit 0
npm run build     → exit 0
```

### Images
| File | Original | Compressed |
|---|---|---|
| printing-press.jpg | 212,686 | 118,316 |
| revival-tent.jpg | 245,720 | 137,875 |
| sanitarium.jpg | 388,977 | 218,384 |

Originals: `assets/originals/cultural/`.

### Content verification metadata
```
Loaded data audit → 6 books, 59 chapters, 426 historical sources,
112 scholarly references, 169 EGW quotes, 0 unverified, 0 missing URLs/notes
```

### Lighthouse
- [ ] Operator: run Lighthouse mobile on deployed/preview URL; paste ≥85 score.
  (Not run in this agent session — needs Chrome + served HTTPS/local preview.)

---

## CP-06 · Change report

**Commit:** pending  
**Payments:** still deferred.

### Remediation notes
- `src/data/normalizeBooks.ts` fills omitted verification URLs/notes at load time using the same resolver path the UI already used.
- `tests/contentVerification.test.ts` now fails if loaded shipped content contains `quoteType: "unverified"` or missing verification metadata.
- `tests/analytics.test.ts` verifies the optional GoatCounter loader.
- `.github/workflows/ci.yml` runs the reproducible local gates in CI.

### Sign-off
Reply **“Phase P signed off”** (next: Phase C content / Phase V business gates — not coding-agent phases for content/legal).

| Field | Value |
|---|---|
| Operator | `[ pending ]` |
| Date | `[ pending ]` |
| Decision | `[ ] approved · [ ] changes requested` |
