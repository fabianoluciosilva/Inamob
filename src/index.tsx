import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderPage, SITE, type PageMeta } from './layout'
import {
  articles,
  bySlug,
  blogIndexMeta,
  renderBlogIndex,
  articleMeta,
  renderArticle,
  CATEGORIES,
  categoryBySlug,
  categoryMeta,
  renderCategoryPage,
} from './blog'

const app = new Hono()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// ---------------- API ----------------
app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.post('/api/contact', async (c) => {
  try {
    await c.req.json()
    return c.json({ success: true, message: 'Mensagem recebida! Entraremos em contato em breve.' })
  } catch {
    return c.json({ success: false, message: 'Erro ao processar a solicitação.' }, 500)
  }
})

// ---------------- Schema.org da home ----------------
function homeJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#organization`,
      name: SITE.legalName,
      alternateName: 'INAMOB',
      url: SITE.url,
      logo: `${SITE.url}/static/inamob-icon.png`,
      image: SITE.defaultImage,
      description:
        'Agência de marketing digital especializada em SEO, Google Ads, redes sociais e desenvolvimento web para empresas no Brasil.',
      priceRange: '$$',
      telephone: `+${SITE.phone}`,
      email: SITE.email,
      areaServed: { '@type': 'Country', name: 'Brasil' },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressRegion: 'RJ',
        addressLocality: 'Rio de Janeiro',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: `+${SITE.phone}`,
        contactType: 'sales',
        availableLanguage: 'Portuguese',
      },
      sameAs: [
        'https://www.instagram.com/inamob.digital',
        'https://www.linkedin.com/company/inamob',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços de Marketing Digital',
        itemListElement: [
          'SEO - Otimização para Motores de Busca',
          'Google Ads',
          'Gestão de Redes Sociais',
          'Desenvolvimento Web',
          'Analytics e Relatórios',
          'Consultoria Digital',
        ].map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.legalName,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ]
}

// ---------------- Home ----------------
const homeMeta: PageMeta = {
  title: 'INAMOB - Agência de Marketing Digital | SEO, Google Ads, Redes Sociais',
  description:
    'A INAMOB é a agência de marketing digital que coloca seu negócio na frente. Especialistas em SEO, Google Ads, redes sociais e desenvolvimento web no Brasil.',
  path: '/',
  keywords:
    'marketing digital, SEO, google ads, redes sociais, agência digital, marketing online, desenvolvimento web, Rio de Janeiro, Brasil',
  jsonLd: homeJsonLd(),
}

const wa = (text: string) => `https://wa.me/${SITE.phone}?text=${text}`

