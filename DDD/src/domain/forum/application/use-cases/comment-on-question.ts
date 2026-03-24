import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { QuestionComment } from '../../enterprise/entities/question-comment.js'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository.js'

interface CommentOnQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}
  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
