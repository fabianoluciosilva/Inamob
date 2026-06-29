// Gera arquivos estáticos a partir do worker buildado (dist/_worker.js).
// A Vercel serve o diretório dist/ como site estático, então precisamos de um
// index.html (a home) e do sitemap.xml gerados em build time.
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = join(process.cwd(), 'dist')
const worker = (await import(pathToFileURL(join(dist, '_worker.js')).href)).default

async function render(path) {
  const res = await worker.fetch(new Request(`https://inamob.com.br${path}`), {}, {})
  if (!res.ok) throw new Error(`Falha ao renderizar ${path}: HTTP ${res.status}`)
  return await res.text()
}

const pages = [
  { path: '/', file: 'index.html' },
  { path: '/sitemap.xml', file: 'sitemap.xml' },
  { path: '/robots.txt', file: 'robots.txt' },
]

for (const { path, file } of pages) {
  const html = await render(path)
  await writeFile(join(dist, file), html, 'utf8')
  console.log(`prerender: ${path} -> dist/${file} (${html.length} bytes)`)
}
