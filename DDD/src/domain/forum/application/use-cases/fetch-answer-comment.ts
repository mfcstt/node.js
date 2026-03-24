import type { AnswerComment } from '../../enterprise/entities/answer-comment.js'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}
  async execute({
    answerId,
    page
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return { answerComments }
  }
}