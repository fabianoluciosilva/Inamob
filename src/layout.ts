// Camada de layout/SEO reutilizável (home + blog).
// Centraliza <head>, header, footer e scripts para evitar duplicação e
// garantir SEO consistente em todas as páginas.
import { CATEGORIES } from './categories'

export const SITE = {
  url: 'https://www.inamob.com.br',
  name: 'INAMOB',
  legalName: 'INAMOB Negócios Digitais',
  phone: '552140421350',
  phoneDisplay: '(21) 4042-1350',
  email: 'contato@inamob.com.br',
  defaultImage: 'https://www.inamob.com.br/static/inamob-og.png',
  // Definido em build time (Vercel env). Ex.: G-XXXXXXX (GA4) ou GTM-XXXXXXX (GTM).
  ga4Id: (typeof process !== 'undefined' && process.env && process.env.GA4_ID) || '',
  gtmId: (typeof process !== 'undefined' && process.env && process.env.GTM_ID) || '',
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export interface PageMeta {
  title: string
  description: string
  /** Caminho a partir da raiz, ex.: '/' ou '/blog/meu-artigo'. */
  path: string
  keywords?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  jsonLd?: object[]
  /** Para artigos do blog. */
  article?: { published: string; modified?: string; section?: string }
  /** Link extra no <head> (ex.: prev/next). */
  extraHead?: string
}

function gtagSnippet(): string {
  if (SITE.gtmId) {
    return `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');</script>
    <!-- End Google Tag Manager -->`
  }
  if (SITE.ga4Id) {
    return `
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.ga4Id}');</script>`
  }
  return ''
}

export function renderHead(meta: PageMeta): string {
  const canonical = SITE.url + meta.path
  const ogImage = meta.ogImage || SITE.defaultImage
  const ogType = meta.ogType || 'website'
  const keywords = meta.keywords
    ? `<meta name="keywords" content="${esc(meta.keywords)}">`
    : ''
  const articleTags = meta.article
    ? `
        <meta property="article:published_time" content="${meta.article.published}">
        ${meta.article.modified ? `<meta property="article:modified_time" content="${meta.article.modified}">` : ''}
        ${meta.article.section ? `<meta property="article:section" content="${esc(meta.article.section)}">` : ''}
        <meta property="article:publisher" content="${SITE.url}">`
    : ''
  const jsonLd = (meta.jsonLd || [])
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n        ')

  return `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Primary SEO Meta Tags -->
        <title>${esc(meta.title)}</title>
        <meta name="description" content="${esc(meta.description)}">
        ${keywords}
        <meta name="author" content="${SITE.legalName}">
        <meta name="robots" content="index, follow, max-image-preview:large">
        <meta name="geo.region" content="BR-RJ">
        <meta name="geo.placename" content="Rio de Janeiro">

        <!-- Canonical -->
        <link rel="canonical" href="${canonical}">

        <!-- Open Graph -->
        <meta property="og:type" content="${ogType}">
        <meta property="og:url" content="${canonical}">
        <meta property="og:title" content="${esc(meta.title)}">
        <meta property="og:description" content="${esc(meta.description)}">
        <meta property="og:image" content="${ogImage}">
        <meta property="og:locale" content="pt_BR">
        <meta property="og:site_name" content="INAMOB">${articleTags}

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${esc(meta.title)}">
        <meta name="twitter:description" content="${esc(meta.description)}">
        <meta name="twitter:image" content="${ogImage}">

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/static/inamob-icon.png">
        <link rel="apple-touch-icon" href="/static/inamob-icon.png">

        <!-- Performance hints -->
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="dns-prefetch" href="//cdn.tailwindcss.com">
        <link rel="preload" href="/static/inamob-logo.webp" as="image">
        ${gtagSnippet()}

        <!-- CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">

        <!-- Structured Data -->
        ${jsonLd}
        ${meta.extraHead || ''}

        <style>
          :root {
            --inamob-purple: #9333ea;
            --inamob-purple-dark: #7c3aed;
            --inamob-purple-light: #a855f7;
            --inamob-accent: #06b6d4;
          }
          body { font-family: 'Inter', sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, var(--inamob-purple) 0%, var(--inamob-purple-dark) 100%); }
          .whatsapp-float { position: fixed; bottom: 20px; right: 20px; z-index: 1000; animation: bounce 2s infinite; }
          @keyframes bounce { 0%,20%,50%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
          .hero-text { text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
          .card-hover { transition: all 0.3s ease; }
          .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
          .pulse-purple { animation: pulse-purple 2s cubic-bezier(0.4,0,0.6,1) infinite; }
          @keyframes pulse-purple { 0%,100% { opacity: 1; } 50% { opacity: .7; } }
          .prose-inamob h2 { font-size: 1.6rem; font-weight: 700; color: #1f2937; margin: 2rem 0 1rem; }
          .prose-inamob h3 { font-size: 1.25rem; font-weight: 700; color: #374151; margin: 1.5rem 0 .75rem; }
          .prose-inamob p { color: #4b5563; line-height: 1.8; margin-bottom: 1rem; }
          .prose-inamob ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #4b5563; }
          .prose-inamob li { margin-bottom: .5rem; line-height: 1.7; }
          .prose-inamob a { color: #9333ea; text-decoration: underline; }
          .prose-inamob strong { color: #1f2937; }
        </style>`
}

export function renderHeader(): string {
  return `
        <!-- WhatsApp Float Button -->
        <a href="https://wa.me/${SITE.phone}?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20de%20marketing%20digital%20da%20INAMOB."
           target="_blank" rel="noopener noreferrer"
           class="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
           aria-label="Falar no WhatsApp">
            <i class="fab fa-whatsapp text-2xl" aria-hidden="true"></i>
        </a>

        <!-- Header -->
        <header class="gradient-bg text-white shadow-2xl sticky top-0 z-50">
            <nav class="container mx-auto px-4 py-4" aria-label="Navegação principal">
                <div class="flex items-center justify-between">
                    <a href="/" class="flex items-center space-x-3" aria-label="INAMOB - Página inicial">
                        <img src="/static/inamob-logo.webp" alt="INAMOB Negócios Digitais - Agência de Marketing Digital" class="h-12 w-auto" width="206" height="62">
                    </a>
                    <div class="hidden md:flex space-x-8 items-center">
                        <a href="/#servicos" class="hover:text-purple-200 transition-colors">Serviços</a>
                        <a href="/#portfolio" class="hover:text-purple-200 transition-colors">Portfólio</a>
                        <div class="relative group">
                            <a href="/blog" class="hover:text-purple-200 transition-colors inline-flex items-center">Blog <i class="fas fa-chevron-down ml-1 text-xs" aria-hidden="true"></i></a>
                            <div class="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block z-50">
                                <div class="bg-white rounded-lg shadow-xl py-2 w-64">
                                    ${CATEGORIES.map((c) => `<a href="/blog/categoria/${c.slug}" class="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 text-sm"><i class="fas ${c.icon} w-5 mr-2 text-purple-600" aria-hidden="true"></i>${c.name}</a>`).join('')}
                                    <a href="/blog" class="block px-4 py-2 mt-1 border-t border-gray-100 text-purple-600 font-semibold text-sm hover:bg-purple-50">Ver todas as categorias →</a>
                                </div>
                            </div>
                        </div>
                        <a href="/#sobre" class="hover:text-purple-200 transition-colors">Sobre</a>
                        <a href="/#contato" class="hover:text-purple-200 transition-colors">Contato</a>
                        <a href="https://wa.me/${SITE.phone}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors">
                            <i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>WhatsApp
                        </a>
                    </div>
                    <button class="md:hidden text-white" aria-label="Abrir menu">
                        <i class="fas fa-bars text-xl" aria-hidden="true"></i>
                    </button>
                </div>
            </nav>
        </header>`
}

export function renderFooter(): string {
  return `
        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-12">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <img src="/static/inamob-logo.webp" alt="INAMOB Negócios Digitais" class="h-12 w-auto mb-4" width="206" height="62" loading="lazy">
                        <p class="text-gray-400 mb-4">
                            Transformando negócios através do marketing digital.
                            Especialistas em SEO, Google Ads e estratégias digitais.
                        </p>
                        <div class="flex space-x-4">
                            <a href="https://wa.me/${SITE.phone}" target="_blank" rel="noopener noreferrer" class="text-green-400 hover:text-green-300" aria-label="WhatsApp">
                                <i class="fab fa-whatsapp text-xl" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/inamob" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300" aria-label="LinkedIn">
                                <i class="fab fa-linkedin text-xl" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.instagram.com/inamob.digital" target="_blank" rel="noopener noreferrer" class="text-pink-400 hover:text-pink-300" aria-label="Instagram">
                                <i class="fab fa-instagram text-xl" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold mb-4">Serviços</h2>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/#servicos" class="hover:text-white">SEO</a></li>
                            <li><a href="/#servicos" class="hover:text-white">Google Ads</a></li>
                            <li><a href="/#servicos" class="hover:text-white">Redes Sociais</a></li>
                            <li><a href="/#servicos" class="hover:text-white">Desenvolvimento Web</a></li>
                            <li><a href="/#servicos" class="hover:text-white">Consultoria Digital</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold mb-4">Conteúdo</h2>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/blog" class="hover:text-white">Blog de Marketing Digital</a></li>
                            <li><a href="/#portfolio" class="hover:text-white">Portfólio</a></li>
                            <li><a href="/#sobre" class="hover:text-white">Sobre a INAMOB</a></li>
                            <li><a href="/sitemap.xml" class="hover:text-white">Mapa do site</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold mb-4">Contato</h2>
                        <ul class="space-y-2 text-gray-400">
                            <li><i class="fas fa-phone mr-2" aria-hidden="true"></i><a href="tel:+${SITE.phone}" class="hover:text-white">${SITE.phoneDisplay}</a></li>
                            <li><i class="fab fa-whatsapp mr-2" aria-hidden="true"></i><a href="https://wa.me/${SITE.phone}" target="_blank" rel="noopener noreferrer" class="hover:text-white">WhatsApp</a></li>
                            <li><i class="fas fa-envelope mr-2" aria-hidden="true"></i><a href="mailto:${SITE.email}" class="hover:text-white">${SITE.email}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8">
                    <h2 class="text-lg font-bold mb-4">Blog por categoria</h2>
                    <div class="flex flex-wrap gap-2">
                        ${CATEGORIES.map((c) => `<a href="/blog/categoria/${c.slug}" class="text-gray-300 hover:text-white text-sm bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-colors"><i class="fas ${c.icon} mr-2" aria-hidden="true"></i>${c.name}</a>`).join('')}
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p class="text-gray-400">© ${new Date().getFullYear()} ${SITE.legalName}. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>`
}

export function renderScripts(): string {
  return `
        <script src="/static/app.js" defer></script>`
}

export function renderPage(meta: PageMeta, body: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>${renderHead(meta)}
</head>
<body class="bg-gray-50">${SITE.gtmId ? `
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : ''}
${renderHeader()}
${body}
${renderFooter()}
${renderScripts()}
</body>
</html>`
}
