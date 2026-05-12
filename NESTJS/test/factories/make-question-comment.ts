import { QuestionComment, type QuestionCommentProps } from "src/domain/forum/enterprise/entities/question-comment.js"
import { UniqueEntityID } from "src/core/entities/unique-entity-id.js"
import { faker } from "@faker-js/faker"


export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}