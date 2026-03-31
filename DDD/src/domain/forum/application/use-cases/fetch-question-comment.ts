import type { QuestionComment } from "../../enterprise/entities/question-comment.js"
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository.js"
import { left, right } from "@/core/either.js"
import type { Either } from "@/core/either.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    // Aqui poderia haver uma checagem se a question existe, mas mantendo padrão dos outros fetch
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}