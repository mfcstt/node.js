import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository.js"
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.js"

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString(),
    )

    this.items.splice(answerCommentIndex, 1)
  }
}