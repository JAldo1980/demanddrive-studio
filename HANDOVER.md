# Handover notes: owner inputs required

This site was built without inventing any client names, results, credentials, contact details or company history. The items below need the owner's input before launch. On the site, missing details appear as dashed boxes labelled **"Placeholder:"**. Search the code for `<Placeholder` or `null` in `src/config/site.ts` to find them all.

## 1. Required before launch

| Item | Where to add it | Currently |
| --- | --- | --- |
| Live domain | `VITE_SITE_URL` environment variable (see README) | `https://www.example.com` in canonical, OG and sitemap URLs |
| Contact email | `site.contact.email` in `src/config/site.ts` | Placeholder in footer, contact page and privacy notice |
| Phone number (optional; leave `null` to keep it as a placeholder, or remove the row) | `site.contact.phone` | Placeholder |
| Location or service area | `site.contact.location` | Placeholder |
| Registered company name, number and address | `site.legal` in `src/config/site.ts` | Placeholder in footer and privacy notice |
| Privacy notice: final legal wording | `src/pages/Privacy.tsx` | **Draft**, clearly labelled on the page and set to `noindex`. Needs review by someone qualified to advise on UK GDPR. Confirm lawful basis, processors (e.g. Netlify and any CRM), retention period and last-updated date. Remove `noindex` in `src/routes.ts` once approved. |
| Form notifications | Netlify dashboard → Forms → enquiry → Notifications | Not configured. Enquiries will be stored in Netlify but nobody will be emailed. |
| Test enquiry on the live site | n/a | The form has been tested locally (validation, error and success states). Submission to Netlify can only be tested after deployment. |

## 2. Content to supply when available

| Item | Where | Notes |
| --- | --- | --- |
| Studio background and experience | `src/pages/About.tsx`, "Background and experience" section | Placeholder. Add accurate, verifiable details only: years of experience, sectors, types of work. Founder or team profiles can go here. |
| Client case studies | `src/content/work.ts` | None supplied. The Work section shows three **concept projects**, clearly labelled as such, with a note on the Work page that they are not client engagements. Add real projects with `kind: 'client'` and `approved: true` only when the client has approved publication; include an `outcome` only if it is verifiable. Once client work exists, the "these are concepts" note is hidden automatically. |
| Testimonials | `src/content/testimonials.ts` | Section built but **hidden on the live site** until an approved quote is added. |
| Client logos, accreditations | Not built | Intentionally omitted. Add only genuine, approved material. |
| Social profiles (e.g. LinkedIn) | `site.social` in `src/config/site.ts` | None supplied, so none are shown. Add as `{ label: 'LinkedIn', href: 'https://…' }`. |
| Photography | Not used | None was supplied, and stock photography was not downloaded without your approval. Visual interest comes from original interface mock-ups instead. Real photography (team, workspace, client environments) would strengthen the About page and could sit alongside the hero mock-up. |
| Pricing or engagement models | Not on the site | The FAQ deliberately avoids prices and minimum engagements. Add an answer if you want to set expectations. |

## 3. Brand and logo

- **Logo master:** the site uses `brand/DemandDrive_Studio_Logo_Editable.svg`, the editable Illustrator export supplied on 28 October 2026. Its shapes, text positions and sizes are used unchanged in `src/components/layout/Logo.tsx`. The favicon and social image are generated from the same symbol.
  - The wordmark in that file is live Helvetica text, not outlines. The site pins each word to its Helvetica width, so devices without Helvetica (e.g. Windows, which uses Arial) show the same lock-up. For a pixel-exact master, export a version with the text converted to outlines, then replace `Logo.tsx` and run `npm run icons`.
- **Name, domain and trademark checks**, as recommended in the guidelines, are outstanding.
- **Reverse logo:** the footer uses a white logo on navy with the electric-blue arrow, as the guidelines allow ("use a blue accent only where contrast remains strong"). Confirm this is acceptable.

## 4. Copy review

All copy was written to the brief and brand guidelines, in UK English, without statistics, guarantees or claims about past results. The owner should still review:

- Hero headline: "Generate better B2B demand. Convert more of it."
- Service descriptions and "typically includes" lists in `src/content/services.ts`. Make sure every listed service is one the studio actually offers, e.g. CRM attribution.
- "What happens next" on the contact page and final call to action. It deliberately does not promise a response time. Add one (e.g. "within one working day") only if it can be met consistently.
- **The three concept projects** in `src/content/work.ts`. They describe fictional but realistic briefs. Check you are happy for each to represent your thinking, and that the deliverables are things you would actually provide.
- **FAQ answers** in `src/content/faqs.ts`, especially "Can you help with a single project?" (it says yes) and "What happens after the first conversation?" (it says you follow up by email with a view and, if there is a fit, a proposed scope, timescale and cost).
- Meta titles and descriptions in `src/routes.ts`.

## 5. Not implemented (by design)

| Item | Reason |
| --- | --- |
| Analytics / tag manager | No tools or IDs were supplied. If added, implement cookie consent first and update the privacy notice. |
| Cookie banner | Not needed while the site sets no non-essential cookies. Fonts are self-hosted and no third-party scripts are loaded. |
| CRM integration | None supplied. Netlify can forward form submissions via webhooks or Zapier if needed. |
| Spam protection beyond honeypot | Netlify's honeypot field and built-in spam filtering are enabled. Add reCAPTCHA (Netlify supports it) only if spam becomes a problem, and mention it in the privacy notice. |
| Blog / resources | Not in the initial scope. The route and content structure supports adding a `resources` section; see README → Extending the site. |

## 6. Verified during build

- `npm run build` completes without errors. `npm run typecheck` and `npm run lint` are clean.
- All routes (including /work and each project page) and the 404 page prerender with unique titles, descriptions, canonical URLs and Open Graph tags. `sitemap.xml` and `robots.txt` are generated.
- No hydration errors when loading the prerendered pages.
- Checked at mobile (375px), tablet (768px) and desktop (1440px) widths, with no horizontal scrolling.
- Navigation, mobile menu (including Escape to close), service anchor links, CTAs and the 404 page all work.
- Contact form: required-field and email-format validation, error summary with focus, live re-validation, and the success state with focus.

Not verified: real form delivery through Netlify (needs a deployment), and testing with a screen reader or on physical devices.
