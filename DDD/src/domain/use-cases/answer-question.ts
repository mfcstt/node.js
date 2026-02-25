import { Answer } from "../entities/answer.js";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ questionId, instructorId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer(content);
    return answer;
  }
}