# Citation Audit — Status

**Audit completed 2026-07-08.** All 162 historical/scholarly quotations across the data files
are now classified. Zero unlabeled entries remain (the only unlabeled `quote:` fields are
`egwQuotes` — Ellen White's own words, verified via their EGW Writings links).

## Final counts

| Label | Count | Meaning |
| --- | --- | --- |
| verbatim | 23 | Exact wording confirmed against the original (public-domain primary sources: Josephus, Eusebius, Tacitus, Emerson, Smiles, Finney, Wesley, EGW) |
| paraphrase | 23 | Passage located; wording condensed/blended — link provided |
| summary | 112 | Original wording could NOT be verified; rewritten as attributive companion language ("Knight argues that…") — renders without quotation marks |
| unverified | 0 | Policy: entries whose source cannot be located are removed, not shipped (4 were deleted 2026-07-08 — see below) |

## Corrections made during audit

- **Wesley "social holiness"** — misattributed to "Sermon 16"; actually the 1739 preface to
  *Hymns and Sacred Poems*. Fixed.
- **Ellen White "the will is the governing power"** — second half of the quote was not hers;
  corrected to true wording from *Education* p. 289.
- **EGW "In Christ is life, original, unborrowed, underived"** — cite fixed to *Desire of
  Ages* p. 530 (ch. 58), not ch. 1.
- **Finney revival quote** — fabricated second sentence removed.
- **Josephus "false prophets"** — wording corrected to Whiston's actual text.
- **David Trim** — mis-dated 2015; real work is 2019 ("Unsung Heroes of Adventist Missions").
- **Bebbington *Victorian Religious Revivals*** — 2003 → 2012 (OUP).
- **Whidden *Ellen White on Salvation*** — 2007 → 1995.
- **Merlin Burt** — cited title/subtitle didn't exist; corrected to the real 2015 work.
- **Denis Fortin** — "The Steps to Christ Companion (2012)" doesn't exist; corrected to
  *Steps to Christ: Historical Introduction and Notes* (Andrews UP, 2017).
- **Ian Ker** — cited 1996 title doesn't exist; redirected to his real 2003 book, flagged.

## Removed entries (sources could not be located)

Deleted from the app on 2026-07-08 per the no-unverified policy. If a real replacement
source is ever found, re-add through the `verified-research` skill:

- [x] Richard M. Davidson, "Solomon's Rise and Fall" (JATS 2011) — removed from `src/data.ts` (Prophets and Kings ch. 1)
- [x] Gerhard F. Hasel, "The Origin of Evil in Adventist Theology" (BRI 1991) — removed from `src/data.ts` (Patriarchs and Prophets ch. 1)
- [x] Joshua V. H. McKibben, *Praying in the Victorian Age* (1998) — removed from `src/data/stepsToChristPart3.ts` (ch. 13)
- [x] Ian Ker attribution (real book, unconfirmed connection) — removed from `src/data/stepsToChrist.ts` (ch. 1)

Also worth a pass: the 112 `summary` entries are honest now, but a reviewer with the physical
books (especially Knight and Bebbington) could upgrade the strongest ones back to verbatim
with page numbers.
