# Apollon Papas - Personal Brand Site

Single source of truth for the personal brand hub at apollonpapas.com.
Build target: Claude Code. Pair this with `design-guidelines.md` for styling.

> No em dashes anywhere in copy or specs. Plain hyphens only.

---

## 1. What this is

A bio-led personal brand site for Apollon Papas (Απόλλων Παπάς), founder of GYA Media, now building a personal education brand. The site tells his story and routes visitors out to the products he is launching. It is the umbrella; the products are the spokes.

References Apollo gave:
- iman-gadzhi.com for the model: a personal-brand hub. Hero with the name, a wall of ventures, a biography, detailed venture cards, contact. Dark, photo-led, editorial, scroll-driven.
- monetise.com/waitlist for polish: a long-form launch page. We borrow its structural confidence and finish, not its fabricated earnings figures, fake countdowns, or stock testimonial walls.

The job of this page, in one line: make a serious visitor understand who Apollo is in 30 seconds and click through to the right product.

### Guardrails (carried from existing project principles)
- Every number and logo on the page must be real and verified before it ships. The `100+ Placeholder [TBD]` and `40+ φοιτητές` figures do not appear until confirmed.
- No invented social proof, no fake urgency, no stock testimonials.
- Internal-only content (pricing internals, trainer hours, cost breakdowns) never appears here.

---

## 2. Architecture decision (confirm before building)

The products live at paths like `/career-readiness-sprint`. Two ways to do that:

**Option A (recommended): separate apps, one domain via Nginx.**
The brand hub is its own React + Vite build served at `/`. The existing CRS app keeps its own build and Nginx routes `/career-readiness-sprint` to it. Nothing about CRS gets touched or re-merged. Cleanest given CRS already ships.

**Option B: one app, internal routes.**
Brand hub and CRS become one React app with client-side routing. More work, risks regressions on a page that already works. Only worth it if Apollo wants shared layout/nav across both.

This is a Nikola call since he controls the stack and codebase. The spec below assumes Option A: this repo builds the hub at `/` only, and product cards are plain links to existing paths.

Domain note: confirm apollonpapas.com (per the CRS footer email) vs apollopapas.com.

---

## 3. Sitemap and section order

Single long page, anchored nav. Order is deliberate: identity, then proof, then story, then where to go next.

```
/ (apollonpapas.com)
  Nav            sticky, minimal: Σχετικά · Διαδρομή · Έργα · Επικοινωνία · [EL/EN]
  1 Hero         name + positioning line + portrait, one primary CTA
  2 Ventures     logo/word wall of what he is attached to (GYA Media, GYA Media Group)
  3 Bio          the narrative: front line of growth to education
  4 Journey      timeline 2017 -> 2026+ (career as a measured ascent)
  5 Products      cards linking out (CRS live, others as status allows)
  6 Proof         verified stats + client logos
  7 Contact       socials, email, CTA
  Footer          legal, secondary links
```

Internal product paths to link (confirm public status of each with Apollo):
- `/career-readiness-sprint` (live)
- others: only if Apollo confirms they are public-facing now. Leave structured slots, do not invent product names.

---

## 4. Section-by-section spec

Content below is bilingual where I have confirmed copy from the live CRS page. EL is default, EN is the toggle. Where it says `[FROM APOLLO]`, drop in his fuller bio text; do not fabricate.

### 1. Hero
Purpose: identity in one glance. Iman-style. Name large, one positioning line, a real portrait, a single CTA.

- Eyebrow (EL): `Founder. Operator. Educator.` (confirm wording with Apollo)
- Headline (EL): `Απόλλων Παπάς`
- Sub (EL): `Μετά 15 χρόνια στην πρώτη γραμμή του enterprise growth, χτίζω το επόμενο βήμα: εκπαίδευση που προετοιμάζει ανθρώπους για την πραγματική αγορά.`
- Sub (EN): `After 15 years on the front line of enterprise growth, I am building the next step: education that prepares people for the real market.`
- Primary CTA: `Δες τα έργα` -> scrolls to Products
- Asset needed: high-quality portrait of Apollo (this section lives or dies on it).

### 2. Ventures
Purpose: instant credibility through what he has built. A quiet wall of marks.

- Label (EL): `Τι έχω χτίσει`
- Marks: GYA Media, GYA Media Group. Add others only if real.
- Assets: you already have the full GYA logo set in the project (every size and variant, blue/white/transparent). Use the transparent variants.

### 3. Bio
Purpose: the story in his voice. This is the heart of the page.

Confirmed spine (from the CRS About copy, real):
> Ο Απόλλων Παπάς ίδρυσε την GYA Media το 2017 και έχει χτίσει την καριέρα του στην πρώτη γραμμή του marketing: B2B lead generation, performance advertising, webinars και brand storytelling. Έχει συνεργαστεί με brands όπως Amazon, Samsung, SHEIN, COSRX, Michelin, ZOOM, EY, στήνοντας τα sales systems, funnels και SOPs πίσω από την ανάπτυξή τους.

`[FROM APOLLO]` Extend with: early career, what pulled him from growth into education, personal motivation. Aim for two to three short paragraphs. Keep it first person if Apollo is comfortable; it reads warmer than third person on a personal site.

### 4. Journey (timeline)
Purpose: career as a measured ascent. Styled per the design doc (year-stamped cards, calm supporting section).

