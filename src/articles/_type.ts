export interface Article {
  slug: string
  title: string
  description: string
  category: string
  keywords: string
  /** ISO date (YYYY-MM-DD) */
  date: string
  /** minutos de leitura */
  readingTime: number
  /** FontAwesome icon class, ex.: 'fa-magnifying-glass' */
  icon: string
  /** corpo do artigo em HTML */
  body: string
}
