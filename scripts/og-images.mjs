// Gera uma imagem de compartilhamento (Open Graph) 1200x630 por artigo,
// com o logo, a categoria e o título. Lê os títulos a partir dos HTML já
// pré-renderizados em dist/blog/*.html.
//
// Uso (após o build): node scripts/og-images.mjs
// As imagens são salvas em public/static/og/ (commitadas) e copiadas para dist/.
import sharp from 'sharp'
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = process.cwd()
const blogDir = join(ROOT, 'dist', 'blog')
const outPublic = join(ROOT, 'public', 'static', 'og')
const outDist = join(ROOT, 'dist', 'static', 'og')
await mkdir(outPublic, { recursive: true })
await mkdir(outDist, { recursive: true })

const unescape = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Quebra o título em linhas de no máximo `max` caracteres (sem cortar palavras).
function wrap(text, max) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      if (line) lines.push(line)
      line = w
    } else {
      line = (line + ' ' + w).trim()
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 4)
}

// Logo branca para compor no canto
const logo = await sharp(join(ROOT, 'public', 'static', 'inamob-logo.png')).resize({ width: 210 }).toBuffer()

const files = (await readdir(blogDir)).filter((f) => f.endsWith('.html') && f !== 'index.html')
let count = 0
for (const file of files) {
  const slug = file.replace(/\.html$/, '')
  const html = await readFile(join(blogDir, file), 'utf8')
  const titleRaw = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] || slug
  const catRaw = html.match(/<meta property="article:section" content="([^"]*)"/)?.[1] || ''
  const title = unescape(titleRaw).replace(/\s*\|\s*Blog INAMOB\s*$/, '')
  const category = unescape(catRaw).toUpperCase()

  const lines = wrap(title, 26)
  const startY = 330 - (lines.length - 1) * 35
  const tspans = lines
    .map((ln, i) => `<tspan x="80" dy="${i === 0 ? 0 : 72}">${escapeXml(ln)}</tspan>`)
    .join('')

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#9333ea"/><stop offset="100%" stop-color="#6d28d9"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="0" y="0" width="14" height="630" fill="#06b6d4"/>
    <text x="80" y="178" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="#e9d5ff">${escapeXml(category)}</text>
    <text y="${startY}" font-family="Arial, sans-serif" font-size="60" font-weight="800" fill="#ffffff">${tspans}</text>
    <text x="80" y="560" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="#e9d5ff">www.inamob.com.br</text>
  </svg>`

  const png = await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: 64, left: 80 }])
    .png()
    .toBuffer()
  await writeFile(join(outPublic, `${slug}.png`), png)
  await writeFile(join(outDist, `${slug}.png`), png)
  count++
}
console.log(`og-images: ${count} imagens geradas em public/static/og/`)
