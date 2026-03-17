import type { Question } from "@/domain/forum/enterprise/entities/question.js"

export class InMemoryQuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
}