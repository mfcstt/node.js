import type { AnswersRepository } from "../../repositories/answers-repository.js";
import { Answer } from "../entities/answer.js";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({ questionId, authorId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId,
      questionId,
    });

    await this.answersRepository.create(answer);
    return answer;
  }
}