### Question definition

```
QUESTION(S):          Finish the Prophets and Kings chapter content in this app by continuing from the existing pk-* changes, wiring completed chapters into the book, and keeping source claims verified.
SUFFICIENT ANSWER:    Prophets and Kings has complete chapter entries available to the app, new citations avoid unverified quote wording, EGW links point to the correct official book, and TypeScript/tests pass.
FRESHNESS REQUIRED:   Historical/public-domain source verification is stable; app state and official EGW URLs checked on 2026-07-14.
KNOWN UNKNOWNS:       How much of the prior run completed beyond untracked pk-2 through pk-7; whether full chapters 8-60 require rich external historical sources or can ship with primary EGW/Bible-backed companion content.
OUT OF SCOPE:         Paid/locked sources, unauthorized scraping, and adding quotation text that was not opened in this session.
DATE STARTED:         2026-07-14
```

### Claims ledger

| # | Claim | Source (URL + locator) | Tier | Info date | Corroborated by | Grade |
|---|-------|------------------------|------|-----------|-----------------|-------|
| 1 | The official EGW Writings ID for Prophets and Kings is book 88. | https://m.egwwritings.org/en/book/88/toc, page title "Prophets and Kings" | Primary | Accessed 2026-07-14 | EGW Writings chapter pages under `/en/book/88.*` | VERIFIED |
| 2 | Prophets and Kings contains chapters 1-60, with chapter 8 beginning at para id 88.461 and chapter 60 at para id 88.3221. | https://m.egwwritings.org/en/book/88.3293, embedded TOC JSON | Primary | Accessed 2026-07-14 | Individual EGW Writings chapter URLs opened for sample chapters 8-10 | VERIFIED |
| 3 | The existing local continuation has untracked files for pk-2 through pk-7, but `book-prophets-and-kings.ts` still exports only pk-1. | Local `git status --short` and `src/data/book-prophets-and-kings.ts` | Primary | Observed 2026-07-14 | `rg -n "pk-[0-9]+" src tests plans docs .claude .cursor .agents` | VERIFIED |
| 4 | The official downloadable Prophets and Kings PDF is book code `PK`, by Ellen Gould White, published by Pacific Press Publishing Association in 1917. | https://m.egwwritings.org/en/book/88/info, Info tab and PDF link `https://media4.egwwritings.org/pdf/en_PK.pdf` | Primary | Accessed/downloaded 2026-07-14 | Extracted `C:\tmp\en_PK.pdf` locally with `pypdf` and confirmed the 60-chapter table of contents | VERIFIED |
| 5 | The app now loads 60 Prophets and Kings chapters from `pk-1` through `pk-60`. | `npx.cmd tsx -e "...loadBookById('prophets-and-kings')..."` local output | Primary | Verified 2026-07-14 | `npm.cmd run typecheck`, `npm.cmd test`, and `npm.cmd run build` passed | VERIFIED |

### Search trail (including dead ends)

| Query / tactic | Where | Result (found what / nothing new) |
|----------------|-------|-----------------------------------|
| Read named skill | `C:\Users\fanel\Downloads\rhema-main\rhema-main\.agents\skills\deep-research\SKILL.md` | Confirmed ledger-first, source-quality, and dossier requirements. |
| Inspect current repo changes | `git status --short`; `rg --files`; `src/data/*.ts` | Found untracked `pk-2.ts` through `pk-7.ts`; book file not yet wired. |
| Open official EGW TOC | `https://m.egwwritings.org/en/book/88/toc` | Verified Prophets and Kings official book ID and source host. |
| Open stale existing link | `https://m.egwwritings.org/en/book/131/toc` | It resolves to The Faith I Live By, proving existing `egwLink` values are stale/wrong for Prophets and Kings. |
| Open official EGW section/chapter pages | `https://m.egwwritings.org/en/book/88.3293`, `88.461`, `88.505`, `88.544` | Extracted the official chapter TOC and verified sample chapter pages. |
| Download official PDF | `https://media4.egwwritings.org/pdf/en_PK.pdf` | Saved to `C:\tmp\en_PK.pdf`; extracted 884 PDF pages with `pypdf` into `.tmp/en_PK.txt` for local chapter-title verification. |
| Runtime data count check | `npx.cmd tsx -e "...loadBookById('prophets-and-kings')..."` | Confirmed loaded chapter count is 60, first id is `pk-1`, last id is `pk-60`, and last link is `https://m.egwwritings.org/en/book/88.3221`. |
| Verification commands | `npm.cmd run typecheck`; escalated `npm.cmd test`; escalated `npm.cmd run build` | TypeScript, Vitest, and Vite production build all passed. Test/build needed escalation because restricted sandbox could not read the Vite config path. |

### Conflicts noticed

Existing `egwLink: "https://m.egwwritings.org/en/book/131/toc"` in Prophets and Kings content conflicts with the official EGW Writings Prophets and Kings TOC at `https://m.egwwritings.org/en/book/88/toc`; resolve new and edited Prophets and Kings links to book 88.
