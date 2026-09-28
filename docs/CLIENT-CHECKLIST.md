# Client Checklist: Details Still Needed from Auto Garage One

The site is complete and safe to publish as-is. Unconfirmed items are either hidden or worded neutrally.
Supplying the details below will make it stronger. Each item shows where it goes (all paths relative to the project root).

## Must confirm before launch

| # | Item | Why it matters | Where to change it |
|---|---|---|---|
| 1 | **Domain name** (for example `autogarageone.pk`) | Canonical URLs, sitemap, social previews | `NEXT_PUBLIC_SITE_URL` env var or `client.siteUrl` |
| 2 | ~~Opening hours~~ **Done**: Sat–Thu 9 am–9 pm, Friday closed (from Google Business Profile). Update if they change | Shown on the Contact, Book and Footer sections, and in Google structured data | `client.hours.days` |
| 3 | **Offer terms**: one scan per vehicle? advance booking required? any vehicle exclusions? | Terms are published on `/special-offers` | `client.offer.terms` |
| 4 | **Social media profiles**: confirm each URL exists (Facebook, Instagram, TikTok, YouTube for @autogarageonepk) | Broken social links hurt trust | `client.social.links` (remove any that don't exist) |
| 5 | **Workshop standards and values wording** (About page), for example "seat and floor covers used", "old parts shown on request" | Must describe what the workshop actually does | `about.standards`, `about.values` in `src/data/content.ts` |
| 6 | **Services offered**: confirm all 16 listed services, especially hybrid repair, diesel injectors, wheel alignment and bringing your own oil | Service pages must be accurate | `src/data/services.ts` |
| 7 | **Location description**: the Service Area section says the workshop is "just off the Srinagar Highway". Please confirm this, plus the nearby areas list | Local SEO accuracy | `ServiceArea.tsx`, `client.serviceAreas.nearby` |

## Strongly recommended

| # | Item | Where |
|---|---|---|
| 8 | ~~Exact Google Maps pin~~ **Done** (from the Google listing) | `client.geo` |
| 9 | Google Business Profile URL **done**. Still needed: the direct "write a review" link (currently opens the Maps listing) | `client.googleReviewUrl` |
| 10 | **Business email address**, if one is monitored | `client.email` |
| 11 | **More workshop photos**: 3 photos and 5 videos are live. Still wanted: bays, technicians at work, before/after | Originals in `assets/media/`, run `npm run media`, then `galleryItems` in `src/data/content.ts` |
| 12 | Muzammal Abbas rating **done** (4★). Still wanted: the full text of the two reviews Google shows truncated ("…"), and new reviews as they arrive | `reviews` in `src/data/content.ts` |
| 13 | **Technician profiles**: names, roles, genuine qualifications and experience | `about.team` in `src/data/content.ts` |
| 14 | **Emergency breakdown assistance**: is it offered? coverage area? hours? | Set `enabled: true` on `emergency-breakdown-assistance` in `services.ts` and complete its copy |
| 15 | **Certifications or equipment brands**: the flyer shows a "Certified" badge. Please supply what it certifies and who issued it before it is mentioned on the site | About page |
| 16 | **Brands or vehicle types** the workshop specialises in (for example Toyota and Honda hybrids) | Service copy |

## Optional

- Google Analytics 4 ID (a consent banner is added automatically): `client.analytics.ga4Id`
- X/Twitter handle, if any: `client.seo.twitterHandle`
- A real "cars serviced" count, for the home page stats once there is genuine data: `stats` in `src/data/content.ts`

## Notes on content decisions

- The flyer says "Advance Services". The website uses **"Advanced Services"**, as requested.
- One Google review mentions **bike service** and one lists **carburetor cleaning**; neither is listed as a service on the site. Confirm whether to add them.
- No prices, awards, years of experience, customer counts or "best/No. 1/guaranteed" claims are published.
- The legal pages (Privacy, Terms, Cookies, Disclaimer) are sensible templates written for this site's actual behaviour.
  **Have them reviewed by a legal adviser before launch.**
