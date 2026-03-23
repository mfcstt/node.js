import type { AnswersRepository } from '../repositories/answers-repository.js'

interface DeleteAnswerRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    authorId,
    answerId
  }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
    
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()){
      throw new Error('You are not the author of this answer')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