const homeBody = `
        <!-- Hero -->
        <section class="gradient-bg text-white py-20">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-5xl md:text-7xl font-bold mb-6 hero-text">
                        Transforme Seu Negócio com <span class="text-cyan-300">Marketing Digital</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 text-purple-100">
                        Agência especializada em SEO, Google Ads e estratégias digitais que geram resultados reais para a sua empresa
                    </p>
                    <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                        <a href="${wa('Quero%20uma%20consultoria%20gratuita!')}" target="_blank" rel="noopener noreferrer"
                           class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                            <i class="fab fa-whatsapp mr-3" aria-hidden="true"></i>Consultoria Gratuita
                        </a>
                        <a href="#servicos" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 border-2 border-white border-opacity-30">
                            Nossos Serviços
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Serviços -->
        <section id="servicos" class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Nossos <span class="text-purple-600">Serviços</span></h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Soluções completas de marketing digital para empresas que querem dominar o mercado online</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${[
                      { icon: 'fa-search', color: 'purple', title: 'SEO Avançado', desc: 'Posicione seu site no topo do Google com estratégias avançadas de SEO. Mais visitantes, mais vendas.', items: ['Auditoria completa de SEO', 'Otimização on-page e off-page', 'Link building estratégico', 'Relatórios detalhados'], msg: 'Quero%20saber%20mais%20sobre%20SEO!' },
                      { icon: 'fa-google', color: 'blue', fab: true, title: 'Google Ads', desc: 'Campanhas otimizadas no Google Ads que convertem visitantes em clientes. Máximo ROI.', items: ['Configuração profissional', 'Otimização contínua', 'Gestão de palavras-chave', 'Relatórios de performance'], msg: 'Quero%20saber%20mais%20sobre%20Google%20Ads!' },
                      { icon: 'fa-share-alt', color: 'pink', title: 'Redes Sociais', desc: 'Gestão completa das suas redes sociais com conteúdo estratégico que engaja e converte.', items: ['Criação de conteúdo', 'Gestão de postagens', 'Campanhas pagas', 'Análise de métricas'], msg: 'Quero%20saber%20mais%20sobre%20redes%20sociais!' },
                      { icon: 'fa-code', color: 'green', title: 'Desenvolvimento Web', desc: 'Sites modernos, rápidos e otimizados para conversão. Sua presença digital completa.', items: ['Sites responsivos', 'Otimização de velocidade', 'SEO técnico', 'Integração com analytics'], msg: 'Quero%20saber%20mais%20sobre%20desenvolvimento%20web!' },
                      { icon: 'fa-chart-line', color: 'orange', title: 'Analytics & Relatórios', desc: 'Monitoramento completo de performance com relatórios detalhados e insights estratégicos.', items: ['Google Analytics', 'Relatórios customizados', 'Dashboards em tempo real', 'Insights estratégicos'], msg: 'Quero%20saber%20mais%20sobre%20analytics!' },
                      { icon: 'fa-lightbulb', color: 'cyan', title: 'Consultoria Digital', desc: 'Estratégias personalizadas para maximizar os resultados digitais do seu negócio.', items: ['Auditoria completa', 'Plano estratégico', 'Treinamento da equipe', 'Acompanhamento mensal'], msg: 'Quero%20uma%20consultoria%20digital!' },
                    ].map((s) => `
                    <div class="bg-white rounded-xl shadow-lg p-8 card-hover border-l-4 border-${s.color}-600">
                        <div class="text-${s.color}-600 text-4xl mb-6"><i class="${s.fab ? 'fab' : 'fas'} ${s.icon}" aria-hidden="true"></i></div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">${s.title}</h3>
                        <p class="text-gray-600 mb-6">${s.desc}</p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            ${s.items.map((it) => `<li><i class="fas fa-check text-green-500 mr-2" aria-hidden="true"></i>${it}</li>`).join('')}
                        </ul>
                        <a href="${wa(s.msg)}" target="_blank" rel="noopener noreferrer" class="bg-${s.color}-600 hover:bg-${s.color}-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full block text-center">Solicitar Orçamento</a>
                    </div>`).join('')}
                </div>
            </div>
        </section>

        <!-- Portfólio -->
        <section id="portfolio" class="py-20 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Sites que <span class="text-purple-600">já fizemos</span></h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Projetos reais entregues pela INAMOB. Conheça alguns dos negócios que já confiaram no nosso trabalho.</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[
                      { icon: 'fa-beer-mug-empty', tag: 'Cervejaria', name: 'Cervejaria Ravache', desc: 'Site institucional para cervejaria, com apresentação da marca e dos produtos.', url: 'https://www.cervejariaravacherj.com.br/' },
                      { icon: 'fa-bottle-water', tag: 'Bebidas', name: 'Refrigerantes Convenção', desc: 'Marca de refrigerantes — o sabor da família brasileira.', url: 'https://www.guaranaconvencaorj.com.br/' },
                      { icon: 'fa-laptop-code', tag: 'Tecnologia / TI', name: 'Simples Solução TI', desc: 'Empresa de suporte e infraestrutura de TI com mais de 18 anos no mercado.', url: 'https://simplessolucao.com.br' },
                      { icon: 'fa-scale-balanced', tag: 'Advocacia', name: 'Dr. Fábio Lúcio', desc: 'Escritório de advocacia com atendimento em direito civil, família, trabalhista e empresarial.', url: 'https://fabiolucio.adv.br' },
                    ].map((p) => `
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                        <div class="gradient-bg h-32 flex items-center justify-center"><i class="fas ${p.icon} text-white text-5xl" aria-hidden="true"></i></div>
                        <div class="p-6">
                            <span class="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">${p.tag}</span>
                            <h3 class="text-xl font-bold text-gray-800 mb-2">${p.name}</h3>
                            <p class="text-gray-600 text-sm mb-4">${p.desc}</p>
                            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold">
                                Visitar site <i class="fas fa-arrow-up-right-from-square ml-2 text-sm" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>`).join('')}
                </div>

                <div class="text-center mt-20 mb-12">
                    <h3 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Gestão de Campanhas no <span class="text-purple-600">Google Ads</span></h3>
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">Administração de tráfego pago para empresas que querem gerar leads e vendas com o Google Ads.</p>
                </div>
                <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    ${[
                      {
                        tag: 'Google Ads',
                        name: 'Simples Solução TI',
                        desc: 'Administração de campanhas no Google Ads para geração de leads no setor de tecnologia e suporte de TI.',
                        period: 'em 4 meses',
                        metrics: [
                          { value: '+150', label: 'leads gerados' },
                          { value: '-30%', label: 'no custo por lead' },
                        ],
                      },
                      {
                        tag: 'Google Ads',
                        name: 'Fuchal Offshore',
                        desc: 'Administração de campanhas no Google Ads voltadas ao segmento offshore.',
                        period: 'em 6 meses',
                        metrics: [
                          { value: '5x', label: 'de ROAS' },
                          { value: '+90%', label: 'em conversões' },
                        ],
                      },
                    ].map((p) => `
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                        <div class="gradient-bg h-32 flex items-center justify-center"><i class="fab fa-google text-white text-5xl" aria-hidden="true"></i></div>
                        <div class="p-6">
                            <span class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">${p.tag}</span>
                            <h4 class="text-xl font-bold text-gray-800 mb-2">${p.name}</h4>
                            <p class="text-gray-600 text-sm mb-5">${p.desc}</p>
                            <div class="grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
                                ${p.metrics.map((m) => `<div class="text-center"><div class="text-2xl font-extrabold text-purple-600">${m.value}</div><div class="text-xs text-gray-500 leading-tight mt-1">${m.label}</div></div>`).join('')}
                            </div>
                            <p class="text-center text-xs text-gray-400 mt-4"><i class="far fa-clock mr-1" aria-hidden="true"></i>${p.period}</p>
                        </div>
                    </div>`).join('')}
                </div>

                <div class="text-center mt-12">
                    <a href="${wa('Quero%20um%20site%20como%20esses%20para%20o%20meu%20neg%C3%B3cio!')}" target="_blank" rel="noopener noreferrer" class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                        <i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>Quero resultados como esses
                    </a>
                </div>
            </div>
        </section>

        <!-- Sobre -->
        <section id="sobre" class="py-20 bg-gray-100">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Por que escolher a <span class="text-purple-600">INAMOB</span>?</h2>
                    <p class="text-xl text-gray-600 mb-12">Somos uma agência de marketing digital focada em resultados reais. Nossa expertise em SEO e estratégias digitais já transformou centenas de negócios.</p>
                    <div class="grid md:grid-cols-3 gap-8 mb-12">
                        ${[
                          { icon: 'fa-trophy', title: 'Resultados Comprovados', desc: '+300% de aumento médio no tráfego orgânico dos nossos clientes em 6 meses' },
                          { icon: 'fa-users', title: 'Time Especializado', desc: 'Profissionais certificados em Google Ads, Analytics e especialistas em SEO' },
                          { icon: 'fa-clock', title: 'Suporte 24/7', desc: 'Atendimento personalizado e suporte contínuo para garantir seus resultados' },
                        ].map((f) => `
                        <div class="bg-white rounded-xl p-8 shadow-lg">
                            <div class="text-purple-600 text-4xl mb-4"><i class="fas ${f.icon}" aria-hidden="true"></i></div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">${f.title}</h3>
                            <p class="text-gray-600">${f.desc}</p>
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="gradient-bg text-white py-20">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Pronto para <span class="text-cyan-300">Dominar</span> o Digital?</h2>
                <p class="text-xl mb-8 text-purple-100">Fale conosco agora e receba uma consultoria gratuita personalizada para seu negócio</p>
                <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                    <a href="${wa('Ol%C3%A1!%20Quero%20uma%20consultoria%20gratuita%20para%20meu%20neg%C3%B3cio!')}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 pulse-purple">
                        <i class="fab fa-whatsapp mr-3" aria-hidden="true"></i>Consultoria Gratuita Agora
                    </a>
                    <a href="tel:+${SITE.phone}" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 border-2 border-white border-opacity-30">
                        <i class="fas fa-phone mr-3" aria-hidden="true"></i>${SITE.phoneDisplay}
                    </a>
                </div>
            </div>
        </section>

        <!-- Contato -->
        <section id="contato" class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Entre em <span class="text-purple-600">Contato</span></h2>
                        <p class="text-xl text-gray-600">Pronto para alavancar seu negócio? Fale conosco!</p>
                    </div>
                    <div class="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-6">Fale Conosco</h3>
                            <div class="space-y-6">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-green-100 p-3 rounded-lg"><i class="fab fa-whatsapp text-green-600 text-xl" aria-hidden="true"></i></div>
                                    <div><p class="font-semibold text-gray-800">WhatsApp</p><a href="https://wa.me/${SITE.phone}" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-700">${SITE.phoneDisplay}</a></div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <div class="bg-blue-100 p-3 rounded-lg"><i class="fas fa-phone text-blue-600 text-xl" aria-hidden="true"></i></div>
                                    <div><p class="font-semibold text-gray-800">Telefone</p><a href="tel:+${SITE.phone}" class="text-purple-600 hover:text-purple-700">${SITE.phoneDisplay}</a></div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <div class="bg-purple-100 p-3 rounded-lg"><i class="fas fa-envelope text-purple-600 text-xl" aria-hidden="true"></i></div>
                                    <div><p class="font-semibold text-gray-800">Email</p><a href="mailto:${SITE.email}" class="text-purple-600 hover:text-purple-700">${SITE.email}</a></div>
                                </div>
                            </div>
                            <div class="mt-8">
                                <h3 class="text-lg font-bold text-gray-800 mb-4">Ação Rápida</h3>
                                <div class="space-y-3">
                                    <a href="${wa('Quero%20uma%20auditoria%20gratuita%20de%20SEO!')}" target="_blank" rel="noopener noreferrer" class="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"><i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>Auditoria Gratuita de SEO</a>
                                    <a href="${wa('Quero%20saber%20o%20pre%C3%A7o%20do%20Google%20Ads!')}" target="_blank" rel="noopener noreferrer" class="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"><i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>Orçamento Google Ads</a>
                                    <a href="${wa('Preciso%20de%20um%20site%20novo!')}" target="_blank" rel="noopener noreferrer" class="block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"><i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>Desenvolvimento Web</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h3>
                            <form id="contactForm" class="space-y-6">
                                <div><label for="name" class="block text-gray-700 font-semibold mb-2">Nome Completo</label><input type="text" id="name" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"></div>
                                <div><label for="email" class="block text-gray-700 font-semibold mb-2">Email</label><input type="email" id="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"></div>
                                <div><label for="phone" class="block text-gray-700 font-semibold mb-2">Telefone/WhatsApp</label><input type="tel" id="phone" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"></div>
                                <div><label for="service" class="block text-gray-700 font-semibold mb-2">Serviço de Interesse</label>
                                    <select id="service" name="service" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                        <option value="">Selecione um serviço</option>
                                        <option value="seo">SEO - Otimização para Buscadores</option>
                                        <option value="google-ads">Google Ads</option>
                                        <option value="redes-sociais">Gestão de Redes Sociais</option>
                                        <option value="desenvolvimento-web">Desenvolvimento Web</option>
                                        <option value="consultoria">Consultoria Digital</option>
                                        <option value="analytics">Analytics & Relatórios</option>
                                        <option value="outros">Outros</option>
                                    </select>
                                </div>
                                <div><label for="message" class="block text-gray-700 font-semibold mb-2">Mensagem</label><textarea id="message" name="message" rows="5" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Conte-nos mais sobre seu projeto ou necessidade..."></textarea></div>
                                <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-300"><i class="fas fa-paper-plane mr-2" aria-hidden="true"></i>Enviar Mensagem</button>
                            </form>
                            <div class="mt-6 text-center">
                                <p class="text-gray-600 mb-4">Prefere o WhatsApp?</p>
                                <a href="${wa('Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20os%20servi%C3%A7os%20da%20INAMOB.')}" target="_blank" rel="noopener noreferrer" class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"><i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>Falar no WhatsApp</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`

