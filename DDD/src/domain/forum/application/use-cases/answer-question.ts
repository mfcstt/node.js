import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.js'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js'
import { Answer } from '../../enterprise/entities/answer.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { Either} from '@/core/either.js'
import { right } from '@/core/either.js'

interface AnswerQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string
  attachments: string[]
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    authorId,
    content,
    attachments,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

     const answerAttachments = attachments.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)
    return right({ answer })
  }
}
