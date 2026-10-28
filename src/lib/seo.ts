import { useEffect } from 'react'
import { site } from '../config/site'
import { faqsByPath } from '../content/faqs'
import type { PageMeta } from '../routes'

const OG_IMAGE = '/og-image.png'

function canonicalUrl(meta: PageMeta) {
  return site.url + (meta.path === '/' ? '/' : meta.path)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Tags managed per page. Each has a data attribute so the client can update them. */
function headTags(meta: PageMeta) {
  const url = canonicalUrl(meta)
  return [
    { tag: 'meta', key: 'description', attrs: { name: 'description', content: meta.description } },
    { tag: 'meta', key: 'robots', attrs: { name: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow' } },
    { tag: 'link', key: 'canonical', attrs: { rel: 'canonical', href: url } },
    { tag: 'meta', key: 'og:type', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', key: 'og:site_name', attrs: { property: 'og:site_name', content: site.name } },
    { tag: 'meta', key: 'og:locale', attrs: { property: 'og:locale', content: 'en_GB' } },
    { tag: 'meta', key: 'og:title', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', key: 'og:description', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', key: 'og:url', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', key: 'og:image', attrs: { property: 'og:image', content: site.url + OG_IMAGE } },
    { tag: 'meta', key: 'og:image:width', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', key: 'og:image:height', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', key: 'og:image:alt', attrs: { property: 'og:image:alt', content: `${site.name} logo` } },
    { tag: 'meta', key: 'twitter:card', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
  ] as const
}

/** Server-side: the <head> markup for a page, injected by the prerender script. */
export function renderHead(meta: PageMeta) {
  const tags = headTags(meta).map(({ tag, key, attrs }) => {
    const attributes = Object.entries(attrs)
      .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
      .join(' ')
    return `<${tag} data-seo="${key}" ${attributes} />`
  })
  const jsonLd =
    meta.path === '/'
      ? `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: site.name,
          description: site.positioning,
          url: site.url,
          areaServed: 'GB',
          ...(site.contact.email ? { email: site.contact.email } : {}),
          ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
          ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
        })}</script>`
      : ''
  const pageFaqs = faqsByPath[meta.path]
  const faqLd = pageFaqs
      ? `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: pageFaqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}</script>`
      : ''
  return [`<title>${escapeHtml(meta.title)}</title>`, ...tags, jsonLd, faqLd].filter(Boolean).join('\n    ')
}

/** Client-side: keep the <head> in sync after in-app navigation. */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    document.title = meta.title
    for (const { tag, key, attrs } of headTags(meta)) {
      let el = document.head.querySelector<HTMLElement>(`[data-seo="${key}"]`)
      if (!el) {
        el = document.createElement(tag)
        el.dataset.seo = key
        document.head.appendChild(el)
      }
      for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
    }
  }, [meta])
}
