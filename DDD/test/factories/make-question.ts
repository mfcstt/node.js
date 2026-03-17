import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question.js";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.js";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects/unique-entity-id.js";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Example question',
    slug: Slug.create('example-question'),
    content: 'Example content',
    ...override,
  })

  return question
}