// Dados das categorias do blog. Módulo puro (sem imports) para ser usado
// tanto pelo layout (menu/rodapé) quanto pelo blog, sem dependência circular.

export interface Category {
  name: string
  slug: string
  icon: string
  description: string
}

// Ordem de exibição. O `name` precisa bater com o campo `category` dos artigos.
export const CATEGORIES: Category[] = [
  { name: 'SEO', slug: 'seo', icon: 'fa-magnifying-glass', description: 'Otimização para o Google: como ranquear e atrair tráfego orgânico.' },
  { name: 'Google Ads', slug: 'google-ads', icon: 'fa-bullhorn', description: 'Tráfego pago e links patrocinados para gerar clientes rapidamente.' },
  { name: 'Redes Sociais', slug: 'redes-sociais', icon: 'fa-hashtag', description: 'Estratégias para Instagram, Facebook, LinkedIn, TikTok e mais.' },
  { name: 'Marketing de Conteúdo', slug: 'marketing-de-conteudo', icon: 'fa-pen-nib', description: 'Blog, copywriting, e-mail e conteúdo que atrai e converte.' },
  { name: 'Marketing Local', slug: 'marketing-local', icon: 'fa-location-dot', description: 'Atraia clientes da sua região com SEO local e Google Meu Negócio.' },
  { name: 'Analytics & Dados', slug: 'analytics-e-dados', icon: 'fa-chart-line', description: 'Métricas, KPIs e ferramentas para medir e melhorar resultados.' },
  { name: 'Desenvolvimento Web', slug: 'desenvolvimento-web', icon: 'fa-code', description: 'Sites rápidos, responsivos e seguros que vendem mais.' },
  { name: 'Estratégia & Negócios', slug: 'estrategia-e-negocios', icon: 'fa-chess', description: 'Planejamento, presença digital e tendências do marketing.' },
]

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
