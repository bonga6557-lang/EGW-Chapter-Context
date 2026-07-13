# Production Readiness Rubric — EGW Chapter Context Companion

A scoring framework for deciding when this app is ready to charge money for.
Score every criterion **1–5**, then check the gate thresholds at the bottom.

| Score | Meaning |
|---|---|
| 1 | Absent / broken |
| 2 | Prototype quality — works on the happy path only |
| 3 | Solid — usable daily, rough edges remain |
| 4 | Professional — a paying user would not complain |
| 5 | Best-in-class — a reason someone chooses *this* app |

**Weighting:** each criterion has a weight (×1, ×2, ×3). Multiply score by weight;
a section passes when it reaches **80 % of its maximum weighted score** and no ×3
criterion scores below 3.

---

## Section A — UI & Visual Quality (max 85)

| # | Criterion | Wt | What a 5 looks like | Score |
|---|---|---|---|---|
| A1 | **Readability of long-form text** | ×3 | Parchment body text is comfortable for 20+ min sessions: line length ≤ 75ch, adequate contrast on the cream background, zoom control (already present) works at every breakpoint without clipping. | |
| A2 | **Mobile experience** | ×3 | The 3-column Study Desk collapses gracefully; chapter sidebar is reachable on phones (it is currently `hidden lg:block` in guided mode — a paying mobile user must never lose navigation); tap targets ≥ 44px. | |
| A3 | **Visual consistency** | ×2 | The Victorian library aesthetic (gold/parchment/forest green) is applied uniformly across all four tabs, Quiz, Cultural History, and empty states — no tab feels like a different app. | |
| A4 | **Decoration vs. performance** | ×2 | Dust motes, candle flame, shimmer, and blur animations never cause jank on a mid-range phone; `prefers-reduced-motion` is honored; Lighthouse performance ≥ 85 on mobile. | |
| A5 | **Empty / unavailable states** | ×2 | "Chapter Unavailable" and "being indexed" placeholders tell the user *when/whether* content is coming and route them somewhere useful — never a dead end. | |
| A6 | **Accessibility** | ×2 | Keyboard-only traversal of tabs, accordion, quiz, and search works; existing aria roles verified with a screen reader; parchment tab contrast passes WCAG AA; focus rings visible on the dark theme. | |
| A7 | **Loading & first paint** | ×2 | All chapter data ships in the JS bundle today — bundle is code-split per book so first load stays < 3s on 3G; images (cultural history JPGs) are lazy-loaded and compressed. | |
| A8 | **Polish details** | ×1 | Toasts never stack/overlap, search dropdown dismisses on outside click and Escape, favicon + page title + social preview (OG tags) are set. | |

**Section A pass bar:** ≥ 68/85, and A1, A2 ≥ 3.

---

## Section B — Flow & User Journey (max 80)

| # | Criterion | Wt | What a 5 looks like | Score |
|---|---|---|---|---|
| B1 | **First-run experience** | ×3 | A brand-new user understands within 30 seconds what the app does (context companion, *not* the book text itself) and is guided to their first chapter. Today the app drops the user straight into Steps to Christ ch. 1 with no orientation. | |
| B2 | **Core loop clarity** | ×3 | The path *pick book → read guided study → take quiz → mark explored → next chapter* is discoverable without the explanatory caption text currently needed under the "Read Bit by Bit" button. If the UI needs a sentence to explain itself, it scores ≤ 3. | |
| B3 | **Navigation coherence** | ×2 | Study Desk / Book Shelf / Notes Log / Cultural History have clearly distinct jobs; the user never wonders "where am I?"; deep state (book + chapter + tab) is reflected in the URL so refresh/share/back-button work. Currently everything is in React state — refresh loses your place. | |
| B4 | **Progress & motivation** | ×2 | Explored-chapter progress, quiz results, and the library chart give a visible sense of momentum and a reason to return tomorrow (streaks, "continue where you left off"). | |
| B5 | **Data durability** | ×3 | Notes and progress survive browser data clearing and device switches. localStorage-only is a ≤ 2 for a paid product — an account + sync (or at minimum full export/import of all notes and progress) is required. | |
| B6 | **Search usefulness** | ×2 | Search covers chapter body content (context, phrases, quotes), not just titles/themes/bigIdea; results show why they matched. | |
| B7 | **Cross-feature linking** | ×1 | Bible references open correctly (BibleGateway links), EGW links land on the right chapter, Cultural History links back to related chapters. | |

**Section B pass bar:** ≥ 64/80, and B1, B2, B5 ≥ 3.

---

## Section C — Value Proposition & Monetization (max 90)

The question a buyer asks: *"egwwritings.org is free — why do I pay for this?"*
The answer must be **the scholarship layer**: verified historical context, argument
maps, misreading corrections, and source verification that exist nowhere else.

