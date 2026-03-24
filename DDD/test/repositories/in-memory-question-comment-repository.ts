import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository.js"
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.js"

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === questionComment.id.toString(),
    )

    this.items.splice(questionCommentIndex, 1)
  }
}