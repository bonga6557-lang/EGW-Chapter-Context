# PHASE 2 EXECUTION — Accounts & sync
### Plan: EGW-PROD-READY-2026 · Rubric: B5(full); D2 partial (auth+sync; payments deferred)
### Agent session: 2026-07-13 · Depends: Phase 1 signed off

**Status:** `DONE — local implementation proof passed; live Supabase E2E/RLS proof pending`
**Payments:** DEFERRED (2b) — no Stripe/paywall code.

---

## CP-01 · Scope read

**In-scope:** `src/lib/supabase.ts`, NEW `src/lib/sync.ts`, NEW `src/components/Account.tsx`,
`supabase/migrations/*`, `.env.example`, `src/App.tsx` (integration only), `src/utils/backup.ts` (additive keys).

**Decisions already resolved:** 2a Supabase · 2b payments deferred · 2c pricing deferred.

**Invariant:** Anonymous/local use forever; accounts additive; localStorage never destroyed on migrate (HS-14).

---

## CP-02 · Change list

| ID | Change |
|---|---|
| P2-1 | Soften Supabase client (null when env missing — no wall) |
| P2-2 | SQL migration: `user_notes` + `user_explored` + RLS policies |
| P2-3 | `sync.ts` — magic link helpers, LWW merge, conflict log, migration, delete-cloud |
| P2-4 | `Account.tsx` — sign in/out, sync status, delete my cloud data |
| P2-5 | App wiring — push on note/explored writes, pull on sign-in, migration prompt |
| P2-6 | Backup keys include sync timestamps/conflicts |

---

## CP-03 · Applied files

- `src/lib/supabase.ts`, `src/lib/sync.ts`
- `src/components/Account.tsx`
- `src/App.tsx`, `src/utils/backup.ts`, `.env.example`
- `supabase/migrations/20260713120000_user_study_sync.sql`
- `scripts/phase2-rls-check.sql`

---

## CP-04 · Proof

### Typecheck / build
```
npm run typecheck → exit 0
npm run build     → exit 0
```

### Secrets audit (production bundle)
```
service_role / SUPABASE_SERVICE / secret_key matches in dist/assets/*.js: 0
supabase.co host present: yes (publishable URL expected in client)
```

### Operator actions required for live E2E / RLS proof
1. **Apply migration** in Supabase SQL editor: paste
   `supabase/migrations/20260713120000_user_study_sync.sql`
2. **Auth → URL Configuration:** add `http://localhost:3000` (+ production origin) to Redirect URLs.
3. **E2E:** Device A sign-in → write note → Device B sign-in same account → Sync now → note appears.
4. **RLS:** run `scripts/phase2-rls-check.sql` (or Network tab: `user_notes` only own rows).

---

## CP-05 · Quality

- No payment/entitlement code (2b).
- Per-book code-split boundary untouched (Phase P).
- Conflicts logged to `egw-sync-conflicts` + `console.warn` (never silently dropped).
- Delete-my-data removes cloud rows only; local retained (HS-14).

---

## CP-06 · Change report

**Date:** 2026-07-13

### Shipped
Magic-link auth UI, local-first sync with LWW merge, migration prompt, cloud delete, RLS SQL.

### Blocked on operator (environment)
Live cross-device + RLS SQL evidence need the migration applied on project `uqxckbbzfaqdidniosbc`.

### Sign-off
Reply **“Phase 2 signed off — proceed Phase P”** (or request changes).

| Field | Value |
|---|---|
| Operator | `[ pending ]` |
| Date | `[ pending ]` |
| Decision | `[ ] approved · [ ] changes requested` |
