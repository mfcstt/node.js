import type { Question } from "@/domain/forum/enterprise/entities/question.js"

export class InMemoryQuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
  
  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find(item => item.slug.text === slug)

    if (!question) {
      return null
    }

    return question
  }
}