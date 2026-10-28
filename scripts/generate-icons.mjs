// Generates favicon and social-sharing images from the logo symbol.
// Run with `npm run icons` after any logo change; output is committed in public/.
import { writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')

// Symbol paths from brand/DemandDrive_Studio_Logo.svg (unchanged).
const symbol = (d = '#0B1F3A', a = '#1769FF') => `
  <path d="M0,0 H125 C207,0 255,48 255,130 C255,212 207,260 125,260 H58 L113,205 H128 C166,205 187,177 187,130 C187,83 166,55 128,55 H55 V104 L0,160 Z" fill="${d}"/>
  <path d="M0,260 L73,260 L151,182 L173,204 L173,126 L95,126 L117,148 Z" fill="${a}"/>`

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="64" fill="#FFFFFF"/>
  <g transform="translate(32.5 30)">${symbol()}</g>
</svg>`

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0B1F3A"/>
  <g transform="translate(96 96) scale(0.5)">${symbol('#FFFFFF')}</g>
  <text x="96" y="370" font-family="Inter, Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">Strategy that creates demand.</text>
  <text x="96" y="450" font-family="Inter, Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">Digital that drives growth.</text>
  <rect x="96" y="510" width="64" height="4" fill="#1769FF"/>
  <text x="96" y="560" font-family="Inter, Arial, Helvetica, sans-serif" font-size="28" fill="#B9C4D6">DemandDrive Studio · B2B digital growth studio</text>
</svg>`

const png = (svg, width) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: true } }).render().asPng()

await writeFile(join(pub, 'favicon.svg'), favicon)
await writeFile(join(pub, 'favicon-32.png'), png(favicon, 32))
await writeFile(join(pub, 'apple-touch-icon.png'), png(favicon, 180))
await writeFile(join(pub, 'og-image.png'), png(og, 1200))
console.log('Generated favicon.svg, favicon-32.png, apple-touch-icon.png and og-image.png in public/')
