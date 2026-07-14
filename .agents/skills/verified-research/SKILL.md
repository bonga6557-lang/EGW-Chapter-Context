---
name: verified-research
description: Research and add chapter content (historicalSources, scholarlyReferences, egwQuotes) using ONLY verified information. Use whenever adding or editing quotes, citations, historical claims, or new chapter data files.
---

# Verified Research

Chapter data (`src/data.ts`, `src/data/*.ts`) drives what learners read as fact.
A prior audit found ~70% of scholarly "quotes" were fabricated wording put in real
scholars' mouths. This workflow exists so that never happens again.

## THE PRIME RULE

Never write wording inside a `quote` or `directQuote` field that you have not seen
with your own eyes in the actual source — via WebFetch of the real text, a Google
Books snippet, an archive.org page image, etc. No exceptions.

If you did not see it, it is NOT a quote. Write it as a **summary**, in attributive
voice ("Knight argues that…", "Veltman found that…"), never in the author's voice,
and never wrapped in quotation marks. The UI renders quotation marks ONLY for
`quoteType: 'verbatim'`, so getting the type right is what protects the reader.

## Verification ladder

Assign `quoteType` by how much you actually confirmed:

- **(a) verbatim** — You fetched the full text from a public-domain repository and
  copied the wording exactly. Repositories: `perseus.tufts.edu` (Josephus/classics),
  `newadvent.org` (church fathers), `gutenberg.org`, `archive.org`, `ccel.org`,
  `egwwritings.org` (Ellen White). Requires `sourceUrl` to the page and a
  `verifyNote` naming the edition/translation and book/chapter/page.
- **(b) paraphrase** — You found the passage but condensed or modernized it, or it
  blends translations. `sourceUrl` to the passage + `verifyNote` describing what was
  condensed.
- **(c) summary** — The work is real but you could not see the exact wording.
  Reword attributively (the app will NOT add quote marks). Use the best available
  `sourceUrl` (publisher page, Google Books, Google Scholar) + `verifyNote:
  "Companion summary — not a quotation."`
- **(d) not found at all** — The source cannot be located and confirmed to exist.
  **DO NOT include the entry.** Delete it. Never ship it.

`'unverified'` exists in the type union for legacy data only. **New content must
never introduce `quoteType: 'unverified'`.** If you cannot reach at least a
summary (c), the entry is removed, not labeled unverified.

## Bibliographic rules

Before citing, independently verify **author, exact title, publisher, and year** —
the audit found wrong years and nonexistent titles attributed to real scholars.
- If you cannot confirm the title/year, do not cite it (drop to summary of a work
  you CAN confirm, or remove).
- Ellen White quotes must be checked against `egwwritings.org` and carry the
  book/page reference in `reference` (e.g. "The Great Controversy, p. 37").

## Data shapes (must match `src/types.ts`)

Historical source:

```ts
{
  title: "The Wars of the Jews",
  author: "Flavius Josephus",
  publication: "Book VI, ch. 5",
  quote: "…exact wording you saw…",
  relevance: "Why this matters to the chapter.",
  quoteType: "verbatim",           // 'verbatim' | 'paraphrase' | 'summary'
  sourceUrl: "http://www.perseus.tufts.edu/…",
  verifyNote: "Whiston translation, Wars 6.5.2. Search the chapter for this phrase."
}
```

Scholarly reference:

```ts
{
  author: "George R. Knight",
  year: 2010,
  title: "Walking with Ellen White",
  source: "Review and Herald",
  relevance: "Context for the chapter's claim.",
  directQuote: "Knight argues that …",   // attributive if not verbatim
  quoteType: "summary",                   // 'verbatim' | 'paraphrase' | 'summary'
  sourceUrl: "https://books.google.com/…",
  verifyNote: "Companion summary — not a quotation."
}
```

EGW quote: `{ quote, reference, sourceUrl }` — `reference` names book + page;
`sourceUrl` points to the egwwritings.org page.

## Finishing checklist (run before you say you're done)

1. Every new `historicalSources` / `scholarlyReferences` entry has a `quoteType`.
2. No quotation-voice wording under `summary` (or `paraphrase` that reads as verbatim).
   Summaries are attributive, unquoted.
3. No new entry uses `quoteType: 'unverified'`.
4. `npx tsc --noEmit` passes.
5. Grep the new/edited file for entries missing a type:
   `grep -nE '\b(quote|directQuote):' src/data/<file>.ts` and confirm each block
   nearby has a `quoteType:` line. Any entry you could not verify to (a), (b), or (c)
   is deleted, not shipped.
