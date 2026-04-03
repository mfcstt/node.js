import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { right } from '@/core/either.js'
import type { Either } from '@/core/either.js'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'

interface CreateQuestionRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
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
    attachmentsIds,
  }: CreateQuestionRequest): Promise<CreateQuestionUseCaseResponse> {

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: attachmentId,
        questionId: question.id.toString(),
      })
    })

    question.attachments = questionAttachments

    await this.questionRepository.create(question)
    return right({
      question
    })
  }
}
