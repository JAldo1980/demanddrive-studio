# Handover notes: owner inputs required

This site was built without inventing any client names, results, credentials, contact details or company history. Personal background, results and quotes come from James's own published materials: the three "WHAT / HOW / WHY" LinkedIn slide decks and his developer portfolio. The items below need the owner's input before launch. On the site, missing details appear as dashed boxes labelled **"Placeholder:"**. Search the code for `<Placeholder` or `null` in `src/config/site.ts` to find them all.

## 1. Required before launch

| Item | Where to add it | Currently |
| --- | --- | --- |
| Live domain | `VITE_SITE_URL` environment variable (see README) | `https://www.example.com` in canonical, OG and sitemap URLs |
| Phone number (optional) | `site.contact.phone` | Not set, so it is hidden everywhere. Email (`james_codes@icloud.com`) and location (Stafford, UK) are set. |
| Registered company name, number and address | `site.legal` in `src/config/site.ts` | Placeholder in footer and privacy notice |
| Privacy notice: final legal wording | `src/pages/Privacy.tsx` | **Draft**, clearly labelled on the page and set to `noindex`. Needs review by someone qualified to advise on UK GDPR. Confirm lawful basis, processors (e.g. Netlify and any CRM), retention period and last-updated date. Remove `noindex` in `src/routes.ts` once approved. |
| Form notification address | Netlify dashboard → Forms → Form notifications | An email notification exists. Confirm it goes to the inbox you want. A live test enquiry was accepted on 28 October 2026. |

## 2. Confirmed by the owner (28 October 2026)

- **Results from previous roles** may be published, anonymised and labelled **Previous role** (`src/content/work.ts`, `TrackRecord.tsx`).
- **Head of Commercial quote:** the "…the work your team have done" wording is correct, and may be published anonymously (`src/content/testimonials.ts`). The board report excerpt may also be published.
- **The Circle Line** is happy to appear, named and linked. The project uses a screenshot of their live homepage (`public/images/work/the-circle-line-home.webp`), captured on 28 October 2026. Retake it if their site changes.
- **LinkedIn recommendations** from Ryan Watson, Alison Davey, Marius Adam and Gemma Threlfall are quoted with their names, as shown publicly on LinkedIn. The text is exact; "…" marks where it is shortened. It is courteous to let them know they appear on the site.
- **Certifications** listed on the About page are the current or still-relevant ones from LinkedIn (`src/content/about.ts`). Expired or off-brief certificates (Google Ads, Webflow 101, 2019 HubSpot certificates, SEMrush social media) are left out. Update the HubSpot certificate when it is renewed; it expires in March 2027.
- The coatings case study lists paid media accurately as part of that historical work, even though paid media is no longer an offered service.

## 3. Content to supply when available

| Item | Where | Notes |
| --- | --- | --- |
| Real results for DemandDrive Studio clients | `src/content/work.ts` | Add with `kind: 'client'` once clients agree. Include an `outcome` only if it is verifiable. |
| More photography | `brand/photos/`, `public/images/` | The portrait and headshot come from your decks (originals kept in `brand/photos/`). The decks also contain event photos (TechCrunch Disrupt, an awards night) that could illustrate the About page. |
| Pricing or engagement models | Not on the site | The FAQs deliberately avoid prices and minimum engagements. Add an answer if you want to set expectations. |

## 4. Brand and logo

- **Logo master:** the site uses `brand/DemandDrive_Studio_Logo_Editable.svg`, the editable Illustrator export supplied on 28 October 2026. Its shapes, text positions and sizes are used unchanged in `src/components/layout/Logo.tsx`. The favicon and social image are generated from the same symbol.
  - The wordmark in that file is live Helvetica text, not outlines. The site pins each word to its Helvetica width, so devices without Helvetica (e.g. Windows, which uses Arial) show the same lock-up. For a pixel-exact master, export a version with the text converted to outlines, then replace `Logo.tsx` and run `npm run icons`.
- **Name, domain and trademark checks**, as recommended in the guidelines, are outstanding.
- **Reverse logo:** the footer uses a white logo on navy with the electric-blue arrow, as the guidelines allow ("use a blue accent only where contrast remains strong"). Confirm this is acceptable.

## 5. Copy review

All copy is in UK English and in the first person, as James. Figures and quotes appear only where they come from James's own materials, and are labelled with where they came from. The owner should still review:

- **The starter Insights post**, "Why your B2B website isn't generating enquiries" (`src/content/insights/`). It is general advice in your voice, with no figures or client claims. Edit it freely, or set `draft: true` to hide it until you are happy.
- **The About page** (`src/pages/About.tsx`, `src/content/about.ts`): your story, roles, strengths and the "I speak board" table, all drawn from your decks and portfolio.

- Hero headline: "Generate better B2B demand. Convert more of it."
- Service descriptions and "typically includes" lists in `src/content/services.ts`. Make sure every listed service is one the studio actually offers, e.g. CRM attribution.
- "What happens next" on the contact page and final call to action. It deliberately does not promise a response time. Add one (e.g. "within one working day") only if it can be met consistently.
- **The three concept projects** in `src/content/work.ts`. They describe fictional but realistic briefs. Check you are happy for each to represent your thinking, and that the deliverables are things you would actually provide.
- **FAQ answers** in `src/content/faqs.ts`, especially "Can you help with a single project?" (it says yes) and "What happens after the first conversation?" (it says you follow up by email with a view and, if there is a fit, a proposed scope, timescale and cost).
- Meta titles and descriptions in `src/routes.ts`.

## 6. Not implemented (by design)

| Item | Reason |
| --- | --- |
| Analytics / tag manager | No tools or IDs were supplied. If added, implement cookie consent first and update the privacy notice. |
| Cookie banner | Not needed while the site sets no non-essential cookies. Fonts are self-hosted and no third-party scripts are loaded. |
| CRM integration | None supplied. Netlify can forward form submissions via webhooks or Zapier if needed. |
| Spam protection beyond honeypot | Netlify's honeypot field and built-in spam filtering are enabled. Add reCAPTCHA (Netlify supports it) only if spam becomes a problem, and mention it in the privacy notice. |
| Blog / resources | Not in the initial scope. The route and content structure supports adding a `resources` section; see README → Extending the site. |

## 7. Verified during build

- `npm run build` completes without errors. `npm run typecheck` and `npm run lint` are clean.
- All routes (including /work and each project page) and the 404 page prerender with unique titles, descriptions, canonical URLs and Open Graph tags. `sitemap.xml` and `robots.txt` are generated.
- No hydration errors when loading the prerendered pages.
- Checked at mobile (375px), tablet (768px) and desktop (1440px) widths, with no horizontal scrolling.
- Navigation, mobile menu (including Escape to close), service anchor links, CTAs and the 404 page all work.
- Contact form: required-field and email-format validation, error summary with focus, live re-validation, and the success state with focus.

Not verified: real form delivery through Netlify (needs a deployment), and testing with a screen reader or on physical devices.
