import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// SEO Meta Information
const seoConfig = {
  title: 'INAMOB - Agência de Marketing Digital | SEO, Google Ads, Redes Sociais',
  description: 'INAMOB é a agência de marketing digital líder no Brasil. Especialistas em SEO, Google Ads, gestão de redes sociais e estratégias digitais para alavancar seu negócio online.',
  keywords: 'marketing digital, SEO, google ads, redes sociais, agência digital, marketing online, publicidade digital, otimização de sites, gestão digital, consultoria digital, Brasil, Rio de Janeiro',
  author: 'INAMOB Negócios Digitais',
  url: 'https://inamob.com.br',
  image: 'https://inamob.com.br/static/inamob-og-image.jpg',
  locale: 'pt_BR',
  type: 'website'
}

// API Routes
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Contact form API
app.post('/api/contact', async (c) => {
  try {
    const { name, email, phone, message, service } = await c.req.json()
    
    // Here you would integrate with email service or database
    // For now, returning success response
    return c.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: 'Erro ao enviar mensagem. Tente novamente.' 
    }, 500)
  }
})

// Schema.org structured data
const generateSchemaOrg = () => {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalMarketingAgency", 
    "name": "INAMOB Negócios Digitais",
    "alternateName": "INAMOB",
    "url": "https://inamob.com.br",
    "logo": "https://inamob.com.br/static/inamob-logo.png",
    "image": "https://inamob.com.br/static/inamob-og-image.jpg",
    "description": "Agência de marketing digital especializada em SEO, Google Ads, redes sociais e estratégias digitais para empresas no Brasil.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressRegion": "RJ",
      "addressLocality": "Rio de Janeiro"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-21-4042-1350",
      "contactType": "sales",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.instagram.com/inamob.digital",
      "https://www.linkedin.com/company/inamob"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "SEO - Otimização para Motores de Busca",
        "description": "Otimização completa de sites para rankeamento no Google e outros buscadores"
      },
      {
        "@type": "Service", 
        "name": "Google Ads",
        "description": "Gestão profissional de campanhas do Google Ads para máximo ROI"
      },
      {
        "@type": "Service",
        "name": "Gestão de Redes Sociais",
        "description": "Criação de conteúdo e gestão estratégica das redes sociais"
      }
    ]
  }
}

