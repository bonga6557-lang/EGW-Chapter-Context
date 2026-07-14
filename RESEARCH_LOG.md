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
| 6 | All 95 Ellen White quotations in the authored `pk-2.ts` through `pk-32.ts` chapter entries occur in the official Prophets and Kings text. | `C:\tmp\en_PK.pdf`, extracted to `tmp/pdfs/en_PK.txt`; compared against each `egwQuotes` block with PDF page markers and line-wrap hyphenation normalized | Primary | Verified 2026-07-14 | Source URLs and printed-page references in the chapter entries point to official EGW Writings book 88 | VERIFIED |
| 7 | The final loaded Prophets and Kings data has 60 unique ordered chapter IDs, uses explicit authored entries through chapter 60, and has no empty quiz. | `src/data/book-prophets-and-kings.ts`, `src/data/pk-authored.ts`, and focused completion test | Primary | Verified 2026-07-14 | TypeScript, 14 Vitest tests, and the Vite production build passed | VERIFIED |
| 8 | Chapters 33-60 contain 84 verbatim Ellen White passages with canonical pages and official EGW Writings chapter URLs. | `C:\tmp\en_PK.pdf`; authored chapter files | Primary | Verified 2026-07-14 | Quote audit returned 84 matches and 0 misses after typography and line-wrap normalization | VERIFIED |

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
| Extract and audit the official PDF | `C:\tmp\en_PK.pdf` → `tmp/pdfs/en_PK.txt`; normalized comparison against `src/data/pk-2.ts` through `pk-32.ts` | Confirmed all 95 authored Ellen White quotations against the official text; apparent initial misses were caused by printed page markers and line-wrap hyphenation in PDF extraction. |
| Final runtime integrity check | `loadBookById('prophets-and-kings')` | Confirmed 60 chapters, 60 unique IDs, authored quotation-bearing content through chapter 32, and zero empty quizzes. |
| Chapter-specific source extraction | Official PDF opening pages for chapters 33–60, using the table of contents and canonical page markers | Added one exact, chapter-specific Ellen White passage per remaining chapter; automated comparison returned 28 matches and 0 misses. |

### Conflicts noticed

Existing `egwLink: "https://m.egwwritings.org/en/book/131/toc"` in Prophets and Kings content conflicts with the official EGW Writings Prophets and Kings TOC at `https://m.egwwritings.org/en/book/88/toc`; resolve new and edited Prophets and Kings links to book 88.

---

## Continuation: full research pass for chapters 33-60

### Question definition

```
QUESTION(S):          Replace the generator-backed Prophets and Kings chapters 33-60 with individually researched, explicitly authored chapter entries at the richer standard established by chapters 8-32.
SUFFICIENT ANSWER:    Each chapter 33-60 has chapter-specific historical context, argument flow, hard phrases, application, three verbatim EGW quotations verified against the official text, tailored discussion questions, six non-templated quiz questions, and only source-safe historical/scholarly references. The app loads all 60 chapters and validation passes.
FRESHNESS REQUIRED:   Historical source facts are stable; URLs, bibliographic metadata, and repository state verified on 2026-07-14.
KNOWN UNKNOWNS:       Which chapters have a sufficiently relevant open primary historical source; which scholarly works expose enough preview/metadata to support an attributed summary without inventing wording.
OUT OF SCOPE:         Paywalled text that cannot be inspected, fabricated scholarly quotations, and padding a chapter with a source that is not genuinely relevant.
DATE STARTED:         2026-07-14
```

### Source landscape

- Tier 1: official Prophets and Kings text/PDF and canonical Bible texts for chapter claims and exact Ellen White quotations.
- Tier 1: public-domain ancient sources such as Josephus and Near Eastern inscriptions where they genuinely overlap the chapter.
- Tier 2: academic commentaries and histories from identifiable scholarly publishers, used only as attributed summaries unless exact wording is visible.
- Disconfirming check: compare later historical/critical chronology with the narrative arrangement so theological interpretation is not mislabeled as uncontested historical reconstruction.

### Superseding completion ledger

The rows below supersede the earlier generator-era completion rows 7-8.

