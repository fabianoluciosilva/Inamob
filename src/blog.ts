// Renderização do blog: índice de categorias, página de categoria, página de artigo.
import { SITE, type PageMeta } from './layout'
import { articles, type Article } from './articles'
import { CATEGORIES, categoryBySlug, type Category } from './categories'

export { articles, CATEGORIES, categoryBySlug }
export type { Article, Category }

const fmtDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

function categoryOf(name: string): Category | undefined {
  return CATEGORIES.find((c) => c.name === name)
}

export function articlesOf(category: Category): Article[] {
  return articles.filter((a) => a.category === category.name)
}

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

// ---------- Índice do blog (lista de categorias) ----------

export function blogIndexMeta(): PageMeta {
  return {
    title: 'Blog de Marketing Digital | INAMOB',
    description:
      'Artigos sobre SEO, Google Ads, redes sociais, conteúdo e estratégias de marketing digital, organizados por categoria para você encontrar o que precisa.',
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
  const cards = CATEGORIES.map((cat) => {
    const count = articlesOf(cat).length
    return `
      <a href="/blog/categoria/${cat.slug}" class="bg-white rounded-xl shadow-lg p-8 card-hover block">
        <div class="text-purple-600 text-4xl mb-4"><i class="fas ${cat.icon}" aria-hidden="true"></i></div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">${cat.name}</h2>
        <p class="text-gray-600 text-sm mb-4">${cat.description}</p>
        <span class="text-purple-600 font-semibold text-sm">${count} ${count === 1 ? 'artigo' : 'artigos'} →</span>
      </a>`
  }).join('\n')

  return `
    <section class="gradient-bg text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 hero-text">Blog de Marketing Digital</h1>
        <p class="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
          Escolha uma categoria e mergulhe em estratégias práticas de SEO, Google Ads, redes sociais e muito mais.
        </p>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">Categorias</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          ${cards}
        </div>
      </div>
    </section>`
}

// ---------- Página de categoria ----------

export function categoryMeta(cat: Category): PageMeta {
  const list = articlesOf(cat)
  return {
    title: `${cat.name} | Blog de Marketing Digital INAMOB`,
    description: `${cat.description} Veja todos os artigos de ${cat.name} no blog da INAMOB.`,
    path: `/blog/categoria/${cat.slug}`,
    keywords: `${cat.name.toLowerCase()}, marketing digital, ${cat.slug.replace(/-/g, ' ')}`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${cat.name} — Blog INAMOB`,
        description: cat.description,
        url: `${SITE.url}/blog/categoria/${cat.slug}`,
        hasPart: list.map((a) => ({
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
          { '@type': 'ListItem', position: 3, name: cat.name, item: `${SITE.url}/blog/categoria/${cat.slug}` },
        ],
      },
    ],
  }
}

export function renderCategoryPage(cat: Category): string {
  const list = articlesOf(cat)
  const others = CATEGORIES.filter((c) => c.slug !== cat.slug)
  return `
    <section class="gradient-bg text-white py-14">
      <div class="container mx-auto px-4">
        <nav aria-label="Trilha de navegação" class="text-sm text-purple-200 mb-4">
          <a href="/" class="hover:text-white">Início</a> ›
          <a href="/blog" class="hover:text-white">Blog</a> ›
          <span class="text-white">${cat.name}</span>
        </nav>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 hero-text"><i class="fas ${cat.icon} mr-3" aria-hidden="true"></i>${cat.name}</h1>
        <p class="text-lg text-purple-100 max-w-3xl">${cat.description}</p>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <p class="text-gray-500 mb-8">${list.length} ${list.length === 1 ? 'artigo' : 'artigos'} em ${cat.name}</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${list.map(articleCard).join('\n')}
        </div>
      </div>
    </section>

    <section class="py-12 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Outras categorias</h2>
        <div class="flex flex-wrap justify-center gap-3">
          ${others.map((c) => `<a href="/blog/categoria/${c.slug}" class="inline-block bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold px-4 py-2 rounded-full transition-colors"><i class="fas ${c.icon} mr-2" aria-hidden="true"></i>${c.name}</a>`).join('\n')}
        </div>
      </div>
    </section>`
}

// ---------- Página de artigo ----------

export function articleMeta(a: Article): PageMeta {
  const cat = categoryOf(a.category)
  const breadcrumb: object[] = [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
  ]
  if (cat) breadcrumb.push({ '@type': 'ListItem', position: 3, name: cat.name, item: `${SITE.url}/blog/categoria/${cat.slug}` })
  breadcrumb.push({ '@type': 'ListItem', position: breadcrumb.length + 1, name: a.title, item: `${SITE.url}/blog/${a.slug}` })

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
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumb },
    ],
  }
}

export function renderArticle(a: Article): string {
  const cat = categoryOf(a.category)
  const catLink = cat ? `<a href="/blog/categoria/${cat.slug}" class="hover:text-white">${a.category}</a>` : `<span>${a.category}</span>`
  const rel = related(a)
  return `
    <article>
      <header class="gradient-bg text-white py-14">
        <div class="container mx-auto px-4 max-w-3xl">
          <nav aria-label="Trilha de navegação" class="text-sm text-purple-200 mb-4">
            <a href="/" class="hover:text-white">Início</a> ›
            <a href="/blog" class="hover:text-white">Blog</a> ›
            ${catLink}
          </nav>
          ${cat ? `<a href="/blog/categoria/${cat.slug}" class="inline-block bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 transition-colors">${a.category}</a>` : ''}
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
            ${cat ? `<a href="/blog/categoria/${cat.slug}" class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">Ver mais de ${cat.name}</a>` : `<a href="/blog" class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">Ver todas as categorias</a>`}
          </div>
        </div>
      </aside>
    </article>`
}
