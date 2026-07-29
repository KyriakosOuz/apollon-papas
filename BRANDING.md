# Apollon Papas - Brand & Design System

Portable export of the branding used on the Apollon Papas personal brand site.
Everything below is self-contained: drop it into another project and you can rebuild
the same look without the original repo.

> House rule carried over from the original project: **no em dashes anywhere** - in
> code, comments, copy, or commits. Plain hyphens only.

---

## 1. Brand thesis

Modern dark portfolio. Bold grotesque type, rounded cards carrying chips and icons,
generous structure, and one signature visual: a warm iridescent gradient glow ("the
aurora").

The mood is confident, product-grade, and current - an operator who builds and
teaches, presented like a sharp modern studio site. Warm gold is the single accent;
everything else is a cool neutral near-black.

Positioning line: **Founder. Operator. Educator.**
Bilingual by default: **EL is the default language, EN is the toggle.**

---

## 2. Color tokens

Cool, neutral near-black base. Not warm ink.

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

Aurora gradient (the signature, warm-forward). Used only as a large blurred glow,
never as a flat fill:

```css
:root {
  --aurora-gold:    #F2C14E;
  --aurora-orange:  #FF7A3C;
  --aurora-magenta: #E85CCB;
  --aurora-blue:    #5B7CF5;
  --aurora-teal:    #2FD6C2;
}
```

**Rules**
- Gold is the only solid accent. Chips, links, active nav, status dots, and at most
  one highlighted word per heading.
- Body copy is `--text` or `--text-dim`, never gold. No gold-on-dark paragraphs.
- The aurora is warm-dominant: gold and orange are roughly 60 percent of the glow,
  magenta/blue/teal are the cooler bleed at the edges.
- The aurora appears in the hero and faintly behind the final CTA. Nowhere else.

---

## 3. Typography

Bold grotesque. Bilingual EL/EN is a hard constraint, so the display face must carry
Greek glyphs.

- **Display: Manrope** (700/800), tight tracking (-0.02 to -0.03em), large sizes.
- **Body: Inter** (Greek subset), 400/500, 1.6 line height.
- Numbers and stats use the display grotesque, bold. No separate mono face.

```css
:root {
  --font-display: 'Manrope Variable', 'Inter Variable', system-ui, -apple-system, sans-serif;
  --font-body:    'Inter Variable', system-ui, -apple-system, sans-serif;
}
```

Install (npm): `@fontsource-variable/manrope`, `@fontsource-variable/inter`.

**Greek fallback guard.** If Manrope's Greek coverage is unavailable at runtime, flip
EL headlines to Inter 800 so the Greek hero never breaks:

```css
html[data-el-display="inter"] [data-lang="el"] .display-font {
  font-family: var(--font-body);
  font-weight: 800;
}
```

### Type scale (fluid)

| Role | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| Display XL | `clamp(2.5rem, 6vw, 5rem)` | 700 | -0.03em | hero headline |
| Display L | `clamp(1.75rem, 3.5vw, 2.75rem)` | 700 | -0.02em | section titles |
| Heading | `1.25rem` | 600 | - | card titles |
| Stat | `clamp(2rem, 4vw, 3rem)` | 700 | -0.02em | stat figures |
| Body L | `1.0625rem` | 400 | - | lead paragraphs |
| Body | `1rem` | 400 | - | default, line-height 1.6 |
| Label | `0.75rem` | 500 | +0.06em | chips, eyebrows, uppercase |

**Emphasis pattern.** In headlines, the lead phrase is `--text` and the trailing
phrase is `--text-dim`. That dimmed-tail treatment is core to the look. One gold word
only, sparingly.

---

## 4. Radius, cards, elevation

```css
:root {
  --r-card:  16px;   /* cards, the About block, product cards */
  --r-input: 12px;   /* non-pill buttons, inputs, portrait */
  --r-chip:  8px;    /* category and status chips */
  --r-pill:  999px;  /* primary buttons, eyebrow pills */
}
```

- **Cards**: `--surface` fill, `1px solid var(--border)`, `--r-card`. On hover the
  border goes to `--border-strong` and the card lifts 2-4px. Prefer borders over
  heavy shadows on dark.
- **Buttons**: primary is a light pill (`--text` background, `--bg` label). Secondary
  is a ghost pill (transparent, `--border`, `--text` label). Both `--r-pill`.
- **Chips**: small, `--surface-2` fill, Label type, `--r-chip`. Status chips use gold
  at 12 percent over transparent with gold text.
- Inner separators inside cards use `--border`.

Reference implementation:

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  border-radius: var(--r-pill);
  font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600;
  padding: 0.8rem 1.6rem; cursor: pointer; border: 1px solid transparent;
  transition: background-color .2s ease, border-color .2s ease, transform .2s ease, color .2s ease;
}
.btn-primary { background: var(--text); color: var(--bg); }
.btn-primary:hover { background: #FFF; transform: translateY(-1px); }
.btn-ghost { background: transparent; border-color: var(--border); color: var(--text); }
.btn-ghost:hover { border-color: var(--border-strong); transform: translateY(-1px); }
.btn-sm { padding: 0.55rem 1.1rem; font-size: 0.875rem; }

.chip {
  font-size: .75rem; font-weight: 500; letter-spacing: .06em; text-transform: uppercase;
  padding: .25rem .6rem; border-radius: var(--r-chip);
  background: var(--surface-2); color: var(--text-dim);
}
.chip-live { background: color-mix(in srgb, var(--gold) 12%, transparent); color: var(--gold); }
```

---

## 5. Signature: the aurora glow

The one memorable element. A large, soft, heavily blurred gradient built from the
aurora tokens, positioned as a band across the top of the hero and bleeding off the
edges. Blobs use `mix-blend-mode: screen` and `filter: blur(70px)` to `120px`, with a
bottom fade mask so there is no hard clipped line at the section boundary.

Tuning knobs used on the live site: aurora opacity `0.5`, grain opacity `0.07`.

```css
.aurora-wrap {
  position: absolute; top: -16%; left: -8%; right: -8%;
  height: min(78vh, 760px);
  pointer-events: none; z-index: 1;
  opacity: var(--aurora-opacity, 0.5);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 90%);
  mask-image: linear-gradient(to bottom, black 50%, transparent 90%);
}
.aurora-blob {
  position: absolute; border-radius: 50%;
  filter: blur(70px); mix-blend-mode: screen; will-change: transform;
  background: radial-gradient(circle, var(--c) 0%, transparent 65%);
}
.aurora-blob.b-gold    { --c: var(--aurora-gold);    inset: 12% 30% 34% 18%; }
.aurora-blob.b-orange  { --c: var(--aurora-orange);  inset: 18% 14% 26% 48%; opacity: .85; }
.aurora-blob.b-magenta { --c: var(--aurora-magenta); inset: 30%  4% 18% 70%; opacity: .55; }
.aurora-blob.b-blue    { --c: var(--aurora-blue);    inset: 38% 44%  8% 30%; opacity: .50; }
.aurora-blob.b-teal    { --c: var(--aurora-teal);    inset: 24% 76% 22% -4%; opacity: .45; }
```

**Film grain** over the glow, so it only reads where there is light:

```css
.aurora-grain {
  position: absolute; inset: 0; pointer-events: none;
  opacity: var(--grain-opacity, 0.07);
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 240px 240px;
}
```

A second, much fainter instance (opacity ~0.22) sits behind the final CTA only.

**Portrait companion treatment.** The portrait sits in the palette via one of two
hover effects, both cursor-driven (`--mx` / `--my` set from pointer position):
- **Tilt** (shipped default): the card leans toward the cursor with a passing light
  sheen and a deep drop shadow.
- **Spotlight**: the photo dims to a moody duotone and a cursor-following light
  reveals it in full color with a warm gold halo.

Both are gated behind `@media (pointer: fine)`.

---

## 6. Motion

GSAP (`@gsap/react`) + ScrollTrigger + Lenis. Restrained. The aurora is the showpiece;
everything else is quiet.

- **Hero load**: eyebrow, then headline (per-line stagger), then sub, then buttons,
  then the trusted-by row. About 1s total, `power3.out`. The aurora fades in under it.
- **Section reveals**: translateY 16-24px + fade, 0.6s, staggered children. Same
  easing everywhere.
- **Cards**: hover lift + border brighten only. Nothing bouncy.
- **Stats**: count-up on first view; show final numbers directly under reduced motion.
- **Logo marquee**: two rows scrolling opposite directions, 28s linear infinite, edge
  mask fade, paused on hover.
- **Journey spine**: a gold gradient line scales in on scroll and lights each dot as
  it passes.
- Honor `prefers-reduced-motion: reduce` everywhere and freeze the aurora drift.

---

## 7. Section architecture

1. **Nav** - thin, sticky, transparent over the hero, gains `--bg` at 86 percent with
   a 14px backdrop blur on scroll. Logo left, center links, language toggle plus a
   primary pill right. Links and CTA hide under 720px.
2. **Hero** - aurora glow, eyebrow pill with a gold status dot, Display XL headline
   with the dimmed-tail emphasis, two pill buttons, then a **Trusted by** logo strip.
3. **About card** - three columns inside one `--surface` card: role + company + bio +
   CTA on the left, portrait center, stats stacked right with hairline dividers.
   Stacks to one column on mobile.
4. **Journey** - year-stamped cards on `--surface` with gold year chips and a vertical
   spine with lit dots.
5. **Products** - grid of cards with a mockup image, category chip, title, one-line
   prop, status chip (`Live` gold / `Coming soon` dim), and an arrow. Whole card links.
6. **Contact / final CTA** - big Display headline, email, socials, faint second aurora
   behind it.
7. **Footer** - `--bg`, hairline top border, brand + nav + legal row.

---

## 8. Logo treatment

Client logos render as uniform white silhouettes so mixed-source SVGs and PNGs read
as one set:

```css
.trusted-logo {
  height: 22px; width: auto; display: block;
  filter: brightness(0) invert(1);
  opacity: 0.5;
  transition: opacity .25s ease;
}
.trusted-logo:hover { opacity: 1; }
.trusted-logo.lg { height: 26px; }
.trusted-logo.sm { height: 18px; }
```

Source assets should be single-color SVGs or transparent PNGs.

---

## 9. Quality floor

Build these in from the start:

- Responsive down to 360px; multi-column cards stack to single column on mobile.
- Visible keyboard focus: 2px gold `focus-visible` ring, 3px offset, 4px radius.
- `prefers-reduced-motion` fully respected, aurora frozen, marquee stopped.
- Contrast: body copy in `--text` / `--text-dim`, never gold on dark.
- Fonts subset for Greek, preloaded, with a fallback that keeps the EL hero intact
  through font swap.
- Images webp/avif, portrait responsive with srcset. The aurora is pure CSS, no image
  weight.
- Every number and logo verified before it ships. No placeholder stats.

---

## 10. Voice and content rules

- First person where possible; it reads warmer than third person on a personal site.
- Plain, operator language. No hype, no urgency tactics, no sales-funnel copy.
- No fabricated testimonials, invented stats, or fake ratings. Testimonial sections
  ship only with real, named, permissioned quotes.
- No invented services. If an offering is not confirmed, the section is cut.
- EL default, EN toggle. Both languages get equal typographic care.

---

## 11. Tailwind mapping

The tokens are wired into Tailwind so utilities and raw CSS stay in sync. Preflight is
disabled because the design system supplies its own base styles.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        'text-faint': 'var(--text-faint)',
        gold: 'var(--gold)',
        'gold-soft': 'var(--gold-soft)',
        'aurora-gold': 'var(--aurora-gold)',
        'aurora-orange': 'var(--aurora-orange)',
        'aurora-magenta': 'var(--aurora-magenta)',
        'aurora-blue': 'var(--aurora-blue)',
        'aurora-teal': 'var(--aurora-teal)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        strong: 'var(--border-strong)',
      },
      borderRadius: {
        card: 'var(--r-card)',
        input: 'var(--r-input)',
        chip: 'var(--r-chip)',
        pill: 'var(--r-pill)',
      },
      fontFamily: {
        display: ['Manrope Variable', 'Inter Variable', 'system-ui', 'sans-serif'],
        body: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
    },
  },
  corePlugins: { preflight: false },
  plugins: [],
};
```

