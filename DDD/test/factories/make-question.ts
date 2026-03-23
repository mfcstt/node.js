import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question.js";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.js";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects/unique-entity-id.js";
import {faker} from '@faker-js/faker'

export function makeQuestion(override: Partial<QuestionProps> = {}, id: UniqueEntityID) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.sentence(),
    slug: Slug.create(faker.lorem.slug()),
    content: faker.lorem.paragraph(),
    ...override,
  }, id)

  return question
}