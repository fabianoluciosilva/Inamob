// Gera arquivos estáticos a partir do worker buildado (dist/_worker.js).
// A Vercel serve dist/ como site estático (cleanUrls: true), então pré-renderizamos
// a home, o blog e cada artigo em HTML.
import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = join(process.cwd(), 'dist')
const worker = (await import(pathToFileURL(join(dist, '_worker.js')).href)).default

async function fetchPath(path) {
  const res = await worker.fetch(new Request(`https://inamob.com.br${path}`), {}, {})
  if (!res.ok) throw new Error(`Falha ao renderizar ${path}: HTTP ${res.status}`)
  return await res.text()
}

async function emit(path, file) {
  const text = await fetchPath(path)
  const dest = join(dist, file)
  await mkdir(dirname(dest), { recursive: true })
  await writeFile(dest, text, 'utf8')
  console.log(`prerender: ${path} -> dist/${file} (${text.length} bytes)`)
}

// Páginas fixas + sitemap/robots
await emit('/', 'index.html')
await emit('/blog', 'blog/index.html')
await emit('/sitemap.xml', 'sitemap.xml')
await emit('/robots.txt', 'robots.txt')

// Descobre categorias e artigos a partir do sitemap e renderiza cada página
const sitemap = await fetchPath('/sitemap.xml')

const categorySlugs = [...sitemap.matchAll(/\/blog\/categoria\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1])
console.log(`prerender: ${categorySlugs.length} categorias encontradas`)
for (const slug of categorySlugs) {
  await emit(`/blog/categoria/${slug}`, `blog/categoria/${slug}.html`)
}

// Artigos: /blog/<slug></loc> com um único segmento (não casa com /blog/categoria/...)
const slugs = [...sitemap.matchAll(/\/blog\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1])
console.log(`prerender: ${slugs.length} artigos encontrados`)
for (const slug of slugs) {
  await emit(`/blog/${slug}`, `blog/${slug}.html`)
}
