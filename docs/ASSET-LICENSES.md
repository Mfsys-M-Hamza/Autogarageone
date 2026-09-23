# Asset Licensing & Attribution

Every visual asset in this project is either supplied by the client or created specifically for this site.
**No stock photography, third-party images or manufacturer logos are used, so no attribution is currently required.**

| Asset | Location | Source | Licence / status |
|---|---|---|---|
| Auto Garage One logo (original) | `assets/source/logo-original.png` | Supplied by the client | Client-owned. Used with permission. |
| Transparent logo, favicons, app icons | `public/brand/*`, `src/app/icon.png`, `src/app/apple-icon.png` | Generated from the client logo by `scripts/build-assets.mjs` (background removed only; not recoloured, cropped or distorted) | Client-owned (derivative of the supplied logo) |
| Social sharing image | `public/brand/og-image.jpg` | Generated from the client logo and site text by `scripts/build-assets.mjs` | Client-owned |
| Promotional flyer (reference only) | `assets/source/flyer-reference.jpg` | Supplied by the client | Reference only; not published on the site |
| Animated mechanical illustrations (engine, scanner, brake disc, injector, AC, battery and others) | `src/components/visuals/Mechanical.tsx` | Original SVG artwork written for this project | Owned by the project; no third-party rights |
| 3D hero scene (wheel, brake, gears, pistons) | `src/components/hero/heroScene.ts` | Built in code from Three.js primitives; no downloaded models | Owned by the project |
| UI icons (phone, WhatsApp glyph, calendar and others) | `src/components/Icons.tsx` | Hand-written simple SVG paths | Owned by the project. The WhatsApp, Facebook, Instagram, TikTok and YouTube glyphs are used only to link to those services, which their brand guidelines allow. |
| Fonts: Barlow Condensed, Inter | Loaded through `next/font`, self-hosted at build time | Google Fonts | SIL Open Font License 1.1 |

## Software libraries (main)

| Library | Licence |
|---|---|
| Next.js, React, React DOM | MIT |
| Three.js | MIT |
| Tailwind CSS | MIT |
| sharp (build-time image processing) | Apache-2.0 |
| Puppeteer-core, axe-core (QA only, dev dependencies) | Apache-2.0 / MPL-2.0 |

## Rules for future media

- Add authentic workshop photos only if the business owns them or holds written permission.
- Label any illustration or stock image clearly; never present it as the actual premises or customer work (the gallery already does this).
- Do not use vehicle manufacturer logos without permission.
- If an asset requires attribution, add a row to the table above **and** a visible credit (for example in the gallery caption or footer).
