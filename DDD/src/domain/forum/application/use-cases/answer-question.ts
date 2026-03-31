import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import { Answer } from '../../enterprise/entities/answer.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { Either} from '@/core/either.js'
import { right } from '@/core/either.js'

interface AnswerQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    authorId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)
    return right({ answer })
  }
}
