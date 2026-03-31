import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import { left, right } from '@/core/either.js'
import type { Either } from '@/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface FetchQuestionAnswersRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersResponse = Either<
  ResourceNotFoundError,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    page
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    // Aqui poderia haver uma checagem se a question existe, mas mantendo padrão dos outros fetch
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return right({ answers })
  }
}