// Renders every route in src/routes.ts to static HTML, then writes
// sitemap.xml and robots.txt. Runs after the client and SSR builds.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const serverDir = join(root, 'dist-server')

const { render, renderHead, pages, notFoundMeta, site } = await import(
  pathToFileURL(join(serverDir, 'entry-server.js')).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')

function page(url, meta) {
  return template.replace('<!--app-head-->', renderHead(meta)).replace('<!--app-html-->', render(url))
}

for (const meta of pages) {
  const file = meta.path === '/' ? join(dist, 'index.html') : join(dist, meta.path.slice(1), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page(meta.path, meta))
  console.log(`  prerendered ${meta.path}`)
}

await writeFile(join(dist, '404.html'), page('/404', notFoundMeta))
console.log('  prerendered 404.html')

const today = new Date().toISOString().slice(0, 10)
const urls = pages
  .filter((p) => !p.noindex)
  .map(
    (p) =>
      `  <url>\n    <loc>${site.url}${p.path === '/' ? '/' : p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${(p.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
console.log('  wrote sitemap.xml and robots.txt')

await rm(serverDir, { recursive: true, force: true })

if (site.url === 'https://www.example.com') {
  console.warn('\n  ⚠ VITE_SITE_URL is not set. Canonical, Open Graph and sitemap URLs use https://www.example.com.\n')
}
