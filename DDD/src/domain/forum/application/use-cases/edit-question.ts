import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { left, right } from '@/core/either.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import type { Either } from '@/core/either.js'
import type { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository.js'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.js'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

interface EditQuestionRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentsRepository
  ) {}
  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds

  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()){
      return left(new NotAllowedError())
    }
    
    const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionRepository.update(question)

    return right({})
  }
}
