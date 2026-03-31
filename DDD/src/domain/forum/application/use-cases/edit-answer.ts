import type { AnswersRepository } from '../repositories/answers-repository.js'
import { left, right } from '@/core/either.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import type { Either } from '@/core/either.js'

interface EditAnswerRequest {
  authorId: string
  questionId: string
  content: string
}

type EditAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    authorId,
    questionId,
    content
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answerRepository.findById(questionId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()){
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.update(answer)

    return right({})
  }
}