| # | Criterion | Wt | What a 5 looks like | Score |
|---|---|---|---|---|
| C1 | **Content coverage** | ×3 | The catalog matches the promise. Today: Steps to Christ ✔, Great Controversy (42 ch.) ✔, but Desire of Ages, Prophets & Kings, Patriarchs & Prophets, Counsels on Health each have **one chapter**. Shipping a paid product with 4 of 6 books at ~1–5 % coverage scores a 1 unless they are explicitly labeled "coming soon" and excluded from the pitch. | |
| C2 | **Content trustworthiness** | ×3 | Every quote/citation carries the quoteType + sourceUrl + verifyNote system (already built — a genuine differentiator) with **zero** `unverified` entries in paid content; a stated correction policy exists. In this niche, one fabricated quote destroys the product. | |
| C3 | **Differentiation is self-evident** | ×3 | A visitor can articulate in one sentence what they get that the free EGW app doesn't. The landing/first screen makes the comparison explicit ("the study layer the free apps don't have"). | |
| C4 | **Depth per chapter** | ×2 | Each chapter's context, argument flow, and misreading sections are substantive enough that a Sabbath School teacher would prep from them — consistent depth across *all* chapters, not just flagship ones. | |
| C5 | **Audience fit & pricing model** | ×2 | A specific buyer is named (SS teachers, pastors, serious lay students, academy Bible classes) and the pricing matches how they buy: one-time vs. subscription vs. group/church licensing. Group licensing is likely the real revenue path in this niche. | |
| C6 | **Shareable output** | ×2 | Copy-summary and notes export (already present) produce output good enough to hand to a study group — formatted (PDF/print stylesheet), branded, with citations intact. This is also organic marketing. | |
| C7 | **Legal & rights review** | ×3 | Confirmed in writing: EGW texts are public domain (they are — she died 1915), but *scholarly quotes* (Veltman report, modern historians) and any imagery are used within fair-use/permission; "EGW" naming does not conflict with EGW Estate trademarks. Selling changes the fair-use calculus — this is a hard gate. | |
| C8 | **Willingness-to-pay evidence** | ×2 | ≥ 10 people from the target audience have used it and ≥ 3 have said they'd pay a stated price (or pre-ordered). No launch on zero external feedback. | |

**Section C pass bar:** ≥ 72/90, and C1, C2, C7 ≥ 3.

---

## Section D — Technical Launch Gate (max 45)

Pass/fail hygiene — score 1 or 5 only.

| # | Criterion | Wt | Requirement | Score |
|---|---|---|---|---|
| D1 | Build & deploy | ×2 | Reproducible production build (a root `package.json` with pinned deps is checked in — currently the project root has no manifest), deployed on a real domain with HTTPS. | |
| D2 | Payments & accounts | ×3 | If charging: auth + payment (Stripe/Gumroad/app-store) + license enforcement actually gates the paid content. | |
| D3 | Error handling | ×1 | A React error boundary prevents a single bad chapter datum from white-screening the app; broken external links fail soft. | |
| D4 | Analytics & feedback | ×1 | Privacy-respecting analytics on the core loop + an in-app feedback channel, so post-launch decisions aren't blind. | |
| D5 | Testing | ×2 | Type-check passes; smoke tests cover chapter navigation, quiz scoring, notes persistence, and export on Chrome/Safari/Firefox + iOS/Android. | |

**Section D pass bar:** all ×3 and ×2 items must be 5.

---

## Launch decision

| Verdict | Condition |
|---|---|
| 🟢 **Charge for it** | All four sections pass. |
| 🟡 **Soft launch / free beta** | A + B pass; C1 or C8 below bar → launch free, gather willingness-to-pay evidence, finish coverage. |
| 🔴 **Not yet** | Any ×3 criterion at 1–2, or C7 (rights) unresolved. |

---

## Feature sufficiency — does it need more features?

**No. It needs more *content* and *infrastructure*, not more features.**

The feature set is already unusually rich for a niche study tool: guided
bit-by-bit reading, argument-flow maps, hard-phrase glossary, misreading
corrections, quizzes with explanations, source verification badges, notes with
export, progress tracking, reading zoom, cultural-history galleries, and search.
Adding more features now would dilute polish and delay revenue.

**Finish before launch (gaps, not features):**
1. **Content coverage (C1)** — the #1 gap. Either complete Desire of Ages next
   (the most beloved title, highest willingness to pay) or reposition v1 as
   *"The Great Controversy + Steps to Christ, complete"* and label the rest
   "coming soon."
2. **Accounts + cloud sync (B5/D2)** — you cannot charge for progress and notes
   that vanish with cleared browser data.
3. **URL routing (B3)** — shareable/bookmarkable chapters; also required for SEO,
   which is how this niche finds tools.
4. **Onboarding (B1)** — one screen that states the value proposition and starts
   the first guided read.

**Good v1.1+ features (after revenue, not before):**
- Print/PDF study-guide export for Sabbath School teachers (directly monetizable).
- Highlighting inside guided reading tied to notes.
- Group/classroom mode (shared progress) — this is the church-license upsell.
- Audio narration of context sections.

**Explicitly do not build yet:** social features, AI chat over the corpus,
mobile native apps, more decorative animation. None move willingness to pay
before coverage and sync exist.
