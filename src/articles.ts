import type { Article } from './articles/_type'
import { part1 } from './articles/part1'
import { part2 } from './articles/part2'
import { part3 } from './articles/part3'
import { part4 } from './articles/part4'
import { part5 } from './articles/part5'

export type { Article }

// Todos os artigos, ordenados do mais recente para o mais antigo.
export const articles: Article[] = [...part1, ...part2, ...part3, ...part4, ...part5].sort(
  (a, b) => b.date.localeCompare(a.date),
)