app.get('/', (c) => c.html(renderPage(homeMeta, homeBody)))

// ---------------- Blog ----------------
app.get('/blog', (c) => c.html(renderPage(blogIndexMeta(), renderBlogIndex())))

app.get('/blog/categoria/:slug', (c) => {
  const category = categoryBySlug(c.req.param('slug'))
  if (!category) return c.notFound()
  return c.html(renderPage(categoryMeta(category), renderCategoryPage(category)))
})

app.get('/blog/:slug', (c) => {
  const article = bySlug(c.req.param('slug'))
  if (!article) return c.notFound()
  return c.html(renderPage(articleMeta(article), renderArticle(article)))
})

// ---------------- Sitemap & robots ----------------
app.get('/sitemap.xml', (c) => {
  const today = new Date().toISOString().split('T')[0]
  const urls: { loc: string; priority: string; freq: string; lastmod?: string }[] = [
    { loc: `${SITE.url}/`, priority: '1.0', freq: 'weekly' },
    { loc: `${SITE.url}/#servicos`, priority: '0.8', freq: 'monthly' },
    { loc: `${SITE.url}/#portfolio`, priority: '0.7', freq: 'monthly' },
    { loc: `${SITE.url}/blog`, priority: '0.9', freq: 'weekly' },
    ...CATEGORIES.map((cat) => ({
      loc: `${SITE.url}/blog/categoria/${cat.slug}`,
      priority: '0.8',
      freq: 'weekly',
    })),
    ...articles.map((a) => ({
      loc: `${SITE.url}/blog/${a.slug}`,
      priority: '0.7',
      freq: 'monthly',
      lastmod: a.date,
    })),
  ]
  const body = urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`,
    )
    .join('\n')
  c.header('Content-Type', 'application/xml')
  return c.text(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`)
})

app.get('/robots.txt', (c) => {
  c.header('Content-Type', 'text/plain')
  return c.text(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml`)
})

export default app
