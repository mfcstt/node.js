import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { left, right } from '@/core/either.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import type { Either } from '@/core/either.js'

interface EditQuestionRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()){
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.update(question)

    return right({})
  }
}
