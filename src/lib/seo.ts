import { useEffect } from 'react'
import { site } from '../config/site'
import type { PageMeta } from '../routes'
import { structuredData } from './schema'

const OG_IMAGE = '/og-image.png'

function absolute(path: string) {
  return /^https?:\/\//.test(path) ? path : site.url + (path.startsWith('/') ? path : `/${path}`)
}

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
  const image = absolute(meta.image?.src ?? OG_IMAGE)
  const imageAlt = meta.image ? meta.image.alt || meta.title : `${site.name} logo`
  return [
    { tag: 'meta', key: 'description', attrs: { name: 'description', content: meta.description } },
    { tag: 'meta', key: 'robots', attrs: { name: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow' } },
    { tag: 'link', key: 'canonical', attrs: { rel: 'canonical', href: url } },
    { tag: 'meta', key: 'og:type', attrs: { property: 'og:type', content: meta.article ? 'article' : 'website' } },
    { tag: 'meta', key: 'og:site_name', attrs: { property: 'og:site_name', content: site.name } },
    { tag: 'meta', key: 'og:locale', attrs: { property: 'og:locale', content: 'en_GB' } },
    { tag: 'meta', key: 'og:title', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', key: 'og:description', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', key: 'og:url', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', key: 'og:image', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', key: 'og:image:width', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', key: 'og:image:height', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', key: 'og:image:alt', attrs: { property: 'og:image:alt', content: imageAlt } },
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
  const published = meta.article
    ? [
        `<meta property="article:published_time" content="${meta.article.published}" />`,
        meta.article.modified ? `<meta property="article:modified_time" content="${meta.article.modified}" />` : '',
        `<meta name="author" content="${escapeHtml(site.founder.name)}" />`,
      ]
        .filter(Boolean)
        .join('\n    ')
    : ''
  // JSON-LD: escape "<" so content can never close the script element early.
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(structuredData(meta)).replace(/</g, '\\u003c')}</script>`
  return [`<title>${escapeHtml(meta.title)}</title>`, ...tags, published, jsonLd].filter(Boolean).join('\n    ')
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
