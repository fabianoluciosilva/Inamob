// Renderização do blog: índice, página de artigo, schemas e metadados.
import { SITE, type PageMeta } from './layout'
import { articles, type Article } from './articles'

export { articles }
export type { Article }

const fmtDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

export function bySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

// Artigos relacionados: mesma categoria primeiro, completa com os mais recentes.
function related(article: Article, n = 3): Article[] {
  const same = articles.filter((a) => a.slug !== article.slug && a.category === article.category)
  const rest = articles.filter((a) => a.slug !== article.slug && a.category !== article.category)
  return [...same, ...rest].slice(0, n)
}

function articleCard(a: Article): string {
  return `
    <article class="bg-white rounded-xl shadow-lg overflow-hidden card-hover flex flex-col">
      <a href="/blog/${a.slug}" class="block gradient-bg h-28 flex items-center justify-center" aria-label="${a.title}">
        <i class="fas ${a.icon} text-white text-4xl" aria-hidden="true"></i>
      </a>
      <div class="p-6 flex flex-col flex-grow">
        <span class="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">${a.category}</span>
        <h2 class="text-lg font-bold text-gray-800 mb-2 leading-snug">
          <a href="/blog/${a.slug}" class="hover:text-purple-600">${a.title}</a>
        </h2>
        <p class="text-gray-600 text-sm mb-4 flex-grow">${a.description}</p>
        <div class="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <span><i class="far fa-clock mr-1" aria-hidden="true"></i>${a.readingTime} min de leitura</span>
          <a href="/blog/${a.slug}" class="text-purple-600 font-semibold hover:text-purple-700">Ler artigo →</a>
        </div>
      </div>
    </article>`
}

// ---------- Índice do blog ----------

export function blogIndexMeta(): PageMeta {
  return {
    title: 'Blog de Marketing Digital | INAMOB',
    description:
      'Artigos sobre SEO, Google Ads, redes sociais, conteúdo e estratégias de marketing digital para fazer seu negócio crescer no Brasil.',
    path: '/blog',
    keywords: 'blog marketing digital, seo, google ads, redes sociais, conteúdo, tráfego pago',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog INAMOB',
        url: `${SITE.url}/blog`,
        description: 'Conteúdo de marketing digital, SEO e tráfego pago para empresas brasileiras.',
        publisher: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
        blogPost: articles.map((a) => ({
          '@type': 'BlogPosting',
          headline: a.title,
          url: `${SITE.url}/blog/${a.slug}`,
          datePublished: a.date,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
        ],
      },
    ],
  }
}

export function renderBlogIndex(): string {
  const categories = [...new Set(articles.map((a) => a.category))]
  return `
    <section class="gradient-bg text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 hero-text">Blog de Marketing Digital</h1>
        <p class="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
          Estratégias práticas de SEO, Google Ads, redes sociais e conteúdo para atrair mais clientes e vender mais online.
        </p>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <p class="text-center text-gray-500 mb-8">${articles.length} artigos em ${categories.length} categorias</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${articles.map(articleCard).join('\n')}
        </div>
      </div>
    </section>`
}

// ---------- Página de artigo ----------

export function articleMeta(a: Article): PageMeta {
  return {
    title: `${a.title} | Blog INAMOB`,
    description: a.description,
    path: `/blog/${a.slug}`,
    keywords: a.keywords,
    ogType: 'article',
    article: { published: a.date, modified: a.date, section: a.category },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.description,
        datePublished: a.date,
        dateModified: a.date,
        articleSection: a.category,
        keywords: a.keywords,
        inLanguage: 'pt-BR',
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${a.slug}` },
        author: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
        publisher: {
          '@type': 'Organization',
          name: SITE.legalName,
          logo: { '@type': 'ImageObject', url: `${SITE.url}/static/inamob-icon.png` },
        },
        image: SITE.defaultImage,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
          { '@type': 'ListItem', position: 3, name: a.title, item: `${SITE.url}/blog/${a.slug}` },
        ],
      },
    ],
  }
}

export function renderArticle(a: Article): string {
  const rel = related(a)
  return `
    <article>
      <header class="gradient-bg text-white py-14">
        <div class="container mx-auto px-4 max-w-3xl">
          <nav aria-label="Trilha de navegação" class="text-sm text-purple-200 mb-4">
            <a href="/" class="hover:text-white">Início</a> ›
            <a href="/blog" class="hover:text-white">Blog</a> ›
            <span class="text-white">${a.category}</span>
          </nav>
          <span class="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">${a.category}</span>
          <h1 class="text-3xl md:text-5xl font-bold mb-4 hero-text">${a.title}</h1>
          <div class="text-purple-100 text-sm flex flex-wrap gap-4">
            <span><i class="far fa-calendar mr-1" aria-hidden="true"></i>${fmtDate(a.date)}</span>
            <span><i class="far fa-clock mr-1" aria-hidden="true"></i>${a.readingTime} min de leitura</span>
            <span><i class="fas fa-building mr-1" aria-hidden="true"></i>INAMOB</span>
          </div>
        </div>
      </header>

      <div class="py-12 bg-white">
        <div class="container mx-auto px-4 max-w-3xl prose-inamob">
          <p class="text-xl text-gray-700 mb-8 leading-relaxed">${a.description}</p>
          ${a.body}

          <div class="gradient-bg text-white rounded-xl p-8 mt-12 text-center">
            <h2 class="text-2xl font-bold mb-3 text-white" style="margin-top:0">Precisa de ajuda com ${a.category.toLowerCase()}?</h2>
            <p class="text-purple-100 mb-6">A INAMOB cuida da estratégia de marketing digital do seu negócio do começo ao fim.</p>
            <a href="https://wa.me/${SITE.phone}?text=Vim%20do%20blog%20da%20INAMOB%20e%20quero%20uma%20consultoria!"
               target="_blank" rel="noopener noreferrer"
               class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all">
              <i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>Falar com um especialista
            </a>
          </div>
        </div>
      </div>

      <aside class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">Continue lendo</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            ${rel.map(articleCard).join('\n')}
          </div>
          <div class="text-center mt-10">
            <a href="/blog" class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">Ver todos os artigos</a>
          </div>
        </div>
      </aside>
    </article>`
}