// Main homepage
app.get('/', (c) => {
  const schema = generateSchemaOrg()
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- Primary SEO Meta Tags -->
        <title>${seoConfig.title}</title>
        <meta name="title" content="${seoConfig.title}">
        <meta name="description" content="${seoConfig.description}">
        <meta name="keywords" content="${seoConfig.keywords}">
        <meta name="author" content="${seoConfig.author}">
        <meta name="robots" content="index, follow, max-image-preview:large">
        <meta name="language" content="Portuguese">
        <meta name="geo.region" content="BR">
        <meta name="geo.country" content="Brazil">
        <meta name="geo.placename" content="Rio de Janeiro">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="${seoConfig.type}">
        <meta property="og:url" content="${seoConfig.url}">
        <meta property="og:title" content="${seoConfig.title}">
        <meta property="og:description" content="${seoConfig.description}">
        <meta property="og:image" content="${seoConfig.image}">
        <meta property="og:locale" content="${seoConfig.locale}">
        <meta property="og:site_name" content="INAMOB">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${seoConfig.url}">
        <meta property="twitter:title" content="${seoConfig.title}">
        <meta property="twitter:description" content="${seoConfig.description}">
        <meta property="twitter:image" content="${seoConfig.image}">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="${seoConfig.url}">
        
        <!-- Favicon and Icons -->
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
        
        <!-- Preload Critical Resources -->
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style">
        <link rel="preload" href="/static/inamob-logo.png" as="image">
        
        <!-- CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Schema.org structured data -->
        <script type="application/ld+json">
        ${JSON.stringify(schema, null, 2)}
        </script>
        
        <!-- WhatsApp Meta -->
        <meta property="wa:phone" content="+552140421350">
        
        <!-- Performance optimization -->
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <link rel="dns-prefetch" href="//cdn.tailwindcss.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        
        <style>
          :root {
            --inamob-purple: #9333ea;
            --inamob-purple-dark: #7c3aed;
            --inamob-purple-light: #a855f7;
            --inamob-accent: #06b6d4;
          }
          
          body {
            font-family: 'Inter', sans-serif;
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, var(--inamob-purple) 0%, var(--inamob-purple-dark) 100%);
          }
          
          .whatsapp-float {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            animation: bounce 2s infinite;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          .hero-text {
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          
          .pulse-purple {
            animation: pulse-purple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse-purple {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .7;
            }
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- WhatsApp Float Button -->
        <a href="https://wa.me/552140421350?text=Olá! Gostaria de saber mais sobre os serviços de marketing digital da INAMOB." 
           target="_blank" 
           class="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
           aria-label="Falar no WhatsApp">
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>

        <!-- Header -->
        <header class="gradient-bg text-white shadow-2xl sticky top-0 z-50">
            <nav class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <img src="https://page.gensparksite.com/v1/base64_upload/18cf05d9819fdbd48a8f4db4a7d0d394" alt="INAMOB Logo" class="h-12 w-auto">
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#servicos" class="hover:text-purple-200 transition-colors">Serviços</a>
                        <a href="#sobre" class="hover:text-purple-200 transition-colors">Sobre</a>
                        <a href="#contato" class="hover:text-purple-200 transition-colors">Contato</a>
                        <a href="https://wa.me/552140421350" target="_blank" class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors">
                            <i class="fab fa-whatsapp mr-2"></i>WhatsApp
                        </a>
                    </div>
                    <button class="md:hidden text-white">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </nav>
        </header>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-20">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-5xl md:text-7xl font-bold mb-6 hero-text">
                        Transforme Seu Negócio com 
                        <span class="text-cyan-300">Marketing Digital</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 text-purple-100">
                        Agência especializada em SEO, Google Ads e estratégias digitais que geram resultados reais para sua empresa
                    </p>
                    <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                        <a href="https://wa.me/552140421350?text=Quero%20uma%20consultoria%20gratuita!" 
                           target="_blank"
                           class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                            <i class="fab fa-whatsapp mr-3"></i>Consultoria Gratuita
                        </a>
                        <a href="#servicos" 
                           class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 border-2 border-white border-opacity-30">
                            Nossos Serviços
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="servicos" class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Nossos <span class="text-purple-600">Serviços</span>
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Soluções completas de marketing digital para empresas que querem dominar o mercado online
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- SEO Service -->
                    <div class="bg-white rounded-xl shadow-lg p-8 card-hover border-l-4 border-purple-600">
                        <div class="text-purple-600 text-4xl mb-6">
                            <i class="fas fa-search"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">SEO Avançado</h3>
                        <p class="text-gray-600 mb-6">
                            Posicione seu site no topo do Google com nossas estratégias avançadas de SEO. 
                            Mais visitantes, mais vendas.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Auditoria completa de SEO</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Otimização on-page e off-page</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Link building estratégico</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Relatórios detalhados</li>
                        </ul>
                        <a href="https://wa.me/552140421350?text=Quero%20saber%20mais%20sobre%20SEO!" 
                           target="_blank"
                           class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full block text-center">
                            Solicitar Orçamento
                        </a>
                    </div>

                    <!-- Google Ads Service -->
                    <div class="bg-white rounded-xl shadow-lg p-8 card-hover border-l-4 border-blue-600">
                        <div class="text-blue-600 text-4xl mb-6">
                            <i class="fab fa-google"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Google Ads</h3>
                        <p class="text-gray-600 mb-6">
                            Campanhas otimizadas no Google Ads que convertem visitantes em clientes. 
                            Máximo ROI garantido.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Configuração profissional</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Otimização contínua</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Gestão de palavras-chave</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Relatórios de performance</li>
                        </ul>
                        <a href="https://wa.me/552140421350?text=Quero%20saber%20mais%20sobre%20Google%20Ads!" 
                           target="_blank"
                           class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full block text-center">
                            Solicitar Orçamento
                        </a>
                    </div>

                    <!-- Social Media Service -->
                    <div class="bg-white rounded-xl shadow-lg p-8 card-hover border-l-4 border-pink-600">
                        <div class="text-pink-600 text-4xl mb-6">
                            <i class="fas fa-share-alt"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Redes Sociais</h3>
                        <p class="text-gray-600 mb-6">
                            Gestão completa das suas redes sociais com conteúdo estratégico que 
                            engaja e converte seguidores em clientes.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Criação de conteúdo</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Gestão de postagens</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Campanhas pagas</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Análise de métricas</li>
                        </ul>
                        <a href="https://wa.me/552140421350?text=Quero%20saber%20mais%20sobre%20gestão%20de%20redes%20sociais!" 
                           target="_blank"
                           class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full block text-center">
                            Solicitar Orçamento
                        </a>
                    </div>

                    <!-- Website Development -->
                    <div class="bg-white rounded-xl shadow-lg p-8 card-hover border-l-4 border-green-600">
                        <div class="text-green-600 text-4xl mb-6">
                            <i class="fas fa-code"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Desenvolvimento Web</h3>
                        <p class="text-gray-600 mb-6">
                            Sites modernos, rápidos e otimizados para conversão. 
                            Desenvolvemos sua presença digital completa.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Sites responsivos</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Otimização de velocidade</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>SEO técnico</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Integração com analytics</li>
                        </ul>
                        <a href="https://wa.me/552140421350?text=Quero%20saber%20mais%20sobre%20desenvolvimento%20web!" 
                           target="_blank"
                           class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full block text-center">
                            Solicitar Orçamento
                        </a>
                    </div>

                    <!-- Analytics & Reports -->
                    <div class="bg-white rounded-xl shadow-lg p-8 card-hover border-l-4 border-orange-600">
                        <div class="text-orange-600 text-4xl mb-6">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Analytics & Relatórios</h3>
                        <p class="text-gray-600 mb-6">
                            Monitoramento completo de performance com relatórios detalhados 
                            e insights para otimização contínua.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Google Analytics</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Relatórios customizados</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Dashboards em tempo real</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Insights estratégicos</li>
                        </ul>
                        <a href="https://wa.me/552140421350?text=Quero%20saber%20mais%20sobre%20analytics!" 
                           target="_blank"
                           class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full block text-center">
                            Solicitar Orçamento
                        </a>
                    </div>

                    <!-- Consultoria -->
                    <div class="bg-white rounded-xl shadow-lg p-8 card-hover border-l-4 border-cyan-600">
                        <div class="text-cyan-600 text-4xl mb-6">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Consultoria Digital</h3>
                        <p class="text-gray-600 mb-6">
                            Estratégias personalizadas para seu negócio. Consultoria especializada 
                            para maximizar seus resultados digitais.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Auditoria completa</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Plano estratégico</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Treinamento da equipe</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Acompanhamento mensal</li>
                        </ul>
                        <a href="https://wa.me/552140421350?text=Quero%20uma%20consultoria%20digital!" 
                           target="_blank"
                           class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full block text-center">
                            Solicitar Orçamento
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="sobre" class="py-20 bg-gray-100">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                        Por que escolher a <span class="text-purple-600">INAMOB</span>?
                    </h2>
                    <p class="text-xl text-gray-600 mb-12">
                        Somos uma agência de marketing digital focada em resultados reais. 
                        Nossa expertise em SEO e estratégias digitais já transformou centenas de negócios.
                    </p>
                    
                    <div class="grid md:grid-cols-3 gap-8 mb-12">
                        <div class="bg-white rounded-xl p-8 shadow-lg">
                            <div class="text-purple-600 text-4xl mb-4">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Resultados Comprovados</h3>
                            <p class="text-gray-600">
                                +300% de aumento médio no tráfego orgânico dos nossos clientes em 6 meses
                            </p>
                        </div>
                        
                        <div class="bg-white rounded-xl p-8 shadow-lg">
                            <div class="text-purple-600 text-4xl mb-4">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Time Especializado</h3>
                            <p class="text-gray-600">
                                Profissionais certificados em Google Ads, Analytics e especialistas em SEO
                            </p>
                        </div>
                        
                        <div class="bg-white rounded-xl p-8 shadow-lg">
                            <div class="text-purple-600 text-4xl mb-4">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Suporte 24/7</h3>
                            <p class="text-gray-600">
                                Atendimento personalizado e suporte contínuo para garantir seus resultados
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="gradient-bg text-white py-20">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    Pronto para <span class="text-cyan-300">Dominar</span> o Digital?
                </h2>
                <p class="text-xl mb-8 text-purple-100">
                    Fale conosco agora e receba uma consultoria gratuita personalizada para seu negócio
                </p>
                <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                    <a href="https://wa.me/552140421350?text=Olá!%20Quero%20uma%20consultoria%20gratuita%20para%20meu%20negócio!" 
                       target="_blank"
                       class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 pulse-purple">
                        <i class="fab fa-whatsapp mr-3"></i>Consultoria Gratuita Agora
                    </a>
                    <a href="tel:+552140421350" 
                       class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 border-2 border-white border-opacity-30">
                        <i class="fas fa-phone mr-3"></i>(21) 4042-1350
                    </a>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contato" class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Entre em <span class="text-purple-600">Contato</span>
                        </h2>
                        <p class="text-xl text-gray-600">
                            Pronto para alavancar seu negócio? Fale conosco!
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-12">
                        <!-- Contact Info -->
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-6">Fale Conosco</h3>
                            
                            <div class="space-y-6">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-green-100 p-3 rounded-lg">
                                        <i class="fab fa-whatsapp text-green-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-800">WhatsApp</p>
                                        <a href="https://wa.me/552140421350" target="_blank" class="text-purple-600 hover:text-purple-700">
                                            (21) 4042-1350
                                        </a>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-4">
                                    <div class="bg-blue-100 p-3 rounded-lg">
                                        <i class="fas fa-phone text-blue-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-800">Telefone</p>
                                        <a href="tel:+552140421350" class="text-purple-600 hover:text-purple-700">
                                            (21) 4042-1350
                                        </a>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-4">
                                    <div class="bg-purple-100 p-3 rounded-lg">
                                        <i class="fas fa-envelope text-purple-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-800">Email</p>
                                        <a href="mailto:contato@inamob.com.br" class="text-purple-600 hover:text-purple-700">
                                            contato@inamob.com.br
                                        </a>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-4">
                                    <div class="bg-cyan-100 p-3 rounded-lg">
                                        <i class="fas fa-globe text-cyan-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-800">Website</p>
                                        <p class="text-purple-600">www.inamob.com.br</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Quick WhatsApp Actions -->
                            <div class="mt-8">
                                <h4 class="text-lg font-bold text-gray-800 mb-4">Ação Rápida:</h4>
                                <div class="space-y-3">
                                    <a href="https://wa.me/552140421350?text=Quero%20uma%20auditoria%20gratuita%20de%20SEO!" 
                                       target="_blank"
                                       class="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center">
                                        <i class="fab fa-whatsapp mr-2"></i>Auditoria Gratuita de SEO
                                    </a>
                                    <a href="https://wa.me/552140421350?text=Quero%20saber%20o%20preço%20do%20Google%20Ads!" 
                                       target="_blank"
                                       class="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center">
                                        <i class="fab fa-whatsapp mr-2"></i>Orçamento Google Ads
                                    </a>
                                    <a href="https://wa.me/552140421350?text=Preciso%20de%20um%20site%20novo!" 
                                       target="_blank"
                                       class="block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center">
                                        <i class="fab fa-whatsapp mr-2"></i>Desenvolvimento Web
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Form -->
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h3>
                            <form id="contactForm" class="space-y-6">
                                <div>
                                    <label for="name" class="block text-gray-700 font-semibold mb-2">Nome Completo</label>
                                    <input type="text" id="name" name="name" required 
                                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                </div>
                                
                                <div>
                                    <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
                                    <input type="email" id="email" name="email" required 
                                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                </div>
                                
                                <div>
                                    <label for="phone" class="block text-gray-700 font-semibold mb-2">Telefone/WhatsApp</label>
                                    <input type="tel" id="phone" name="phone" required 
                                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                </div>
                                
                                <div>
                                    <label for="service" class="block text-gray-700 font-semibold mb-2">Serviço de Interesse</label>
                                    <select id="service" name="service" required 
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
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
                                
                                <div>
                                    <label for="message" class="block text-gray-700 font-semibold mb-2">Mensagem</label>
                                    <textarea id="message" name="message" rows="5" required 
                                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                              placeholder="Conte-nos mais sobre seu projeto ou necessidade..."></textarea>
                                </div>
                                
                                <button type="submit" 
                                        class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-300">
                                    <i class="fas fa-paper-plane mr-2"></i>Enviar Mensagem
                                </button>
                            </form>
                            
                            <div class="mt-6 text-center">
                                <p class="text-gray-600 mb-4">Prefere o WhatsApp?</p>
                                <a href="https://wa.me/552140421350?text=Olá!%20Gostaria%20de%20conversar%20sobre%20os%20serviços%20da%20INAMOB." 
                                   target="_blank"
                                   class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                                    <i class="fab fa-whatsapp mr-2"></i>Falar no WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-12">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <img src="https://page.gensparksite.com/v1/base64_upload/18cf05d9819fdbd48a8f4db4a7d0d394" alt="INAMOB Logo" class="h-12 w-auto mb-4">
                        <p class="text-gray-400 mb-4">
                            Transformando negócios através do marketing digital. 
                            Especialistas em SEO, Google Ads e estratégias digitais.
                        </p>
                        <div class="flex space-x-4">
                            <a href="https://wa.me/552140421350" target="_blank" class="text-green-400 hover:text-green-300">
                                <i class="fab fa-whatsapp text-xl"></i>
                            </a>
                            <a href="#" class="text-blue-400 hover:text-blue-300">
                                <i class="fab fa-linkedin text-xl"></i>
                            </a>
                            <a href="#" class="text-pink-400 hover:text-pink-300">
                                <i class="fab fa-instagram text-xl"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-bold mb-4">Serviços</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white">SEO</a></li>
                            <li><a href="#" class="hover:text-white">Google Ads</a></li>
                            <li><a href="#" class="hover:text-white">Redes Sociais</a></li>
                            <li><a href="#" class="hover:text-white">Desenvolvimento Web</a></li>
                            <li><a href="#" class="hover:text-white">Consultoria Digital</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-bold mb-4">Contato</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li>
                                <i class="fas fa-phone mr-2"></i>
                                <a href="tel:+552140421350" class="hover:text-white">(21) 4042-1350</a>
                            </li>
                            <li>
                                <i class="fab fa-whatsapp mr-2"></i>
                                <a href="https://wa.me/552140421350" target="_blank" class="hover:text-white">WhatsApp</a>
                            </li>
                            <li>
                                <i class="fas fa-envelope mr-2"></i>
                                <a href="mailto:contato@inamob.com.br" class="hover:text-white">contato@inamob.com.br</a>
                            </li>
                            <li>
                                <i class="fas fa-globe mr-2"></i>
                                <span>www.inamob.com.br</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-bold mb-4">Especialidades</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li>Marketing Digital</li>
                            <li>Otimização SEO</li>
                            <li>Campanhas Google Ads</li>
                            <li>Gestão de Redes Sociais</li>
                            <li>Analytics & Relatórios</li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p class="text-gray-400">
                        © 2024 INAMOB Negócios Digitais. Todos os direitos reservados. 
                        <br>Desenvolvido com ❤️ para dominar o digital.
                    </p>
                </div>
            </div>
        </footer>

        <!-- JavaScript -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
        
        <!-- Performance Analytics -->
        <script>
          // Basic analytics tracking
          window.addEventListener('load', function() {
            // Track page load time for Core Web Vitals
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page Load Time:', loadTime + 'ms');
          });
        </script>
    </body>
    </html>
  `)
})

// Sitemap XML
app.get('/sitemap.xml', (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://inamob.com.br/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://inamob.com.br/#servicos</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://inamob.com.br/#sobre</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://inamob.com.br/#contato</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`

  c.header('Content-Type', 'application/xml')
  return c.text(sitemap)
})

// Robots.txt
app.get('/robots.txt', (c) => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://inamob.com.br/sitemap.xml`

  c.header('Content-Type', 'text/plain')
  return c.text(robots)
})

export default app