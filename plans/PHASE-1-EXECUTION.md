# PHASE 1 EXECUTION — Flow foundations
### Plan: EGW-PROD-READY-2026 · Rubric: B1, B3, B5(min), A2, D3 (+C1 labeling)
### Agent session: 2026-07-13 · Depends: Phase 0 signed off

**Status:** `DONE — automated proof passed; manual operator evidence pending`

---

## CP-01 · Scope read

**In-scope (master §1.2 Phase 1):**
- `src/App.tsx`, `src/main.tsx`, `src/components/*` (existing), `index.html`, `src/index.css`
- NEW: `src/router.ts`, `src/components/Onboarding.tsx`, `src/components/ErrorBoundary.tsx`, `src/utils/backup.ts`

**Out of scope:** content files, `src/types.ts` (no schema change), payments, search depth (Phase P), Supabase sync UI (Phase 2).

**Current behavior (pre-change):**
- Nav state React-only — refresh lost place.
- Guided chapter list `hidden lg:block` — mobile lost chapter nav.
- localStorage: `egw-reading-zoom`, `egw-explored-chapters`, `egw-saved-notes`.

---

## CP-02 · Change list

| ID | Change | Rubric | Applied |
|---|---|---|---|
| P1-1 | Hash router `#/book/:id/chapter/:id?tab=&guided=` | B3 | yes |
| P1-2 | ErrorBoundary parchment fallback + Reload | D3 | yes |
| P1-3 | First-run Onboarding overlay | B1 | yes |
| P1-4 | Mobile chapter bottom sheet in guided mode | A2 | yes |
| P1-5 | `backup.ts` full JSON export/import merge + Notes Log UI | B5min | yes |
| P1-6 | Persist/restore last-read book+chapter | B4 partial | yes |
| P1-7 | Coming Soon labels via `totalChapters > chapters.length` | C1 | yes |
| P1-8 | Add `@types/react` + `@types/react-dom` (dev) so class ErrorBoundary typechecks | D1/D5 | yes |

**Deps:** no runtime routing library. Dev-only React types added (project had none; `Component` was untyped JS).

**Operator authorization:** “Phase 0 signed off — proceed Phase 1” (2026-07-13).

---

## CP-03 · Atomic apply

Files created/modified:
- NEW `src/router.ts`
- NEW `src/utils/backup.ts`
- NEW `src/components/ErrorBoundary.tsx`
- NEW `src/components/Onboarding.tsx`
- NEW `scripts/phase1-smoke.mts` (proof harness)
- MOD `src/main.tsx` — wrap `<ErrorBoundary>`
- MOD `src/App.tsx` — route sync, onboarding, drawer, backup UI, coverage labels, last-read
- MOD `package.json` / `package-lock.json` — `@types/react`, `@types/react-dom`

---

## CP-04 · Proof

### Typecheck / build
```
npm run typecheck  → exit 0
npm run build      → ✓ built (chunk ~1.55 MB — Phase P code-split still pending)
```

### Router + backup merge (`npx tsx scripts/phase1-smoke.mts`)
```
hash #/book/great-controversy/chapter/gc-1?tab=notes&guided=1
parsed {"bookId":"great-controversy","chapterId":"gc-1","tab":"notes","guided":true}
roundtrip true
import {"ok":true,"mergedKeys":["egw-explored-chapters","egw-saved-notes","egw-onboarding-done"]}
notes {"steps-to-christ-sc-1":"keep me","great-controversy-gc-1":"imported"}
explored {"sc-1":true,"gc-1":true}
onboarding 1
```
Merge preserved existing note key while adding imported key (HS-14).

### Manual UI checks (operator)
- [ ] Refresh mid-guided-read restores hash state
- [ ] Browser back moves between chapter hashes
- [ ] ≤390px guided mode: Chapters button opens bottom sheet
- [ ] Notes Log → Export all data → wipe keys → Import → reload restores

---

## CP-05 · Regression / quality

- Existing localStorage keys still read/written; new keys additive only.
- Anonymous/local use unchanged (onboarding dismissible once; no auth wall).
- Victorian visual language preserved (parchment ErrorBoundary + Onboarding).
- No content file edits (HS-13).

**Flags (not changed):**
- `Home.tsx` / `BookDetail.tsx` unused by App; still have older “Preview — N of M” wording.
- Main JS bundle still ~1.5 MB (Phase P).
- Hash updates use `location.hash` (adds history entries) — good for back button; rapid chapter clicks create many entries.

---

## CP-06 · Change report (A.7)

**Phase:** 1 — Flow foundations  
**Date:** 2026-07-13

### What shipped
1. Hash deep-linking for book / chapter / tab / guided mode.
2. Root ErrorBoundary with parchment fallback.
3. First-run onboarding stating companion + verification value prop; CTA opens guided read.
4. Mobile guided chapter bottom sheet (≥44px targets on primary controls touched).
5. Full backup export/import (merge-only) from Notes Log.
6. Last-read restore when hash absent.
7. In-app Coming Soon / Complete coverage labels on Active Library + Book Shelf.

### Operator sign-off required
Reply **“Phase 1 signed off — proceed Phase 2”** (or request changes) before Phase 2 CP-01.

| Field | Value |
|---|---|
| Operator | `[ pending ]` |
| Date | `[ pending ]` |
| Decision | `[ ] approved · [ ] changes requested` |
