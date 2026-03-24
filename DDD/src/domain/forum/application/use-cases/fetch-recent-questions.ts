import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface FetchRecentQuestionsRequest {
  page: number
}

interface FetchRecentQuestionsResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    page
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    
    const questions = await this.questionRepository.findManyRecent({ page })

    return { questions }
  }
}