import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository.js"
import type { Question } from "@/domain/forum/enterprise/entities/question.js"

export class InMemoryQuestionRepository implements QuestionsRepository{
  public items: Question[] = []


  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(item => item.id.toString() === id)
    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(item => item.id.toString() === question.id.toString())
    if (questionIndex !== -1) {
      this.items.splice(questionIndex, 1)
    }
  }

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