---

## 12. Copy-paste starter block

Everything needed to bootstrap the look in a new project:

```css
:root {
  /* surfaces */
  --bg: #0A0A0C;
  --surface: #141416;
  --surface-2: #1C1C20;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.14);

  /* text */
  --text: #F7F7F6;
  --text-dim: #8B8B92;
  --text-faint: #5E5E66;

  /* accent */
  --gold: #F2C14E;
  --gold-soft: #FFD56B;

  /* aurora */
  --aurora-gold: #F2C14E;
  --aurora-orange: #FF7A3C;
  --aurora-magenta: #E85CCB;
  --aurora-blue: #5B7CF5;
  --aurora-teal: #2FD6C2;

  /* radii */
  --r-card: 16px;
  --r-input: 12px;
  --r-chip: 8px;
  --r-pill: 999px;

  /* type */
  --font-display: 'Manrope Variable', 'Inter Variable', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter Variable', system-ui, -apple-system, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { background: var(--bg); }
body {
  font-family: var(--font-body);
  color: var(--text);
  font-size: 1rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
a { color: inherit; text-decoration: none; }
:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 4px; }
```

---

## 13. Brand identity facts

| Field | Value |
|---|---|
| Name | Apollon Papas / Απόλλων Παπάς |
| Role | Founder, GYA Media Group |
| Positioning | Founder. Operator. Educator. |
| Site | https://apollonpapas.com/ |
| Email | hello@apollonpapas.com |
| LinkedIn | https://www.linkedin.com/in/apollonpapas/ |
| Default language | Greek (EL), with an EN toggle |
