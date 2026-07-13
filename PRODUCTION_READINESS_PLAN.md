# CODING AGENT PLAN — EGW Chapter Context: Road to Production
### Karpathy-Style · Checkpoint-Based · Zero-Hallucination · Zero-Bloat · Self-Documenting
### Template: CODING_AGENT_PLAN_TEMPLATE v1.4 · Target: PRODUCTION_READINESS_RUBRIC.md 🟢 verdict

---

## PLAN METADATA

| Field | Value |
|---|---|
| **Plan Name** | `EGW-PROD-READY-2026` |
| **Version** | `v1.4` |
| **Agent ID / Session** | `[ assigned at execution of each phase ]` |
| **Codebase / Repo** | `local: egw-chapter-context (NOT yet a git repo — Phase 0 fixes this)` |
| **Language / Stack** | `TypeScript + React 18 + Vite + Tailwind v4 + motion/react` |
| **Plan Author** | `Operator (bn638260@gmail.com) with Claude` |
| **Date Created** | `2026-07-13` |
| **Completion Target** | `[ operator to set — realistic estimate at bottom of §1 ]` |

---

> **AGENT PREAMBLE — READ THIS FIRST, EVERY TIME**
>
> This is a **master plan** covering the full road to a sellable product. It is executed as
> **six sequential phases**. Each phase is run as its own complete CP-01 → CP-06 cycle under
> this template's rules (read files, pre-generate code, operator sign-off, atomic apply-test
> loop, regression sweep, quality review, change report). No phase starts until the previous
> phase's CP-06 change report exists and the operator has signed off.
>
> Two workstreams in this plan are **not code** and are never executed by a coding agent:
> content authoring (Phase C — uses the `verified-research` skill under its own verification
> rules) and business gates (Phase V — rights review, pricing, willingness-to-pay evidence —
> operator-only). A coding agent finding itself writing chapter content or legal opinions has
> violated scope. HALT.
>
> All §0 anti-bloat, §3 tool-calling, §5 anti-hallucination, and §7 hard-stop rules of
> template v1.4 apply verbatim to every phase and are not restated here in full.

---

## § 0 · PRIME DIRECTIVE — MINIMAL, EFFECTIVE CODE

Template §0 applies unchanged. Phase-specific interpretation:

- **Phase 1 (routing/onboarding):** use a hash-based router or the smallest routing lib the
  bundle can justify; do NOT introduce a state-management library — existing `useState` +
  localStorage patterns stay.
- **Phase 2 (accounts/sync/payments):** integrate a managed backend (recommended: Supabase)
  rather than building auth, DB, and sync from scratch. Buying beats building here; the
  minimal code is glue code.
- **Everywhere:** the app already has more UI features than it needs (rubric verdict).
  Any new feature not traceable to a rubric criterion ID (A1–D5) is bloat. Reject it.

---

## § 1 · FULL SCOPE DEFINITION

### 1.1 What this plan accomplishes

```
Take the existing EGW Chapter Context app (client-only Vite/React study companion,
all data in localStorage, no root package.json, no git history, 2 of 6 books complete)
to the PRODUCTION_READINESS_RUBRIC.md "🟢 Charge for it" verdict:

  - Section A (UI) pass: mobile guided-mode navigation restored, reduced-motion support,
    code-split bundle, lazy images, a11y verified, OG/meta/favicon set.
  - Section B (Flow) pass: URL routing for book/chapter/tab state, first-run onboarding,
    full export/import of all user data, deeper search, "continue where you left off".
  - Section C (Value) pass: honest v1 positioning ("Great Controversy + Steps to Christ,
    complete"), remaining books labeled Coming Soon in-app, zero `unverified` quoteTypes
    in shipped content, explicit value-proposition screen, C7 rights sign-off recorded,
    C8 willingness-to-pay evidence collected.
  - Section D (Launch gate) pass: reproducible build (package.json committed, git repo,
    CI-able), Supabase auth + sync, Stripe (or operator-chosen) payment gating,
    React error boundary, privacy-respecting analytics, cross-browser smoke tests.

WHAT MUST NOT CHANGE:
  - The Victorian library visual identity (colors, parchment, typography).
  - The existing chapter data schema (src/types.ts) except additive optional fields.
  - The source-verification system (quoteType/sourceUrl/verifyNote) — it is the moat.
  - Existing localStorage keys keep working (migration reads them, never destroys them).
```

