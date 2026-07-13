<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# EGW Chapter Context

A cinematic study companion for Ellen G. White's classic writings — historical context, Bible foundations, discussion questions, and quizzes. All chapter content ships with the app; no API keys required.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Build

`npm run build` then `npm run preview` to serve the production build.

## Content integrity

Every historical source, scholarly reference, and Ellen White quote in this app is
labeled by how well its wording was verified against the original. Each entry carries
a `quoteType`:

- **Verbatim** — copied word-for-word from the actual source (public-domain text,
  Google Books, archive.org). The UI shows quotation marks only for verbatim entries.
- **Paraphrase** — the passage was found but condensed or modernized.
- **Summary** — the work is real, but the exact wording was not seen, so the text is
  a companion restatement written attributively ("Knight argues that…"), not a quote.

Every entry links to a source (`sourceUrl`) and carries a `verifyNote` so readers can
check it themselves. A prior audit found that many scholarly "quotes" were fabricated
wording attributed to real scholars; those were removed. **Sources that cannot be
verified are excluded rather than shipped** — no new content is added as "unverified".

New chapter content is added under the `verified-research` skill
(`.claude/skills/verified-research/SKILL.md`, mirrored as a Cursor rule in
`.cursor/rules/`), which enforces this ladder and forbids writing any quoted wording
that was not seen in the original source.
