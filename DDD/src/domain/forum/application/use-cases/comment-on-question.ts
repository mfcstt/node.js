import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { QuestionComment } from '../../enterprise/entities/question-comment.js'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository.js'
import { left, right } from '@/core/either.js'
import type { Either } from '@/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface CommentOnQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}
  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionUseCaseResponse> {
    
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