### 1.2 Files in scope — every file the agent is allowed to modify

```
Phase 0:  package.json (CREATE), .gitignore, vite.config.ts (CREATE if missing),
          README.md (CREATE), index.html
Phase 1:  src/App.tsx, src/main.tsx, src/components/* (existing), index.html,
          src/index.css, NEW: src/router.ts(x), src/components/Onboarding.tsx,
          src/components/ErrorBoundary.tsx, src/utils/backup.ts
Phase 2:  NEW: src/lib/supabase.ts, src/lib/sync.ts, src/components/Account.tsx,
          src/components/Paywall.tsx, supabase/* (migrations, edge functions),
          .env.example (never .env), src/App.tsx (integration points only)
Phase P:  src/App.tsx, src/index.css, vite.config.ts, src/data.ts (code-split imports),
          src/config/culturalImages.ts, test files under NEW: tests/
Phase C:  src/data/** (content files ONLY, via verified-research skill),
          src/data.ts (registration of new chapters)
Phase V:  PRODUCTION_READINESS_RUBRIC.md (score entries), docs/RIGHTS_REVIEW.md (CREATE),
          docs/PRICING.md (CREATE) — operator-authored
```

### 1.3 Files explicitly OUT of scope — must not be touched

```
node_modules/**              (never)
.env, any file with secrets  (never; .env.example only)
src/types.ts                 (except ADDITIVE optional fields, each requiring
                              operator approval in the phase's CP-02)
Existing verified content in src/data/gc-*.ts and stepsToChrist*.ts
                             (content edits only via verified-research skill,
                              never by a coding-phase agent)
assets/                      (unless a phase's CP-02 explicitly lists an image
                              for compression — originals are archived first)
```

### 1.4 Dependencies and external systems involved

```
Existing:  react, react-dom, motion/react, lucide-react, tailwindcss v4, vite
To add (each addition is a CP-02 line item requiring operator sign-off):
  Phase 1: ONE routing solution (recommend: hand-rolled hash router ~60 lines,
           zero deps; react-router only if hash router proves insufficient)
  Phase 2: @supabase/supabase-js; Stripe via Payment Links or supabase edge
           function (no stripe-js client dependency if Payment Links suffice)
  Phase P: vitest + @testing-library/react (dev-only); ONE privacy analytics
           snippet (recommend: Plausible or GoatCounter — no cookies, no consent
           banner needed)
External systems: Supabase project (operator creates), Stripe account (operator
           creates), deploy target (recommend: Netlify/Vercel/Cloudflare Pages),
           egwwritings.org + BibleGateway (outbound links only).
```

### 1.5 Definition of done

```
- Every rubric criterion A1–D5 scored ≥ its section's pass bar by the OPERATOR
  (not the agent), with the score written into PRODUCTION_READINESS_RUBRIC.md.
- All four rubric section pass bars met; launch verdict recorded as 🟢 or a
  deliberate, documented 🟡 soft-launch decision.
- `npm ci && npm run build` succeeds from a clean clone; app deployed on HTTPS.
- tsc --noEmit: 0 errors. Full test suite: 0 failures. Smoke tests pass on
  Chrome, Firefox, Safari, iOS Safari, Android Chrome (evidence: screenshots +
  test output in each phase's §6).
- A paying user can: sign up → pay → access gated content → take notes on one
  device → see them on another → export everything → cancel.
- docs/RIGHTS_REVIEW.md exists and is signed by the operator (C7 hard gate).
- Each phase has its CP-06 Change Report in its §6 A.7.
```

