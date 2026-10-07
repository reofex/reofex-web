# Reofex Technologies — website

Static, product-led marketing site built with [Astro](https://astro.build). Zero client-side framework;
only small progressive-enhancement scripts (nav, menus, carousel, scroll reveal, contact form).

```sh
npm install
npm run dev      # http://localhost:4321  (Astro 7 runs the dev server as a daemon: `npx astro dev stop`)
npm run build    # → dist/
npm run check    # type-check
```

## Brand

- **Logo** — `src/components/ui/logo-paths.svg` and `public/brand/*.svg` are extracted verbatim from the
  supplied vector PDF (`public/brand/reofex-logo-source.pdf`). Never redraw. `<Logo tone="light|dark" />`
  switches the wordmark between white (dark backgrounds) and `#12282F` (light backgrounds).
- **Colors** — sampled from the logo vectors: orange `#F78D20`, dark `#12282F`, white. All tokens live in
  `src/styles/tokens.css`.
- **Type** — Manrope (variable, self-hosted via Fontsource).

## Where content lives

| What | File |
| --- | --- |
| Products (cards, mega menu, footer, product pages) | `src/data/products.ts` |
| Services, process steps, capabilities, nav, case studies, contact info | `src/data/site.ts` |
| Product page template | `src/pages/products/[slug].astro` |

Respondly and Fynex copy mirror therespondly.com and gofynex.com (inspected 2026-10-07).

## Before launch — needs real information

- [ ] Production domain (`astro.config.mjs` `site` + `src/data/site.ts` `url`)
- [x] Contact email: `info@reofex.com`
- [x] WhatsApp for "Get Started": +91 8075954537 (`site.whatsapp`)
- [x] Social profiles: LinkedIn, Instagram, GitHub
- [ ] Case studies (`caseStudies` — all placeholders; no customers or metrics invented)
- [x] Privacy Policy & Terms written for India (DPDP Act 2023, IT Act 2000) — have a lawyer review;
      add registered address + named Grievance Officer when available. Update the policy if analytics,
      cookies or a form provider are ever added.
- [ ] About page company story / team / location
- [ ] Reofex Growth & Reofex Sync CTAs point to `/contact` — swap for product URLs when live
- [ ] Reofex Sync: confirm which accounting systems are supported, then list them
- [ ] Contact form endpoint (`PUBLIC_FORM_ENDPOINT`, see `.env.example`)
