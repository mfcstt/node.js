import type { UniqueEntityID } from "src/core/entities/unique-entity-id.js";
import type { Answer } from "../entities/answer.js";

export class AnswerCreatedEvent {
  public ocurredAt: Date
  public answer: Answer

  constructor(answer: Answer){
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID{
    return this.answer.id
  }
}