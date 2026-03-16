import { Answer } from "../entities/answer.js";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ questionId, authorId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId,
      questionId,
    });
    return answer;
  }
}