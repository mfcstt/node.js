import type { AnswersRepository } from "@/repositories/answers-repository.js";
import { UniqueEntityID } from "../entities/value-objects/unique-entity-id.js";
import { Answer } from "../entities/answer.js";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({ questionId, authorId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId)
    })

    await this.answersRepository.create(answer);
    return answer;
  }
}