Confirmed entries (real, from CRS):

- **2017 - Ίδρυση της GYA Media**
  Ξεκινά τη GYA Media: ψηφιακό marketing, business intelligence, B2B lead generation, performance advertising, brand storytelling.

- **2018-2022 - Ανάπτυξη σε διεθνείς αγορές**
  Αναπτύσσει την παρουσία σε Αμερική, Ευρώπη και GCC. Ενσωματώνει 4 εταιρίες σε marketing, production και IT, χτίζει το GYA Media Group, αναλαμβάνει κυβερνητικά και λοιπά έργα σε συνεργασία με Amazon, Samsung, SHEIN, COSRX, Michelin, ZOOM, EY. Στήνει συστήματα πωλήσεων, SOPs και marketing funnels. Το 2019 ξεκινά να εκπαιδεύει ομάδες σε marketing και penetration, και παρέχει στην αγορά τις πρώτες λύσεις Enterprise AI σε συνδυασμό με Palantir Technologies και OpenAI.

- **2023-2025 - Εκπαίδευση executives και καινοτομία**
  50+ δημοσιεύσεις, webinars και consulting. Όσα δούλευαν στην πράξη γίνονται μεθοδολογία που μοιράζεται σε ομάδες που μεγαλώνουν.

- **2026+ - Έμφαση στην εκπαίδευση των νέων**
  Ιδρύει το προσωπικό brand Apollon Papas, μια σειρά εκπαιδευτικών υπηρεσιών για senior executives αλλά και νέους, στη διεθνή και την ελληνική αγορά. Το Career Readiness Sprint ανοίγει έναν ασφαλή χώρο για τα μελλοντικά στελέχη της αγοράς.

Provide EN translations of each entry for the toggle.

### 5. Products
Purpose: route to the right thing. Cards, each links out to a path.

Card shape: product name, one-line value prop, status chip (`Live` / `Σύντομα`), CTA to path.

Confirmed:
- **Career Readiness Sprint** -> `/career-readiness-sprint`, status `Live`.
  One-liner (EL): `4 εβδομάδες πρακτικής προετοιμασίας για την αγορά εργασίας.`

`[FROM APOLLO]` Confirm the full public product list and each path. Do not surface internal-only tools.

### 6. Proof
Purpose: verified credibility. Stats row + client logos.

Stats (verify each before shipping):
- `15+` Χρόνια εμπειρίας
- `50+` Δημοσιεύσεις
- `9.000+` Ώρες εκπαίδευσης
- `17.539` Executives και ομάδες εκπαιδευμένα

Do NOT ship: `100+ Placeholder [TBD]`. Resolve or remove.

Client logos: Amazon, Samsung, SHEIN, COSRX, Michelin, ZOOM, EY. Confirm Apollo has the right to display each on a personal brand page.

### 7. Contact + Footer
- Email: `hello@apollonpapas.com` (or confirm the exact alias).
- Socials: LinkedIn primary. `[FROM APOLLO]` for the rest.
- Footer: copyright, privacy, terms.

---

## 5. Functional spec

- **i18n**: EL default, EN toggle. Same pattern as CRS. URL or state-based, match CRS so it feels like one family.
- **Animation**: GSAP via @gsap/react, ScrollTrigger, Lenis smooth scroll. Scroll-reveal on section entry, an orchestrated hero load, restrained hover micro-interactions. See design doc for the rules. Respect `prefers-reduced-motion`.
- **CTAs**: product cards and hero CTA are links. No forms on the hub itself unless Apollo wants a contact or newsletter capture (ActiveCampaign if so).
- **SEO**: prerender / SSG for the hub, same approach as CRS. Real meta, OG image (a portrait or branded card), structured data (Person schema for Apollo).
- **Performance**: portrait and logos optimized (webp/avif), fonts subset for Greek, lazy-load below the fold.
- **Analytics**: match whatever CRS uses.

---

## 6. Tech stack

Same family as CRS so the two sites feel related and Nikola has nothing new to learn:
- React + Vite + TypeScript (SPA)
- Tailwind CSS with CSS custom property theming
- Inter (Greek subset) for body; a display face added for headlines (see design doc)
- GSAP (@gsap/react, ScrollTrigger) + Lenis
- Prerender / SSG for SEO
- Ubuntu VPS on Hostinger, Nginx (Nginx also routes the product paths under Option A)

---

## 7. Build sequence

1. Scaffold: Vite + TS + Tailwind, theme tokens from the design doc, fonts wired, Lenis + GSAP installed, i18n EL/EN skeleton.
2. Layout shell: nav, footer, section anchors, reduced-motion baseline.
3. Hero: type, portrait, load animation. Get this right before anything else; it sets the bar.
4. Journey timeline: the signature section.
5. Bio + Ventures.
6. Products + Proof.
7. Contact + footer.
8. Polish pass: motion timing, responsive down to mobile, a11y, SEO/SSG, QA in both themes.

---

## 8. Open items for Apollo / Nikola

- Confirm domain: apollonpapas.com vs apollopapas.com.
- Architecture Option A vs B (Nikola).
- Full public product list + paths.
- Portrait photography (high res, ideally 2 to 3 frames).
- Extended bio text in his voice.
- Verify every stat and client logo; resolve the `[TBD]` number.
- Decided: dark cinematic base with a warm signal yellow accent (see design doc, section 2).
