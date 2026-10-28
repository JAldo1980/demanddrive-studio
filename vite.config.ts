import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { marked } from 'marked'
import { defineConfig, type Plugin } from 'vite'
// js-yaml 4.1.1 (MIT), vendored so the build needs no extra dependency.
import { CORE_SCHEMA, load as loadYaml } from './scripts/vendor/js-yaml.mjs'

/**
 * Make `vite preview` serve prerendered pages the way a static host does:
 * /services -> dist/services.html, unknown paths -> dist/404.html.
 * Without this, preview falls back to the homepage HTML for every route.
 */
function staticHostPreview(): Plugin {
  return {
    name: 'static-host-preview',
    configurePreviewServer(server) {
      const outDir = resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? '/').split(/[?#]/)[0]
        if (path.includes('.') && !path.endsWith('.html')) return next()
        const file = path === '/' ? '/index.html' : `${path.replace(/\/$/, '')}.html`
        if (path.endsWith('.html') || existsSync(join(outDir, file))) {
          if (!path.endsWith('.html')) req.url = file
        } else {
          res.statusCode = 404
          req.url = '/404.html'
        }
        next()
      })
    },
  }
}

/**
 * Turn Markdown posts (src/content/insights/*.md) into modules at build time:
 * `export default { ...frontMatter, html, readingMinutes }`. Front matter is
 * YAML between `---` markers, as written by hand or by Pages CMS (.pages.yml).
 */
function markdownPosts(): Plugin {
  return {
    name: 'markdown-posts',
    enforce: 'pre',
    transform(source, id) {
      if (!id.endsWith('.md')) return
      const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source)
      if (!match) throw new Error(`${id}: missing front matter`)
      const [, front, body] = match
      const parsed = loadYaml(front, { schema: CORE_SCHEMA }) as Record<string, unknown> | null | undefined
      if (parsed != null && (typeof parsed !== 'object' || Array.isArray(parsed))) {
        throw new Error(`${id}: front matter must be YAML key: value pairs`)
      }
      const data: Record<string, unknown> = { ...(parsed ?? {}) }
      // Tags may be a YAML list or a comma-separated string.
      if (typeof data.tags === 'string') {
        data.tags = data.tags.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim()).filter(Boolean)
      }
      // Dates as plain YYYY-MM-DD strings, however they were written.
      for (const key of ['date', 'updated']) {
        const value = data[key]
        if (value instanceof Date) data[key] = value.toISOString().slice(0, 10)
        else if (typeof value === 'string') data[key] = value.slice(0, 10)
        else if (value === null || value === '') delete data[key]
      }
      // Drop empty optional fields left behind by the CMS form.
      for (const [key, value] of Object.entries(data)) {
        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) delete data[key]
      }
      if (Array.isArray(data.faqs)) {
        data.faqs = data.faqs.filter(
          (f): f is { question: string; answer: string } =>
            Boolean(f && typeof f.question === 'string' && f.question.trim() && typeof f.answer === 'string' && f.answer.trim()),
        )
      }
      for (const key of ['title', 'description', 'date']) {
        if (!data[key]) throw new Error(`${id}: front matter is missing "${key}"`)
      }
      const html = marked.parse(body, { async: false })
      const words = body.split(/\s+/).filter(Boolean).length
      const post = { ...data, html, readingMinutes: Math.max(1, Math.round(words / 220)) }
      return { code: `export default ${JSON.stringify(post)}`, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdownPosts(), react(), tailwindcss(), staticHostPreview()],
})
