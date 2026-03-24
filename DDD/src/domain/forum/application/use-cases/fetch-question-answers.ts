import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'

interface FetchQuestionAnswersRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    page
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return { answers }
  }
}