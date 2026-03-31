import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { right } from '@/core/either.js'
import type { Either } from '@/core/either.js'

interface CreateQuestionRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)
    return right({
      question
    })
  }
}
