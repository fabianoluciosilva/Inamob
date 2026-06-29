import type { Article } from './_type'

// Categorias: Analytics & Dados, Desenvolvimento Web e Estratégia & Negócios
export const part5: Article[] = [
  {
    slug: 'google-analytics-4',
    title: 'Google Analytics 4: o que mudou e como usar',
    description: 'O GA4 é o novo padrão de análise do Google. Entenda as principais mudanças e como extrair insights para o seu marketing.',
    category: 'Analytics & Dados',
    keywords: 'google analytics 4, ga4, análise de dados, métricas de site, eventos',
    date: '2026-06-24',
    readingTime: 5,
    icon: 'fa-chart-line',
    body: `
      <h2>Uma nova forma de medir</h2>
      <p>O Google Analytics 4 (GA4) substituiu o antigo Universal Analytics. Em vez de focar em sessões e pageviews, ele se baseia em <strong>eventos</strong> — cada interação do usuário é um dado.</p>
      <h2>O que mudou na prática</h2>
      <ul>
        <li>Modelo baseado em eventos, mais flexível.</li>
        <li>Análise unificada de site e aplicativo.</li>
        <li>Relatórios mais focados na jornada do usuário.</li>
        <li>Recursos de previsão com inteligência artificial.</li>
      </ul>
      <h2>O que acompanhar</h2>
      <p>Comece pelos relatórios de aquisição (de onde vêm os visitantes), engajamento (o que eles fazem) e conversões (o que dá resultado).</p>
      <h2>Configure suas conversões</h2>
      <p>Marque como conversão o que importa: envio de formulário, clique no WhatsApp, compra. Sem isso, você não sabe o que funciona. O GA4 trabalha junto com o <a href="/blog/google-search-console">Google Search Console</a> para uma visão completa.</p>
    `,
  },
  {
    slug: 'metricas-marketing-digital',
    title: 'As principais métricas de marketing digital',
    description: 'Medir é essencial para crescer. Conheça as métricas de marketing digital que realmente importam e o que cada uma revela.',
    category: 'Analytics & Dados',
    keywords: 'métricas marketing digital, kpis, cac, ltv, taxa de conversão, indicadores',
    date: '2026-06-11',
    readingTime: 5,
    icon: 'fa-gauge',
    body: `
      <h2>Sem dados, é só achismo</h2>
      <p>Acompanhar as métricas certas permite tomar decisões baseadas em fatos e investir onde há retorno. Veja as mais importantes.</p>
      <h2>Métricas que importam</h2>
      <ul>
        <li><strong>Tráfego</strong>: quantos visitantes e de onde vêm.</li>
        <li><strong>Taxa de conversão</strong>: quantos visitantes viram leads ou clientes.</li>
        <li><strong>CAC</strong> (Custo de Aquisição de Cliente): quanto custa conquistar um cliente.</li>
        <li><strong>LTV</strong> (Valor do Tempo de Vida): quanto um cliente gera ao longo do relacionamento.</li>
        <li><strong>ROI / ROAS</strong>: o retorno do investimento.</li>
      </ul>
      <h2>Cuidado com as métricas de vaidade</h2>
      <p>Curtidas e seguidores são bons, mas não pagam as contas. Foque em métricas ligadas a resultado de negócio.</p>
      <h2>Transforme dados em decisões</h2>
      <p>Acompanhe com regularidade e aja sobre os números. Aprofunde em <a href="/blog/taxa-de-conversao">taxa de conversão</a> e <a href="/blog/kpis-marketing">KPIs de marketing</a>.</p>
    `,
  },
  {
    slug: 'taxa-de-conversao',
    title: 'Taxa de conversão: o que é e como melhorar',
    description: 'A taxa de conversão mostra a eficiência do seu site em transformar visitantes em clientes. Veja como medir e otimizar.',
    category: 'Analytics & Dados',
    keywords: 'taxa de conversão, cro, otimização de conversão, melhorar conversão',
    date: '2026-05-27',
    readingTime: 4,
    icon: 'fa-percent',
    body: `
      <h2>O que é taxa de conversão</h2>
      <p>É a porcentagem de visitantes que realizam a ação desejada — comprar, preencher um formulário, chamar no WhatsApp. Se 100 pessoas visitam e 3 convertem, a taxa é de 3%.</p>
      <h2>Por que ela é tão importante</h2>
      <p>Melhorar a conversão multiplica o resultado sem aumentar o investimento em tráfego. Dobrar a taxa de conversão é como dobrar as vendas com o mesmo número de visitantes.</p>
      <h2>Como melhorar (CRO)</h2>
      <ul>
        <li>Deixe a chamada para ação clara e visível.</li>
        <li>Reduza atritos: formulários curtos, site rápido.</li>
        <li>Use prova social: depoimentos e números.</li>
        <li>Teste variações (testes A/B) para descobrir o que converte mais.</li>
      </ul>
      <h2>Comece pela página</h2>
      <p>Páginas de destino bem feitas têm enorme impacto. Veja <a href="/blog/landing-page-conversao">landing pages que convertem</a> e capriche na <a href="/blog/copywriting">copy</a>.</p>
    `,
  },
  {
    slug: 'kpis-marketing',
    title: 'KPIs de marketing: como medir o que importa',
    description: 'KPIs são os indicadores-chave que mostram se a sua estratégia está no caminho certo. Aprenda a escolher os seus.',
    category: 'Analytics & Dados',
    keywords: 'kpis marketing, indicadores de desempenho, metas de marketing, performance',
    date: '2026-05-15',
    readingTime: 4,
    icon: 'fa-bullseye',
    body: `
      <h2>O que são KPIs</h2>
      <p>KPI (Key Performance Indicator) é um indicador-chave de desempenho: a métrica que mostra se você está atingindo um objetivo específico.</p>
      <h2>KPI x métrica</h2>
      <p>Toda KPI é uma métrica, mas nem toda métrica é uma KPI. A KPI é aquela diretamente ligada ao seu objetivo de negócio no momento.</p>
      <h2>Como escolher os seus</h2>
      <ul>
        <li>Parta do objetivo (vender mais, gerar leads, ganhar autoridade).</li>
        <li>Escolha de 3 a 5 indicadores ligados a ele.</li>
        <li>Defina metas claras e prazos.</li>
        <li>Acompanhe com regularidade.</li>
      </ul>
      <h2>Exemplos por objetivo</h2>
      <p>Para vendas: número de vendas e ROAS. Para leads: custo por lead e taxa de conversão. Para autoridade: tráfego orgânico e backlinks. Configure tudo no <a href="/blog/google-analytics-4">Google Analytics 4</a> e revise suas <a href="/blog/metricas-marketing-digital">métricas</a> periodicamente.</p>
    `,
  },
  {
    slug: 'google-search-console',
    title: 'Google Search Console: o guia para iniciantes',
    description: 'O Search Console é a ferramenta gratuita do Google para acompanhar o desempenho do seu site na busca. Aprenda o essencial.',
    category: 'Analytics & Dados',
    keywords: 'google search console, desempenho na busca, indexação, palavras-chave, seo',
    date: '2026-05-03',
    readingTime: 5,
    icon: 'fa-magnifying-glass-chart',
    body: `
      <h2>O que é o Search Console</h2>
      <p>É a ferramenta gratuita do Google que mostra como o seu site aparece nos resultados de busca: quais palavras-chave trazem visitas, quantos cliques você recebe e se há problemas de indexação.</p>
      <h2>O que você descobre</h2>
      <ul>
        <li>As buscas que levam ao seu site (e sua posição média).</li>
        <li>Páginas mais acessadas pela busca orgânica.</li>
        <li>Erros de indexação e problemas técnicos.</li>
        <li>Status dos <a href="/blog/core-web-vitals">Core Web Vitals</a>.</li>
      </ul>
      <h2>Primeiros passos</h2>
      <p>Verifique a propriedade do site, envie o seu sitemap.xml e acompanhe o relatório de desempenho semanalmente.</p>
      <h2>Use os dados a seu favor</h2>
      <p>Descubra termos em que você está na página 2 e melhore esses conteúdos — costuma ser a forma mais rápida de ganhar tráfego. É um aliado indispensável do seu <a href="/blog/o-que-e-seo">SEO</a>.</p>
    `,
  },
  {
    slug: 'site-rapido-importancia',
    title: 'Por que ter um site rápido é tão importante',
    description: 'Velocidade afeta ranqueamento, conversão e experiência. Entenda o impacto de um site rápido e como melhorar o seu.',
    category: 'Desenvolvimento Web',
    keywords: 'site rápido, velocidade do site, performance web, tempo de carregamento',
    date: '2026-06-09',
    readingTime: 4,
    icon: 'fa-bolt',
    body: `
      <h2>Velocidade é dinheiro</h2>
      <p>Estudos mostram que cada segundo a mais de carregamento aumenta a taxa de abandono. Um site lento perde visitantes, vendas e posições no Google.</p>
      <h2>O impacto no SEO</h2>
      <p>A velocidade é fator de ranqueamento por meio dos <a href="/blog/core-web-vitals">Core Web Vitals</a>. Sites rápidos tendem a aparecer melhor e a converter mais.</p>
      <h2>O que deixa um site lento</h2>
      <ul>
        <li>Imagens pesadas e sem otimização.</li>
        <li>Excesso de scripts e plugins.</li>
        <li>Hospedagem de baixa qualidade.</li>
        <li>Falta de cache e de compressão.</li>
      </ul>
      <h2>Como acelerar</h2>
      <p>Otimize imagens (use WebP), reduza scripts, ative cache e escolha uma boa hospedagem. Veja por que um <a href="/blog/site-responsivo">site responsivo</a> também é essencial e conheça nossos <a href="/#servicos">serviços de desenvolvimento web</a>.</p>
    `,
  },
  {
    slug: 'site-responsivo',
    title: 'Site responsivo: por que ele é indispensável',
    description: 'A maioria dos acessos vem do celular. Um site responsivo se adapta a qualquer tela e é essencial para SEO e conversão.',
    category: 'Desenvolvimento Web',
    keywords: 'site responsivo, mobile first, design responsivo, site para celular',
    date: '2026-05-25',
    readingTime: 4,
    icon: 'fa-mobile-screen',
    body: `
      <h2>O que é um site responsivo</h2>
      <p>É um site que se adapta automaticamente ao tamanho da tela — celular, tablet ou computador — oferecendo uma boa experiência em qualquer dispositivo.</p>
      <h2>Por que é indispensável</h2>
      <ul>
        <li>A maior parte do tráfego hoje vem de celulares.</li>
        <li>O Google usa a versão mobile para ranquear (mobile-first).</li>
        <li>Sites não responsivos afastam e frustram o visitante.</li>
      </ul>
      <h2>Mais que caber na tela</h2>
      <p>Responsividade de verdade significa botões fáceis de tocar, textos legíveis sem zoom e carregamento rápido no 4G. Tudo pensado para quem usa o celular.</p>
      <h2>Teste o seu site</h2>
      <p>Abra o site no celular e tente navegar e entrar em contato. Se for difícil, está perdendo clientes. Combine responsividade com <a href="/blog/site-rapido-importancia">velocidade</a> para os melhores resultados.</p>
    `,
  },
  {
    slug: 'site-institucional-vs-landing',
    title: 'Site institucional ou landing page: qual escolher',
    description: 'Site institucional e landing page têm objetivos diferentes. Entenda quando usar cada um para não desperdiçar investimento.',
    category: 'Desenvolvimento Web',
    keywords: 'site institucional, landing page, qual escolher, presença online, conversão',
    date: '2026-05-09',
    readingTime: 4,
    icon: 'fa-window-maximize',
    body: `
      <h2>São coisas diferentes</h2>
      <p>O <strong>site institucional</strong> apresenta a empresa por completo: serviços, sobre, contato, blog. A <strong>landing page</strong> tem um único objetivo de conversão, geralmente ligada a uma campanha.</p>
      <h2>Quando usar um site institucional</h2>
      <ul>
        <li>Para construir presença e autoridade da marca.</li>
        <li>Para ranquear no Google com várias páginas e um blog.</li>
        <li>Para ser a "casa" oficial do seu negócio na internet.</li>
      </ul>
      <h2>Quando usar uma landing page</h2>
      <ul>
        <li>Para campanhas de <a href="/blog/o-que-e-google-ads">Google Ads</a> ou redes sociais.</li>
        <li>Para lançamentos e promoções específicas.</li>
        <li>Para maximizar a <a href="/blog/taxa-de-conversao">conversão</a> de um objetivo único.</li>
      </ul>
      <h2>O ideal é ter os dois</h2>
      <p>Um site institucional forte para autoridade e SEO, com landing pages específicas para cada campanha. Assim você cobre todas as frentes. <a href="/#contato">Fale com a INAMOB</a> para definir a melhor estrutura.</p>
    `,
  },
  {
    slug: 'seguranca-site-https',
    title: 'Segurança de site e HTTPS: por que importa para o SEO',
    description: 'Um site seguro protege seus visitantes e é requisito para ranquear bem. Entenda o papel do HTTPS e da segurança no marketing.',
    category: 'Desenvolvimento Web',
    keywords: 'https, segurança de site, certificado ssl, site seguro, seo',
    date: '2026-04-24',
    readingTime: 4,
    icon: 'fa-lock',
    body: `
      <h2>O que é HTTPS</h2>
      <p>É a versão segura do protocolo de conexão dos sites. O cadeado que aparece no navegador indica que os dados trafegam de forma criptografada, protegendo o visitante.</p>
      <h2>Por que importa para o SEO</h2>
      <p>O Google confirmou o HTTPS como fator de ranqueamento. Além disso, navegadores marcam sites sem HTTPS como "não seguros", o que afasta visitantes.</p>
      <h2>Como ter HTTPS</h2>
      <ul>
        <li>Instale um certificado SSL (muitas hospedagens oferecem gratuitamente).</li>
        <li>Redirecione todo o tráfego de HTTP para HTTPS.</li>
        <li>Garanta que imagens e scripts também carreguem em HTTPS.</li>
      </ul>
      <h2>Segurança é confiança</h2>
      <p>Um site seguro transmite profissionalismo e protege a reputação da marca. Faz parte do <a href="/blog/seo-tecnico">SEO técnico</a> que sustenta todo o seu posicionamento.</p>
    `,
  },
  {
    slug: 'plano-de-marketing-digital',
    title: 'Como montar um plano de marketing digital',
    description: 'Um plano transforma esforços soltos em estratégia. Veja um passo a passo para montar o plano de marketing digital do seu negócio.',
    category: 'Estratégia & Negócios',
    keywords: 'plano de marketing digital, estratégia, planejamento, objetivos, marketing',
    date: '2026-06-26',
    readingTime: 6,
    icon: 'fa-clipboard-list',
    body: `
      <h2>Por que ter um plano</h2>
      <p>Sem planejamento, o marketing vira uma sequência de ações desconexas. Um plano define objetivos, público e canais, e permite medir o que funciona.</p>
      <h2>Passo a passo</h2>
      <ul>
        <li><strong>1. Defina objetivos</strong> claros e mensuráveis (ex.: gerar 30 leads/mês).</li>
        <li><strong>2. Conheça seu público</strong>: quem é, o que busca, onde está.</li>
        <li><strong>3. Analise a concorrência</strong> e o seu diferencial.</li>
        <li><strong>4. Escolha os canais</strong>: SEO, Google Ads, redes sociais, e-mail.</li>
        <li><strong>5. Defina orçamento</strong> e cronograma.</li>
        <li><strong>6. Estabeleça <a href="/blog/kpis-marketing">KPIs</a></strong> para medir resultados.</li>
      </ul>
      <h2>Execute e revise</h2>
      <p>Um plano não é fixo. Acompanhe os números, aprenda com eles e ajuste a rota. Marketing digital é um processo de melhoria contínua.</p>
      <h2>Precisa de ajuda?</h2>
      <p>Montar e executar um plano exige tempo e experiência. A <a href="/#servicos">INAMOB</a> pode cuidar disso para você, do planejamento à execução. Comece definindo sua <a href="/blog/presenca-digital">presença digital</a>.</p>
    `,
  },
  {
    slug: 'presenca-digital',
    title: 'Presença digital: como construir a da sua empresa do zero',
    description: 'Ter presença digital é existir onde seus clientes procuram. Veja os pilares para construir a sua do zero, com método.',
    category: 'Estratégia & Negócios',
    keywords: 'presença digital, presença online, marketing digital do zero, marca na internet',
    date: '2026-06-13',
    readingTime: 5,
    icon: 'fa-globe',
    body: `
      <h2>O que é presença digital</h2>
      <p>É o conjunto de pontos de contato da sua marca na internet: site, Google, redes sociais, avaliações. Quanto mais sólida, mais fácil ser encontrado e escolhido.</p>
      <h2>Os pilares essenciais</h2>
      <ul>
        <li><strong>Site próprio</strong>: a base que você controla. Veja <a href="/blog/site-institucional-vs-landing">qual tipo escolher</a>.</li>
        <li><strong>Google Meu Negócio</strong>: indispensável para negócios locais.</li>
        <li><strong>Redes sociais</strong>: onde o público se relaciona com a marca.</li>
        <li><strong>Conteúdo</strong>: blog e materiais que atraem e educam.</li>
      </ul>
      <h2>Comece pelo essencial</h2>
      <p>Não tente fazer tudo de uma vez. Estruture o site, o perfil no Google e uma rede social. Depois, expanda com <a href="/blog/marketing-de-conteudo">conteúdo</a> e <a href="/blog/o-que-e-seo">SEO</a>.</p>
      <h2>Consistência constrói autoridade</h2>
      <p>Presença digital se constrói com o tempo. Mantenha tudo atualizado e coerente, e a sua marca ganhará relevância e confiança. Organize tudo num <a href="/blog/plano-de-marketing-digital">plano de marketing digital</a>.</p>
    `,
  },
  {
    slug: 'tendencias-marketing-digital-2026',
    title: 'Tendências de marketing digital para 2026',
    description: 'IA, busca conversacional, vídeo e privacidade: conheça as tendências que estão moldando o marketing digital e como se preparar.',
    category: 'Estratégia & Negócios',
    keywords: 'tendências marketing digital 2026, inteligência artificial, futuro do marketing, ia',
    date: '2026-06-28',
    readingTime: 5,
    icon: 'fa-lightbulb',
    body: `
      <h2>O marketing está mudando rápido</h2>
      <p>Acompanhar tendências ajuda a sair na frente. Veja o que está moldando o marketing digital e como se preparar.</p>
      <h2>As principais tendências</h2>
      <ul>
        <li><strong>Inteligência artificial</strong>: na criação de conteúdo, atendimento e análise de dados.</li>
        <li><strong>Busca conversacional</strong>: as pessoas buscam com perguntas completas e usam assistentes de IA. Conteúdo claro e bem estruturado ganha relevância.</li>
        <li><strong>Vídeo curto</strong>: segue dominando o alcance orgânico.</li>
        <li><strong>Privacidade e dados próprios</strong>: com menos cookies, sua lista de contatos vale ouro.</li>
        <li><strong>Personalização</strong>: experiências sob medida convertem mais.</li>
      </ul>
      <h2>O que continua valendo</h2>
      <p>Por trás de toda tendência, o fundamento permanece: conhecer o cliente, oferecer valor e medir resultados. Tecnologia muda; estratégia sólida permanece.</p>
      <h2>Prepare-se desde já</h2>
      <p>Invista em conteúdo de qualidade, em <a href="/blog/o-que-e-seo">SEO</a> e em dados próprios com <a href="/blog/email-marketing">e-mail marketing</a>. Quem constrói uma base forte aproveita melhor cada nova tendência.</p>
    `,
  },
]
