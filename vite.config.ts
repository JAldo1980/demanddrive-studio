import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { marked } from 'marked'
import { defineConfig, type Plugin } from 'vite'

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
 * simple `key: value` lines between `---` markers.
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
      const data: Record<string, unknown> = {}
      for (const line of front.split(/\r?\n/)) {
        const m = /^(\w+):\s*(.*)$/.exec(line.trim())
        if (!m) continue
        const raw = m[2].trim().replace(/^(['"])(.*)\1$/, '$2')
        data[m[1]] =
          m[1] === 'tags'
            ? raw.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim()).filter(Boolean)
            : raw === 'true' || raw === 'false'
              ? raw === 'true'
              : raw
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
