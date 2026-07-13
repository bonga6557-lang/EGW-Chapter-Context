# Production Readiness Gates

Last updated: 2026-07-13

This file separates completed engineering work from launch gates that still need operator,
legal, or live-environment evidence. It is intentionally not a sign-off document.

## Completed Engineering Remediation

- Root package scripts exist for `dev`, `build`, `preview`, `typecheck`, and `test`.
- Dependency ranges in `package.json` and root `package-lock.json` metadata are pinned.
- GitHub Actions CI runs `npm ci`, `npm run typecheck`, `npm test`, and `npm run build`.
- Loaded chapter data is normalized so historical, scholarly, and EGW quote entries expose
  source URLs and verification notes before rendering or export.
- A regression test fails if loaded shipped content contains `quoteType: "unverified"` or
  missing verification URLs/notes.
- Optional GoatCounter analytics is wired through `VITE_GOATCOUNTER_CODE`; without that env
  var, analytics remains a no-op.

## Gates Still Requiring Operator Evidence

| Gate | Owner | Required Evidence | Current Status |
|---|---|---|---|
| Phase 1 mobile/browser proof | Operator | Screenshot/video showing hash restore, browser back, mobile guided chapter navigation, export-wipe-import restore | Pending |
| Phase 2 Supabase E2E | Operator | Device A sign-in, note creation, Device B sync showing note | Pending |
| Phase 2 RLS proof | Operator | SQL output or network proof that user A cannot read user B rows | Pending |
| Phase P Lighthouse | Operator | Mobile Lighthouse report score >= 85 on preview/deployed URL | Pending |
| Phase V rights review | Operator/legal reviewer | Signed `docs/RIGHTS_REVIEW.md` | Pending |
| Phase V pricing/willingness evidence | Operator | Completed `docs/PRICING.md`, 10 interview notes, 3 stated-price commitments | Pending |
| Final rubric scoring | Operator | Scores written into `PRODUCTION_READINESS_RUBRIC.md` with evidence links | Pending |

## Current Launch Interpretation

The codebase is improved and locally verifiable, but the launch verdict remains **not ready
to charge** until the pending evidence above is completed. A free/beta launch is still an
operator decision, but charging is blocked by the unsigned rights review and missing
willingness-to-pay evidence.
