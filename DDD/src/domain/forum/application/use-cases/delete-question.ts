import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface DeleteQuestionRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    authorId,
    questionId
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()){
      throw new Error('You are not the author of this question')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
