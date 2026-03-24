import { QuestionComment, type QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment.js"
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects/unique-entity-id.js"
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