| # | Claim | Source (URL + locator) | Tier | Info date | Corroborated by | Grade |
|---|-------|------------------------|------|-----------|-----------------|-------|
| C1 | Chapters 33-60 are explicit researched records, not generator-backed entries; each has at least four biblical foundations, four argument movements, three hard phrases, a historical source, a scholarly reference, three Ellen White quotations, four discussion questions, and six tailored quiz questions. | `src/data/pk-33.ts` through `pk-38.ts`, `pk-39-44.ts`, `pk-45-52.ts`, `pk-53-60.ts` | Primary/local | Verified 2026-07-14 | `src/data/prophets-and-kings-completion.test.ts` | VERIFIED |
| C2 | The book loads exactly 60 ordered, unique chapters from `pk-1` through `pk-60`. | `src/data/book-prophets-and-kings.ts`; focused content test | Primary/local | Verified 2026-07-14 | TypeScript and Vitest passed | VERIFIED |
| C3 | All 84 Ellen White quotations in chapters 33-60 match the official Prophets and Kings PDF after normalizing typography, page artifacts, and line-wrap hyphenation. | `C:\tmp\en_PK.pdf`; local quote validator | Primary | Verified 2026-07-14 | Output: `quotes=84 matched=84 failures=0` | VERIFIED |
| C4 | The Cyrus Cylinder supplies relevant Persian restoration-policy background but does not mention Jerusalem or the Judean return. | https://www.britishmuseum.org/collection/object/W_1880-0617-1941 | Museum/primary artifact | Accessed 2026-07-14 | Ezra 1 supplies the specifically Judean account; chapter 45 states the limit | VERIFIED |
| C5 | ABC 5 dates Nebuchadnezzar's capture of Jerusalem to his seventh year, while 2 Kings 24:12 uses his eighth year. | https://www.livius.org/sources/content/mesopotamian-chronicles-content/abc-5-jerusalem-chronicle/ | Primary text/translation | Accessed 2026-07-14 | Chapter 35 reports rather than conceals the regnal-count discrepancy | VERIFIED |
| C6 | Scholarly treatment of Esther includes literary strengths, Purim, and debated historical questions; no consensus should be invented. | https://yalebooks.yale.edu/book/9780300139488/esther/ | Scholarly publisher | Accessed 2026-07-14 | Chapter 49 labels the debate explicitly | VERIFIED |
| C7 | The Great Isaiah Scroll is an ancient near-complete textual witness to Isaiah, not archaeological proof of a particular Christian interpretation. | https://dss.collections.imj.org.il/isaiah | Museum/primary artifact | Accessed 2026-07-14 | Chapters 58-60 preserve this evidentiary limit | VERIFIED |

### Full-pass search and verification trail

| Source / tactic | Result and use |
|-----------------|----------------|
| Official EGW PDF, `https://media4.egwwritings.org/pdf/en_PK.pdf` | Extracted chapter-specific quotation candidates and checked all 84 selected quotations for chapters 33-60; 84 matched, 0 failed. |
| EGW Writings TOC and chapter pages under `https://m.egwwritings.org/en/book/88.*` | Confirmed all chapter start IDs, including the unusual but official `88.3314` for chapter 51. |
| Babylonian Chronicle ABC 5, Livius translation | Used for chapters 35-37; preserved the seventh/eighth regnal-year conflict rather than harmonizing it silently. |
| Josephus, *Antiquities* Books X-XI, Perseus | Opened relevant Josiah, Jeremiah, Daniel, Cyrus, Ezra, Nehemiah, and Esther sections; used as attributed later Jewish summaries, never as contemporary proof. |
| British Museum Cyrus Cylinder | Used only for Persian-Babylonian restoration-policy background; explicitly noted that Judah and Jerusalem are absent. |
| Israel Museum Great Isaiah Scroll | Used as a material witness to Isaiah's ancient transmission; interpretation claims kept separate. |
| Publisher records for Bright, Brueggemann, Collins, Blenkinsopp, Myers, Moore, and Schulte | Verified bibliographic metadata and topical scope; entries use attributed summaries marked `quoteType: 'summary'`, not invented direct quotations. |
| Disconfirming/nuance audit | Flagged Esther historicity/genre debate, Ezra-Nehemiah complexity, the Cyrus Cylinder's limits, and the danger of antisemitic or racialized applications in chapters 51 and 59. |

### Completion evidence

- Removed `pk-generated.ts` and its import from the book assembly.
- Added explicit authored data for chapters 33-60 and wired it through `pk-authored.ts`.
- `npm.cmd run typecheck`: passed.
- `npm.cmd test -- --run src/data/prophets-and-kings-completion.test.ts`: 2 tests passed.
- Quote audit: `quotes=84 matched=84 failures=0`.
