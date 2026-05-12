import type { PaginationParams } from 'src/core/repositories/pagination-params.js'
import type { Question } from '../../enterprise/entities/question.js'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  update(question: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
}
