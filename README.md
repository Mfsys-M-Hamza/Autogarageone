# Auto Garage One — Website

Marketing and booking website for **Auto Garage One**, a car repair workshop in Multi Gardens B-17, Islamabad.
Built to be reused for other auto-repair clients by editing one configuration file and replacing the logo.

**Stack:** Next.js 16 (App Router, fully static generation) · React 19 · TypeScript · Tailwind CSS 4 · Three.js (hero only, lazy-loaded)

---

## Quick start

Requirements: **Node.js 20.9+** (tested on Node 24) and npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build        # type-checks and pre-renders all 42 routes
npm start            # serves the production build on port 3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (static pages + type check) |
| `npm start` | Serve the production build |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |
| `npm run assets` | Regenerate logo, favicons and social image from `assets/source/logo-original.png` |
| `npm run qa -- http://localhost:3000` | Automated QA suite (needs a running server + Chrome) — see `docs/TESTING-REPORT.md` |

---

## Where things live

```
src/config/client.ts      ← ALL business details (name, phones, address, hours, offer, SEO, colours)
src/config/navigation.ts  ← menu items
src/data/services.ts      ← service pages (one entry = one page at /services/<slug>)
src/data/blog.ts          ← blog articles (one entry = one page at /blog/<slug>)
src/data/content.ts       ← FAQs, reviews, gallery, About page copy, stats
src/app/                  ← pages (App Router)
src/components/           ← UI, forms, visuals, conversion widgets
src/components/hero/      ← Three.js hero scene + SVG fallback
src/components/visuals/   ← original animated SVG mechanical illustrations
scripts/build-assets.mjs  ← logo/favicon/OG image pipeline
scripts/qa.mjs            ← automated QA suite
docs/                     ← testing report, asset licences, client checklist
```

### Changing business details

Edit **`src/config/client.ts`** — the name, tagline, phone, WhatsApp number, address, hours, social links,
service areas, offer, colours and SEO defaults are all there, and every page, link, schema and form reads from it.

Values flagged `confirmed: false` are handled safely until the owner confirms them:

- **Opening hours** — shown as "please call before visiting" and left out of structured data.
- **Map coordinates** — the map and directions use the address search instead of a pin.
- **Emergency breakdown service** — `enabled: false` in `services.ts`, so it is hidden everywhere.

### Managing the offer

In `client.offer`:

- `active: false` hides every banner, card, popup and countdown.
- `endsAt` is the real expiry (with the Pakistan time offset). After it passes, the banner hides and the countdown
  shows "This offer has ended", even without a rebuild. Rebuild afterwards so the pages drop the offer completely.
- `terms` are the editable terms shown on `/special-offers`.

### Adding a service, article, review or photo

- **Service:** add an object to `src/data/services.ts`. Its page, sitemap entry, Service schema, menus and booking-form option are generated.
- **Article:** add an object to `src/data/blog.ts`. The page, table of contents, reading time, Article schema and related links are generated.
- **Review:** add **genuine reviews only** to `reviews` in `src/data/content.ts`. Rating schema appears automatically once at least one real review exists.
- **Photo:** put an optimised `.webp` in `public/gallery/`, then set `src`, `width`, `height` and `illustration: false` on the gallery item.

### Reusing for another client

1. Copy the project and edit `src/config/client.ts`.
2. Replace `assets/source/logo-original.png` (a square-ish PNG on a white background works best) and run `npm run assets`.
   Update `client.logo.width/height` if the printed size changes.
3. Update brand colours in both `client.colors` and the `@theme` block in `src/app/globals.css`.
4. Review `services.ts`, `blog.ts` and `content.ts` copy.
5. Set `NEXT_PUBLIC_SITE_URL` to the new domain.

---

## Deployment

Set the environment variable **`NEXT_PUBLIC_SITE_URL`** (for example `https://www.autogarageone.pk`) before building.
It is used for canonical URLs, the sitemap, Open Graph tags and structured data. See `.env.example`.

### Vercel (recommended)

1. Push the repository to GitHub/GitLab.
2. Import it at vercel.com → framework preset "Next.js" (auto-detected).
3. Add `NEXT_PUBLIC_SITE_URL` under Settings → Environment Variables.
4. Deploy. Security headers, redirects and image optimisation all work out of the box; HTTPS is automatic.

### Netlify

Import the repository; Netlify detects Next.js and uses its Next.js runtime automatically.
Add `NEXT_PUBLIC_SITE_URL` as an environment variable. Headers and redirects from `next.config.ts` are supported.

### Any Node.js host (VPS, cPanel "Node.js App", Docker)

```bash
npm ci && npm run build
PORT=3000 npm start
```

Put the app behind Nginx/Apache with HTTPS (for example Let's Encrypt). Headers and redirects are applied by Next.js itself.

### After going live

- Submit `https://<domain>/sitemap.xml` in Google Search Console.
- Validate structured data with Google's Rich Results Test.
- Link the site from the Google Business Profile, and add the profile/review URLs to `client.ts`.

---

## Analytics and cookies

No analytics are installed, so the site sets no tracking cookies and shows no consent banner.
To add Google Analytics 4, set `client.analytics.ga4Id`. A consent banner then appears automatically, GA only loads
after the visitor accepts, and the Content Security Policy is widened for Google's domains at build time.

## Forms and privacy

The appointment and contact forms have **no backend**. They validate and sanitise the input, then open WhatsApp with a
pre-filled message addressed to the workshop. The customer presses Send, and nothing is stored on the website.
Spam protection: a honeypot field, a minimum fill time, and a client-side cooldown.
Photo uploads are handled in the WhatsApp chat rather than on the site, so no insecure upload endpoint exists.
If a server-side form is added later, keep any keys in server environment variables, never in `src/config`.
