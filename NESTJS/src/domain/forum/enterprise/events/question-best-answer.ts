import type { DomainEvent } from "src/core/events/domain-event.js"
import type { Question } from "../entities/question.js"
import type { UniqueEntityID } from "src/core/entities/unique-entity-id.js"

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityID

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id
  }
}