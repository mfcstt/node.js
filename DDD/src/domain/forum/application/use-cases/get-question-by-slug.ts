import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { left, right } from '@/core/either.js'
import type { Either } from '@/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface GetQuestionBySlugRequest {
  slug: string
}

type GetQuestionBySlugResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    slug
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question
    })
  }
}
