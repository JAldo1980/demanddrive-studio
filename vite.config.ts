import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), staticHostPreview()],
})