**Realistic effort estimate (for the operator's completion-target field):**
Phase 0 ≈ half a day · Phase 1 ≈ 3–5 days · Phase 2 ≈ 1–2 weeks · Phase P ≈ 3–5 days ·
Phase C ≈ dominated by content authoring (Desire of Ages ≈ 87 chapters — weeks-to-months;
v1 repositioning path avoids blocking launch on it) · Phase V ≈ 2 weeks calendar time
(user interviews). Code phases can overlap Phase C/V.

> **Agent instruction:** A phase agent reads THIS §1 plus its phase brief in §2, then runs
> template CP-01 against the phase's §1.2 file list. Blank fields above = plan not started.

---

## § 2 · CHECKPOINT EXECUTION PLAN

> **Master sequencing rule:** Phases run 0 → 1 → 2 → P, with C and V in parallel from day 1.
> Launch requires 0,1,2,P complete + V complete + C's v1 subset complete.
> Within each phase, template checkpoints CP-01 → CP-06 run sequentially and non-skippably.
> The blocks below are the PHASE BRIEFS — they define each phase's mission, its rubric
> criteria, and its phase-specific proof bar. The full CP-01…CP-06 machinery from template
> v1.4 is instantiated fresh per phase in a working copy named
> `plans/PHASE-<id>-EXECUTION.md` (created at phase start from the template).

---

### ◆ PHASE 0 · Repo hygiene & reproducible build — rubric D1

**Status:** `[ PENDING ]` · **Blocks:** all other phases

#### Mission
1. `git init`, first commit of current state (the safety net every later phase's
   CP-03 revert steps depend on — nothing else may run before this).
2. Create root `package.json` with every dependency currently in node_modules that
   src/ actually imports (determine by grep, not memory), pinned versions, scripts:
   `dev`, `build`, `preview`, `typecheck` (tsc --noEmit), `test` (placeholder until Phase P).
3. Verify `npm ci && npm run build && npm run typecheck` from a clean clone in a temp dir.
4. Create README.md: what the app is, how to run it, content-verification policy pointer.
5. Fix any pre-existing type errors surfaced by the first-ever full typecheck
   (log them as pre-existing failures per CP-02 Phase C rules).

#### Phase proof bar (in addition to template CP proofs)
- [ ] Paste of successful clean-clone `npm ci && npm run build` output.
- [ ] `git log --oneline` showing baseline commit + phase commits.

---

### ◆ PHASE 1 · Flow foundations — rubric B1, B3, B5(min), A2, D3

**Status:** `[ PENDING ]` · **Depends:** Phase 0

#### Mission (each item = one or more CHANGE N blocks in this phase's CP-02)
1. **URL routing (B3):** hash-based router reflecting `#/book/:bookId/chapter/:chapterId`
   + active tab + guided-mode flag. Refresh, back button, and shared links restore exact
   state. Existing state-lifting in App.tsx is rewired, not duplicated.
2. **Error boundary (D3):** one `ErrorBoundary` at the App root with a styled
   (parchment-consistent) fallback + "reload" action. A deliberately corrupted chapter
   datum in a dev test must not white-screen the app.
3. **Onboarding (B1):** first-run overlay (localStorage flag) — one screen, three beats:
   what this is (context companion, not the book text), what makes it different
   (verified scholarship layer), one button starting the first guided read.
   No multi-step wizard. No animation beyond existing motion idioms.
4. **Mobile guided-mode navigation (A2):** the chapter list currently `hidden lg:block`
   in guided mode gets a mobile affordance (drawer or bottom sheet using existing
   AnimatePresence patterns). Tap targets audited ≥ 44px on the three primary flows.
5. **Full export/import (B5 minimum):** `src/utils/backup.ts` — single JSON export of
   ALL localStorage app keys (notes, explored, zoom, onboarding flag) + import with
   validation and a non-destructive merge. UI entry point in Notes Log tab.
6. **Continue where you left off (B4 partial):** last-read book/chapter persisted;
   Study Desk opens there instead of always sc-1.

#### Phase proof bar
- [ ] Screen recording or screenshot series: refresh mid-guided-read restores state;
      back button works; mobile (≤ 390px) guided mode shows chapter navigation.
- [ ] Export → wipe localStorage → import → all notes/progress restored (pasted evidence).

---

### ◆ PHASE 2 · Accounts, sync, payments — rubric B5(full), D2

**Status:** `[ PENDING ]` · **Depends:** Phase 1 · **Operator decisions required BEFORE CP-02:**

```
DECISION 2a — Backend: Supabase (RECOMMENDED: free tier, Postgres, auth + row-level
              security in one) vs Firebase vs custom. Operator picks; plan assumes Supabase.
DECISION 2b — Payments: Stripe Payment Links + entitlement check (RECOMMENDED, least code)
              vs full Stripe Checkout integration vs Gumroad license keys.
DECISION 2c — Pricing model (feeds Phase V docs/PRICING.md): one-time vs subscription vs
              church/group license. Gating boundary: which books/features are free tier.
```

#### Mission
1. **Auth:** email magic-link sign-in (no passwords to manage). Anonymous/local use
   keeps working forever — accounts are additive, never a wall in front of free content.
2. **Sync:** notes + explored-chapters synced to Supabase with row-level security;
   local-first (localStorage remains source of truth offline; last-write-wins with
   updated-at timestamps; conflicts logged, never silently dropped). One-time migration
   prompt imports existing local data into the new account.
3. **Entitlements:** a `purchases` table keyed to user; Stripe webhook (Supabase edge
   function) writes entitlement on successful payment; client gates paid content on
   entitlement. IMPORTANT: client-side gating is UX only — paid chapter data must not
   ship in the free bundle (this interacts with Phase P code-splitting; the split
   boundary is the entitlement boundary).
4. **Account UI:** sign in/out, purchase state, restore purchase, delete-my-data
   (GDPR-shaped, also required by app-store rules if ever wrapped).

#### Phase proof bar
- [ ] End-to-end evidence: new user signs up on device A → buys (Stripe test mode) →
      gated content unlocks → note written on A appears on device B. Screenshots + logs.
- [ ] Evidence that unauthenticated bundle does NOT contain gated chapter data
      (grep of built assets pasted).
- [ ] Secrets audit: no keys in client bundle beyond the public anon key.

---

### ◆ PHASE P · Performance, polish, tests, analytics — rubric A4, A6, A7, A8, B6, D4, D5

**Status:** `[ PENDING ]` · **Depends:** Phase 1 (can interleave with Phase 2)

#### Mission
1. **Code-split per book (A7):** `src/data.ts` moves to dynamic `import()` per book;
   measure bundle before/after (paste sizes). Cultural-history JPGs compressed +
   `loading="lazy"` (originals archived under assets/originals/ first).
2. **Reduced motion (A4):** `prefers-reduced-motion` disables dust motes, flame,
   shimmer, and nonessential transforms. Lighthouse mobile perf ≥ 85 (paste report).
3. **A11y pass (A6):** keyboard traversal of tabs/accordion/quiz/search; contrast fixes
   where parchment text fails AA; visible focus rings on the dark theme; search dropdown
   Escape/outside-click dismissal (also A8).
4. **Search depth (B6):** index historicalContext, hardPhrases, modernApplication,
   quote text; show match-reason snippet in results. Plain lowercase-includes is fine;
   no search library.
5. **Meta/OG/favicon (A8):** title, description, OG image, favicon in index.html;
   per-route document.title via the Phase 1 router.
6. **Tests (D5):** vitest + testing-library. Coverage floor: router state restore,
   quiz scoring, notes persistence + export/import round-trip, entitlement gating
   logic, search matching. CI script `npm test` wired into build.
7. **Analytics + feedback (D4):** privacy-respecting page/event analytics on the core
   loop (chapter opened, guided completed, quiz taken, export used) + a mailto/form
   feedback link in the footer.

#### Phase proof bar
- [ ] Bundle size table before/after code-splitting.
- [ ] Lighthouse mobile report ≥ 85 pasted.
- [ ] Full vitest output, 0 failures, with the listed flows covered.

---

### ◆ PHASE C · Content completion & trust — rubric C1, C2, C4 (NOT a coding-agent phase)

**Status:** `[ PENDING ]` · **Runs in parallel from day 1** · **Tooling:** `verified-research` skill only

#### Mission
1. **v1 repositioning (unblocks launch):** in-app labeling of Desire of Ages, Prophets &
   Kings, Patriarchs & Prophets, Counsels on Health as "Preview — full guide coming soon"
   (uses existing `totalChapters > chapters.length` signal in types.ts). Marketing copy
   sells "The Great Controversy + Steps to Christ, complete." (The small UI change here
   IS coding-agent work — attach it to Phase 1's CP-02.)
2. **Verification audit (C2):** sweep every existing historicalSource, scholarlyReference,
   egwQuote for quoteType coverage; zero `unverified` entries may ship in paid content;
   every verbatim quote has a sourceUrl. Audit result logged as a table in this phase's §6.
3. **Depth-consistency pass (C4):** rubric-score 5 random GC chapters + 3 StC chapters
   for teaching-prep depth; upgrade any outlier chapters.
4. **Next book:** Desire of Ages, chapter by chapter via verified-research, in published
   order, each chapter individually verified before registration in src/data.ts.
   v1 launch does NOT wait for this; it feeds the post-launch roadmap and the
   "coming soon" promise must state an honest cadence (e.g. "2 chapters/week").

#### Phase proof bar
- [ ] Audit table: file · quote count · quoteType breakdown · unverified count (must be 0
      for shipped books).
- [ ] Operator sign-off on the v1 catalog claim wording.

---

### ◆ PHASE V · Business gates — rubric C3, C5, C7, C8 (OPERATOR-ONLY)

**Status:** `[ PENDING ]` · **Runs in parallel; hard-gates launch**

#### Mission
1. **Rights review (C7 — HARD GATE):** written confirmation in docs/RIGHTS_REVIEW.md:
   EGW original texts public domain (author died 1915 — confirm per-edition, as later
   compilations can carry estate copyright); fair-use posture for modern scholarly
   quotes (Veltman etc.) in a COMMERCIAL product; "EGW" naming vs Ellen G. White Estate
   trademarks; image licenses for cultural-history JPGs. If any item is unclear,
   consult the EGW Estate directly and/or an IP attorney before charging.
2. **Value proposition & pricing (C3, C5):** docs/PRICING.md — named buyer personas
   (Sabbath School teachers, pastors, serious lay students, academy classes), the
   one-sentence differentiation claim, price points, and the group/church license offer.
   Feeds Phase 2 DECISION 2c.
3. **Willingness-to-pay evidence (C8):** ≥ 10 target-audience users on the free/beta
   deploy (Phase 1 output is sufficient to demo); structured notes; ≥ 3 stated-price
   commitments or pre-orders before flipping payments on.

#### Phase proof bar
- [ ] docs/RIGHTS_REVIEW.md signed and dated by operator.
- [ ] docs/PRICING.md complete.
- [ ] Interview log: 10+ entries, 3+ willingness-to-pay statements.

---

### ◆ FINAL GATE · Rubric scoring & launch decision

**Status:** `[ PENDING ]` · **Depends:** all phases

1. Operator scores every criterion in PRODUCTION_READINESS_RUBRIC.md with evidence links
   to phase §6 appendices.
2. All four section pass bars checked; no ×3 criterion below 3.
3. Verdict recorded: 🟢 charge / 🟡 soft launch / 🔴 not yet — with reasons.
4. If 🟢: enable Stripe live mode, announce, monitor analytics + feedback channel daily
   for the first two weeks.

---

## § 3 / § 3A / § 3B · TOOL CALLING, MICRO-TEST, QUALITY RUBRIC

Template v1.4 sections apply verbatim to every code phase. Additions specific to this plan:

- Phase C content work follows the `verified-research` skill's own verification protocol
  instead of §3A (content has no unit tests; its "test" is source verification, and its
  proof is the citation audit table).
- The §3B security category gets one project-specific hard requirement in Phase 2:
  **row-level security policies are written and tested for every Supabase table before
  any client code reads it.** An RLS-less table reachable from the client = Quality FAIL.

---

## § 4 · FAILURE MODES & COUNTERMEASURES

Template §4 applies verbatim. Project-specific additions:

**FAILURE:** Supabase/Stripe sandbox behaves differently from docs.
**COUNTERMEASURE:** Minimal reproduction in a scratch file per template §4; cite the exact
doc URL; never ship a workaround that bypasses the entitlement check.

**FAILURE:** localStorage migration corrupts or loses a beta user's notes.
**COUNTERMEASURE:** Migration NEVER deletes local keys (§1.1 invariant). Export-to-file is
offered before migration runs. Any report of data loss = P0, halt feature work.

**FAILURE:** A verified quote is challenged by a user as inaccurate.
**COUNTERMEASURE:** Treat as C2 breach: verify against primary source within 48h, correct
or annotate, log in a public corrections note. This is the product's reputation surface.

**FAILURE:** Content authoring (Phase C) falls behind the "coming soon" cadence promised in-app.
**COUNTERMEASURE:** Update the in-app promise to reality. Never let marketing copy state a
cadence the content pipeline is not meeting.

---

## § 5 · PROOF & ANTI-HALLUCINATION PROTOCOL

Template §5 applies verbatim, including all tripwires H.1–H.10, in every phase.
Master-plan addition: **a phase may not be marked DONE in this file's §2 until its
`plans/PHASE-<id>-EXECUTION.md` shows every checkpoint proof block filled and its §6 A.7
change report written.** Marking a phase DONE without that is tripwire H.5.

---

## § 6 · CODE APPENDIX

Per-phase appendices live in each phase's `plans/PHASE-<id>-EXECUTION.md` §6 (append-only,
per template). This master file keeps only the roll-up below.

### Master roll-up (append-only)

```
[ M.1 — <date> — Phase 0 completed — link: plans/PHASE-0-EXECUTION.md — commit: <sha> ]
[ M.2 — ... ]
```

---

## § 7 · HARD STOP RULES

Template HS-1 … HS-10 apply verbatim. Master-plan additions:

| # | Hard Stop Rule |
|---|---|
| **HS-11** | Never enable live payments before docs/RIGHTS_REVIEW.md is signed (rubric C7). |
| **HS-12** | Never ship a chapter containing a `quoteType: 'unverified'` entry in paid content (rubric C2). |
| **HS-13** | Never let a coding-phase agent author or edit chapter content; content changes go through the verified-research skill only. |
| **HS-14** | Never destroy or overwrite a user's localStorage data during migration or import; merges only, export offered first. |
| **HS-15** | Phase 2 may not begin CP-02 until the operator has answered DECISIONS 2a/2b/2c in writing. |

---

## PLAN COMPLETION SIGN-OFF

| Phase | Rubric criteria | Status | Proof location |
|---|---|---|---|
| Phase 0 — Repo & build | D1 | `[ ]` | plans/PHASE-0-EXECUTION.md |
| Phase 1 — Flow foundations | B1 B3 B5min A2 D3 (+C1 labeling) | `[ ]` | plans/PHASE-1-EXECUTION.md |
| Phase 2 — Accounts & payments | B5 D2 | `[ ]` | plans/PHASE-2-EXECUTION.md |
| Phase P — Perf, polish, tests | A4 A6 A7 A8 B6 D4 D5 | `[ ]` | plans/PHASE-P-EXECUTION.md |
| Phase C — Content & trust | C1 C2 C4 | `[ ]` | phase §6 audit tables |
| Phase V — Business gates | C3 C5 C7 C8 | `[ ]` | docs/RIGHTS_REVIEW.md · docs/PRICING.md |
| Final gate — Rubric scoring | all | `[ ]` | PRODUCTION_READINESS_RUBRIC.md scores |

**Launch verdict:** `[ 🟢 / 🟡 / 🔴 ]` · **Operator final sign-off:** `[ NAME · DATE ]`

---

*Master plan v1 · 2026-07-13 · Executes PRODUCTION_READINESS_RUBRIC.md under
CODING_AGENT_PLAN_TEMPLATE_v1.4 discipline · Code phases: 0, 1, 2, P · Non-code
workstreams: C (verified-research), V (operator) · Hard gates: C7 rights, C2 verification,
HS-11…HS-15.*
