import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface EditQuestionRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()){
      throw new Error('You are not the author of this question')
    }

    question.title = title
    question.content = content

    await this.questionRepository.update(question)

    return {}
  }
}
