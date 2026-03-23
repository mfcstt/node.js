import { Answer, type AnswerProps } from "@/domain/forum/enterprise/entities/answer.js";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question.js";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.js";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects/unique-entity-id.js";
import {faker} from '@faker-js/faker'

export function makeAnswer(override: Partial<AnswerProps> = {}, id: UniqueEntityID) {
  const answer = Answer.create({
    authorId: new UniqueEntityID(),
    questionId: new UniqueEntityID(),
    content: faker.lorem.paragraph(),
    ...override,
  }, id)

  return answer
  }
