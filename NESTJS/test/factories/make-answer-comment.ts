import { AnswerComment, type AnswerCommentProps } from "src/domain/forum/enterprise/entities/answer-comment.js"
import { UniqueEntityID } from "src/core/entities/unique-entity-id.js"
import { faker } from "@faker-js/faker"

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answer = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}