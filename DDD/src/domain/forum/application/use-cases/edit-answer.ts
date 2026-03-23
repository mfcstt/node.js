import type { AnswersRepository } from '../repositories/answers-repository.js'

interface EditAnswerRequest {
  authorId: string
  questionId: string
  content: string
}

interface EditAnswerResponse {}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    authorId,
    questionId,
    content
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    
    const answer = await this.answerRepository.findById(questionId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()){
      throw new Error('You are not the author of this answer')
    }

    answer.content = content

    await this.answerRepository.update(answer)

    return {}
  }
}
