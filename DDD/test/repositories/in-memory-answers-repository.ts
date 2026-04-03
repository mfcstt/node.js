import type { PaginationParams } from "@/core/repositories/pagination-params.js"
import type { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository.js"
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js"
import type { Answer } from "@/domain/forum/enterprise/entities/answer.js"

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer) {
    this.items.push(answer)
  }

    async findById(id: string): Promise<Answer | null> {
      const answer = this.items.find(item => item.id.toString() === id)
      if (!answer) {
        return null
      }
  
      return answer
    }

 async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

    async update(answer: Answer): Promise<void> {
      const answerIndex = this.items.findIndex(item => item.id === answer.id)
     
        this.items[answerIndex] = answer
      
    }

    async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}