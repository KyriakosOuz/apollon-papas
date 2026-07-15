# Overlay CMS resolver contract

This site is bilingual (Greek default, English via the nav toggle) and **all copy
lives in `src/i18n/el.json` / `src/i18n/en.json`**, not in the JSX. The DOM tags
therefore describe *where a string lives*, not just *which element it is*.

Loader: `<script src="https://cms.kyroma.dev/overlay/loader.js">` sits last before
`</body>` in `index.html`. No CSP exists anywhere in this repo, so the site is
frameable by default and **no `frame-ancestors` header was added** — do not add
`X-Frame-Options`.

## Attributes

| Attribute | Meaning |
| --- | --- |
| `data-edit-section` | Logical section slug (`nav`, `hero`, `about`, `journey`, `programs`, `contact`, `footer`). |
| `data-edit-id` | Unique element slug. Stable across locales — the **same** id renders Greek or English depending on the toggle. |
| `data-edit-key` | Dotted path into the source file. `{i}` is a loop-index placeholder. Absent when the string is a literal in the TSX (grep finds it directly). |
| `data-edit-source` | File the key resolves against. Set once on the app root; **nearest ancestor wins**. |
| `data-edit-type="image"` | Element's editable text is its `alt`. |

## Resolution

1. Read `data-edit-key` from the element.
2. Walk **up** the DOM to the nearest `data-edit-source`.
3. Write to that path in that file.

The app root carries the locale-reactive source:

```tsx
<div data-lang={i18n.language} data-edit-source={`src/i18n/${i18n.language}.json`}>
```

Clicking EL/EN re-renders and swaps `data-edit-source` between `el.json` and
`en.json`, so an edit made while viewing English lands in `en.json` automatically.

> **This locale-awareness is mandatory, not an optimisation.** `data-edit-id` is
> locale-independent by design. A resolver that maps an id to a single fixed
> location will write English into `el.json` and silently destroy the Greek copy.

## Loop indices

`{i}` is the array index, substituted **mid-path** — a trailing suffix cannot
express it:

| `data-edit-id` (template) | `data-edit-key` | Resolves to |
| --- | --- | --- |
| `home.journey.item-title` | `journey.items.{i}.title` | `journey.items.2.title` |
| `home.about.stat-label` | `about.stats.{i}.label` | `about.stats.0.label` |

## Elements whose text is not i18n-backed

These override `data-edit-source`, or carry no key at all. They are **not**
locale-scoped: one value serves both languages.

| `data-edit-id` | Where the string actually lives |
| --- | --- |
| `home.contact.email` | `SITE.email` in `src/config.ts` — also feeds the `mailto:` href |
| `home.hero.trusted-logo` | `TRUSTED_LOGOS.{i}.alt` in `src/config.ts` |
| `home.about.role-logo` | `alt="GYA Media"` literal in `About.tsx` |
| `nav.lang.el` / `nav.lang.en` | `"EL"` / `"EN"` literals in `Nav.tsx` |
| `home.hero.headline-dot` | `"."` literal in `Hero.tsx` (decorative gold dot) |
| `home.programs.crs-arrow` | `"↗"` literal in `Programs.tsx` |

Resolving the `config.ts` ones requires the CMS to parse TypeScript. If it only
understands JSON, move those strings into the locale files first.

## Tagged but NOT safely writable

Everything visible is tagged per spec, but three targets cannot round-trip
through a text write. `npm run verify:edit-tags` reports these explicitly.

- **`home.about.stat-num`** — renders `fmtStat(n) + suffix`, i.e. a *locale-formatted
  composition of two JSON fields* (`about.stats.{i}.n` = `17539` and `.suffix` = `"+"`).
  The rendered string `"17.539+"` exists nowhere in source, so a grep-for-literal
  resolver will not find it. `n` is a **number**; writing a string corrupts the type
  and breaks both `fmtStat()` and the GSAP count-up (`Math.round(obj.v)`), which also
  rewrites `textContent` on scroll. The key points at `n` only. Treat as read-only
  until `n`/`suffix` are merged into a single display string.
- **`home.programs.crs-title` / `home.programs.crs-image`** — two unique ids, **one**
  key (`programs.crsTitle`), because the heading and the banner `alt` share a string.
  Editing either rewrites both. Split the key if they should diverge.
- **`home.hero.headline-lead`** — contains the decorative gold-dot `<span>` after its
  text, so the editable region is not a pure text node. A naive `innerText` write eats
  the dot (which is separately tagged as `home.hero.headline-dot`).

## Other structural notes

- **`home.hero.headline-tail`** is `hero.headTail` split by `.split(' ')` into per-word
  `<span className="tw">` elements for the GSAP colour sweep. Those spans are animation
  artifacts over a derived array, not independent content — the id sits on the wrapper,
  and a write must replace the wrapper's whole string.
- The second `<LogoSet hidden />` is an `aria-hidden` marquee duplicate and deliberately
  carries **no** id, so it cannot collide with the real one.
- `programs.mockupPlaceholder` exists in both locale files but is not rendered anywhere —
  dead copy, no element to tag.

## Verification

- `npm run verify:edit-tags` — id uniqueness, key existence in **both** locales,
  `{i}` paths per real array index, non-string targets, locale parity.
- `scripts/audit-coverage.js` — paste into the browser console on a running build to
  walk every rendered text node and report anything uncovered. Run once per locale.
