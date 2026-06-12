---
name: apollon-design
description: Art direction and design system for the Apollon Papas personal brand site. Load before building or restyling any UI on this project. Covers palette, type, the card system, the aurora signature, motion, and how the reference layout maps to the brief's content.
---

# Apollon Papas - Design System (v2)

Read this before writing any UI. Every color, type, and radius decision derives from here. This version replaces the earlier serif/Ascent-line direction entirely.

> No em dashes anywhere. Plain hyphens only.

---

## 1. Thesis

Modern dark portfolio. Bold grotesque type, rounded cards carrying chips and icons, generous structure, and one signature visual: a warm iridescent gradient glow. The mood is confident, product-grade, and current, an operator who builds and teaches, presented like a sharp modern studio site.

This follows the reference Apollo chose (a dark designer-portfolio layout). We take the structure and finish exactly. We keep it from reading as a generic template by grounding every section in Apollo's real content and by biasing the gradient warm (gold-forward), which ties back to the yellow accent Apollo picked.

We do not copy any wording or assets from the reference. All content is Apollo's own. The reference governs look and layout patterns only.

---

## 2. What we take from the reference, and what we leave

Take:
- Deep near-black base, lifted cards with hairline borders, rounded corners, pill buttons, small category chips.
- Bold grotesque headlines that mix a bright word with a dimmed word for emphasis.
- The hero gradient glow (top-right) and the chromatic split treatment on the portrait.
- The "About" card pattern: role + bio on the left, portrait center, stats stacked right.
- The "Featured Projects" grid pattern for products.
- The "Trusted by" logo strip under the hero.

Leave:
- No fabricated testimonials, no invented stats, no fake ratings. The reference's testimonial wall only appears if Apollo has real, named, permissioned quotes. Until then it is cut.
- No tool-stack section (not relevant to Apollo).
- No urgency or sales-funnel tactics.

---

## 3. Color tokens

Cool, neutral near-black. Not warm ink this time.

```css
:root {
  --bg:            #0A0A0C;  /* base near-black */
  --surface:       #141416;  /* cards */
  --surface-2:     #1C1C20;  /* inputs, raised areas inside cards */
  --border:        rgba(255,255,255,0.08);  /* hairline */
  --border-strong: rgba(255,255,255,0.14);  /* hover / focus borders */
  --text:          #F7F7F6;  /* primary */
  --text-dim:      #8B8B92;  /* secondary, dimmed headline words */
  --text-faint:    #5E5E66;  /* captions, footnotes */
  --gold:          #F2C14E;  /* solid accent: chips, links, active, status */
  --gold-soft:     #FFD56B;  /* accent hover */
}
```

Aurora gradient (the signature, warm-forward):
```css
:root {
  /* used as a large blurred glow, never as a flat fill */
  --aurora-gold:    #F2C14E;
  --aurora-orange:  #FF7A3C;
  --aurora-magenta: #E85CCB;
  --aurora-blue:    #5B7CF5;
  --aurora-teal:    #2FD6C2;
}
```

Rules:
- Gold is the only solid accent. Use it for chips, links, active nav, status dots, and at most one highlighted word in a heading.
- Body copy is `--text` or `--text-dim`, never gold.
- The aurora is warm-dominant: gold and orange are the core (around 60 percent of the glow), magenta/blue/teal are the cooler bleed at the edges. It appears in the hero and faintly behind the final CTA. Nowhere else.

---

## 4. Type

Bold grotesque, matching the reference. Bilingual EL/EN is a hard constraint, so the display face must carry Greek, which rules out most fashionable Latin-only grotesques.

- **Display: Manrope** (700/800), tight tracking (-0.02 to -0.03em), large sizes. Verify Greek glyph coverage when wiring it. If coverage is incomplete, set a per-language stack: Manrope for EN headlines, Inter 800 for EL headlines. The language toggle already switches context, so per-language font stacks are trivial and the EL hero never breaks.
- **Body: Inter** (Greek subset, already in the stack), 400/500, 1.6 line height.
- Numbers and stats use the display grotesque, bold, matching the reference (no separate mono face).

If Apollo later wants to match the reference's exact feel, a licensed grotesque like PP Neue Montreal gets closer, but only with verified Greek coverage. Manrope is the safe, free, attractive default.

Type scale (fluid):
```
Display XL  clamp(2.5rem, 6vw, 5rem)      700  -0.03em   hero headline
Display L   clamp(1.75rem, 3.5vw, 2.75rem) 700  -0.02em   section titles
Heading     1.25rem                        600            card titles
Stat        clamp(2rem, 4vw, 3rem)         700            stat figures
Body L      1.0625rem                      400            lead paragraphs
Body        1rem                           400            default
Label       0.75rem                        500  +0.06em   chips, eyebrows, uppercase
```

Emphasis pattern: in headlines, the lead phrase is `--text`, the trailing phrase is `--text-dim`. That dimmed-tail treatment is core to the look. Use one gold word only sparingly.

---

## 5. Card system, radius, elevation

This look is card-heavy, so define these once and reuse.

```css
:root {
  --r-card:  16px;   /* cards, the About block, product cards */
  --r-input: 12px;   /* buttons that are not pills, inputs */
  --r-chip:  8px;    /* category and status chips */
  --r-pill:  999px;  /* primary buttons, eyebrow pills */
}
```

- Cards: `--surface` fill, `1px solid --border`, `--r-card`. On hover, border goes to `--border-strong` and the card lifts 2-4px. Prefer borders over heavy shadows on dark.
- Buttons: primary is a light pill (`--text` background, `--bg` label) like the reference's "Book a free call". Secondary is a ghost pill (transparent, `--border`, `--text` label). Both `--r-pill`.
- Chips: small, `--surface-2` fill or gold for status, `--r-chip`, Label type.
- Subtle inner separators inside the About card use `--border`.

