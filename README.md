# DemandDrive Studio website

Marketing website for DemandDrive Studio, a B2B digital growth studio.

Built with React 19, Vite, TypeScript, Tailwind CSS v4 and React Router. Every page is prerendered to static HTML at build time, so search engines and social platforms receive complete markup, titles and Open Graph tags. React then hydrates the page in the browser.

> **Before launch:** read [HANDOVER.md](HANDOVER.md). It lists the content and configuration the owner still needs to supply.

## Requirements

- Node.js 20.19 or later (22 recommended)
- npm 10 or later

## Setup

```bash
npm install
cp .env.example .env   # then set VITE_SITE_URL
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | Yes, for production | Absolute live URL, no trailing slash (e.g. `https://www.yourdomain.co.uk`). Used for canonical links, Open Graph URLs, `sitemap.xml` and `robots.txt`. Falls back to `https://www.example.com`, and the build prints a warning. |
| `VITE_FORM_ENDPOINT` | No | Public form endpoint to post enquiries to. Leave unset to use Netlify Forms. |

`VITE_` variables are compiled into client-side JavaScript. **Never put API keys or secrets in them.**

## Development

```bash
npm run dev       # http://localhost:5173
```

In development:

- The enquiry form **does not send anything**. It simulates a successful submission so you can test validation and success states.
- The "Selected work" section on the homepage shows labelled placeholder cards. On the live site the section is hidden until an approved case study exists.

Other scripts:

```bash
npm run typecheck # TypeScript
npm run lint      # oxlint
npm run icons     # regenerate favicon, apple-touch-icon and og-image.png from the logo symbol
```

## Production build

```bash
npm run build     # type-check, client build, SSR build, prerender
npm run preview   # serve dist/ at http://localhost:4173, the way a static host would
```

The build writes a static site to `dist/`:

```
dist/
  index.html            /
  services/index.html   /services
  about/index.html      /about
  contact/index.html    /contact
  privacy/index.html    /privacy   (noindex while the notice is a draft)
  404.html
  sitemap.xml
  robots.txt
  assets/               fingerprinted JS, CSS and fonts
```

## Deployment

### Netlify (recommended, configured)

`netlify.toml` already sets the build command, publish directory, Node version, asset caching and security headers.

1. Push the project to a Git repository and import it in Netlify, or run `npx netlify deploy --prod` from the project folder.
2. In **Site configuration → Environment variables**, set `VITE_SITE_URL` to the live domain.
3. Deploy. Netlify serves `contact/index.html` for `/contact`, and `404.html` for unknown URLs.
4. **Enquiry form:** Netlify detects the `enquiry` form in the prerendered contact page during deploy. In **Forms**, enable form detection if prompted, then add an email notification under **Forms → enquiry → Notifications** so new enquiries reach the right inbox. Submit a test enquiry after the first deploy.

### Other static hosts

Any static host works (Cloudflare Pages, Vercel, S3/CloudFront, Apache or Nginx):

- Build command `npm run build`, output directory `dist`.
- The host must serve `/<page>/index.html` for `/<page>`, and `404.html` for unknown paths. Most hosts do this by default.
- Netlify Forms will not work elsewhere. Set `VITE_FORM_ENDPOINT` to another form service that accepts a URL-encoded POST (for example Formspree or Basin), and check its response handling in `src/lib/enquiry.ts`.
- Recreate the cache and security headers from `netlify.toml` in the host's own configuration.

## Project structure

```
brand/                      Supplied logo vector master (reference only)
public/                     Static files copied as-is (favicons, og-image.png)
scripts/
  prerender.mjs             Renders each route to HTML, writes sitemap and robots
  generate-icons.mjs        Builds favicon / OG images from the logo symbol
src/
  config/site.ts            Business details: contact, legal, social (null = unconfirmed)
  content/                  Copy as data: services, challenges, approach, principles, case studies
  routes.ts                 Page titles, descriptions, sitemap settings, main navigation
  lib/seo.ts                <head> tags for prerender and client navigation
  lib/enquiry.ts            Form validation and submission
  components/
    ui/                     Button, Container, Section, SectionHeading, Placeholder
    layout/                 Header, Footer, Logo, Layout, SkipLink
    sections/               Page sections (Hero, Challenges, ServicesOverview, Approach, ...)
    EnquiryForm.tsx
  pages/                    Home, Services, About, Contact, Privacy, NotFound
  App.tsx                   Route definitions
  main.tsx                  Browser entry (hydrates prerendered HTML)
  entry-server.tsx          Prerender entry
  index.css                 Tailwind import and brand design tokens
```

### Design tokens

Brand colours and the typeface are defined once, in `src/index.css`, and used as Tailwind classes:

| Token | Value | Class examples |
| --- | --- | --- |
| Deep navy | `#0B1F3A` | `text-navy`, `bg-navy` |
| Electric blue | `#1769FF` | `bg-electric`, `text-electric` |
| Charcoal | `#252B36` | `text-charcoal` (body text) |
| Cool light | `#F4F6FA` | `bg-cool` |
| Muted text | `#535B6B` | `text-muted` (secondary text, AA contrast on white and cool) |

Inter is self-hosted through `@fontsource-variable/inter`, so there are no third-party font requests.

## Extending the site

**Add a page**

1. Create `src/pages/NewPage.tsx`.
2. Add a `<Route>` in `src/App.tsx`.
3. Add its title, description and sitemap priority to `pages` in `src/routes.ts`. The prerender script and sitemap pick it up automatically.
4. Add it to `mainNav` in `src/routes.ts` if it belongs in the header.

**Add individual service pages:** each service in `src/content/services.ts` has a stable `id`. Add a `services/:id` route, a page that looks the service up by `id`, and a `pages` entry for each service. Then change the links in `ServicesOverview` and the footer from `/services#id` to `/services/id`.

**Add case studies:** add entries to `src/content/caseStudies.ts`. Only entries with `approved: true` are shown, and the homepage "Selected work" section appears automatically once there is at least one. For full case-study pages, follow the same pattern as service pages.

**Add contact details or social links:** edit `src/config/site.ts`. Placeholders disappear as soon as a value is set.

## Analytics and cookies

No analytics, tracking pixels or non-essential cookies are included, so no cookie banner is needed at present. If analytics or advertising tags are added later, add a consent mechanism that blocks them until the visitor opts in, and update the privacy notice.

## Accessibility

- Semantic landmarks, one `h1` per page and an ordered heading hierarchy
- Skip link, visible focus states, and focus moved to the new content on navigation
- Labelled form fields, an error summary, inline errors linked with `aria-describedby`, and success and failure announcements
- Text colours meet WCAG AA contrast on their backgrounds
- Smooth scrolling is turned off for visitors who prefer reduced motion
