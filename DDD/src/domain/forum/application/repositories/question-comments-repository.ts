import type { QuestionComment } from '../../enterprise/entities/question-comment.js'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
}
