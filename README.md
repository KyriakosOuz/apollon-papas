# Apollon Papas - Personal Brand Site

Production scaffold for apollonpapas.com, generated from the approved design prototype.
Pairs with `docs/apollon-papas-brief.md` and the apollon-design skill (v2 tokens).

## Stack

- React 18 + Vite 5 + TypeScript (SPA)
- Tailwind CSS 3 with CSS custom property theming (tokens in `src/styles/site.css`, mapped in `tailwind.config.js`; preflight off, the site stylesheet owns the reset)
- GSAP (@gsap/react + ScrollTrigger) + Lenis smooth scroll
- react-i18next, EL default with EN toggle (persisted to localStorage)
- Self-hosted fonts via @fontsource-variable: Manrope (display, includes Greek) + Inter (body, Greek subset)

## Run

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Design decisions baked in (from the prototype phase)

- Headline: fill-wave reveal on the tail, settles WHITE (`SITE.tailEnd` in `src/config.ts`)
- Portrait: Tilt effect (`SITE.portraitEffect`)
- Aurora: five token-colored blobs, screen-blended, positional drift + palette color cycling
- Trusted-by: infinite CSS marquee with edge fade masks, no hover pause
- All motion frozen under `prefers-reduced-motion`

## Still pending (do not fabricate)

- EY logo for the trusted-by marquee (add to `public/assets/logos/`, then to `TRUSTED_LOGOS` in `src/config.ts`)
- Real CRS screenshot for the program card (replace `.product-mockup` in `src/components/Programs.tsx`)
- Extended bio text from Apollo (extend `about.bio` in `src/i18n/*.json`)
- Privacy / terms pages (footer links are stubs)
- Prerender/SSG + analytics per brief section 5 (deploy-time concerns, Option A Nginx routing)

## Rules carried from the brief

- No em dashes anywhere - plain hyphens only
- Every number and logo must be real and verified
- EL is the default language
- Colors, type, radii come only from the design tokens
