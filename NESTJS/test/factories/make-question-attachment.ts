import { UniqueEntityID } from "src/core/entities/unique-entity-id.js"
import { QuestionAttachment, type QuestionAttachmentProps } from "src/domain/forum/enterprise/entities/question-attachment.js"

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}