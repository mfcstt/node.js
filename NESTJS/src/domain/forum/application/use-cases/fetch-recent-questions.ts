import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { left, right } from 'src/core/either.js'
import type { Either } from 'src/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface FetchRecentQuestionsRequest {
  page: number
}

type FetchRecentQuestionsResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    page
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    // Aqui poderia haver uma checagem de erro, mas mantendo padrão dos outros fetch
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({ questions })
  }
}