---

## 6. Signature: the aurora glow

The one memorable element. A large, soft, heavily blurred gradient glow.

- Position: top-right of the hero, bleeding off the edge, behind and beside the headline.
- Construction: one or two absolutely-positioned blurred elements (`filter: blur(90px)` to `120px`), built from the aurora tokens. Warm core (gold/orange), cooler magenta/blue/teal at the outer edge. Low-to-medium opacity over `--bg`.
- It may drift slowly (GSAP, 20s+ loop, subtle scale/position) for ambient life. Freeze it entirely under reduced motion.
- A second, much fainter instance sits behind the final CTA only.

Example starting point:
```css
.aurora {
  position: absolute; inset: -20% -10% auto auto;
  width: 60vw; height: 60vw; pointer-events: none;
  background:
    radial-gradient(40% 40% at 60% 40%, var(--aurora-gold), transparent 70%),
    radial-gradient(45% 45% at 75% 55%, var(--aurora-orange), transparent 70%),
    radial-gradient(50% 50% at 85% 70%, var(--aurora-magenta), transparent 75%),
    radial-gradient(55% 55% at 95% 85%, var(--aurora-blue), transparent 80%);
  filter: blur(100px); opacity: 0.5;
}
```

Companion treatment: the **portrait** gets a chromatic split, an orange and teal duotone with a slight RGB offset / motion-blur feel, so it sits in the palette. Best done on a pre-processed image; a CSS fallback can layer the portrait with `mix-blend-mode` and offset orange/teal copies. Keep it subtle, not a glitch effect.

---

## 7. Motion

GSAP (@gsap/react) + ScrollTrigger + Lenis. Restrained, like the reference. The aurora is the showpiece; everything else is quiet.

- **Hero load**: eyebrow, then headline (per-line stagger), then sub, then buttons, then the trusted-by row. About 1s, power3.out. The aurora fades in under it.
- **Section reveals**: translateY 16-24px + fade, 0.6s, staggered children. Same easing everywhere.
- **Cards**: hover lift + border brighten only. Nothing bouncy.
- **Stats**: count-up on first view; show final numbers directly under reduced motion.
- Honor `prefers-reduced-motion: reduce` for all of the above and freeze the aurora drift.

---

## 8. Section mapping (this refines the brief's order)

Keep the brief's content, arrange it in the reference's flow:

1. **Nav**: thin, sticky, transparent over hero, gains `--bg` on scroll. Logo left, center links (Σχετικά, Έργα, Επικοινωνία), EL/EN toggle and a primary pill right.
2. **Hero**: aurora glow, eyebrow pill (e.g. `Διαθέσιμος για συνεργασίες` or `Founder · Operator · Educator`, confirm with Apollo), Display XL headline with the dimmed-tail emphasis (copy from brief), two pill buttons, then a **Trusted by** strip of client logos (Amazon, Samsung, SHEIN, COSRX, Michelin, ZOOM, EY) in `--text-dim`. This absorbs the brief's Ventures and client-logo content.
3. **About card**: left column = role + company (`Founder, GYA Media Group`), location, the bio paragraph (brief section 4), and a CV/contact button. Center = chromatic portrait. Right = stacked stats with hairline dividers (15+ Χρόνια, 50+ Δημοσιεύσεις, 9.000+ Ώρες, 17.539 Executives). This merges the brief's Bio and Proof into one strong block. Drop the `[TBD]` number.
4. **Journey**: the brief's 2017 -> 2026+ timeline, restyled as year-stamped cards on `--surface` with gold year chips, vertical spine on desktop and mobile. No drawn survey line now; the aurora is the signature, so this section stays calm and supporting.
5. **Products** ("Featured" grid): product cards with a mockup image, a category chip, title, one-line prop, status chip (`Live` gold / `Σύντομα` dim), and an arrow. Whole card links to the path (CRS -> `/career-readiness-sprint`). Only real, public products.
6. **Services** (optional): if Apollo confirms real offerings (executive training, career readiness, enterprise AI consulting), use the reference's three-card Skills/Services pattern. Otherwise cut. Do not invent services.
7. **Testimonials** (optional, gated): only with real, named, permissioned quotes. Otherwise cut entirely.
8. **Contact / final CTA**: big Display headline, email, socials, and the faint second aurora behind it. This is the brief's Contact section.
9. **Footer**: `--bg`, hairline top border, minimal columns.

---

## 9. Quality floor

Build in from the start, do not announce:
- Responsive down to 360px; the About card stacks to a single column on mobile.
- Visible keyboard focus (gold `focus-visible` ring).
- `prefers-reduced-motion` fully respected, aurora frozen.
- Contrast: body copy in `--text`/`--text-dim`, never gold-on-dark for paragraphs.
- Fonts subset for Greek, preloaded, with a fallback that keeps the EL hero intact on font swap.
- Images webp/avif, portrait responsive with srcset, aurora is CSS (no image weight).

---

## 10. Wiring this into Claude Code

This file lives at `.claude/skills/apollon-design/SKILL.md`. The brief lives at `docs/apollon-papas-brief.md`. In `CLAUDE.md`:

```md
# Apollon Papas brand site
Build per docs/apollon-papas-brief.md (structure and content).
Styling is governed by the apollon-design skill. Load it before building or
restyling any UI. Do not introduce colors, type, or radii outside its tokens.
Hard rules:
- No em dashes anywhere, in code, comments, copy, or commits. Plain hyphens.
- Every number and logo must be verified before it ships. No placeholder stats.
- EL is default, EN is the toggle.
```
